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
import SuccessPage from './components/SuccessPage';
import HomePage from './pages/Home';
import BookDetailsPage from './components/books/BookDetails';

const App = () => {
  const location = useLocation();

  // Check if the route is for a page where the sidebar should be hidden
  const isAuthRoute = useMemo(() => {
    // List of exact paths for which sidebar should be hidden
    const exactPaths = ['/signup', '/signin', '/success', '/'];

    // Check if the current path is one of the exact paths
    const isExactPath = exactPaths.includes(location.pathname);

    // Regular expression to match dynamic routes
    const isDynamicPath = /^\/book\/\d+$/.test(location.pathname);

    return isExactPath || isDynamicPath;
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render the sidebar */}
      {!isAuthRoute && <EnhancedSidebar />}
      <div style={{ flexGrow: 1, background: '#F0F2FF' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/owners" element={<UserTable />} />
          <Route path="/books" element={<BooksTable />} />
          <Route path="/upload-book" element={<BookForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </div>
  );
};

// AppWrapper Component
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
