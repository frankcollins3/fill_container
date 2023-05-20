import React from "react";
import "./home.css"
import {useState, useEffect} from 'react'
import actionObject from "../../../redux/actions"
import store from "../../../redux/store"
import allurl from '../../../utility/allurl'
import objResJson from '../../../utility/objResJson'
import $ from 'jquery'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Display from '../../../components/elements/Display'
import Settings from '../../../components/elements/Settings'
import Schedule from '../../../components/elements/Schedule'


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
  $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)

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
    let allsettings = await objResJson(pre_allsettings)
    // let allsettings = await pre_allsettings.json()
    console.log('allsettings over here')
    console.log(allsettings)

  }

  const test2 = async () => {
    // let predata = await fetch(`http://localhost:5000/fill_cont?query={ENV}`)
    let predata = await fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API}}`)  
    let data = await objResJson(predata)
    console.log('data over here')
    console.log(data)
    // console.log('data')
    // console.log(data)
  }

  useEffect( () => {
    (async() => {
      global_var = await store.getState() // reassign the value of global_var. Cant put global_var in a function because we need access to it.
// $('*').css('cursor', `url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoCAAAFgAAACgAAAAgAAAAQAAAAAEACAAAAAAAAAQAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAP8IAP8RAAAA/+YABP8AAAD/iAAAav8AAP+3AACi/wALCxIAAHP/APL/AAAA6v8AALv/AACV/wDQ/wAAAP8RAAD/9wAAe/8AACb/AABV/wAAAP8A/8gAAP/3AAAA+/8AAP8aAF7/AAAA/1EA/wCzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAFQAAAA4AAAAAAAAVABgAAAAAAAAAAAAAAAAAAAAAAAAGEQAADAAJAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABEEAAAZAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAsACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVAAAcCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAAkAAAAJCQkJAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAACQAACQAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAKAAAACQkcAgsZDA4VABUAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBRsBGg8WAAAEEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBEGFQAAAAAAAAAAAAAAAAAAAAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////////////////8/////H////w////cPH//zDg//8Q5P//AOD//wDx//8A////AP///wH///8DgH//AwA//wAAH/4AAB/+AAf//AAD//wAAf/4AAD/+Af///Af///wf///8f////'), auto`)
      // $('*').css('border-bottom', '50px solid dodgerblue')
      
      $()
      
    })()

  }, [])
  const renderHome = () => {
    return (
      <div id="Page_1">
      {/* <button onClick={GraphQLcheck}></button> */}
      {/* <button className="BorderBlueBtm_1" onClick={test} id="Btn_Test"> </button>
      <button className="BorderBlueBtm_2" style={ {height: '200px', width: '200px'}} onClick={test2} id="Btn_Test"> </button> */}
      {/* <Settings/> */}
    </div>
  )
}

return <div className="main-container"> {renderHome()} </div>
}
