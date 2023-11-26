
function openStocks() {
    window.location = "stocks.html"
}

document.getElementById("stockName").innerHTML = localStorage.getItem("currStockName")

let currStockTickerFinal = localStorage.getItem("currStockTicker")

document.getElementById('stockTicker').innerHTML = localStorage.getItem('currStockTicker')

function getStockDataFromPython() {

    const data = {
        stockTickerSymbol: currStockTickerFinal
    }

    fetch('/stock_operation', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(function (result) {
            // Convert the object to a JSON string before storing it
            const resultJSONString = JSON.stringify(result.result);

            // Store the JSON string in local storage
            localStorage.setItem('stockResult', resultJSONString);
            localStorage.setItem('stockNews', JSON.stringify(result.result2));

            impData()

        });
}


getStockDataFromPython()

let currStockResult = JSON.parse(localStorage.getItem('stockResult'))

//! Important Data


function impData() {

    let currStockResult = JSON.parse(localStorage.getItem('stockResult'))
    let currStockNews = JSON.parse(localStorage.getItem('stockNews'))

    console.log(currStockResult);
    console.log(currStockNews);

    let marketOpen = currStockResult.regularMarketOpen;
    let marketPrevClose = currStockResult.regularMarketPreviousClose;

    let todayLow = currStockResult.dayLow
    let todayHigh = currStockResult.dayHigh

    let fiftyTwoWeekLow = currStockResult.fiftyTwoWeekLow;
    let fiftyTwoWeekHigh = currStockResult.fiftyTwoWeekHigh

    let currVol = currStockResult.regularMarketVolume;
    let currPrice = currStockResult.currentPrice;

    let todayPriceChange = (currPrice - marketPrevClose).toFixed(2)

    let marketUpOrDown;

    if (marketPrevClose > currPrice) {
        marketUpOrDown = 'DOWN'

    }
    else {
        marketUpOrDown = 'UP'

    }

    let marketPercent = ((todayPriceChange / marketPrevClose) * 100).toFixed(2)

    let stockAdd1 = currStockResult.address1;
    let stockAdd2 = currStockResult.address2

    let stockCity = currStockResult.city;

    let companyOfficers = currStockResult.companyOfficers

    let stockIndustry = currStockResult.industry
    let stockSummary = currStockResult.longBusinessSummary

    let stockName = currStockResult.longName;
    let stockContact = currStockResult.phone

    let stockWebsite = currStockResult.website

    localStorage.setItem("UserCurrStockPrice", currPrice);

    document.getElementById("currStockPrice").innerHTML = "₹" + currPrice

    if (marketUpOrDown == 'UP') {
        document.getElementById("currChanges").innerHTML = "🡹 " + todayPriceChange + "  (" + marketPercent + "%)"

        document.getElementById("currChanges").style.color = "#03ff46";

        const xValues = ['Market Open', "Today High", 'Today Low', 'Current Price'];
        const yValues = [marketOpen, todayHigh, todayLow, currPrice];

        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#03ff46",
                    borderColor: "#03ff46",
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: (todayLow / 1.2),
                            max: (todayHigh + (todayHigh / 9)),
                            fontColor: 'white'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white"
                        }
                    }]
                }
            }
        });


    }
    else {
        document.getElementById("currChanges").innerHTML = "🡻 " + todayPriceChange + "  (" + marketPercent + "%)"

        document.getElementById("currChanges").style.color = "#ff5454";


        const xValues = ['Market Open', "Today High", 'Today Low', 'Current Price'];
        const yValues = [marketOpen, todayHigh, todayLow, currPrice];

        new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#ff5454",
                    borderColor: "#ff5454",
                    data: yValues

                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: (todayLow / 1.2),
                            max: (todayHigh + (todayHigh / 9)),
                            fontColor: 'white'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white"
                        }
                    }]

                }
            }
        });
    }

    document.getElementById("stockOpen").innerHTML = "Today Open : ₹" + (marketOpen).toFixed(2);
    document.getElementById("stockPrevClose").innerHTML = "Previous Close : ₹" + (marketPrevClose).toFixed(2);

    document.getElementById("todayLow").innerHTML = "Today's Low : ₹" + (todayLow).toFixed(2);
    document.getElementById("todayHigh").innerHTML = "Today's High : ₹" + (todayHigh).toFixed(2);

    document.getElementById("a52WeekLow").innerHTML = "52-week Low : ₹" + (fiftyTwoWeekLow).toFixed(2);
    document.getElementById("a52WeekHigh").innerHTML = "52-week High : ₹" + (fiftyTwoWeekHigh).toFixed(2);

    document.getElementById("currVol").innerHTML = "Volume : " + (currVol).toFixed(2) + " Shares"

    document.getElementById("stockInd").innerHTML = "Industry : " + stockIndustry

    document.getElementById("stockWeb").href = stockWebsite

    document.getElementById("stockNameAgain").innerHTML = stockName + " (" + stockCity + ")"

    document.getElementById("companySum").innerHTML = stockSummary

    document.getElementById("companyAdd").innerHTML = "🏢 " + stockAdd1 + ", " + stockAdd2
    document.getElementById("companyCon").innerHTML = "📞 + " + stockContact
}

