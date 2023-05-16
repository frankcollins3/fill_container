import React from "react";
import "./home.css"
import {useState, useEffect} from 'react'
import actionObject from "../../../redux/actions"
import store from "../../../redux/store"
// client/src/redux/actions.js

const GraphQLcheck = () => {
  console.log('lemme see');
}



let myname:string = "me";

// let jackass = ['steveo, knoxville, weeman, bam, preston, dunn']
let icecream = ['vanilla', 'chocolate', 'strawberry', 'rumraisin', 'cookiedough']
let vanilla:string = icecream[0];
let chocolate:string = icecream[1];
let strawberry:string = icecream[2];
let rumraisin:string = icecream[3];
let cookiedough:string = icecream[4];

export default function HomeTS () {

  let global_var:any;
  let setPokemon = actionObject.setPokemon
  let pokemon;

  const test = async () => {
    // let query = `{allbooks{name}}`
    // let predata = await fetch(`http://localhost:5000/fill_cont?query=${query}`)
    // let data = await predata.json()
    // console.log('data')
    // console.log(data)
    console.log('global_var')
    console.log(global_var)

    let response = await setPokemon({ payload: "pikachu" }).payload;
    let pikachu = response.payload; // let pikachu = response.payload.payload;
    console.log(`I think I'm gonna go just to see ${pikachu}`)
    
    

  }

  useEffect( () => {
    (async() => {
      global_var = await store.getState()

    })()

  }, [])

  return (
    <div id="Page_1">
      <button onClick={GraphQLcheck}></button>
      <button onClick={test} id="Btn_Test"> </button>
    </div>
  )
}
