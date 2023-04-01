export class Post {
  constructor(title){
    this.title = title
    this.data = new Date()
  }

  toString(){
    JSON.stringify({
      title: this.title, 
      date: this.data.toJSON()
    })
  }
  get titleToUpperCase(){
    return  this.title.toUpperCase()
  }
  get titeToLowerCase(){
    return  this.title.toLowerCase()
  }
}