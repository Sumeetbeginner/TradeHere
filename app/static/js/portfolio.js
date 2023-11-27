
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

function portfolioTableDetails() {

    let currPortfolioDetails = JSON.parse(localStorage.getItem("PortFolio"));

    let count = 1;
    for (let i = 1; i < currPortfolioDetails.length; i++) {

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
        stockTickerTd.innerHTML = currPortfolioDetails[count - 1].stockTicker
        tableRow.appendChild(stockTickerTd)

        let quantityTd = document.createElement("td");
        quantityTd.className = "stockQuantity";
        quantityTd.id = ("stockQuantity" + count);
        quantityTd.innerHTML = Number(currPortfolioDetails[count - 1].shareQuantity)
        tableRow.appendChild(quantityTd)

        let buyPriceTd = document.createElement("td");
        buyPriceTd.className = "totalBuyPrice";
        buyPriceTd.id = ("totalBuyPrice" + count);
        buyPriceTd.innerHTML = (Number((currPortfolioDetails[count - 1].buyTotalPrice))).toFixed(2)
        tableRow.appendChild(buyPriceTd)

        let currPriceTd = document.createElement("td");
        currPriceTd.className = "totalCurrPrice";
        currPriceTd.id = ("totalCurrPrice" + count);
        currPriceTd.innerHTML = (Number(currPortfolioDetails[count - 1].currTotalPrice)).toFixed(2)
        tableRow.appendChild(currPriceTd)

        let buyPricePerShareTd = document.createElement("td");
        buyPricePerShareTd.className = "buyPricePerShare";
        buyPricePerShareTd.id = ("buyPricePerShare" + count);
        buyPricePerShareTd.innerHTML = Number(currPortfolioDetails[count - 1].buyPerSharePrice).toFixed(2)
        tableRow.appendChild(buyPricePerShareTd)

        let currPerSharePriceTd = document.createElement("td");
        currPerSharePriceTd.className = "currPerSharePrice";
        currPerSharePriceTd.id = ("currPerSharePrice" + count);
        currPerSharePriceTd.innerHTML = (Number(currPortfolioDetails[count - 1].currPerSharePrice)).toFixed(2)
        tableRow.appendChild(currPerSharePriceTd)

        let amtChange = ((Number(currPortfolioDetails[count - 1].buyTotalPrice) - Number(currPortfolioDetails[count - 1].currTotalPrice)).toFixed(2))

        let perChange = (((Number(amtChange) / Number(currPortfolioDetails[count - 1].buyTotalPrice)) * 100 ).toFixed(2));

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

        if (amtChange < 0) {
            perChangeTd.style.color = "#ff384c";
            amtChangeTd.style.color = "#ff384c";

        }
        else {
            perChangeTd.style.color = "#03fc2c";
            amtChangeTd.style.color = "#03fc2c";
        }

        let typeOfBuyTd = document.createElement("td");
        typeOfBuyTd.className = "typeOfBuy";
        typeOfBuyTd.id = ("typeOfBuy" + count);
        typeOfBuyTd.innerHTML = currPortfolioDetails[count - 1].typeOfBuy
        tableRow.appendChild(typeOfBuyTd)

        let actionTd = document.createElement("td");
        actionTd.className = "action";
        actionTd.id = ("action" + count);
        tableRow.appendChild(actionTd)

        let sellBtn = document.createElement("button");
        sellBtn.className = "sellBtn";
        sellBtn.id = ("sellBtn" + count);
        sellBtn.innerHTML = "Sell";
        sellBtn.onclick = function () {
            openSellBoxPf(Number((sellBtn.id).substring(7)) - 1);
        };
        actionTd.appendChild(sellBtn);

        count++;


    }


}

portfolioTableDetails()

function updatePortFolioCurrent() {

    let stocksList = [];

    let currPortfolioDetails2 = JSON.parse(localStorage.getItem("PortFolio"));

    let count = 1;
    for (let i = 1; i < currPortfolioDetails2.length; i++) {
        stocksList[count - 1] = currPortfolioDetails2[count - 1].stockTicker;
        count++;
    }

    fetch('/stock_pf_operation', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(stocksList)
    })
        .then(response => response.json())
        .then(function (result) {

            const resultJSONString = JSON.stringify(result.result);

            localStorage.setItem('stockUpdatedPfData', resultJSONString);

            console.log(result.result);

        });

    let updatedPrice = JSON.parse(localStorage.getItem('stockUpdatedPfData'));

    let pfData = JSON.parse(localStorage.getItem("PortFolio"));

    let count2 = 1;
    for (let j = 1; j < pfData.length; j++) {

        pfData[count2 - 1].currTotalPrice = (Number(updatedPrice[count2 - 1]) * Number(pfData[count2 - 1].shareQuantity)).toFixed(2)

        pfData[count2 - 1].currPerSharePrice = (Number(updatedPrice[count2 - 1])).toFixed(2)

        document.getElementById("totalCurrPrice" + count2).innerHTML = pfData[count2 - 1].currTotalPrice

        document.getElementById("currPerSharePrice" + count2).innerHTML = pfData[count2 - 1].currPerSharePrice

        count++;
    }

    localStorage.setItem('PortFolio', JSON.stringify(pfData))



}
setInterval(() => {
    updatePortFolioCurrent()
}, 10000);


