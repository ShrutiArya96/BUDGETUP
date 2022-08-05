import { dataService, expenseType } from './dataService.js';
import * as leftPanelBudget from './leftPanelBudget.js'

(function() {
    var btn2 = el('#add-expense');
    btn2.addEventListener('click', addNewExpense);
    var expType = el('#new-expense-type-dropdown');
    expType.addEventListener('click', getSelectedExpenseType)
    var expenseTypedropdown = el('#new-expense-type');
    expenseTypedropdown.addEventListener('click', toggleDropdownShow);
    let reset = el('#resetBudget');
    reset.addEventListener('click', resetBudget);
    addFilterEventListeners();
})()

function addFilterEventListeners() {
    let filterBtn = el('#show-filterPopup');
    filterBtn.addEventListener('click', showFilterPopup);
    let cacnelFilter = el('#cancel-filter');
    cacnelFilter.addEventListener('click', hideFilterPopup);
    let applyFilterBtn = el('#apply-filter');
    applyFilterBtn.addEventListener('click', applyFillter);
    let clearFilterBtn = el('#clear-filter');
    clearFilterBtn.addEventListener('click', clearFilter);
    let filterOptions = el('#filter-options');
    filterOptions.addEventListener('click', showFilterOptoins);
}

function el(str) {
    return document.querySelector(str);
}

function getSelectedExpenseType(evt) {
    if(evt.target.hasAttribute('data-type')) {
        let inp = el('#new-expense-type');
        let {type} = evt.target.dataset;
        inp.value = type;
        toggleDropdownShow();
    }
}

function addNewExpense() {
    var expTitle = el('#expense-title');
    var expAmount = el('#expense-amount');
    var expType = el('#new-expense-type');
    var date = new Date();
    date = date.toISOString().substring(0, 10);
    let newExp = {
        expenseId:'',
        date: date, 
        title: expTitle.value,
        type: expType.value,
        amount:expAmount.value
    }
    if(validateExpense(newExp)) {
        newExp.expenseId = getExpId();
        createNewExpenseEl(newExp);
        dataService.addExpense(newExp);
        var budget = dataService.BUDGET();
        budget.amount -= expAmount.value;
        dataService.updateBudget(budget);
        leftPanelBudget.updateBudgetDisplay();
    }

}

function createNewExpenseEl(exp) {
    var expList = el('#expense-list-container');
    var li = document.createElement('li');
    li.className = 'expense-list-element';
    var expHtml = `<div class='expense-details'>
                <div style='min-width: 20%;'><label>${exp.date}</label></div>
                <div class='expense-container'>
                    <p class='expense-title'>${exp.title}</p>
                    <p class='expense-type'>${expenseType[exp.type]}</p>
                </div></div>
                <h3 class='expense-value'>-${exp.amount}</h3>`
    li.innerHTML = expHtml;
    expList.appendChild(li);
}

function resetBudget() {
    dataService.resetBudget();
    leftPanelBudget.updateBudgetDisplay();
    var expList = el('#expense-list-container');
    expList.innerHTML = ''; 
}

function getExpId() {
    return Math.ceil(Math.random*200);
}

function validateExpense(exp) {
    try {
        if(exp.title.length < 3) {
            throw('please enter a title with more then 3 characaters');
        }
        if(exp.amount < 1 ) {
            throw('please enter a valid amount');
        }
        if(!exp.type) {
            throw('please select the expense type')
        }
        return true;
    } catch(err) {
        console.log(err);
        alert(err);
    } 
} 

function toggleDropdownShow() {
    var dropdown = el('#new-expense-type-dropdown');
    if(dropdown.style.display == 'block') {
        dropdown.style.display = 'none'; 
    } else {
        dropdown.style.display = 'block';
    }
    
}

function showFilterPopup() {
    let popup = el('#filterpopUpContainer');
    popup.style.display = 'block';

}

function hideFilterPopup() {
    let popup = el('#filterpopUpContainer');
    popup.style.display = 'none';
    //clearFilter();
}

function showFilterOptoins(evt) {
    var filterType = document.querySelector('input[name="filter-type"]:checked');
    if(filterType) {
        let value = filterType.value;
        if(value === 'expense-type') {
            el('.filter-expense-type').style.display = 'block';
            el('.filter-expense-amount').style.display = 'none';
        } else {
            el('.filter-expense-type').style.display = 'none';
            el('.filter-expense-amount').style.display = 'block';
        }
    }
}

function applyFillter() {
    var filterType = document.querySelector('input[name="filter-type"]:checked');
    if(filterType) {
        let expenseList = dataService.expenseList();
        if(filterType.value === 'expense-type') {
            var types = [];
            var selectedTypes = document.querySelectorAll('input[data-type]:checked');
            selectedTypes.forEach(data => types.push(data.dataset.type));
            expenseList = expenseList.filter(data => types.indexOf(data.type) > -1);
        } else {
            var filterEl = el('#filter-amount');
            var filterAmount = filterEl.value;
            if(filterAmount > 0) {
                expenseList = expenseList.filter(data => data.amount > filterAmount);
            }
        }
        var expListEl = el('#expense-list-container');
        expListEl.innerHTML = '';
        expenseList.forEach(data => createNewExpenseEl(data));
        hideFilterPopup();
    }
}

function clearFilter() {
    let expenseList = dataService.expenseList();
    var expListEl = el('#expense-list-container');
    expListEl.innerHTML = ''; 
    expenseList.forEach(data => createNewExpenseEl(data));

    var filterType = document.querySelector('input[name="filter-type"]:checked');
    var selectedTypes = document.querySelectorAll('input[data-type]:checked');
    el('#filter-amount').value = '';
}