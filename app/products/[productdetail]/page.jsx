'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { addItemToCart } from '../../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import styles from './page.module.css'
import Spinner from '../../_components/spinnerc/Spinner';
import NoDataFound from '../../_components/utils/NoDataFound';

const page = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedSizes, setSelectedSizes] = useState('');
    const [selectedColors, setSelectedColors] = useState(''); 
    const [selectedImage, setSelectedImage] = useState('');
    const searchParams = useSearchParams();
    const query = searchParams.get('id');
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (query) {
        const url = `http://localhost:8080/productdetail`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }
    }, [query]); 

    const item = data?.find(product => product.id === query);
    const items = useSelector((state) => state.cart.items);
    const cartItem = items.find(cartItem => cartItem?.id === item?.id);
    const itemPrice = cartItem ? cartItem.price * cartItem.quantity : item?.price;
 
      if (loading) {
        return <div><Spinner/></div>;
      }

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!item) {
    return <NoDataFound/>
  }

 const handleAddToCart = (product) => {
  cartItem?.quantity === undefined ?  dispatch(addItemToCart(product)): "";
 };

 const handleBuyNow = (product) => {
  cartItem?.quantity === undefined ?  dispatch(addItemToCart(product)): "";
   const encodedData = encodeURIComponent(JSON.stringify(item)).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
router.push(`/checkout/?data=${encodedData}`);

 };

    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = ['Red', 'Blue', 'Green', 'Black'];
    const qty = ['1', '2', '3', '4'];
    
    const toggleSelection = (item, type) => {
        if (type === 'size') {
            setSelectedSizes(prev => (prev === item ? '' : item));
        } else {
            setSelectedColors(prev => (prev === item ? '' : item));
        }
    };

    const handleImageClick = (img) => {
      setSelectedImage(img);
      
  };
  console.log(selectedImage);
  return (
    <div className={styles.container}>
    
    <div className={styles.imageContainer}>
            <div className={styles.imageLeft}>
                <img
                    src={item.img1}
                    alt={item.title}
                    className={selectedImage===item.img1 ? styles.activeImage :  styles.image }
                    onClick={() => handleImageClick(item.img1)}
                />
                {console.log(item.img1)}
                <img
                    src={item.img2}
                    alt={item.title}
                    className={selectedImage===item.img2 ? styles.activeImage :  styles.image }
                    onClick={() => handleImageClick(item.img2)}
                />
                <img
                    src={item.img3}
                    alt={item.title}
                    className={selectedImage===item.img3 ? styles.activeImage :  styles.image }
                    onClick={() => handleImageClick(item.img3)}
                />
            </div>
            <img
                src={selectedImage ? selectedImage : item.img}
                alt={item.title}
                className={styles.imageRight}
            />
        </div>
    <div className={styles.descriptionDiv}>
    <h1 className={styles.title}>{item.title}</h1>
    <p className={styles.description}>{item.description}</p>
   <div>
    <p className={styles.price}>{item.currency} {item.price}</p>
    <div className={styles.detailPrice}><p className={styles.disprice}>{item.currency} {item.disPrice}</p>
    <p className={styles.disprice}>{item.percentageOff} Off</p></div> 
  </div>
              <div className={styles.flexRow}>
                <p className={styles.AvailSize}>Available Sizes:</p>
                <div id="sizes">
                    {sizes.map(size => (
                        <span
                            key={size}
                            className={`${styles.buttonsize} ${selectedSizes === size ? styles.selected : ''}`}
                            onClick={() => toggleSelection(size, 'size')}
                        >
                            {size}
                        </span>
                    ))}
                </div>
            </div>
            <div  className={styles.flexRow}>
                <p  className={styles.AvailSize}>Available Colors:</p>
                <div id="colors">
                    {colors.map(color => (
                        <span
                            key={color}
                            className={`${styles.buttonsize} ${selectedColors === color ? styles.selected : ''}`}
                            onClick={() => toggleSelection(color, 'color')}
                        >
                            {color}
                        </span>
                    ))}
                </div>
            </div>
            <div  className={styles.flexRow}>
            <p className={styles.AvailSize}>Select Quantity :</p>
            <div className={styles.cartItemActions}>
            <button onClick={() => cartItem?.quantity===undefined  ?  dispatch(addItemToCart(item)): dispatch(increaseQuantity({ id: item.id }))} >+</button>
            <p>{cartItem?.quantity===undefined ?  1  : cartItem?.quantity}</p>
          
                <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>-</button>
               </div>
            </div>
           
          
   <div className={styles.buttons}>
   <button className={styles.button} onClick={() => {handleAddToCart(item);
      router.push('/cart');
    }}>Add to Cart</button>
    <button className={styles.button}  onClick={() => handleBuyNow(item)}>Buy Now</button>
   </div>
 
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <div className={styles.accordionTitle} onClick={() => toggleAccordion(0)}>
          <p>Product Details </p> {activeIndex === 0?<span>-</span> : <span>+</span>}
        </div>
        {activeIndex === 0 && (
          <div className={styles.accordionContent}>
            <p>Category: {item.category}</p>
            <p>Brand: {item.brand}</p>
           <p>Ahwhjvsjdevgj,hedvj,hjdexbjmbjbjmbmjbjdbmjbdjmdbjdbjdbjdb jdjbdjbdjbdj jdjdbjdbjdbdjdnb dbjbdjbdjbjd dbjbdj</p>
           <p>Ahwhjvsjdevgj,hedvj,hjdexbjmbjbjmbmjbjdbmjbdjmdbjdbjdbjdb jdjbdjbdjbdj jdjdbjdbjdbdjdnb dbjbdjbdjbjd dbjbdj</p>
          </div>
        )}
      </div>
      <div className={styles.accordionItem}>
        <div className={styles.accordionTitle} onClick={() => toggleAccordion(1)}>
        <p>Reviews </p> {activeIndex === 1?<span>-</span> : <span>+</span>}
        </div>
        {activeIndex === 1 && (
          <div className={styles.accordionContent}>
            {item.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <p><strong>{review.user}</strong>: {review.comment} ({review.rating} stars)</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
   </div>
  </div>
  );
}

export default page

