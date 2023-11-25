function openPf() {
    window.location = "portfolio.html"
}
function openStocks() {
    window.location = "stocks.html"
}
function openWatchList() {
    window.location = "watchlist.html"
}
function openHome() {
    window.location = "index.html"
}
function openMyOrders() {
    window.location = "orders.html"
}

document.getElementById("currBal").innerHTML = "₹" + localStorage.getItem("UserCurrentTradingBalance")

document.getElementById("savBalNum").innerHTML = "₹" + localStorage.getItem("UserCurrentSavingBalance")

var xValues = ["Trading Account Balance", "Saving Account Balance"];
var yValues = [localStorage.getItem("UserCurrentTradingBalance"), localStorage.getItem("UserCurrentSavingBalance")];
var barColors = [
    "#b91d47",
    "#00aba9"
];

new Chart("myChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: false,
            text: "World Wide Wine Production 2018"
        }
    }
});

var addMoneyInput = document.getElementById('addMoneyInp');

addMoneyInput.addEventListener('input', function () {


    if (addMoneyInput.value > Number(localStorage.getItem("UserCurrentSavingBalance"))) {

        alert("⚠️ Not Enough Money in Saving Account")

        document.getElementById('addMoneyInp').value = Number(localStorage.getItem("UserCurrentSavingBalance"))

    }

    if (addMoneyInput.value < 1) {

        addMoneyInput.value = "1"

    }

})

function openAddMoney() {
    document.getElementById("fixedAddMoney").style.display = "block";
}

function closeAddMoney() {
    document.getElementById("fixedAddMoney").style.display = "none";
}

function addMoneyTrans() {


    let currMoney = document.getElementById('addMoneyInp').value

    localStorage.setItem("UserCurrentSavingBalance", Number(localStorage.getItem("UserCurrentSavingBalance")) - Number(document.getElementById('addMoneyInp').value))

    localStorage.setItem("UserCurrentTradingBalance", Number(localStorage.getItem("UserCurrentTradingBalance")) + Number(document.getElementById('addMoneyInp').value))

    document.getElementById("currBal").innerHTML = "₹" + localStorage.getItem("UserCurrentTradingBalance")

    document.getElementById("savBalNum").innerHTML = "₹" + localStorage.getItem("UserCurrentSavingBalance")

    document.getElementById("addMoneyInp").value = "";
    document.getElementById("fixedAddMoney").style.display = "none"
    alert("✅ Amount Added Successfully");

  



}

function openWithdrawMoney() {
    document.getElementById("fixedWithdrawMoney").style.display = "block"
}

function closeWithdrawMoney() {
    document.getElementById("fixedWithdrawMoney").style.display = "none"

}


var addMoneyInput2 = document.getElementById('withdrawMoneyInp');

addMoneyInput2.addEventListener('input', function () {

    if (addMoneyInput2.value > Number(localStorage.getItem("UserCurrentTradingBalance"))) {

        alert("⚠️ Not Enough Money in Trading Account to Withdraw")

        document.getElementById('withdrawMoneyInp').value = Number(localStorage.getItem("UserCurrentTradingBalance"))

    }

    if (addMoneyInput.value < 1) {

        addMoneyInput.value = "1"

    }

})

function withdrawMoneyTrans() {

    let currMoney2 = document.getElementById('withdrawMoneyInp').value;

    localStorage.setItem("UserCurrentTradingBalance", Number(localStorage.getItem("UserCurrentTradingBalance")) - Number(document.getElementById('withdrawMoneyInp').value))

    localStorage.setItem("UserCurrentSavingBalance", Number(localStorage.getItem("UserCurrentSavingBalance")) + Number(document.getElementById('withdrawMoneyInp').value))

    document.getElementById("currBal").innerHTML = "₹" + localStorage.getItem("UserCurrentTradingBalance")

    document.getElementById("savBalNum").innerHTML = "₹" + localStorage.getItem("UserCurrentSavingBalance")

    document.getElementById("withdrawMoneyInp").value = "";
    document.getElementById("fixedWithdrawMoney").style.display = "none"
    alert("✅ Amount Withdrawal Successfully");

 

}

