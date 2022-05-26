import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import EditContent from './components/EditContent';
import AdminRoute from './components/Navigation/AdminRoute';
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import NotAdmin from './components/NotAdmin';
import AddExpense from './pages/expense/AddExpense';
import ExpensesList from './pages/expense/ExpensesList';
import Home from './pages/Home';
import AddIncome from './pages/income/AddIncome';
import IncomeList from './pages/income/IncomeList';
import DashboardData from './pages/users/DashboardData';
import Login from './pages/users/Login';
import Profile from './pages/users/Profile';
import Register from './pages/users/Register';
import UpdateProfile from './pages/users/UpdateProfile';
import UserProfileExpList from './pages/users/UserProfileExpList';
import UserProfileIncList from './pages/users/UserProfileIncList';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/dashboard" element={<ProtectedRoute><DashboardData/></ProtectedRoute>}/>
        <Route exact path="/not-found" element={<NotAdmin/>}/>
        <Route exact path="/edit" element={<ProtectedRoute><EditContent/></ProtectedRoute>}/>
        <Route exact path="/update-profile" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
        <Route exact path="/user-expenses" element={<ProtectedRoute><UserProfileExpList/></ProtectedRoute>}/>
        <Route exact path="/user-income" element={<ProtectedRoute><UserProfileIncList/></ProtectedRoute>}/>
        <Route exact path="/expenses" element={<ProtectedRoute><ExpensesList/></ProtectedRoute>}/>
        <Route exact path="/incomes" element={<ProtectedRoute><IncomeList/></ProtectedRoute>}/>
        <Route exact path="/add-income" element={<ProtectedRoute><AddIncome/></ProtectedRoute>}/>
        <Route exact path="/add-expense" element={<ProtectedRoute><AddExpense/></ProtectedRoute>}/>
        <Route exact path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
