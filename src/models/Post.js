export class Post {
  constructor(title, image){
    this.title = title
    this.image = image
    this.data = new Date()
  }

  toString(){
    JSON.stringify({
      title: this.title, 
      date: this.data.toJSON(),
      img: this.image
    })
  }
  get titleToUpperCase(){
    return  this.title.toUpperCase()
  }
  get titeToLowerCase(){
    return  this.title.toLowerCase()
  }
}