from flask import Flask, request, jsonify
from config import TOKEN

import requests

app = Flask(__name__)

def send_message(type: str, name: str, email: str, message: str) -> bool:
    url = f'https://api.telegram.org/bot{TOKEN}/sendMessage'
    text = f"New request of '{type}' for '{name}'.\nEmail: {email}\n\nThis guy said: '{message}'"
    
    chat_ids = ['1292800029', '1213713650']

    for chat_id in chat_ids:
        payload = {
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'Markdown'
        }
        response = requests.post(url, json=payload)
    
    return response

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
   
    required_params = ['type', 'name', 'email', 'message']

    for param in required_params:
        if param not in data or not isinstance(data[param], str) or not data[param].strip():
            return jsonify({'error': f'Missing or invalid parameter: {param}'}), 400

    if send_message(data["type"], data["name"], data["email"], data["message"]) == False:
        return jsonify({'error': 'Failed to send message to Telegram.'}), 500

    return jsonify({'message': 'Contact information received successfully.'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)