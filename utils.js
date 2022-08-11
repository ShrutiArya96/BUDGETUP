import { dataService, expenseType } from './dataService.js';


const ctx = document.getElementById('myChart').getContext('2d');
const myChartObj = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgb(255, 0, 0)','rgb(255, 230, 230)',
                'rgb(191, 0, 255)','rgb(128, 255, 0)',
                'rgb(0, 255, 255)','rgb(255, 255, 0)',
                'rgb(255, 191, 0)',  
            ],
            borderWidth: 0
        }]
    }

})


export function createNewExpenseEl(exp) {
    var expList = el('#expense-list-container');
    var li = document.createElement('li');
    li.className = 'expense-list-element';
    var type = expenseType[exp.type]
    var expHtml = `<div class='expense-details'>
                <div style='min-width: 20%;'><label>${exp.date}</label></div>
                <div class='expense-container'>
                    <p class='expense-title'>${exp.title}</p>
                    <p class='expense-type'>${type}</p>
                </div></div>`
    if(exp.type === 'savings') {
        expHtml += `<h3 class='expense-value-green'>+ ₹${exp.amount}</h3>` 
    } else {
        expHtml += `<h3 class='expense-value-red'>- ₹${exp.amount}</h3>`
    }
    li.innerHTML = expHtml;
    expList.appendChild(li);
}

export function getTodayDate() {
    var date = new Date();
    date = date.toISOString().substring(0, 10);
    return date;
}

export function getExpId() {
    return Math.ceil(Math.random()*200);
}

export function updateBudgetDisplay() {
    var heading = el('#budgetValueNumber');
    var val = dataService.BUDGET();
    val = val.amount;
    heading.style.color = val > 0 ? '#78c61d': '#e10808';
    heading.innerHTML = val;
    actionButton();
}
function actionButton() {
    var budget = dataService.BUDGET();
    if(budget.isBusgetSet) {
        el('#addBudget').style.display = 'none';
    } else {
        el('#addBudget').style.display = 'block';
    }
}
export function el(str) {
    return document.querySelector(str);
}

export function createDataChart() {
    var expenseMap = {}, labels = [], amountList = [];
    var expList = dataService.expenseList();
    expList.forEach(data => {
        if(expenseMap[data.type]) {
            expenseMap[data.type] += data.amount;
        } else {
            expenseMap[data.type] = data.amount;
            labels.push(data.type);
        }
    })
    for(var key in expenseMap) {
        amountList.push(expenseMap[key]);
    }
    let data = {
        datasets: [{
            data: amountList,
            backgroundColor: [
                'rgb(255, 0, 0)','rgb(255, 230, 230)',
                'rgb(191, 0, 255)','rgb(128, 255, 0)',
                'rgb(0, 255, 255)','rgb(255, 255, 0)',
                'rgb(255, 191, 0)',  
            ],
            borderWidth: 0
        }],
        labels: labels,
    };
    myChartObj.data = data;
    myChartObj.update();
}