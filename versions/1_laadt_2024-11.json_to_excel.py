import pandas as pd
import json
import os

# Input and output paths as raw strings
input_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\2024-11.json"
output_path = r"C:\Users\jelle\OneDrive\Documents\GitHub\duurzaamheidsradar\versions\import_2024-11_in_excel.xlsx"

try:
    # Load the JSON data from the specified path
    with open(input_path, 'r') as file:
        data = json.load(file)
    # Convert 'ring' and 'quadrant' fields to integers if possible
    for record in data:
        record['ring'] = int(float(record['ring'])) if record['ring'] else None
        record['quadrant'] = int(float(record['quadrant'])) if record['quadrant'] else None

    # Create DataFrame with all fields from each record
    df_extracted = pd.DataFrame(data)

    # Save the DataFrame to the specified Excel file and sheet
    with pd.ExcelWriter(output_path, engine='xlsxwriter') as writer:
        df_extracted.to_excel(writer, sheet_name='2024-11.json', index=False)

    print("Data successfully imported and saved to Excel at:", output_path)

except FileNotFoundError:
    print(f"Error: The file at {input_path} was not found.")
except json.JSONDecodeError:
    print("Error: Failed to decode JSON. Please check the file format.")
except Exception as e:
    print(f"An error occurred: {e}")
