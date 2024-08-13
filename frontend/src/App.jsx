import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './components/auth/RegisterForm';
import Login from './components/auth/LoginForm';
import UserTable from './components/UserTable';
import EnhancedSidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import { useMemo } from 'react';
import BooksTable from './components/books/BookList';
import BookForm from './components/books/BookForm';
import SuccessPage from './components/SuccessPage'


// App Component
function App() {
  const location = useLocation();

  const isAuthRoute = useMemo(() => ['/signup', '/signin'].includes(location.pathname), [location.pathname]);

  return (
    <div style={{ display: 'flex', backgroundColor: '#E2E8F0' }}>
      
      {!isAuthRoute && <EnhancedSidebar />}
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/owners" element={<UserTable />} />
          <Route path="/books" element={<BooksTable />} />
          <Route path='/upload-book' element={<BookForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </div>
  );
}

// AppWrapper Component
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
