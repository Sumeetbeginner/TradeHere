
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

    let fiftyTwoWeekLow = currStockResult.fififtyTwoWeekLow;
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
                    yAxes: [{ ticks: {
                        min: (todayLow / 1.2),
                        max: (todayHigh + (todayHigh / 9)),
                        fontColor: 'white' 
                }}],
                xAxes: [{
                    ticks:{
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
                    yAxes: [{ ticks: {
                        min: (todayLow / 1.2),
                        max: (todayHigh + (todayHigh / 9)),
                        fontColor: 'blue' 
                }}],
                xAxes: [{
                    ticks:{
                        fontColor: "white"
                    }
                }]

                }
            }
        });
    }



}

setInterval(() => {

    getStockDataFromPython()


}, 10000);





