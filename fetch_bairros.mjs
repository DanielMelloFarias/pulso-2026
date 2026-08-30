import https from 'https';
import fs from 'fs';

const bairros = [
  { id: 'benedito', query: 'Benedito Bentes, Maceió, Alagoas, Brazil' },
  { id: 'univ', query: 'Cidade Universitária, Maceió, Alagoas, Brazil' },
  { id: 'tabuleiro', query: 'Tabuleiro do Martins, Maceió, Alagoas, Brazil' },
  { id: 'climabom', query: 'Clima Bom, Maceió, Alagoas, Brazil' },
  { id: 'serraria', query: 'Serraria, Maceió, Alagoas, Brazil' },
  { id: 'jacintinho', query: 'Jacintinho, Maceió, Alagoas, Brazil' },
  { id: 'feitosa', query: 'Feitosa, Maceió, Alagoas, Brazil' },
  { id: 'farol', query: 'Farol, Maceió, Alagoas, Brazil' },
  { id: 'centro', query: 'Centro, Maceió, Alagoas, Brazil' },
  { id: 'orla', query: 'Ponta Verde, Maceió, Alagoas, Brazil' },
  { id: 'litoralnorte', query: 'Cruz das Almas, Maceió, Alagoas, Brazil' },
  { id: 'vergel', query: 'Vergel do Lago, Maceió, Alagoas, Brazil' },
  { id: 'trapiche', query: 'Trapiche da Barra, Maceió, Alagoas, Brazil' }
];

async function getPolygon(item) {
  return new Promise((resolve) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(item.query)}&format=json&polygon_geojson=1&limit=1`;
    https.get(url, { headers: { 'User-Agent': 'MaceioCRM/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json[0] && json[0].geojson) {
            console.log(`[OK] ${item.id} -> ${json[0].geojson.type}`);
            resolve({ id: item.id, geojson: json[0].geojson, display_name: json[0].display_name });
          } else {
            console.log(`[NO GEOJSON] ${item.id}`);
            resolve(null);
          }
        } catch (e) {
          console.error(`[ERR] ${item.id}`, e.message);
          resolve(null);
        }
      });
    }).on('error', (e) => {
      console.error(`[REQ ERR] ${item.id}`, e.message);
      resolve(null);
    });
  });
}

async function run() {
  const results = {};
  for (const item of bairros) {
    const res = await getPolygon(item);
    if (res) results[res.id] = res.geojson;
    // rate limit delay for nominatim
    await new Promise(r => setTimeout(r, 1100));
  }
  fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/maceio_bairros_geojson.json', JSON.stringify(results, null, 2));
  console.log('Saved maceio_bairros_geojson.json!');
}

run();
