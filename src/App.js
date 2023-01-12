import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import Login from './routes/Auth/Login';
import BookASlot from './routes/BookASlot/BookASlot';
import Register from './routes/Auth/Register';
import Slots from './routes/BookASlot/Slots';

function App() {
    return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<BookASlot />} />
        <Route path="/mentor" element={<Slots />} />
        </Routes> 
    </Router>
    );
}

export default App;
