import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
import Footer from './Footer';

const promise = loadStripe('<<YOUR_STRIPE_PRIVATE_KEY>>');

function App() {
  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    //will only run once when the app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log('User ', authUser);
      if(authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/orders' element={<><Header/><Orders/><Footer /></>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/checkout' element={<><Header /><Checkout /><Footer /></>}/>
          <Route path='/payment' element={<><Header /><Elements stripe={promise}><Payment /></Elements><Footer /></>}/>
          <Route path='/' element={<><Header /><Home /><Footer /></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
