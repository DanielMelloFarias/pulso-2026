import os

def check_env(path):
    if not os.path.exists(path):
        return
    print(f"=== {path} ===")
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                if any(x in k.upper() for x in ['TELEGRAM', 'CHAT', 'GROUP', 'CHANNEL', 'BOT', 'WHATSAPP', 'PORT']):
                    print(f"  {k}: {v}")

check_env('/home/ubuntu/.hermes/.env')
check_env('/home/ubuntu/.hermes/profiles/transformetech/.env')
check_env('/home/ubuntu/.hermes/profiles/whatsapp-grupo/.env')
check_env('/home/ubuntu/.hermes/profiles/resolve/.env')
