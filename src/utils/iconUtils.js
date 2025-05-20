import React from 'react';

import {
  FaStore,
  FaAppleAlt,
  FaTshirt,
  FaShoppingBag,
  FaCar,
  FaMotorcycle,
  FaCouch,
  FaPaintBrush,
  FaBlender,
  FaLaptop,
  FaMobileAlt,
  FaClock,
  FaGem,
  FaHeartbeat,
  FaSun,
  FaGift,
  FaQuestionCircle 
} from 'react-icons/fa';
import { MdSportsTennis } from 'react-icons/md';
import { GiLipstick, GiLargeDress, GiSonicShoes } from 'react-icons/gi'; 

export const getCategoryIcon = (categoryName, iconBaseClass = "w-5 h-5 mr-2 text-gray-500 group-hover:text-primary transition-colors") => {


  if (!categoryName || categoryName.trim() === '') {
    return <FaStore className={iconBaseClass} aria-hidden="true" />;
  }
  const lowerCategory = categoryName.toLowerCase().trim().replace(/-/g, ' ');

  switch (lowerCategory) {
    case 'beauty':
      return <GiLipstick className={iconBaseClass} aria-hidden="true" />;
    case 'fragrances':
      return <FaGift className={iconBaseClass} aria-hidden="true" />;
    case 'furniture':
      return <FaCouch className={iconBaseClass} aria-hidden="true" />;
    case 'groceries':
      return <FaAppleAlt className={iconBaseClass} aria-hidden="true" />;
    case 'home decoration':
      return <FaPaintBrush className={iconBaseClass} aria-hidden="true" />;
    case 'kitchen accessories':
      return <FaBlender className={iconBaseClass} aria-hidden="true" />;
    case 'laptops':
      return <FaLaptop className={iconBaseClass} aria-hidden="true" />;
    case 'mens shirts':
      return <FaTshirt className={iconBaseClass} aria-hidden="true" />;
    case 'mens shoes':
      return <GiSonicShoes className={iconBaseClass} aria-hidden="true" />;
    case 'mens watches':
      return <FaClock className={iconBaseClass} aria-hidden="true" />;
    case 'mobile accessories':
    case 'smartphones':
    case 'tablets':
      return <FaMobileAlt className={iconBaseClass} aria-hidden="true" />;
    case 'motorcycle':
      return <FaMotorcycle className={iconBaseClass} aria-hidden="true" />;
    case 'skin care':
      return <FaHeartbeat className={iconBaseClass} aria-hidden="true" />;
    case 'sports accessories':
      return <MdSportsTennis className={iconBaseClass} aria-hidden="true" />;
    case 'sunglasses':
      return <FaSun className={iconBaseClass} aria-hidden="true" />
    case 'tops':
      return <FaTshirt className={iconBaseClass} aria-hidden="true" />;
    case 'vehicle':
      return <FaCar className={iconBaseClass} aria-hidden="true" />;
    case 'womens bags':
      return <FaShoppingBag className={iconBaseClass} aria-hidden="true" />;
    case 'womens dresses':
      return <GiLargeDress className={iconBaseClass} aria-hidden="true" />;
    case 'womens jewellery':
      return <FaGem className={iconBaseClass} aria-hidden="true" />;
    case 'womens shoes':
      return <GiSonicShoes className={iconBaseClass} aria-hidden="true" />; 
    case 'womens watches':
      return <FaClock className={iconBaseClass} aria-hidden="true" />; 
    case 'automotive': 
        return <FaCar className={iconBaseClass} aria-hidden="true" />;

    default:
      console.warn(`No specific icon defined for category: "${categoryName}". Using default icon.`);
      return <FaQuestionCircle className={iconBaseClass} aria-hidden="true" />;
  }
};