import urllib.request
import json
import ssl
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = 'https://comunicaapi.pje.jus.br/api/v1/comunicacao?numeroProcesso=4012118-84.2025.8.26.0576&itensPorPagina=100'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
    data = json.load(res)

out_path = r'C:\Users\DESKTOP\.gemini\antigravity-ide\brain\b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb\scratch\processo_djen_full.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("TOTAL PUBLICATIONS FOUND:", data.get('count'))
for i, it in enumerate(data.get('items', []), 1):
    print(f"\n==================== PUBLICAÇÃO #{i} ====================")
    print("ID:", it.get('id'))
    print("Data Disponibilização:", it.get('data_disponibilizacao'))
    print("Data Publicação:", it.get('dataPublicacao'))
    print("Tipo Comunicação:", it.get('tipoComunicacao'))
    print("Meio:", it.get('meio'))
    print("Órgão Julgador:", it.get('nomeOrgao'))
    print("Destinatários:", [(d.get('nome'), d.get('polo')) for d in it.get('destinatarios', [])])
    print("Destinatário Advogados:", [(a.get('nome'), a.get('numero_oab'), a.get('uf_oab')) for a in it.get('destinatarioadvogados', [])])
    print("\n--- TEXTO COMPLETO ---")
    print(it.get('texto'))
