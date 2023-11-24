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


