
function openPf() {
    window.location = "portfolio.html"
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

if (localStorage.getItem("UserRegistered") != "True") {


localStorage.setItem("UserCurrentTradingBalance", "50000")
localStorage.setItem("UserCurrentSavingBalance", "50000")

var currDate = new Date();
var currMonth = currDate.getMonth();
currMonth += 1;

localStorage.setItem("UserCurrMonth", currMonth);
localStorage.setItem("UserMonthlyCredit", "True");
localStorage.setItem("UserRegistered", "True");
}

var currDate1 = new Date();
var currMonth1 = currDate1.getMonth();
currMonth1 += 1;

if (localStorage.getItem("UserCurrMonth") != currMonth1) {
    localStorage.setItem("UserCurrentSavingBalance", Number(localStorage.getItem("UserCurrentSavingBalance")) + Number(50000));
    localStorage.setItem("UserCurrMonth", currMonth1)
    localStorage.setItem("UserMonthlyCredit", "True");
}
