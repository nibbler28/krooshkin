import Highway from '@dogstudio/highway'
import gsap from 'gsap'

import { createGrid, destroyGrid } from './muuri-grid'

class Fade extends Highway.Transition {

  out({from, done}) {
    gsap.to(from, 0.125, {opacity: 0, onComplete: done})
  }

  in({from, to, done}) {
    window.scrollTo(0, 0)

    from.remove()

    gsap.fromTo(to, 0.125, {opacity: 0}, {opacity: 1, onComplete: done})
  }
}

class CustomRenderer
  extends Highway.Renderer {

  onEnter() {
  }

  onLeave() {
    destroyGrid()
  }

  onEnterCompleted() {
    const gridNode = document.querySelector('.grid')
    if (gridNode) {
      !window.grid && createGrid()
    }
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade
  },
  renderers: {
    index: CustomRenderer
  }
})

// Get all menu links
const links = document.querySelectorAll('nav a')

// Listen the `NAVIGATE_IN` event
// This event is sent everytime a `data-router-view` is added to the DOM Tree
H.on('NAVIGATE_IN', ({ to, location }) => {
  // Check Active Link
  hightlightActiveLinks()
})

const hightlightActiveLinks = () => {
  const links = document.querySelectorAll('.sidebar-nav__list-item a')

  links.forEach(link => {
    link.classList.remove('active')

    if (link.href === location.href) {
      link.classList.add('active')
    }
  })
}

window.addEventListener('DOMContentLoaded', _ => {
  hightlightActiveLinks()
})
