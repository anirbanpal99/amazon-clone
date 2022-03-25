import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from './firebase';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(auth => {
            if (auth) {
                navigate("/");
            }
        })
        .catch(error => alert(error))
        //Some fancy firebase login
        
    }

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //it successfully created a new user with email and password
            if(auth) {
                navigate("/");
            }
        })
        .catch(error => alert(error.message))
        //do some fancy firebase register
    }

  return (
    <div className='login'>
        <Link to='/'>
            <img
                className='login__logo' 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_Logo.svg.png' 
                alt='Amazon'
            />
        </Link>
        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>Email</h5>
                <input value={email} type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                
                <h5>Password</h5>
                <input value={password} type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                
                <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to 
                fake AMAZON CLONE Conditions of Use & Sale. 
                Please see our Privacy Notice, 
                our Cookies Notice and our 
                Interest Based Ads
            </p>
            <button onClick={register} className='login__registerButton'>Create your amazon account</button>
        </div>
    </div>
  )
}

export default Login