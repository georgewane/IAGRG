import os
import re
import gspread
from datetime import datetime
from google.oauth2.service_account import Credentials

# ==========================================
# CONFIG
# ==========================================

SHEET_NAME = "Form Responses 1"
POSTS_DIR = "_posts"

os.makedirs(POSTS_DIR, exist_ok=True)

# ==========================================
# GOOGLE AUTH
# ==========================================

scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=scopes
)

client = gspread.authorize(creds)

sheet = client.open("YOUR_SHEET_NAME").worksheet(SHEET_NAME)

rows = sheet.get_all_records()

# ==========================================
# HELPERS
# ==========================================

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

created = 0

# ==========================================
# PROCESS ROWS
# ==========================================

for i, row in enumerate(rows, start=2):   # row 2 because row1=headers

    status = str(row["Status"]).strip().lower()

    if status != "approved":
        continue

    title = row["Title"]
    desc = row["Description"]
    category = row["What type of announcement are you making?"]

    if not title:
        continue

    try:
        dt = datetime.strptime(row["Timestamp"], "%m/%d/%Y %H:%M:%S")
    except:
        dt = datetime.now()

    date_prefix = dt.strftime("%Y-%m-%d")
    slug = slugify(title)

    filename = f"{date_prefix}-{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        sheet.update(f"Z{i}", "Published")
        continue

    md = f"""---
layout: post
title: "{title}"
category: {category}
---

{desc}
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(md)

    print("Created:", filename)

    # update status column
    status_col = 26   # column Z example
    sheet.update_cell(i, status_col, "Published")

    created += 1

print("Done:", created)