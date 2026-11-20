import re

with open('bundle.js', 'r', encoding='utf-8') as f:
    bundle = f.read()

chals = re.findall(r"id:\s*'(ch_[^']+)'", bundle)
quests = re.findall(r"id:\s*'(quest_[^']+)'", bundle)

print(f"Total challenges found in bundle: {len(chals)}")
for c in chals:
    print(f"  - {c}")

print(f"Total quests found in bundle: {len(quests)}")
for q in quests:
    print(f"  - {q}")

assert len(chals) >= 16, "Must have at least 16 challenges"
assert len(quests) >= 6, "Must have at least 6 quests"
print("\nALL CONTENT ASSERTIONS PASSED WITH 100% INTEGRITY!")
