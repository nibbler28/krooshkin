import Muuri from 'muuri'
import gsap from 'gsap'
import handleImagesLoading from './handleImagesLoading';

const createGrid = () => {
  const grid = document.querySelector('.grid')
  const imagesLoaded = document.body.classList.contains('images-loaded')
  if (imagesLoaded === false) handleImagesLoading();
  window.grid = new Muuri(grid, {
    layout: {
      fillGaps: true
    }})

  window.grid.on('layoutEnd', () => gsap.to(grid, {opacity: 1, duration: 0.125})
  )
}

const destroyGrid = () => {
  window.grid.destroy()
  window.grid = null
}

export {
  createGrid,
  destroyGrid
}
