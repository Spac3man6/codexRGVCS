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


class SiteBuildTests(unittest.TestCase):
  def test_expected_pages_exist(self) -> None:
    self.assertEqual({path.name for path in HTML_FILES}, EXPECTED_PAGES)

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
    pattern = re.compile(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', re.S)
    for path in HTML_FILES:
      blocks = pattern.findall(read_text(path))
      self.assertTrue(blocks, msg=f"{path.name} is missing JSON-LD")
      for block in blocks:
        payload = json.loads(block)
        self.assertEqual(payload.get("@type"), "LocalBusiness", msg=f"{path.name} JSON-LD must use LocalBusiness")

  def test_local_references_resolve(self) -> None:
    pattern = re.compile(r'(?:href|src)="([^"]+)"')
    for path in HTML_FILES:
      for ref in pattern.findall(read_text(path)):
        local_path = resolve_local_reference(path, ref)
        if local_path is None:
          continue
        self.assertTrue(local_path.exists(), msg=f"{path.name} references missing file {ref}")

  def test_placeholder_images_have_replace_comments(self) -> None:
    image_pattern = re.compile(r'<img[^>]+src="assets/img/(?!site/)[^"]+"')
    for path in HTML_FILES:
      text = read_text(path)
      placeholder_image_count = len(image_pattern.findall(text))
      replace_comment_count = text.count("<!-- REPLACE:")
      self.assertGreaterEqual(
        replace_comment_count,
        placeholder_image_count,
        msg=f"{path.name} has placeholder images without matching replacement comments",
      )

  def test_pages_do_not_reference_raw_client_asset_dump(self) -> None:
    for path in HTML_FILES:
      self.assertNotIn(
        "assets/client-assets/",
        read_text(path),
        msg=f"{path.name} should use normalized site asset paths instead of raw client dump paths",
      )

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

  def test_client_asset_drop_exists(self) -> None:
    client_assets = ROOT / "assets/client-assets"
    self.assertTrue(client_assets.exists(), msg="Client asset folder is missing")
    files = [path for path in client_assets.rglob("*") if path.is_file()]
    self.assertGreaterEqual(len(files), 1, msg="Client asset folder is empty")


if __name__ == "__main__":
  unittest.main()
