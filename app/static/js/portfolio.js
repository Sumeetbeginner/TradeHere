
function openHome() {
    window.location = "index.html"
}
function openStocks() {
    window.location = "stocks.html"
}
function openWatchList() {
    window.location = "watchlist.html"
}
function openWallet() {
    window.location = "wallet.html"
}
function openMyOrders() {
    window.location = "orders.html"
}

function portfolioTableDetails(){

    let currPortfolioDetails = JSON.parse(localStorage.getItem("PortFolio"));

    let count = 1;
    for(let i = 1; i<currPortfolioDetails.length; i++){

        let tableBody = document.createElement("tbody");
        tableBody.className = "pfBody";
        tableBody.id = ("tbody" + count);
        document.getElementById("pfTable0").appendChild(tableBody);

        let tableRow = document.createElement("tr");
        tableRow.className = "tableRow";
        tableRow.id = ("tableRow" + count);
        tableBody.appendChild(tableRow);

        let srNoTd = document.createElement("td");
        srNoTd.className = "srNo";
        srNoTd.id = ("srNo" + count);
        srNoTd.innerHTML = count + "."
        tableRow.appendChild(srNoTd)

        // let stockNameTd = document.createElement("td");
        // stockNameTd.className = "stockName";
        // stockNameTd.id = ("stockName" + count);
        // stockNameTd.innerHTML = currPortfolioDetails[count-1].stockName
        // tableRow.appendChild(stockNameTd)

        let stockTickerTd = document.createElement("td");
        stockTickerTd.className = "stockTicker";
        stockTickerTd.id = ("stockTicker" + count);
        stockTickerTd.innerHTML = currPortfolioDetails[count-1].stockTicker
        tableRow.appendChild(stockTickerTd)

        let quantityTd = document.createElement("td");
        quantityTd.className = "stockQuantity";
        quantityTd.id = ("stockQuantity" + count);
        quantityTd.innerHTML = Number(currPortfolioDetails[count-1].shareQuantity)
        tableRow.appendChild(quantityTd)

        let buyPriceTd = document.createElement("td");
        buyPriceTd.className = "totalBuyPrice";
        buyPriceTd.id = ("totalBuyPrice" + count);
        buyPriceTd.innerHTML = (Number((currPortfolioDetails[count-1].buyTotalPrice))).toFixed(2)
        tableRow.appendChild(buyPriceTd)

        let currPriceTd = document.createElement("td");
        currPriceTd.className = "totalCurrPrice";
        currPriceTd.id = ("totalCurrPrice" + count);
        currPriceTd.innerHTML = (Number(currPortfolioDetails[count-1].currTotalPrice)).toFixed(2)
        tableRow.appendChild(currPriceTd)

        let buyPricePerShareTd = document.createElement("td");
        buyPricePerShareTd.className = "buyPricePerShare";
        buyPricePerShareTd.id = ("buyPricePerShare" + count);
        buyPricePerShareTd.innerHTML = Number(currPortfolioDetails[count-1].buyPerSharePrice).toFixed(2)
        tableRow.appendChild(buyPricePerShareTd)

        let currPerSharePriceTd = document.createElement("td");
        currPerSharePriceTd.className = "currPerSharePrice";
        currPerSharePriceTd.id = ("currPerSharePrice" + count);
        currPerSharePriceTd.innerHTML = (Number(currPortfolioDetails[count-1].currPerSharePrice)).toFixed(2)
        tableRow.appendChild(currPerSharePriceTd)

        let amtChange = ( Number(currPortfolioDetails[count-1].buyTotalPrice) - Number(currPortfolioDetails[count-1].currTotalPrice).toFixed(2))

        let perChange = ((Number(amtChange)/Number(currPortfolioDetails[count-1].buyTotalPrice)).toFixed(2));

        let perChangeTd = document.createElement("td");
        perChangeTd.className = "perChange";
        perChangeTd.id = ("perChange" + count);
        perChangeTd.innerHTML = perChange + "%"
        tableRow.appendChild(perChangeTd)

        let amtChangeTd = document.createElement("td");
        amtChangeTd.className = "amtChange";
        amtChangeTd.id = ("amtChange" + count);
        amtChangeTd.innerHTML = amtChange
        tableRow.appendChild(amtChangeTd)

        if(amtChange < 0){
            perChangeTd.style.color = "#ff384c";
            amtChangeTd.style.color = "#ff384c";
            
        }
        else{
            perChangeTd.style.color = "#03fc2c";
            amtChangeTd.style.color = "#03fc2c";
        }

        let typeOfBuyTd = document.createElement("td");
        typeOfBuyTd.className = "typeOfBuy";
        typeOfBuyTd.id = ("typeOfBuy" + count);
        typeOfBuyTd.innerHTML = currPortfolioDetails[count-1].typeOfBuy
        tableRow.appendChild(typeOfBuyTd)

        let actionTd = document.createElement("td");
        actionTd.className = "action";
        actionTd.id = ("action" + count);
        tableRow.appendChild(actionTd)

        let sellBtn = document.createElement("button");
        sellBtn.className = "sellBtn";
        sellBtn.id = ("sellBtn" + count);
        sellBtn.innerHTML = "Sell";
        sellBtn.onclick = openSellBoxPf();
        actionTd.appendChild(sellBtn);

        count++;


    }


}

portfolioTableDetails()

function openSellBoxPf(){

}