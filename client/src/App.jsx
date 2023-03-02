import {BrowserRouter , Routes,Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import {useCookies} from 'react-cookie'
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';

const App = () => {
  const {loading} = useSelector(state => state.alerts)
  const [cookies,setCookies,removeCookies] = useCookies(['token']);

  const handleSetCookies = (key ,data) => {
    setCookies(`${key}`,data,{path:'/'});
  }
  const handleRemoveCookies = (key) => {
    removeCookies(`${key}`,{path:'/'});
  }
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner />:
        <Routes>
          <Route path='/' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <HomePage cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />

          <Route path='/login' element={
            <PublicRoute cookies={cookies}>
                <Login setCookies={handleSetCookies}/>
            </PublicRoute>
          } />

          <Route path='/register' element={
            <PublicRoute cookies={cookies} >
                <Register/>
            </PublicRoute>
          } />
          <Route path='/apply-doctor' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <ApplyDoctor cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />
          <Route path='/admin/users' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Users cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />
          <Route path='/admin/doctors' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Doctors cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />
          <Route path='/doctor/profile' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Profile cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />
          <Route path='/notification' element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <NotificationPage cookies={cookies} removeCookies={handleRemoveCookies}/>
              </ProtectedRoute>
          } />
          
        </Routes>}
      </BrowserRouter>
    </>
  );
}

export default App;
