from __future__ import annotations

import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
HTML_FILES = sorted(ROOT.glob("*.html"))
EXPECTED_PAGES = {
  "index.html",
  "services.html",
  "concrete-staining.html",
  "concrete-polishing.html",
  "epoxy-flooring.html",
  "decorative-coatings.html",
  "garage-floor-coatings.html",
  "gallery.html",
  "about.html",
  "contact.html",
  "case-studies.html",
}
EXPECTED_DOCS = {
  "ANTIGRAVITY-MASTER-PROMPT.md",
  "GEMINI-ASSET-RED-TEAM-PROMPT.md",
  "README.md",
  "BRANDING.md",
  "CONTENT-GUIDE.md",
  "ASSET-AUDIT.md",
  "CLIENT-ASSET-REQUESTS.md",
  "PROJECT-CONTEXT.md",
  "RED-TEAM-DECISION-PACKET.md",
  "RED-TEAM-MEMORY.md",
  "WORKLOG.md",
  "REVIEW-CHECKPOINT-01.md",
  "REFERENCE-ANALYSIS.md",
  "sitemap.xml",
}
EXPECTED_MOUNTS = {
  "data-site-header",
  "data-site-footer",
  "data-sticky-cta",
  "data-estimate-modal",
}
EXPECTED_META_SNIPPETS = {
  'name="description"',
  'rel="canonical"',
  'property="og:title"',
  'property="og:description"',
  'property="og:url"',
  'property="og:image"',
}
SHARED_BUSINESS_FIELDS = {
  "name",
  "telephone",
  "email",
  "address",
  "areaServed",
  "openingHoursSpecification",
}


def read_text(path: Path) -> str:
  return path.read_text(encoding="utf-8")


def resolve_local_reference(page_path: Path, ref: str) -> Path | None:
  ref_file = ref.split("#", 1)[0]
  if not ref_file or ref_file.startswith(("http://", "https://", "mailto:", "tel:", "#")):
    return None
  if ref_file.startswith("/_vercel/"):
    return None
  if ref_file.startswith("/"):
    return ROOT / ref_file.removeprefix("/")
  return page_path.parent / ref_file


def srcset_candidates(srcset: str) -> list[str]:
  return [candidate.strip().split()[0] for candidate in srcset.split(",") if candidate.strip()]


