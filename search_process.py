import urllib.request
import urllib.parse
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

proc = '4012118-84.2025.8.26.0576'
proc_digits = '40121188420258260576'

params = [
    f'numeroProcesso={proc}',
    f'numeroProcesso={proc_digits}',
    f'numero_processo={proc}',
    f'texto={proc}',
    f'texto=4012118-84',
    f'siglaTribunal=TJSP&texto=4012118',
    f'siglaTribunal=TJSP&numeroProcesso={proc}'
]

for p in params:
    url = f'https://comunicaapi.pje.jus.br/api/v1/comunicacao?{p}&itensPorPagina=10'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as res:
            data = json.load(res)
            cnt = data.get('count')
            items = data.get('items', [])
            print(f'Param [{p}] => count: {cnt}, items: {len(items)}')
            for it in items[:3]:
                print('   ->', it.get('data_disponibilizacao'), it.get('siglaTribunal'), it.get('nomeOrgao'))
                print('      ', (it.get('texto') or '')[:200].replace('\n', ' '))
    except Exception as e:
        print(f'Param [{p}] ERR:', e)
