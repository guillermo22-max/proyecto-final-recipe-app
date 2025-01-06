import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import MealPlan from './pages/MealPlan';
import Tags from './pages/Tags';
import AddRecipe from './pages/AddRecipe';
import { UserProvider } from './context/UserProvider';


function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/shopping-list" element={<ShoppingList />} />
                    <Route path="/meal-plan" element={<MealPlan />} />
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;