def json_ld_payloads(path: Path) -> list[dict]:
  pattern = re.compile(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', re.S)
  return [json.loads(block) for block in pattern.findall(read_text(path))]


def type_set(payload: dict) -> set[str]:
  value = payload.get("@type")
  if isinstance(value, list):
    return set(value)
  return {value}


class SiteBuildTests(unittest.TestCase):
  def test_expected_pages_exist(self) -> None:
    discovered_pages = {path.name for path in HTML_FILES}
    self.assertTrue(EXPECTED_PAGES.issubset(discovered_pages), msg="One or more required pages are missing")

  def test_expected_docs_exist(self) -> None:
    for name in EXPECTED_DOCS:
      self.assertTrue((ROOT / name).exists(), msg=f"Missing required project file: {name}")

  def test_each_page_has_required_mounts_and_meta(self) -> None:
    for path in HTML_FILES:
      text = read_text(path)
      self.assertIn("<!doctype html>", text.lower(), msg=f"{path.name} is missing doctype")
      self.assertIn('<main id="main-content">', text, msg=f"{path.name} is missing main landmark")
      self.assertIn('src="/assets/js/site.js"', text, msg=f"{path.name} is missing shared site.js")
      self.assertIn('href="/assets/css/styles.css"', text, msg=f"{path.name} is missing shared stylesheet")
      for mount in EXPECTED_MOUNTS:
        self.assertIn(mount, text, msg=f"{path.name} is missing {mount}")
      for snippet in EXPECTED_META_SNIPPETS:
        self.assertIn(snippet, text, msg=f"{path.name} is missing {snippet}")

  def test_json_ld_is_valid_local_business(self) -> None:
    for path in HTML_FILES:
      payloads = json_ld_payloads(path)
      self.assertTrue(payloads, msg=f"{path.name} is missing JSON-LD")
      self.assertTrue(
        any("LocalBusiness" in type_set(payload) for payload in payloads),
        msg=f"{path.name} JSON-LD must include LocalBusiness",
      )

  def test_local_business_schema_keeps_shared_fields_consistent(self) -> None:
    canonical = next(
      payload for payload in json_ld_payloads(ROOT / "index.html") if "LocalBusiness" in type_set(payload)
    )
    for path in HTML_FILES:
      local_business = next(
        payload for payload in json_ld_payloads(path) if "LocalBusiness" in type_set(payload)
      )
      for field in SHARED_BUSINESS_FIELDS:
        self.assertEqual(
          local_business.get(field),
          canonical.get(field),
          msg=f"{path.name} LocalBusiness field drifted: {field}",
        )

  def test_canonical_and_og_urls_are_clean(self) -> None:
    url_pattern = re.compile(r'(?:rel="canonical" href|property="og:url" content)="([^"]+)"')
    for path in HTML_FILES:
      for url in url_pattern.findall(read_text(path)):
        if url.startswith("https://www.rgvconcretestain.com"):
          self.assertFalse(
            url.endswith(".html"),
            msg=f"{path.name} uses a non-clean .html URL (cleanUrls serves extensionless): {url}",
          )

  def test_service_pages_have_service_and_faq_schema(self) -> None:
    service_pages = {
      "concrete-staining.html",
      "concrete-polishing.html",
      "epoxy-flooring.html",
      "decorative-coatings.html",
      "garage-floor-coatings.html",
    }
    for path in HTML_FILES:
      if path.name not in service_pages:
        continue
      types = set().union(*(type_set(payload) for payload in json_ld_payloads(path)))
      self.assertIn("Service", types, msg=f"{path.name} is missing Service schema")
      self.assertIn("FAQPage", types, msg=f"{path.name} is missing FAQPage schema")

  def test_any_page_with_service_schema_also_has_faq_schema(self) -> None:
    # Generalizes the check above to every page, not just the original five service
    # pages, so newer pages (city pages, servicios.html, future additions) that add a
    # Service block are automatically held to the same pairing without editing this
    # test's file list every time.
    for path in HTML_FILES:
      types = set().union(*(type_set(payload) for payload in json_ld_payloads(path)))
      if "Service" in types:
        self.assertIn(
          "FAQPage",
          types,
          msg=f"{path.name} declares Service schema without FAQPage schema",
        )

  def test_pages_do_not_use_em_or_en_dashes(self) -> None:
    # Standing house rule (CLAUDE.md): no em-dashes or en-dashes anywhere in shipped
    # copy. This was previously enforced only by a manual grep sweep on each run, which
    # let live violations sit in production undetected for weeks. Codifying it here.
    banned_chars = ("–", "—")  # en dash, em dash
    targets = list(HTML_FILES) + [ROOT / "assets/js/site.js"]
    for path in targets:
      text = read_text(path)
      for lineno, line in enumerate(text.splitlines(), start=1):
        if any(ch in line for ch in banned_chars):
          self.fail(
            f"{path.relative_to(ROOT)}:{lineno} uses a banned em/en-dash: {line.strip()[:140]!r}"
          )

  def test_local_references_resolve(self) -> None:
    reference_pattern = re.compile(r'(?:href|src)="([^"]+)"')
    srcset_pattern = re.compile(r'(?:srcset|imagesrcset)="([^"]+)"')
    for path in HTML_FILES:
      text = read_text(path)
      refs = reference_pattern.findall(text)
      for srcset in srcset_pattern.findall(text):
        refs.extend(srcset_candidates(srcset))
      for ref in refs:
        local_path = resolve_local_reference(path, ref)
        if local_path is None:
          continue
        self.assertTrue(local_path.exists(), msg=f"{path.name} references missing file {ref}")

  def test_non_site_image_references_are_intentional(self) -> None:
    reference_pattern = re.compile(r'(?:href|src|srcset)="([^"]+)"')
    allowed_prefixes = ("/assets/img/site/", "/assets/img/favicon/", "/assets/img/city-placeholders/")
    for path in HTML_FILES:
      text = read_text(path)
      for ref in reference_pattern.findall(text):
        for candidate in srcset_candidates(ref):
          if candidate.startswith("/assets/img/"):
            self.assertTrue(
              candidate.startswith(allowed_prefixes),
              msg=f"{path.name} uses an unclassified image asset: {candidate}",
            )

  def test_pages_do_not_reference_raw_client_asset_dump(self) -> None:
    for path in HTML_FILES:
      self.assertNotIn(
        "assets/client-assets/",
        read_text(path),
        msg=f"{path.name} should use normalized site asset paths instead of raw client dump paths",
      )

  def test_non_hero_images_are_lazy_loaded(self) -> None:
    image_pattern = re.compile(r'<img\b[^>]*>', re.S)
    for path in HTML_FILES:
      for tag in image_pattern.findall(read_text(path)):
        if 'fetchpriority="high"' in tag:
          continue
        self.assertIn('loading="lazy"', tag, msg=f"{path.name} has an eager non-hero image: {tag}")
        self.assertIn('decoding="async"', tag, msg=f"{path.name} has a sync-decoding non-hero image: {tag}")

    script = read_text(ROOT / "assets/js/site.js")
    self.assertIn('class="gallery-modal__image" alt="" loading="lazy" decoding="async"', script)

  def test_pages_do_not_use_naive_image_preloads(self) -> None:
    for path in HTML_FILES:
      self.assertNotIn(
        'rel="preload" as="image"',
        read_text(path),
        msg=f"{path.name} should rely on hero fetchpriority or responsive preloads, not JPEG-only image preloads",
      )

  def test_css_custom_properties_are_defined(self) -> None:
    css = read_text(ROOT / "assets/css/styles.css")
    defined = set(re.findall(r"(--[a-z0-9-]+)\s*:", css))
    used = set(re.findall(r"var\((--[a-z0-9-]+)\)", css))
    self.assertFalse(used - defined, msg=f"Undefined CSS custom properties: {sorted(used - defined)}")

  def test_lead_form_validation_uses_required_markup(self) -> None:
    script = read_text(ROOT / "assets/js/site.js")
    self.assertIn('querySelectorAll("[required]")', script)
    self.assertNotIn("requiredKeys", script)

    control_pattern = re.compile(r'<(?:input|select|textarea)\b(?=[^>]*\brequired\b)([^>]*)>', re.S)
    for path in HTML_FILES:
      for attrs in control_pattern.findall(read_text(path)):
        self.assertIn("name=", attrs, msg=f"{path.name} has a required form control without a name")

  def test_homepage_hero_stays_simplified(self) -> None:
    text = read_text(ROOT / "index.html")
    self.assertIn('class="hero hero--home"', text, msg="Homepage should use the dedicated home hero variant")
    self.assertNotIn("hero__proof", text, msg="Homepage hero should not reintroduce the proof aside")
    self.assertNotIn("stat-row", text, msg="Homepage hero should not reintroduce the stat strip")
    self.assertIn('class="hero__meta"', text, msg="Homepage hero should keep the compact supporting line")
    self.assertIn(
      "Start With The Right System, Not Just The Loudest Finish",
      text,
      msg="Homepage should keep the below-the-fold trust block that replaced the overloaded hero proof",
    )

  def test_contact_coverage_map_does_not_depend_on_google_embed(self) -> None:
    text = read_text(ROOT / "contact.html")
    self.assertIn('class="coverage-map"', text, msg="Contact page should render a local coverage map")
    self.assertNotIn("google.com/maps", text, msg="Coverage map should not depend on a Google Maps iframe")

  def test_shared_js_has_valid_syntax(self) -> None:
    subprocess.run(
      ["node", "--check", str(ROOT / "assets/js/site.js")],
      check=True,
      capture_output=True,
      text=True,
    )

  def test_sitemap_is_valid_xml(self) -> None:
    subprocess.run(
      ["xmllint", "--noout", str(ROOT / "sitemap.xml")],
      check=True,
      capture_output=True,
      text=True,
    )

  def test_sitemap_matches_html_pages_exactly(self) -> None:
    # Every *.html file on disk should have exactly one matching sitemap entry, and
    # every sitemap entry should point at a real page. Previously this was a manual
    # eyeball count (19 pages vs. 19 <loc> entries) done by hand on each run.
    base = "https://www.rgvconcretestain.com"

    def expected_url(path: Path) -> str:
      if path.stem == "index":
        return f"{base}/"
      return f"{base}/{path.stem}"

    expected_urls = {expected_url(path) for path in HTML_FILES}
    sitemap_urls = set(re.findall(r"<loc>([^<]+)</loc>", read_text(ROOT / "sitemap.xml")))

    missing_from_sitemap = expected_urls - sitemap_urls
    extra_in_sitemap = sitemap_urls - expected_urls
    self.assertFalse(
      missing_from_sitemap, msg=f"Pages missing from sitemap.xml: {sorted(missing_from_sitemap)}"
    )
    self.assertFalse(
      extra_in_sitemap, msg=f"sitemap.xml references URLs with no matching page: {sorted(extra_in_sitemap)}"
    )

  def test_client_asset_drop_exists(self) -> None:
    client_assets = ROOT / "assets/client-assets"
    self.assertTrue(client_assets.exists(), msg="Client asset folder is missing")
    files = [path for path in client_assets.rglob("*") if path.is_file()]
    self.assertGreaterEqual(len(files), 1, msg="Client asset folder is empty")


if __name__ == "__main__":
  unittest.main()
