from flask import Flask,jsonify, request
from flask_cors import CORS
from pykrx import stock
import json

app=Flask(__name__)
CORS(app)
@app.route('/update_name',methods=['GET','POST'])
def getAllName():
    name_json={}
    for ticker in stock.get_market_ticker_list():
        name = stock.get_market_ticker_name(ticker)
        name_json[ticker]=name
    print(name_json)

    with open('../src/json_data/finance_name.json', 'w', encoding='UTF-8-sig') as file:

        file.write(json.dumps(name_json, ensure_ascii=False))

    return jsonify(name_json)

if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)