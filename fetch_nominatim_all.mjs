import https from 'https';
import fs from 'fs';

const BAIRROS_LIST = [
  'Benedito Bentes',
  'Cidade Universitária',
  'Tabuleiro do Martins',
  'Clima Bom',
  'Santa Lúcia',
  'Antares',
  'Serraria',
  'São Jorge',
  'Jacintinho',
  'Feitosa',
  'Barro Duro',
  'Farol',
  'Pinheiro',
  'Pitanguinha',
  'Gruta de Lourdes',
  'Canaã',
  'Ouro Preto',
  'Jardim Petrópolis',
  'Santos Dumont',
  'Centro',
  'Poço',
  'Jaraguá',
  'Pajuçara',
  'Ponta Verde',
  'Jatiúca',
  'Mangabeiras',
  'Cruz das Almas',
  'Jacarecica',
  'Guaxuma',
  'Garça Torta',
  'Riacho Doce',
  'Pescaria',
  'Ipioca',
  'Vergel do Lago',
  'Trapiche da Barra',
  'Pontal da Barra',
  'Ponta Grossa',
  'Levada',
  'Prado',
  'Bebedouro',
  'Bom Parto',
  'Mutange',
  'Chã da Jaqueira',
  'Chã de Bebedouro',
  'Petrópolis',
  'Santa Amélia',
  'Fernão Velho',
  'Rio Novo'
];

function fetchNominatim(bairro) {
  return new Promise((resolve) => {
    const q = encodeURIComponent(`${bairro}, Maceió, Alagoas, Brasil`);
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=geojson&polygon_geojson=1&limit=1`;
    
    https.get(url, { headers: { 'User-Agent': 'MaceioElectionGIS/3.0 (contact: info@transformetech.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const results = {};
  console.log(`Starting polygon extraction for ${BAIRROS_LIST.length} bairros...`);

  for (let i = 0; i < BAIRROS_LIST.length; i++) {
    const b = BAIRROS_LIST[i];
    process.stdout.write(`[${i+1}/${BAIRROS_LIST.length}] Fetching ${b}... `);
    const res = await fetchNominatim(b);
    if (res && res.features && res.features.length > 0) {
      const feat = res.features[0];
      const geomType = feat.geometry.type;
      if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
        results[b] = {
          type: geomType,
          coordinates: feat.geometry.coordinates,
          bbox: feat.bbox
        };
        console.log(`✓ Got ${geomType}`);
      } else {
        console.log(`⚠ Point only`);
      }
    } else {
      console.log(`✗ Not found`);
    }
    // Respect Nominatim usage policy (1 request per second)
    await new Promise(r => setTimeout(r, 1100));
  }

  fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/official_nominatim_bairros.json', JSON.stringify(results, null, 2));
  console.log(`Finished! Total polygons saved: ${Object.keys(results).length}`);
}

run().catch(console.error);
