import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './components/pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './components/pages/ProfilePage.jsx';
import PlacesPage from './components/pages/PlacesPage';
import PlacesFormPage from './components/pages/PlacesFormPage.jsx';
import PlacePage from './components/pages/PlacePage.jsx';
import BookingsPage from './components/pages/BookingsPage.jsx';
import BookingPage from './components/pages/BookingPage.jsx';
import NotFound from './components/NotFound.jsx';

axios.defaults.baseURL = 'https://concertplace-backend.onrender.com';
axios.defaults.withCredentials = true;



function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>




  );
}

export default App;
