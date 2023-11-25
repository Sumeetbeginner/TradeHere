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

    addTransHistory("Trading Account", currMoney, "+");
    addTransHistory("Saving Account", currMoney, "-");



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


    addTransHistory("Trading Account", currMoney2, "-");
    addTransHistory("Saving Account", currMoney2, "+");


}



function updateTransHistory() {

    let UserTransHist = JSON.parse(localStorage.getItem("UserCurrTransactions"));

    let count = 1;

    for (let i = 1; i <= 10; i++) {

        if (UserTransHist[i - 1].amt == "False") {
            document.getElementById("desc" + count).innerHTML = "No Transactions Yet";

        }
        else {
            document.getElementById("desc" + count).innerHTML = UserTransHist[count - 1].desc;

            if ((UserTransHist[count - 1].amt).charAt(0) == "-") {
                document.getElementById("amt" + count).innerHTML = UserTransHist[count - 1].amt;

                document.getElementById("amt" + count).style.color = "#ff5757"


            }
            else {

                document.getElementById("amt" + count).innerHTML = UserTransHist[count - 1].amt;

                document.getElementById("amt" + count).style.color = "#30ff4c"


            }
        }

        count++;
    }
}


function addTransHistory(desc, amt, operator) {

    let UserTransHistory = JSON.parse(localStorage.getItem("UserCurrTransactions"));

    UserTransHistory.pop();

    UserTransHistory.unshift({ "desc": desc, "amt": operator + "₹" + amt });

    localStorage.setItem("UserCurrTransactions", JSON.stringify(UserTransHistory))



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

    updateTransHistory()
    graphTrans()
    

}


updateTransHistory()


function graphTrans(){



let UserTransHistory2 = JSON.parse(localStorage.getItem("UserCurrTransactions"))

let count = 1;
let xData = [];
let yData = [];

let colors = [];

for (let i = 1; i <= 10; i++) {

    if (UserTransHistory2[i - 1].amt == "False") {

        xData[count - 1] = "NULL";
        yData[count - 1] = 0;

    }
    else {

        xData[count - 1] = UserTransHistory2[count - 1].desc;

        yData[count - 1] = Number((UserTransHistory2[count - 1].amt).substring(2));

        if((UserTransHistory2[count - 1].amt).charAt(0) == "-"){

            colors[count-1] = "red";

        }
        else{
            colors[count-1] = "green";
        }

    }

    count++;
}

const xValues1 = xData;
const yValues1 = yData;

new Chart("myChart2", {
    type: "bar",
    data: {
        labels: xValues1,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace("1.0", "0.1")),
            data: yValues1
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{ ticks: { min: 0, max: 100000 } }],
        }
    }
});

}

graphTrans()

