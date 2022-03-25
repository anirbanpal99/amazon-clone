import React, { useEffect, useState } from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import './Home.css'
import Product from './Product'

function Home() {

    const [images, setImages] = useState([
        {url: "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"},
        {url: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"},
        {url: "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg"},
        {url: "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg"},
        {url: "https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg"}
    ]);

  return (
    <div className='home'>
        <div className='home__container'>
            <div className='image__slider'>
                <SimpleImageSlider
                    width="100%"
                    height={460}
                    images={images}
                    showBullets={false}
                    showNavs={true}
                    autoPlay={true}
                />
            </div>
            
            {/* <img 
                className='home__image' 
                src='https://fortheloveblog.com/wp-content/uploads/2016/07/Amazon-Prime-Banner.jpg' 
                alt='' 
            /> */}
            <div className='home__row'>
                <Product 
                    id="12321341"
                    title='The lean startup' 
                    price={19.99} 
                    image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                    rating={3}
                />
                <Product 
                    id="49538094" 
                    title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl' 
                    price={29.99} 
                    image='https://media.4rgos.it/s/Argos/9442078_R_SET' 
                    rating={4}
                />
            </div>
            <div className='home__row'>
                <Product 
                    id="4903850" 
                    title="Samsung LC546dSD54SD4C 49' Curved LED Gaming Monitor" 
                    price={199.99} 
                    image='https://m.media-amazon.com/images/I/81Zt42ioCgL.jpg' 
                    rating={4}
                />
                <Product 
                    id="23445930" 
                    title='Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric' 
                    price={98.99} 
                    image='https://www.bhphotovideo.com/images/images2500x2500/amazon_b07nftvp7p_echo_3rd_generation_charcoal_1512895.jpg' 
                    rating={4}
                />
                <Product 
                    id="32543543545" 
                    title='New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)' 
                    price={598.99} 
                    image='https://m.media-amazon.com/images/I/81+N4PFF7jS._AC_SX342_.jpg' 
                    rating={4}
                />
            </div>
            <div className='home__row'>
                <Product 
                    id="546561656" 
                    title="Men's striped cotton tshirt" 
                    price={21.99} 
                    image='https://m.media-amazon.com/images/I/71OMnFYLoVL._UX425_.jpg' 
                    rating={4}
                />
            </div>
        </div>
    </div>
  )
}

export default Home