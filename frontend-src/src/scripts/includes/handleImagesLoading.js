export default () => {
  const grid = document.querySelector('.grid')
  const images = grid.querySelectorAll('img')
  for (let image of images) {
    const newImage = new Image()
    newImage.onload = () => {
      image.src = newImage.src
    }
    newImage.src = image.dataset.src
  }
}
