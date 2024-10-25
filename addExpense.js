import { dataService } from './dataService.js';
import { createDataChart, updateBudgetDisplay, createNewExpenseEl, el, getTodayDate, getExpId } from './utils.js';

(function() { //Some comment by Shruti
    var btn2 = el('#add-expense');
    btn2.addEventListener('click', addNewExpense);
    var expType = el('#new-expense-type-dropdown');
    expType.addEventListener('click', getSelectedExpenseType)
    var expenseTypedropdown = el('#new-expense-type');
    expenseTypedropdown.addEventListener('click', toggleDropdownShow);
    let reset = el('#resetBudget');
    reset.addEventListener('click', resetBudget);
    addFilterEventListeners();
    showExistingExpenseList();
})()

function toggleEmptyState(expList) {
    if(!expList) expList = dataService.expenseList();
    var emptyState = el('.no-expense-list');
    var expListContainer = el('.expense-list-main-container');
    if(expList.length > 0) {
        emptyState.style.display = 'none';
        expListContainer.style.display = 'block';
    } else {
        emptyState.style.display = 'flex';
        expListContainer.style.display = 'none';
    }
}

function showExistingExpenseList() {
    var expenseList = dataService.expenseList();
    if(expenseList.length > 0) {
        var expListEl = el('#expense-list-container');
        expListEl.innerHTML = '';
        expenseList.forEach(data => createNewExpenseEl(data));
    }
    toggleEmptyState(expenseList);
}

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
    let newExp = {
        expenseId:'',
        date: getTodayDate(), 
        title: expTitle.value,
        type: expType.value,
        amount:parseInt(expAmount.value)
    }
    if(validateExpense(newExp)) {
        newExp.expenseId = getExpId();
        createNewExpenseEl(newExp);
        dataService.addExpense(newExp);
        var budget = dataService.BUDGET();
        budget.amount -= expAmount.value;
        dataService.updateBudget(budget);
        updateBudgetDisplay();
    }
    toggleEmptyState();
    createDataChart();
}

function resetBudget() {
    dataService.resetBudget();
    updateBudgetDisplay();
    var expList = el('#expense-list-container');
    expList.innerHTML = '';
    toggleEmptyState([]);
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
    popup.childNodes[1].className = 'show';
    popup.className = 'show';
}

function hideFilterPopup() {
    let popup = el('#filterpopUpContainer');
    popup.childNodes[1].className = 'hide';
    popup.className = 'hide';
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
    el('.filter-expense-type').style.display = 'none';
    el('.filter-expense-amount').style.display = 'none';
    filterType.checked = false;
    selectedTypes.forEach(el => el.checked= false);
}
