import {configureStore} from  "@reduxjs/toolkit";
import  usersReducer  from '../slices/users/usersSlices'
import expensesReducer from '../slices/expenses/expensesSlices'
import incomeSlices from "../slices/income/incomeSlices";
import account from "../slices/accountStats/accountStatSlices";
const store = configureStore({
    reducer:{
    users:usersReducer,
    expenses:expensesReducer,
    income:incomeSlices,
    account,
},
})

export default store;