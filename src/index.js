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

console.log("post to string:", post)
console.log("JSON", json)
console.log("xml",xml)
console.log("csv", csv)
console.log("babel",babel)
_.map(csv, item=> console.log(item));