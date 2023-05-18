import React from "react";
import "./home.css"
import {useState, useEffect} from 'react'
import actionObject from "../../../redux/actions"
import store from "../../../redux/store"
import allurl from '../../../utility/allurl'

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
  let GET_WATER_BOTTLE = actionObject.GET_WATER_BOTTLE
  let pokemon;

  const test = async () => {
    // let query = `{allbooks{name}}`
    // let test_query = `{allDBsettings{weight}}`
    // let test_query = `{allDBsettings{id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`
    // id | age | height | weight | reminder | end_time | start_time | users_id 
    // let predata = await fetch(`http://localhost:5000/fill_cont?query=${test_query}`)
    // let data = await predata.json()
    // console.log('data')
    // console.log(data)    
    let urlbank = await allurl()
    let allsettingsurl = urlbank.allDBsettingsURL
    let pre_allsettings = await fetch(allsettingsurl)
    
    let allsettings = await pre_allsettings.json()
    console.log('allsettings')
    console.log(allsettings)

  }

  const test2 = async () => {
    // let predata = await fetch(`http://localhost:5000/fill_cont?query={ENV}`)
    let predata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API}}`)
    
    // let predata = await fetch(`http://localhost:5000/fill_cont?query={allUsers{id,username,email,password,age}}`)
    // let predata = await fetch(`http://localhost:5000/fill_cont?query={seesettings{weight}}`)
    let data = await predata.json()
    console.log('data')
    console.log(data)
  }

  useEffect( () => {
    (async() => {
      global_var = await store.getState() // reassign the value of global_var. Cant put global_var in a function because we need access to it.
    })()

  }, [])

  return (
    <div id="Page_1">
      <button onClick={GraphQLcheck}></button>
      <button onClick={test} id="Btn_Test"> </button>
      <button style={ {height: '200px', width: '200px'}} onClick={test2} id="Btn_Test"> </button>
    </div>
  )
}
