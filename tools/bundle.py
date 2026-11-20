import os
import re

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

modules = [
    'js/engine/audio.js',
    'js/economy/items.js',
    'js/skills/challenges.js',
    'js/character/customizer.js',
    'js/character/characterCreation.js',
    'js/quests/allChapters.js',
    'js/quests/chapter1.js',
    'js/quests/dailyQuests.js',
    'js/career/companies.js',
    'js/career/freelance.js',
    'js/achievements/achievements.js',
    'js/story/dialogue.js',
    'js/business/startup.js',
    'js/engine/state.js',
    'js/character/stats.js',
    'js/economy/shop.js',
    'js/career/portfolio.js',
    'js/career/careerManager.js',
    'js/career/interviews.js',
    'js/quests/questEngine.js',
    'js/quests/weeklyQuests.js',
    'js/engine/time.js',
    'js/engine/save.js',
    'js/engine/settings.js',
    'js/skills/skillTree.js',
    'js/life/lifeActions.js',
    'js/render3d/battlestation3d.js',
    'js/ui/ui.js',
    'js/main.js'
]

combined = []
for m in modules:
    file_path = os.path.join(PROJECT_ROOT, m)
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Strip multiline or single line imports
    code = re.sub(r'import\s+[\s\S]*?from\s+[\'\"].*?[\'\"];?', '', code)
    # Strip exports
    code = re.sub(r'\bexport\s+class\s+', 'class ', code)
    code = re.sub(r'\bexport\s+const\s+', 'const ', code)
    code = re.sub(r'\bexport\s+let\s+', 'let ', code)
    code = re.sub(r'\bexport\s+function\s+', 'function ', code)
    code = re.sub(r'\bexport\s+default\s+', '', code)
    
    combined.append(f'// ==========================================\n// MODULE: {m}\n// ==========================================\n' + code.strip())

bundle_code = '// CODE LEGACY - Standalone Bundle (No CORS restriction, runs everywhere)\n(function() {\n  "use strict";\n\n' + '\n\n'.join(combined) + '\n})();'

output_path = os.path.join(PROJECT_ROOT, 'bundle.js')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(bundle_code)

print(f"Generated bundle.js successfully: {len(bundle_code)} bytes")
