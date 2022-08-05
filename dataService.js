export let expenseType = {
    shopping: 'SHOPPING 🛍',
    food: 'FOOD 🍔',
    transport: 'TRANSPORT 🚙',
    grocery: 'GROCERY 🍞',
    miscelleneous: 'MISCELLENEOUS 🎭',
    investment: 'INVESTMENT 🏡'
}
export let MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export let dataService = (function() {
    let BUDGET = {
        isBusgetSet: false,
        amount: 0
    };
    let expenseList = [];
    let filteredExpenselist = [];
    function isValidExpense(exp) {
        return true;
    }
    return {
        BUDGET() {
            return BUDGET;
        },
        expenseList() {
            return [...expenseList];
        },
        filteredExpenselist() {
            return filteredExpenselist;
        },
        addExpense(newExpense) {
            if(isValidExpense(newExpense)) {
                expenseList.push(newExpense);
            }
        },
        updateBudget(val) {
            BUDGET = JSON.parse(JSON.stringify(val));
        },
        resetBudget() {
            BUDGET = {
                isBusgetSet: false,
                amount: 0
            };
            expenseList = [];
        }
    }
})()