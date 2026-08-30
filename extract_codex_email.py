import json
import base64

with open('/home/ubuntu/.hermes/auth.json') as f:
    d = json.load(f)
    codex = d.get('providers', {}).get('openai-codex', {})
    print("Label:", codex.get('label'))
    tokens = codex.get('tokens', {})
    access_token = tokens.get('access_token') or tokens.get('id_token')
    if access_token and '.' in access_token:
        try:
            parts = access_token.split('.')
            payload = parts[1]
            # Add padding
            payload += '=' * (-len(payload) % 4)
            claims = json.loads(base64.urlsafe_b64decode(payload.encode()).decode())
            print("Codex Claims email:", claims.get('email') or claims.get('https://api.openai.com/profile', {}).get('email'))
            print("Codex Sub:", claims.get('sub'))
        except Exception as e:
            print("JWT decode err:", e)
