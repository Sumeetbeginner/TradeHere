from flask import render_template
from flask import Flask, request, jsonify
import yfinance as yf
from . import app

@app.route('/stock_operation', methods=['POST'])
def stock_operation():
  
    data = request.get_json()
    
    stockTickerName = data.get('stockTickerSymbol', '')
    
    nseModifier = stockTickerName + '.NS'
    msft = yf.Ticker(nseModifier)
    result = msft.info
    
    result2 = msft.news
     
    return jsonify({'result': result, 'result2' : result2})

@app.route('/stock_pf_operation', methods=['POST'])
def stock_pf_operation():
  
    data = request.get_json()
    
    stockUpdatedPfData = []
    
    for i in range(len(data)):
        stockTickerName = data[i]
        nseModifier = stockTickerName + '.NS'
        msft = yf.Ticker(nseModifier)
        result = msft.info
        currStockPrice = result.get('currentPrice')
        stockUpdatedPfData.append(currStockPrice)
        
    return jsonify({'result': stockUpdatedPfData})


