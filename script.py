import os
import re
import gspread
from datetime import datetime
from google.oauth2.service_account import Credentials

# ==========================================
# CONFIG
# ==========================================

SPREADSHEET_NAME = "Responses"
WORKSHEET_NAME = "Form Responses 1"
POSTS_DIR = "_posts"

os.makedirs(POSTS_DIR, exist_ok=True)

# ==========================================
# AUTH
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

sheet = client.open(SPREADSHEET_NAME).worksheet(WORKSHEET_NAME)

rows = sheet.get_all_records()

# ==========================================
# HELPERS
# ==========================================

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def clean(x):
    return str(x).strip()

# ==========================================
# PROCESS
# ==========================================

created = 0

for i, row in enumerate(rows, start=2):   # row 2 = first data row

    status = clean(row["status"]).lower()

    if status != "approved":
        continue

    category = clean(row["What type of announcement are you making?"]).lower()

    title = ""
    body = ""

    # ---------------- JOB ----------------

    if category == "job":
        title = clean(row["Job Title"])

        body = f"""
**Location:** {clean(row["Place (City, Country)"])}

**Deadline:** {clean(row["Application Deadline (dd-mm-yyyy)"])}

{clean(row["Job Description (please do not use external links or HTML)"])}

**Website:** <{clean(row["Job URL"])}>

**Contact:** {clean(row["Job Contact Email (use AT instead of @)"])}
"""

    # ---------------- CONFERENCE ----------------

    elif category == "conference":

        title = clean(row["Conference Title"])

        body = f"""
**Venue:** {clean(row["Place"])}

**Dates:** {clean(row["Start date"])} to {clean(row["End date"])}

**Registration Deadline:** {clean(row["Registration deadline"])}

**Abstract Deadline:** {clean(row["Abstract deadline"])}

{clean(row["Conference Description (please do not use external links or HTML)"])}

**Website:** <{clean(row["Conference Website"])}>

**Contact:** {clean(row["Contact Email (use AT instead of @)"])}
"""

    # ---------------- NEWS ----------------

    elif category == "news":

        title = clean(row["News Title"])

        body = f"""
{clean(row["News Description"])}

**Website:** <{clean(row["News URL"])}>

**Contact:** {clean(row["New Contact Email (use AT instead of @)"])}
"""

    else:
        continue

    if not title:
        continue

    # date
    try:
        dt = datetime.strptime(row["Timestamp"], "%m/%d/%Y %H:%M:%S")
    except:
        dt = datetime.now()

    date_prefix = dt.strftime("%Y-%m-%d")
    post_datetime = dt.strftime("%Y-%m-%d %H:%M:%S +0530")

    slug = slugify(title)

    filename = f"{date_prefix}-{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)
    
    counter = 2

    while os.path.exists(filepath):
        filename = f"{date_prefix}-{slug}-{counter}.md"
        filepath = os.path.join(POSTS_DIR, filename)
        counter += 1

    md = f"""---
layout: post
title: "{title}"
date: {post_datetime}
category: {category}
---

{body}
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(md)

    print("Created:", filename)

    # update status column
    sheet.update_cell(i, 24, "Published")

    created += 1

print(f"\nDone. {created} new posts created.")