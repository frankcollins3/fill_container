import React from "react";
import "./home.css"

const GraphQLcheck = () => {
  console.log('lemme see');
}

const test = async () => {
  let predata = await fetch(`http://localhost:5000/pokemon?query={allbooks{name}}`)
  let data = await predata.json()
  console.log('data')
  console.log(data)
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
  return (
    <div id="Page_1">
      {/* <h1 className={styles.h2}> {cookiedough} </h1> */}
      {/* <h1> {jackass[0]} </h1> */}
      <button onClick={GraphQLcheck}></button>
      <button onClick={test} id="Btn_Test"> </button>
    </div>
  )
}
