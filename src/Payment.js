import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const navigate = useNavigate();
    const [state, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState(false);

    useEffect(() => {
        const getClientSecret = async() => {
            const response = await axios({
                method: 'post',
                //Stripe except the total in a currencies subunits (ex- for INR use paise)
                url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`
            })
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [state.basket])

    const handleSubmit = async(e) => {
        //do all the fancy stripe
        e.preventDefault();
        setProcessing(true);
        // console.log(elements.getElement(CardElement))
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation
            console.log(paymentIntent)
            db
            .collection('users')
            .doc(state.user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: state.basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate("/orders");
        })
    }
    const handleChange = e => {
        //do all the fancy stripe
        setDisabled(e.empty);
        setError(e.error ? e.error.message: "")
    }
  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout (<Link to='/checkout'>{state.basket?.length} items</Link>)</h1>
            {/* Payment section - delivry address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{state.user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            {/* Payment section - review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment__items'>
                    {/* All the products in the basket */}
                    {
                        state.basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                rating={item.rating}
                                price={item.price}
                            />
                        ))
                    }
                </div>
            </div>
            {/* Payment section - payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe magic will go here */}
                    <form onSubmit={handleSubmit}>
                        <div className='payment__priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <h3>Order Total : {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(state.basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                            />
                        </div>
                        <CardElement 
                            onChange={handleChange}
                        />
                        <div className='payment__priceContainer'>
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            {error && <div>{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment