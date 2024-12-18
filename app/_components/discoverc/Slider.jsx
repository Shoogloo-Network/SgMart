'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);
const router = useRouter();
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    slideInterval.current = setInterval(() => {
      goToNextSlide();
    }, 3000); // Change slide every 3 seconds
  };

  const stopAutoPlay = () => {
    clearInterval(slideInterval.current);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    console.log('Next Slide');
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    console.log('Prev Slide');
  };

  const pauseSlideShow = () => {
    setIsPlaying(false);
    stopAutoPlay();
    console.log('Paused');
  };

  const playSlideShow = () => {
    setIsPlaying(true);
    startAutoPlay();
    console.log('Playing');
  };
  const bannerClick = (item) => {
    const title = item.title.split(" ").join("+");
    router.push(`/products?query=${title}`);
  };
  
  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` ,  width: '(slides.length * 100)%'}}>
        {slides.map((slide, index) => (
          <div
         key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.img})` }} 
          onClick={()=>{bannerClick(slide)}}
        ></div>
        ))}
      </div>
      <button className={`${styles.prev} ${styles.iconButton}` } onClick={goToPrevSlide}> &#9664; {/* Unicode for left arrow */}</button>
      <button className={`${styles.next} ${ styles.iconButton}`} onClick={goToNextSlide}>&#9654; {/* Unicode for right arrow */}</button>
      {isPlaying ? (
        <button className={`${styles.pause} ${styles.iconButton}` } onClick={pauseSlideShow}>&#10074;&#10074; {/* Unicode for pause */}</button>
      ) : (
        <button className={`${styles.play} ${styles.iconButton}`}  onClick={playSlideShow}>&#9654; {/* Unicode for play */}</button>
      )}

      <style jsx>{`
      
      `}</style>
    </div>
  );
};

export default Slider;
