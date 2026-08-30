import fs from 'fs';

const polys = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/leaflet_final_polygons.json', 'utf8'));
let painelJs = fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/painel.js', 'utf8');

// Insert REAL_POLYGONS constant into painel.js
const polyConst = `const REAL_POLYGONS = ${JSON.stringify(polys)};\n\n`;

// In painel.js, replace the polygon addition with REAL_POLYGONS[bairroId]
painelJs = polyConst + painelJs;

// Replace poly instantiation to use REAL_POLYGONS
painelJs = painelJs.replace(
  'const poly = L.polygon(data.coords, defaultStyle).addTo(leafletMap);',
  'const polyCoords = REAL_POLYGONS[bairroId] || data.coords;\n    const poly = L.polygon(polyCoords, defaultStyle).addTo(leafletMap);'
);

fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/painel.js', painelJs);
console.log('painel.js updated with exact real polygons!');
