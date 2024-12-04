#Script laadt de 0 waarden uit JSON niet goed: maakt er lege cellen van in Excel. En lege cellen in Excel worden bij export met de waarde NaN geexporteerd: moet "" worden
import os
import json
import pandas as pd

# Raw string paths
json_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\2024-11.json"
wiki_directory = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\wiki"
output_excel_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\import_2024-11_with_wiki.xlsx"

try:
    # Load JSON file
    with open(json_path, 'r') as file:
        data = json.load(file)
    
    wiki_data = []

    for record in data:
        # Convert "ring" and "quadrant" fields to integers if possible
        record["ring"] = int(float(record["ring"])) if record.get("ring") else None
        record["quadrant"] = int(float(record["quadrant"])) if record.get("quadrant") else None

        # Start each row with the JSON attributes as columns
        row_data = {key: record.get(key, '') for key in record}
        # Ensure that 0.0 and 0 values are explicitly set to 0
        row_data = {key: (0 if value == 0 or value == 0.0 else value) for key, value in row_data.items()}
        
        link = record.get('link', '')
        if link:
            # Extract file name from the link
            file_name = link.split('=')[-1] + ".md"
            file_path = os.path.join(wiki_directory, file_name)
            
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as wiki_file:
                    content = wiki_file.readlines()
                
                # Parse content to extract title and sections as hdst.1, hdst.2, etc.
                section_counter = 1
                current_content = []
                title_set = False

                for line in content:
                    line = line.strip()
                    if line.startswith("# "):  # Title of the file
                        if not title_set:  # First `#` is the title
                            row_data['title'] = line  # Preserve the original # tag
                            title_set = True
                    elif line.startswith("## "):  # New section
                        if current_content:  # Save previous section content
                            row_data[f'hdst.{section_counter}'] = "\n".join(current_content).strip()
                            section_counter += 1
                        # Start a new section for hdst.* with the original ## tag
                        current_content = [line]
                    else:  # Append to current section content
                        if current_content:
                            current_content.append(line)
                
                # Save the last section
                if current_content:
                    row_data[f'hdst.{section_counter}'] = "\n".join(current_content).strip()

                wiki_data.append(row_data)
            else:
                print(f"Warning: File {file_name} not found in the directory.")
    
    # Convert the data to a DataFrame
    df_wiki = pd.DataFrame(wiki_data)
    
    # Save to Excel
    with pd.ExcelWriter(output_excel_path, engine='xlsxwriter') as writer:
        df_wiki.to_excel(writer, sheet_name='wiki', index=False)

    print(f"Wiki data successfully imported and saved to: {output_excel_path}")

except Exception as e:
    print(f"An error occurred: {e}")
