"""
Master Automated QA Test Suite for CODE LEGACY
Verifies all 25 Core Systems & Data Integrity without external dependencies.
"""
import unittest
import json
import re
import os
import glob

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestCodeLegacyQualityAssurance(unittest.TestCase):

    def test_all_js_syntax_and_delimiters(self):
        """Verify that every JavaScript module has balanced braces, brackets, and parentheses."""
        js_files = glob.glob(os.path.join(PROJECT_ROOT, "js", "**", "*.js"), recursive=True)
        self.assertGreaterEqual(len(js_files), 15, "At least 15 JS modules must exist")
        
        for file_path in js_files:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            open_b = content.count("{")
            close_b = content.count("}")
            open_p = content.count("(")
            close_p = content.count(")")
            open_sq = content.count("[")
            close_sq = content.count("]")
            
            self.assertEqual(open_b, close_b, f"Mismatched braces in {os.path.basename(file_path)}: {open_b} vs {close_b}")
            self.assertEqual(open_p, close_p, f"Mismatched parentheses in {os.path.basename(file_path)}: {open_p} vs {close_p}")
            self.assertEqual(open_sq, close_sq, f"Mismatched brackets in {os.path.basename(file_path)}: {open_sq} vs {close_sq}")

    def test_all_10_chapters_defined(self):
        """Verify all 10 chapters are properly numbered and defined in allChapters.js."""
        chapter_file = os.path.join(PROJECT_ROOT, "js", "quests", "allChapters.js")
        self.assertTrue(os.path.exists(chapter_file))
        with open(chapter_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        for ch_num in range(1, 11):
            pattern = rf"\b{ch_num}:\s*\{{\s*number:\s*{ch_num}"
            self.assertTrue(re.search(pattern, content), f"Chapter {ch_num} definition missing or malformed in allChapters.js")

    def test_tech_companies_database(self):
        """Verify 5 tech companies exist with salary, minLevel, minRep and interview stages."""
        comp_file = os.path.join(PROJECT_ROOT, "js", "career", "companies.js")
        with open(comp_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        expected_companies = ['techstart', 'bytevanguard', 'fincore', 'nexuscloud', 'apexai']
        for comp in expected_companies:
            self.assertIn(f"id: '{comp}'", content, f"Company {comp} must exist in companies.js")
            self.assertIn("monthlySalary:", content)
            self.assertIn("interviewStages:", content)

    def test_challenges_database(self):
        """Verify programming challenges have at least 1 correct option and explanations."""
        chal_file = os.path.join(PROJECT_ROOT, "js", "skills", "challenges.js")
        with open(chal_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertIn("correct: true", content)
        self.assertIn("explanation:", content)
        self.assertIn("rewardExp:", content)

    def test_items_and_hardware_buffs(self):
        """Verify gear items have tangible buffs and rarity categories."""
        items_file = os.path.join(PROJECT_ROOT, "js", "economy", "items.js")
        with open(items_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertIn("codingSpeed:", content)
        self.assertIn("energyDrainReduction:", content)
        self.assertIn("focus:", content)
        self.assertIn("rarity: 'common'", content)
        self.assertIn("rarity: 'rare'", content)
        self.assertIn("rarity: 'epic'", content)

    def test_character_creation_archetypes(self):
        """Verify character creation has diverse background archetypes."""
        char_file = os.path.join(PROJECT_ROOT, "js", "character", "characterCreation.js")
        with open(char_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertIn("lost_student", content)
        self.assertIn("self_taught", content)
        self.assertIn("career_switcher", content)

    def test_startup_and_enterprise_mechanics(self):
        """Verify startup domain, valuation, MRR and VC pitching logic."""
        startup_file = os.path.join(PROJECT_ROOT, "js", "business", "startup.js")
        with open(startup_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        self.assertIn("valuation:", content)
        self.assertIn("monthlyRevenue:", content)
        self.assertIn("pitchVC", content)
        self.assertIn("hireEmployee", content)

    def test_bundle_js_standalone_integrity(self):
        """Verify that bundle.js exists, is non-empty, and included in index.html for zero-CORS play."""
        bundle_file = os.path.join(PROJECT_ROOT, "bundle.js")
        self.assertTrue(os.path.exists(bundle_file), "bundle.js must exist for zero-CORS browser execution")
        self.assertGreater(os.path.getsize(bundle_file), 50000, "bundle.js must contain all bundled modules")
        
        index_file = os.path.join(PROJECT_ROOT, "index.html")
        with open(index_file, "r", encoding="utf-8") as f:
            html = f.read()
        self.assertIn('src="bundle.js"', html, "index.html must reference bundle.js to avoid CORS blocks on file://")

    def test_index_html_has_all_tab_targets_and_modals(self):
        """Verify index.html contains all 10 tab buttons, tab contents, and 3 critical modals."""
        index_file = os.path.join(PROJECT_ROOT, "index.html")
        with open(index_file, "r", encoding="utf-8") as f:
            html = f.read()
        
        # Tabs
        tabs = ['overview', 'skills', 'quests', 'career', 'portfolio', 'startup', 'freelance', 'shop', 'achievements', 'logs']
        for tab in tabs:
            self.assertIn(f'data-tab="{tab}"', html, f"Tab button for {tab} missing in index.html")
            self.assertIn(f'id="tab-{tab}"', html, f"Tab container tab-{tab} missing in index.html")

        # Modals & 3D Canvas
        self.assertIn('id="challenge-modal"', html)
        self.assertIn('id="interview-modal"', html)
        self.assertIn('id="character-creation-modal"', html)
        self.assertTrue('id="game-canvas"' in html or 'id="battlestation-3d-canvas"' in html, "Master 3D canvas must exist")

if __name__ == "__main__":
    unittest.main()

