import {Post} from "./Post"
import './styles/styles.css'
import json from './assets/json.json'
import arrow from './assets/download.jpeg'
import xml from './assets/xml.xml'
import csv from './assets/csv.csv'
const post = new Post("First webpack post", arrow)

console.log("post to string:", post)
console.log("JSON", json)
console.log("xml",xml)
console.log("csv", csv)