import https from 'https';
import fs from 'fs';

const overpassQuery = `[out:json][timeout:60];
area["name"="Maceió"]["admin_level"="8"]->.searchArea;
(
  relation["admin_level"="10"](area.searchArea);
  relation["boundary"="administrative"]["admin_level"="9"](area.searchArea);
  relation["place"="suburb"](area.searchArea);
  way["place"="suburb"](area.searchArea);
);
out body;
>;
out skel qt;`;

const postData = 'data=' + encodeURIComponent(overpassQuery);

const req = https.request('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'MaceioGIS/1.0'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/overpass_raw.json', data);
    console.log('Overpass fetched successfully, size:', data.length);
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(postData);
req.end();
