import React from 'react'

export default function setItemWithExpiration(key:string, value:string, expirationInMinutes:number) {
    const item = {
      value: value,
      expiration: new Date().getTime() + expirationInMinutes * 60 * 1000, // Calculate expiration time
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
