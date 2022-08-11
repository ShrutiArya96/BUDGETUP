import { MONTHS, dataService, expenseType } from './dataService.js';
import { createDataChart, updateBudgetDisplay, createNewExpenseEl, el, getTodayDate, getExpId } from './utils.js';

(function() {
    var btn = el('#addBudget');
    btn.addEventListener('click', showAddBudgetPopup);
    var btn2 = el('#add-money-budget');
    btn2.addEventListener('click', showAddBudgetPopup);
    var heading  = el('#showMonth');
    var curDate = new Date()
    heading.innerHTML = MONTHS[curDate.getMonth()]+' '+ curDate.getFullYear();
    updateBudgetDisplay();
    createDataChart();
})()

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
    var val = parseInt(el('#budgetValue').value);
    var budgetAmt = dataService.BUDGET();
    budgetAmt.amount += val;
    budgetAmt.isBusgetSet = true;
    dataService.updateBudget(budgetAmt);
    updateBudgetDisplay();
    hideBudgetPopup();
    let newExp = {
        expenseId:getExpId(),
        date: getTodayDate(), 
        title: 'SAVINGS',
        type: 'savings',
        amount: val
    };
    createNewExpenseEl(newExp);
    dataService.addExpense(newExp);
    createDataChart();
}