setInterval(() => {

    getStockDataFromPython()


}, 10000);

function openBuyStocks() {

    if(Number(localStorage.getItem("UserCurrStockPrice")) > Number(localStorage.getItem("UserCurrentTradingBalance"))){

        alert("⚠️ You dont have Enough Money in Trading Account to buy this Stock")

    }
    else{

    document.getElementById("currAmtEdit").innerHTML = "1";
    

    document.getElementById("buyBox").style.display = "block"

    document.getElementById("amountToBePaid").innerHTML = "₹" + (Number(document.getElementById("currAmtEdit").innerHTML) * Number(localStorage.getItem("UserCurrStockPrice"))).toFixed(2)

    }

}
function closeBuyBox() {
    document.getElementById("buyBox").style.display = "none"
}

function finalBuyShare(){



    let stockName = localStorage.getItem("currStockName");

    let stockTicker = localStorage.getItem("currStockTicker");

    let shareQuantity = document.getElementById("currAmtEdit").innerHTML;

    let currTotalPrice = Number(localStorage.getItem("UserCurrStockPrice")) * Number(shareQuantity); //! Update it Every 10 Seconds on portfolio

    let currPerSharePrice = Number(localStorage.getItem("UserCurrStockPrice")); //! Update it Every 10 Seconds on portfolio

    let buyTotalPrice = Number(localStorage.getItem("UserCurrStockPrice")) * Number(shareQuantity); 

    let buyPerSharePrice = Number(localStorage.getItem("UserCurrStockPrice"));

    let typeOfBuy = document.getElementById("typeOfBuy").value;

    let portfolioShare = {

        "stockName" : stockName,
        "stockTicker" : stockTicker,
        "shareQuantity" : shareQuantity,
        "currTotalPrice" : currTotalPrice.toFixed(2),
        "currPerSharePrice" : (currPerSharePrice).toFixed(2),
        "buyTotalPrice" : (buyTotalPrice).toFixed(2),
        "buyPerSharePrice" : (buyPerSharePrice).toFixed(2),
        "typeOfBuy" : typeOfBuy
    
    }

    localStorage.setItem("UserCurrentTradingBalance", (Number(localStorage.getItem("UserCurrentTradingBalance")) - Number(buyTotalPrice)).toFixed(2))

    let portfolioData = JSON.parse(localStorage.getItem("PortFolio"));

    portfolioData.unshift(portfolioShare);
    
    localStorage.setItem("PortFolio", JSON.stringify(portfolioData));

    addTransHistory(stockTicker, buyTotalPrice, "-");

    alert("✅ Stock Purchased Successfully! Check it out on Portfolio 😊")
    
}


function increaseShare() {

    if (Number((document.getElementById("amountToBePaid").innerHTML).substring(1)) > Number(localStorage.getItem("UserCurrentTradingBalance"))) {

        alert("⚠️ Not have Enough Money in trading Account");

        if (Number((document.getElementById("amountToBePaid").innerHTML).substring(1)) > Number(localStorage.getItem("UserCurrentTradingBalance"))) {

            document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) - Number(1);

            document.getElementById("amountToBePaid").innerHTML = "₹" + (Number((document.getElementById("currAmtEdit").innerHTML)) * Number(localStorage.getItem("UserCurrStockPrice"))).toFixed(2)

        }

    }
    else {

        document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) + Number(1);

        document.getElementById("amountToBePaid").innerHTML = "₹" + (Number((document.getElementById("currAmtEdit").innerHTML)) * Number(localStorage.getItem("UserCurrStockPrice"))).toFixed(2)

        if (Number((document.getElementById("amountToBePaid").innerHTML).substring(1)) > Number(localStorage.getItem("UserCurrentTradingBalance"))) {

            document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) - Number(1);

            document.getElementById("amountToBePaid").innerHTML = "₹" + (Number((document.getElementById("currAmtEdit").innerHTML)) * Number(localStorage.getItem("UserCurrStockPrice"))).toFixed(2)

        }
    }
}

function decreaseShare() {

    if (Number((document.getElementById("currAmtEdit").innerHTML)) >=2) {

        document.getElementById("currAmtEdit").innerHTML = Number(document.getElementById("currAmtEdit").innerHTML) - Number(1);

        
        document.getElementById("amountToBePaid").innerHTML = "₹" + (Number((document.getElementById("currAmtEdit").innerHTML)) * Number(localStorage.getItem("UserCurrStockPrice"))).toFixed(2)
    

    }
  

}




function addTransHistory(desc, amt, operator) {

    let UserTransHistory = JSON.parse(localStorage.getItem("UserCurrTransactions"));

    UserTransHistory.pop();

    UserTransHistory.unshift({ "desc": desc, "amt": operator + "₹" + amt });

    localStorage.setItem("UserCurrTransactions", JSON.stringify(UserTransHistory))

    document.getElementById("buyBox").style.display = "none";

}

