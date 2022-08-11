export let expenseType = {
    shopping: 'SHOPPING 🛍',
    food: 'FOOD 🍔',
    transport: 'TRANSPORT 🚙',
    grocery: 'GROCERY 🍞',
    miscelleneous: 'MISCELLENEOUS 🎭',
    investment: 'INVESTMENT 🏡',
    savings : 'SAVINGS 💰'
}
export let MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export let dataService = (function() {
    let BUDGET = {
        isBusgetSet: false,
        amount: 0
    };
    let expenseList = [];

    return {
        BUDGET() {
            let Budget = JSON.parse(localStorage.getItem('BUDGET'));
            if(!Budget) {
                Budget = BUDGET;
                localStorage.setItem('BUDGET', JSON.stringify(Budget));
            }
            return Budget;
        },
        expenseList() {
            expenseList = JSON.parse(localStorage.getItem('expenseList'));
            if(!expenseList) {
                expenseList = [];
                localStorage.setItem('expenseList', JSON.stringify([]));
            }
            return expenseList;
        },
        addExpense(newExpense) {
            let expList = this.expenseList()
            expList.push(newExpense);
            localStorage.setItem('expenseList', JSON.stringify(expList));
        },
        updateBudget(val) {
            BUDGET = JSON.parse(JSON.stringify(val));
            localStorage.setItem('BUDGET', JSON.stringify(BUDGET));
        },
        resetBudget() {
            BUDGET = {
                isBusgetSet: false,
                amount: 0
            };
            localStorage.setItem('BUDGET', JSON.stringify(BUDGET));
            localStorage.setItem('expenseList', JSON.stringify([]));
        }
    }
})()