function openSellBoxPf(deleteIndex) {

    document.getElementById("currAmtEdit").innerHTML = "1";

    localStorage.setItem("currIndexToSell", deleteIndex)

    let pfData = JSON.parse(localStorage.getItem("PortFolio"));

    document.getElementById("sellBox").style.display = "block"

    document.getElementById("shareName").innerHTML = pfData[deleteIndex].stockTicker

    document.getElementById("amountToBeGet").innerHTML = "₹" + pfData[deleteIndex].currPerSharePrice

}

function closeSellBox() {


    document.getElementById("sellBox").style.display = "none"
}

function increaseShare() {

    let pfData = JSON.parse(localStorage.getItem("PortFolio"));

    let deleteIndex = Number(localStorage.getItem("currIndexToSell"));

    if (Number(document.getElementById("currAmtEdit").innerHTML) >= Number(pfData[deleteIndex].shareQuantity)) {

        alert("⚠️ You don't have enough Shares");

        document.getElementById("currAmtEdit").innerHTML = pfData[deleteIndex].shareQuantity;

        document.getElementById("amountToBeGet").innerHTML = "₹" + (Number(document.getElementById("currAmtEdit").innerHTML) * Number(pfData[deleteIndex].currPerSharePrice)).toFixed(2)

    }
    else {

        document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) + 1;

        document.getElementById("amountToBeGet").innerHTML = "₹" + (Number(document.getElementById("currAmtEdit").innerHTML) * Number(pfData[deleteIndex].currPerSharePrice)).toFixed(2)

    }



}


function decreaseShare() {

    let pfData = JSON.parse(localStorage.getItem("PortFolio"));

    let deleteIndex = Number(localStorage.getItem("currIndexToSell"));

    if (Number(document.getElementById("currAmtEdit").innerHTML) >= 2) {

        document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) - 1;

        document.getElementById("amountToBeGet").innerHTML = "₹" + (Number(document.getElementById("currAmtEdit").innerHTML) * Number(pfData[deleteIndex].currPerSharePrice)).toFixed(2)

    }


}

function addTransHistory(desc, amt, operator) {

    let UserTransHistory = JSON.parse(localStorage.getItem("UserCurrTransactions"));

    UserTransHistory.pop();

    UserTransHistory.unshift({ "desc": desc, "amt": operator + "₹" + amt });

    localStorage.setItem("UserCurrTransactions", JSON.stringify(UserTransHistory))

    document.getElementById("sellBox").style.display = "none";

}

function finalSellShare() {

    let deleteIndex = Number(localStorage.getItem("currIndexToSell"));

    let pfData = JSON.parse(localStorage.getItem("PortFolio"));

    let quantityToSell = Number(document.getElementById("currAmtEdit").innerHTML)

    if (Number(quantityToSell) != Number(pfData[deleteIndex].shareQuantity)) {

        let amt1 = String(document.getElementById("amountToBeGet").innerHTML).substring(1);

        localStorage.setItem("UserCurrentTradingBalance",( Number(localStorage.getItem("UserCurrentTradingBalance"))  + Number(amt1)).toFixed(2));

        pfData[deleteIndex].shareQuantity = Number(pfData[deleteIndex].shareQuantity) - Number(quantityToSell);

        pfData[deleteIndex].buyTotalPrice = Number(pfData[deleteIndex].shareQuantity) * Number(pfData[deleteIndex].buyPerSharePrice);

        pfData[deleteIndex].currTotalPrice = Number(pfData[deleteIndex].shareQuantity) * Number(pfData[deleteIndex].currPerSharePrice);

        addTransHistory(pfData[deleteIndex].stockTicker, ((Number(quantityToSell) * Number(pfData[deleteIndex].currPerSharePrice)).toFixed(2)), "+")

    }
    else {

        let amt1 = String(document.getElementById("amountToBeGet").innerHTML).substring(1);

        localStorage.setItem("UserCurrentTradingBalance", (Number(localStorage.getItem("UserCurrentTradingBalance"))  + Number(amt1)).toFixed(2));


        addTransHistory(pfData[deleteIndex].stockTicker, ((Number(quantityToSell) * Number(pfData[deleteIndex].currPerSharePrice)).toFixed(2)), "+")

        pfData.splice(deleteIndex, 1)
    }

    localStorage.setItem("PortFolio", JSON.stringify(pfData));
    alert("✅ Share has Been Sold Successfully")

    setTimeout(() => {
        location.reload()
    }, 300);
   

}