import json
import glob

files = ['/home/ubuntu/.hermes/auth.json'] + glob.glob('/home/ubuntu/.hermes/profiles/*/auth.json')
for path in files:
    try:
        with open(path) as f:
            d = json.load(f)
            print(f"=== {path} ===")
            prov = d.get('providers', {})
            for p_name, p_data in prov.items():
                if isinstance(p_data, dict):
                    keys = list(p_data.keys())
                    acc = p_data.get('account') or p_data.get('email') or p_data.get('username') or p_data.get('user_id')
                    print(f"  Provider: {p_name} | Account: {acc} | Keys: {keys}")
                else:
                    print(f"  Provider: {p_name}")
            pool = d.get('credential_pool', {})
            for pool_name, pool_data in pool.items():
                if isinstance(pool_data, dict):
                    print(f"  Pool: {pool_name} | Accounts: {list(pool_data.keys())}")
    except Exception as e:
        print(f"=== {path} Error: {e} ===")
