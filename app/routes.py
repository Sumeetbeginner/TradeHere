
from flask import render_template
from . import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/portfolio.html')
def portfolio():
    return render_template('portfolio.html')

@app.route('/stocks.html')
def stocks():
    return render_template('stocks.html')

@app.route('/watchlist.html')
def watchlist():
    return render_template('watchlist.html')

@app.route('/wallet.html')
def wallet():
    return render_template('wallet.html')

@app.route('/orders.html')
def orders():
    return render_template('orders.html')

@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/stockinfo.html')
def stockinfo():
    return render_template('stockinfo.html')

