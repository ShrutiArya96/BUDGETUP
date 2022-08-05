import { MONTHS, dataService } from './dataService.js';
(function() {
    var btn = el('#addBudget');
    btn.addEventListener('click', showAddBudgetPopup);
    var btn2 = el('#add-money-budget');
    btn2.addEventListener('click', showAddBudgetPopup);
    var heading  = el('#showMonth');
    var curDate = new Date()
    heading.innerHTML = MONTHS[curDate.getMonth()]+' '+ curDate.getFullYear();
    updateBudgetDisplay();
})()

function el(str) {
    return document.querySelector(str);
}

function actionButton() {
    var budget = dataService.BUDGET();
    if(budget.isBusgetSet) {
        el('#addBudget').style.display = 'none';
    } else {
        el('#addBudget').style.display = 'block';
    }
}

function showAddBudgetPopup() {
    var popup = el('#popup');
    popup.style.display = 'block';
    el('#save-budget').addEventListener('click', saveBudget);
    el('#hide-budget-popup').addEventListener('click', hideBudgetPopup);

}

function hideBudgetPopup() {
    var popup = el('#popup');
    popup.style.display = 'none';
    el('#budgetValue').value = '';
}

function saveBudget() {
    var inp = el('#budgetValue');
    var budgetAmt = dataService.BUDGET();
    budgetAmt.amount += parseInt(inp.value);
    budgetAmt.isBusgetSet = true;
    dataService.updateBudget(budgetAmt);
    updateBudgetDisplay();
    hideBudgetPopup()
}

export function updateBudgetDisplay() {
    var heading = el('#budgetValueNumber');
    var val = dataService.BUDGET();
    val = val.amount;
    heading.style.color = val > 0 ? '#78c61d': '#e10808';
    heading.innerHTML = val;
    actionButton();
}