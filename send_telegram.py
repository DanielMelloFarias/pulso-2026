import os
import json
import urllib.request
import urllib.parse

env_vars = {}
with open('/home/ubuntu/.hermes/.env') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            env_vars[k.strip()] = v.strip().strip('"\'')

token = env_vars.get('TELEGRAM_BOT_TOKEN')
chat_id = env_vars.get('TELEGRAM_HOME_CHANNEL') or env_vars.get('TELEGRAM_ALLOWED_CHATS')

text = "👋 Olá equipe Transforme Tech! Servidor reinicializado com sucesso. Todos os serviços (Hermes, Dashboard, Fiscal e Bot) estão 100% online e operacionais."
url = f"https://api.telegram.org/bot{token}/sendMessage"
payload = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()

req = urllib.request.Request(url, data=payload, method='POST')
with urllib.request.urlopen(req, timeout=15) as res:
    data = json.load(res)
    print("STATUS_OK:", data.get("ok"))
    chat_info = (data.get("result") or {}).get("chat", {})
    print("CHAT_TITLE:", chat_info.get("title"))
    print("MESSAGE_ID:", (data.get("result") or {}).get("message_id"))
