import json
import re

# Read JSON file
with open('hisense_kenya_products.json', 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# Read current products.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Get existing product names
existing_names = []
name_matches = re.findall(r'"Product Name": "([^"]+)"', ts_content)
existing_names = name_matches

print(f'Existing products: {len(existing_names)}')
print(f'JSON products: {len(json_data)}')

# Filter out duplicates
new_products = [p for p in json_data if p['Product Name'] not in existing_names]
print(f'New products to add: {len(new_products)}')

# Parse existing rawProducts
existing_products = []
raw_match = re.search(r'const rawProducts = \[([\s\S]*?)\];', ts_content)
if raw_match:
    product_matches = re.findall(r'\{[^{}]*\}', raw_match.group(1))
    for p in product_matches:
        cat_match = re.search(r'Category: "([^"]+)"', p)
        name_match = re.search(r'"Product Name": "([^"]+)"', p)
        orig_match = re.search(r'"Original Price \(KSh\)": ([^,]+)', p)
        disc_match = re.search(r'"Discounted Price \(20% off\) \(KSh\)": ([^,]+)', p)
        img_match = re.search(r'"Image URL": "([^"]+)"', p)
        
        if cat_match and name_match:
            existing_products.append({
                'Category': cat_match.group(1),
                'Product Name': name_match.group(1),
                'Original Price (KSh)': float(orig_match.group(1)) if orig_match else 0,
                'Discounted Price (20% off) (KSh)': float(disc_match.group(1)) if disc_match else 0,
                'Image URL': img_match.group(1) if img_match else ''
            })

# Merge all products
all_products = existing_products + new_products

# Generate TypeScript array string
array_lines = []
for p in all_products:
    line = f'  {{ Category: "{p["Category"]}", "Product Name": "{p["Product Name"]}", "Original Price (KSh)": {p["Original Price (KSh)"]}, "Discounted Price (20% off) (KSh)": {p["Discounted Price (20% off) (KSh)"]}, "Image URL": "{p["Image URL"]}" }}'
    array_lines.append(line)

array_content = ',\n'.join(array_lines)

# Replace rawProducts in the file
new_content = re.sub(r'const rawProducts = \[[\s\S]*?\];', f'const rawProducts = [\n{array_content}\n];', ts_content)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Updated products.ts with {len(all_products)} total products')
