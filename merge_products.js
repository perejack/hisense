const fs = require('fs');
const path = require('path');

// Read JSON file
const jsonPath = path.join(process.cwd(), 'hisense_kenya_products.json');
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Read current products.ts
const tsPath = path.join(process.cwd(), 'src/data/products.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

// Get existing product names from rawProducts array
const existingNamesMatch = tsContent.match(/const rawProducts = \[([\s\S]*?)\];/);
let existingNames = [];
if (existingNamesMatch) {
  const nameMatches = existingNamesMatch[1].match(/"Product Name": "([^"]+)"/g);
  if (nameMatches) {
    existingNames = nameMatches.map(m => m.replace('"Product Name": "', '').replace('"', ''));
  }
}

console.log('Existing products:', existingNames.length);
console.log('JSON products:', jsonData.length);

// Filter out duplicates
const newProducts = jsonData.filter(p => !existingNames.includes(p['Product Name']));
console.log('New products to add:', newProducts.length);

// Parse existing rawProducts
const existingProducts = [];
const rawMatch = tsContent.match(/const rawProducts = \[([\s\S]*?)\];/);
if (rawMatch) {
  const productMatches = rawMatch[1].match(/\{[^{}]*\}/g);
  if (productMatches) {
    productMatches.forEach(p => {
      const cat = p.match(/Category: "([^"]+)"/)?.[1];
      const name = p.match(/"Product Name": "([^"]+)"/)?.[1];
      const orig = parseFloat(p.match(/"Original Price \(KSh\)": ([^,]+)/)?.[1]);
      const disc = parseFloat(p.match(/"Discounted Price \(20% off\) \(KSh\)": ([^,]+)/)?.[1]);
      const img = p.match(/"Image URL": "([^"]+)"/)?.[1];
      if (cat && name) {
        existingProducts.push({ Category: cat, 'Product Name': name, 'Original Price (KSh)': orig, 'Discounted Price (20% off) (KSh)': disc, 'Image URL': img });
      }
    });
  }
}

// Merge all products
const allProducts = [...existingProducts, ...newProducts];

// Generate TypeScript array string
const arrayContent = allProducts.map(p => 
  `  { Category: "${p.Category}", "Product Name": "${p['Product Name']}", "Original Price (KSh)": ${p['Original Price (KSh)']}, "Discounted Price (20% off) (KSh)": ${p['Discounted Price (20% off) (KSh)']}, "Image URL": "${p['Image URL']}" }`
).join(',\n');

// Replace rawProducts in the file
const newContent = tsContent.replace(/const rawProducts = \[[\s\S]*?\];/, `const rawProducts = [\n${arrayContent}\n];`);

fs.writeFileSync(tsPath, newContent);
console.log('Updated products.ts with', allProducts.length, 'total products');
