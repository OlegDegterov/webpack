import React from 'react'
import ReactDOM from 'react-dom'
import {Post} from "@models/Post"
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
import json from './assets/json.json'
import arrow from './assets/download.jpeg'
import xml from './assets/xml.xml'
import csv from './assets/csv.csv'
import babel from './babel'
import _ from "lodash"
const post = new Post("First webpack post", arrow)

export const App = () => {
  return (
    <div class="container">
      <h1>Learn webpack</h1>
      <hr/>
      <div class="logo"></div>
      <hr/>
      <div class="box">
        <h2>LESS</h2>
      </div>
      <div class="card">
        <h2>SCSS</h2>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);

console.log("post to string:", post)
console.log("JSON", json)
console.log("xml",xml)
console.log("csv", csv)
console.log("babel",babel)
_.map(csv, item=> console.log(item));