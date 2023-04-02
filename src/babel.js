async function start () {
  return await Promise.resolve("async is working")
}
start().then(console.log)

class Util {
  static id = Date.now()
}
console.log("Util id:", Util.id)

import("lodash").then( (_) =>{
    console.log("LODASH", _.random(0,100,true))
  }
)

import("lodash").then(_=>{
  console.log("LODAS - LOADED")
}
)