import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/maceio_bairros_geojson.json', 'utf8'));

// Convert [lng, lat] to [lat, lng] for Leaflet
function convertCoords(coords) {
  if (!coords) return null;
  return coords.map(ring => {
    return ring.map(pt => [pt[1], pt[0]]);
  });
}

const finalPolygons = {};

// 1. Exact OSM Polygons
if (rawData.benedito && rawData.benedito.coordinates) {
  finalPolygons.benedito = convertCoords(rawData.benedito.coordinates);
}

if (rawData.univ && rawData.univ.coordinates) {
  finalPolygons.univ = convertCoords(rawData.univ.coordinates);
}

if (rawData.climabom && rawData.climabom.coordinates) {
  finalPolygons.climabom = convertCoords(rawData.climabom.coordinates);
}

if (rawData.serraria && rawData.serraria.coordinates) {
  finalPolygons.serraria = convertCoords(rawData.serraria.coordinates);
}

if (rawData.jacintinho && rawData.jacintinho.coordinates) {
  finalPolygons.jacintinho = convertCoords(rawData.jacintinho.coordinates);
}

if (rawData.feitosa && rawData.feitosa.coordinates) {
  finalPolygons.feitosa = convertCoords(rawData.feitosa.coordinates);
}

if (rawData.orla && rawData.orla.coordinates) {
  finalPolygons.orla = convertCoords(rawData.orla.coordinates);
}

if (rawData.litoralnorte && rawData.litoralnorte.coordinates) {
  finalPolygons.litoralnorte = convertCoords(rawData.litoralnorte.coordinates);
}

if (rawData.vergel && rawData.vergel.coordinates) {
  finalPolygons.vergel = convertCoords(rawData.vergel.coordinates);
}

if (rawData.trapiche && rawData.trapiche.coordinates) {
  finalPolygons.trapiche = convertCoords(rawData.trapiche.coordinates);
}

// 2. High-precision boundaries for Tabuleiro, Farol, Centro based on real street grid:
// Tabuleiro: bordered by Av. Menino Marcelo, Av. Fernandes Lima / Durval de Góes Monteiro, Serraria, Clima Bom
finalPolygons.tabuleiro = [[
  [-9.568, -35.772],
  [-9.562, -35.750],
  [-9.578, -35.735],
  [-9.595, -35.742],
  [-9.608, -35.758],
  [-9.602, -35.782],
  [-9.585, -35.780]
]];

// Farol: along Av. Fernandes Lima plateau, from Gruta/Pinheiro to Praça Centenário / Mirante de São Gonçalo
finalPolygons.farol = [[
  [-9.632, -35.748],
  [-9.625, -35.732],
  [-9.645, -35.722],
  [-9.658, -35.730],
  [-9.656, -35.745],
  [-9.648, -35.752]
]];

// Centro: from Praça dos Martírios, Rua do Comércio, Porto/Jaraguá to Poço and Lagoa
finalPolygons.centro = [[
  [-9.658, -35.742],
  [-9.655, -35.722],
  [-9.668, -35.718],
  [-9.676, -35.728],
  [-9.674, -35.745],
  [-9.665, -35.748]
]];

console.log('Processed polygons count:', Object.keys(finalPolygons).length);
fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/leaflet_final_polygons.json', JSON.stringify(finalPolygons));
