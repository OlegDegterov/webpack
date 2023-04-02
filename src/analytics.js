import _ from "lodash"

function createAnalitics () {
  let counter = 0
  let isDestroyed = false
  const listener = () => counter++
  document.addEventListener('click',listener)

  return {
    destroy(){
      document.removeEventListener('click',listener)
      isDestroyed = true
    },
    getClicks(){
      if (isDestroyed) {
        return `Analitics is destroyed. Total clicks = ${counter}`
      }
      return counter
    },
    getMultiplyClicks(){
      if (isDestroyed) {
        return `Analitics is destroyed. Total multiplyclicks = ${_.multiply(counter, counter)}`
      }
      return _.multiply(counter, counter)
    }
  }
}
window.analytics = createAnalitics()