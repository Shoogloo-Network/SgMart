import React from 'react'
import Slider from './Slider'

const Discover = () => {
  const slides = [
   {
    id:1,
    img: '/images/bannerProduct1.jpg',
  url:"/products/${String(item.title)}?id=${String(item.id)}",
  title:"Men Jeans",
   },
    
  {
    id:2,
    img: '/images/bannerProduct2.jpg',
     url:"/products/${String(item.title)}?id=${String(item.id)}",
     title:"Men Jeans",
  },

   {
    id:3,
    img: '/images/bannerProduct3.jpg',
     url:"/products/${String(item.title)}?id=${String(item.id)}",
     title:"Men Jeans",
   },
    
    {
      id:4,
      img:'/images/bannerProduct4.jpg',
       url:"/products/${String(item.title)}?id=${String(item.id)}",
       title:"Men Jeans",
    },
    {
      id:5,
      img:'/images/bannerProduct5.jpg',
       url:"/products/${String(item.title)}?id=${String(item.id)}",
       title:"m",
    },
  ];
  return (
    <div>
      <Slider slides={slides} />
    </div>
  )
}

export default Discover
