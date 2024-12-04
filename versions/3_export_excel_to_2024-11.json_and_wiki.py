import os
import pandas as pd
import json

# Raw string paths
excel_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\import_2024-11_with_wiki.xlsx"
wiki_directory = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\wiki"
json_output_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\2024-11_updated.json"

try:
    print(">>> Stap 1: Laad het Excel-bestand.")
    # Load the Excel file
    df = pd.read_excel(excel_path, sheet_name='wiki')
    print(f"Succes: Excel-bestand '{excel_path}' geladen.\n")

    print(">>> Stap 2: Genereer JSON-data uit de eerste kolommen.")
    # Extract JSON data from the first columns
    json_columns = [col for col in df.columns if not col.startswith('hdst.')]
    json_data = df[json_columns].to_dict(orient='records')

    # Save the updated JSON file
    with open(json_output_path, 'w', encoding='utf-8') as json_file:
         # Replace NaN with empty string in JSON export
         df = df.where(pd.notnull(df), '')
         json.dump(json_data, json_file, ensure_ascii=False, indent=4)
         print(f"Succes: JSON-bestand gegenereerd en opgeslagen naar '{json_output_path}'.\n")

    print(">>> Stap 3: Genereer nieuwe .md-bestanden.")
    missing_images = []

    for _, row in df.iterrows():
        label = row.get('label')
        if not label:
            print("Waarschuwing: Rij zonder label overgeslagen.\n")
            continue

        # Generate file name
        file_name = f"{label}.md"
        file_path = os.path.join(wiki_directory, file_name)

        # Start constructing the markdown content
        md_content = []
        if 'title' in row and pd.notna(row['title']):
            md_content.append(row['title'])

        # Append hdst.* columns
        for col in df.columns:
            if col.startswith('hdst.') and pd.notna(row[col]):
                md_content.append(row[col])

        # Write to the .md file
        with open(file_path, 'w', encoding='utf-8') as md_file:
             md_file.write("\n\n".join(md_content))
             print(f"Succes: Markdown-bestand '{file_name}' gegenereerd.\n")

        # Check for image references in the markdown
        for line in md_content:
            if "!(" in line and ")" in line:  # Markdown image syntax
                start_index = line.find("(") + 1
                end_index = line.find(")")
                if start_index != -1 and end_index != -1:
                    image_path = line[start_index:end_index].strip()
                    if not os.path.isabs(image_path):  # Relative path
                        image_full_path = os.path.join(wiki_directory, image_path)
                        if not os.path.exists(image_full_path):
                            missing_images.append(image_path)

    print(">>> Stap 4: Controleer op ontbrekende afbeeldingen.")
    if missing_images:
        print("De volgende afbeeldingen ontbreken:")
        for img in missing_images:
            print(f"- {img}")
    else:
        print("Geen ontbrekende afbeeldingen gevonden.\n")

    print(">>> Proces voltooid: Alle Markdown-bestanden bijgewerkt en JSON-bestand opgeslagen.")

except Exception as e:
    print(f"Fout: Er is een probleem opgetreden. Details: {e}")
