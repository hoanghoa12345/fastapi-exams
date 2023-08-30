import requests

request = requests.get('http://127.0.0.1:3002')
print(request.json())
