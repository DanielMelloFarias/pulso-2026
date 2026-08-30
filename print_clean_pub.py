import json
import re

with open(r'C:\Users\DESKTOP\.gemini\antigravity-ide\brain\b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb\scratch\processo_djen_full.json', encoding='utf-8') as f:
    data = json.load(f)

for i, it in enumerate(data.get('items', []), 1):
    print(f"\n=======================================================")
    print(f"PUBLICAÇÃO #{i}")
    print(f"Data Disponibilização: {it.get('data_disponibilizacao')}")
    print(f"Tipo: {it.get('tipoComunicacao')}")
    print(f"Órgão: {it.get('nomeOrgao')}")
    
    texto = it.get('texto', '')
    # Strip basic html
    clean_text = re.sub(r'<[^>]+>', ' ', texto)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    print("\nTEXTO LIMPO:")
    print(clean_text)
