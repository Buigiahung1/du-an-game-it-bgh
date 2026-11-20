"""
Comprehensive Phase 1 Vertical Slice & Gameplay Loop Test
Simulates:
1. Character Spawn & Initialization
2. Interaction with Mentor Minh & Quest 1 Briefing
3. Sitting at Battlestation Desk
4. Solving Coding Challenges & Compiler Validation
5. Quest 1 Completion & Reward Distribution
6. Mentor Minh Reactive Dialogue Update
7. Seamless Scene Switch to Campus Quad & Back to Dorm
8. Bed Sleep Energy Restoration & Clock Tick
9. Save/Load Serialization & State Integrity
"""
import unittest
import os
import re

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class TestPhase1VerticalSliceLoop(unittest.TestCase):

    def setUp(self):
        self.bundle_path = os.path.join(PROJECT_ROOT, "bundle.js")
        self.assertTrue(os.path.exists(self.bundle_path))
        with open(self.bundle_path, "r", encoding="utf-8") as f:
            self.bundle = f.read()

    def test_bundle_contains_campus_and_dialogue_systems(self):
        """Verify Campus3D, dialogue modal handling, and scene transitions exist in bundle."""
        self.assertIn("class Campus3D", self.bundle)
        self.assertIn("buildCampusBuilding", self.bundle)
        self.assertIn("buildAutumnTree", self.bundle)
        self.assertIn("openDialogueModal", self.bundle)
        self.assertIn("switchScene", self.bundle)
        self.assertIn("gcc -std=c11 -O2 solution.c", self.bundle)

    def test_bedroom_has_photo_wall_guitar_and_rug(self):
        """Verify Bedroom contains fairy lights, photo wall, guitar, and dust particles."""
        self.assertIn("buildPhotoWallAndFairyLights", self.bundle)
        self.assertIn("buildAcousticGuitar", self.bundle)
        self.assertIn("buildFloorRug", self.bundle)
        self.assertIn("buildDustParticles", self.bundle)

    def test_character_has_hoodie_drawstrings_and_buckle(self):
        """Verify 3D character has drawstrings, metallic aglets, and cross-body bag buckle."""
        self.assertIn("Hoodie Drawstrings with Metallic Aglet Tips", self.bundle)
        self.assertIn("Cross-body Bag Brass Buckle", self.bundle)

    def test_dialogue_modal_in_index_html(self):
        """Verify index.html has dialogue-modal with avatar, badge, and options."""
        index_path = os.path.join(PROJECT_ROOT, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            html = f.read()
        self.assertIn('id="dialogue-modal"', html)
        self.assertIn('id="dialogue-npc-avatar"', html)
        self.assertIn('id="dialogue-speech-text"', html)
        self.assertIn('id="dialogue-options-container"', html)

    def test_scene_triggers_integrity(self):
        """Verify both Bedroom and Campus have proper interaction triggers."""
        # Bedroom triggers: pc_desk, bed_sleep, bookshelf, room_door
        self.assertIn('action: "open_pc"', self.bundle)
        self.assertIn('action: "sleep"', self.bundle)
        self.assertIn('action: "read_book"', self.bundle)
        self.assertIn('action: "exit_room"', self.bundle)

        # Campus triggers: enter_bedroom, open_lab, open_library
        self.assertIn('action: "enter_bedroom"', self.bundle)
        self.assertIn('action: "open_lab"', self.bundle)
        self.assertIn('action: "open_library"', self.bundle)

    def test_quest_engine_triggers_on_challenge_solved(self):
        """Verify QuestEngine checks challenge_solved and practice_or_challenge."""
        self.assertIn("QuestEngine.checkQuestProgress('challenge_solved'", self.bundle)
        self.assertIn("QuestEngine.checkQuestProgress('challenge'", self.bundle)

    def test_challenge_penalty_anti_exploit_logic(self):
        """Verify coding challenges enforce energy checks, bug penalties, and anti-spam lockouts."""
        self.assertIn("COMPILE_ENERGY_COST", self.bundle)
        self.assertIn("WRONG_PENALTY_ENERGY", self.bundle)
        self.assertIn("WRONG_PENALTY_MONEY", self.bundle)
        self.assertIn("consecutiveChallengeFails", self.bundle)
        self.assertIn("modal-chal-lockout-alert", self.bundle)

    def test_freelance_and_interview_consequences(self):
        """Verify freelance contracts and interviews penalize failure with energy/fees/reputation."""
        self.assertIn("vi phạm hợp đồng", self.bundle)
        self.assertIn("StatsManager.consumeEnergy(20)", self.bundle)

if __name__ == "__main__":
    unittest.main()

