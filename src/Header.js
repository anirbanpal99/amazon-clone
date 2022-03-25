import { Search, ShoppingBasket } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import './Header.css'
import { useStateValue } from './StateProvider';

function Header() {
    const [state, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if(state.user) {
            auth.signOut();
        }
    }
  return (
    <div className='header'>
        <Link to="/">
            <img 
                src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
                className='header__logo'
                alt=''
            />
        </Link>
        <div className='header__search'>
            <input className='header__searchInput' type='text'/>
            <Search className='header__searchIcon'/>
            {/* Logo */}
        </div>
        <div className='header__nav'>
            <Link to={!state.user && '/login'}>
                <div onClick={handleAuthentication} className='header__option'>
                    <span className='header__optionLineOne'>
                        Hello! {state.user ? state.user?.email : 'Guest'}
                    </span>
                    <span className='header__optionLineTwo'>
                        {state.user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>
            <Link to='/orders'>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                    </span>
                    <span className='header__optionLineTwo'>
                        & Orders
                    </span>
                </div>
            </Link>
            <div className='header__option'>
                <span className='header__optionLineOne'>
                    Your
                </span>
                <span className='header__optionLineTwo'>
                    Prime
                </span>
            </div>
            <Link to="/checkout">
                <div className='header__optionBasket'>
                    <ShoppingBasket />
                    <span className='header__optionLineTwo header__basketCount'>{state.basket?.length}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header;