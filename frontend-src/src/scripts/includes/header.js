// if you're using a bundler, first import:
import Headroom from 'headroom.js'
// grab an element
var myElement = document.querySelector('header')
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement, {
  // offset: 85 / 2
  offset: myElement.clientHeight
})

// initialise
headroom.init()

window.addEventListener('resize', _ => {
  headroom.offset = myElement.clientHeight
})
