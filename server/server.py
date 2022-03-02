from flask import Flask,jsonify, request
from flask_cors import CORS
from pykrx import stock
import json
from pandas import DataFrame 
import pandas as pd
app=Flask(__name__)
CORS(app)


@app.route('/price',methods=['GET','POST']) #특정 주가 불러오기
def getPrice():
    col=["시가","고가","저가","종가","거래량"]
    day=[]
    price={}
    r=request.json
    ticker=str(r['ticker'])
    startday="20210202"
    endday="20210302"
    df = stock.get_market_ohlcv(startday, endday, ticker)
    for i in range(len(df)):
        day.append(str(df.index[i])[0:10])
    for i in range(0,len(day)):
        price[day[i]]={"시가":str(df.iloc[i][0]),"고가":str(df.iloc[i][1]),"저가":str(df.iloc[i][2]),"종가":str(df.iloc[i][3]),"거래량":str(df.iloc[i][4])}
    print(price)
    return jsonify(price)





@app.route('/update_name',methods=['GET','POST']) #모든 주식 종목 불러오기
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