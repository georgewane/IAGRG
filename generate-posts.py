import csv
import os
import re
from datetime import datetime

# 1. Configuration
CSV_FILE = 'responses.csv'  # The file you download from Google Sheets
POSTS_DIR = '_posts'        # Where the files will be saved

# Create _posts directory if it doesn't exist
if not os.path.exists(POSTS_DIR):
    os.makedirs(POSTS_DIR)

# 2. Read the CSV Data
try:
    with open(CSV_FILE, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        posts_created = 0
        
        for row in reader:
            # Parse the Google Forms Timestamp (e.g., '4/9/2026 14:30:00')
            try:
                date_obj = datetime.strptime(row['Timestamp'], '%m/%d/%Y %H:%M:%S')
            except ValueError:
                # Fallback just in case the date format changes slightly
                date_obj = datetime.now()
                
            date_prefix = date_obj.strftime('%Y-%m-%d')
            
            # Create a clean, URL-friendly filename from the title
            title = row['Title'].strip()
            slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
            filename = f"{date_prefix}-{slug}.md"
            filepath = os.path.join(POSTS_DIR, filename)
            
            # 3. Skip Prevention: Don't recreate posts we already made last week
            if os.path.exists(filepath):
                continue
                
            # 4. Generate the Jekyll Markdown File
            md_content = f"""---
layout: post
title: "{title}"
category: {row['Category'].lower()}
---
{row['Description']}
"""
            # Save the file
            with open(filepath, 'w', encoding='utf-8') as out_file:
                out_file.write(md_content)
                
            print(f"✅ Created new post: {filename}")
            posts_created += 1

        print(f"\nDone! {posts_created} new updates generated.")

except FileNotFoundError:
    print(f"Error: Could not find '{CSV_FILE}'. Please download it from Google Sheets and place it in this folder.")
