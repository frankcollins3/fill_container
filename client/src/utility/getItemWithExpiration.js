import React from 'react'

function getItemWithExpiration(key) {
    if (!key) return null;
    
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    if (new Date().getTime() > item.expiration) {
      localStorage.removeItem(key); // Remove item if expired
      return null;
    }
    return item.value;
  }
  