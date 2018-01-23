import flask
import json
from flask import make_response, request

app = flask.Flask(__name__)

@app.route('/api/options', methods=['GET'])
def options():
    with open('options.json', 'r') as f:
        data = json.loads(f.read())
        response = make_response(json.dumps(data))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

@app.route('/api/update', methods = ['POST'])
def create():
    with open('options.json', 'w') as f:
        data = eval(request.get_data())
        f.write(json.dumps(data))
        response = make_response(json.dumps(data))
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
