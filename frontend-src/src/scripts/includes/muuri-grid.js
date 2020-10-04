import Muuri from 'muuri';
import gsap from 'gsap';

const createGrid = () => {
  window.grid = new Muuri('.grid', {
    layout: {
      fillGaps: true
    }})

  const grid = document.querySelector('.grid');
  gsap.to(grid, {opacity: 1, duration: .125})
};

const destroyGrid = () => {
  window.grid.destroy();
  window.grid = null;
}

export {
  createGrid,
  destroyGrid,
}
