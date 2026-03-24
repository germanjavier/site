import re

with open('/home/germanjavier/site/css/styles.css', 'r') as f:
    content = f.read()

# Add new variables to :root
root_match = re.search(r':root\s*\{', content)
if root_match:
    insertion = """
  --surface-1: #ffffff;
  --surface-2: #f9f9f9;
  --surface-3: #f5f5f5;
  --surface-4: #f0f0f0;
  --surface-5: #eeeeee;
  """
    # check if not already there
    if '--surface-1' not in content:
        content = content[:root_match.end()] + insertion + content[root_match.end():]

# Add new variables to body.dark-theme
dark_match = re.search(r'body\.dark-theme\s*\{', content)
if dark_match:
    insertion_dark = """
  --surface-1: #000000;
  --surface-2: #0a0a0a;
  --surface-3: #111111;
  --surface-4: #1a1a1a;
  --surface-5: #222222;
  """
    if '--surface-1' not in content[dark_match.start():dark_match.end()+200]:
        content = content[:dark_match.end()] + insertion_dark + content[dark_match.end():]

# Replace hardcoded backgrounds
content = re.sub(r'(background(-color)?\s*:\s*)#ffffff(.*?);', r'\1var(--surface-1)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#fff(.*?);', r'\1var(--surface-1)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#f9f9f9(.*?);', r'\1var(--surface-2)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#f5f5f5(.*?);', r'\1var(--surface-3)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#f0f0f0(.*?);', r'\1var(--surface-4)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#eeeeee(.*?);', r'\1var(--surface-5)\3;', content, flags=re.IGNORECASE)
content = re.sub(r'(background(-color)?\s*:\s*)#eee(.*?);', r'\1var(--surface-5)\3;', content, flags=re.IGNORECASE)

with open('/home/germanjavier/site/css/styles.css', 'w') as f:
    f.write(content)
