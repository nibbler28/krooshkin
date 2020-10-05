import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'

document.body.addEventListener('click', e => {
  const target = e.target

  if (target.tagName === 'IMG') {
    const gridItems = document.querySelectorAll('.grid .item')

    if (target.closest('.item') && target.closest('.grid')) {
      const currentGridItem = target.closest('.item')

      const currentGridItemIndex = [...gridItems].findIndex(gridItem => gridItem === currentGridItem)

      const slideObjects = [...gridItems].map(gridItem => {
        return {
          src: gridItem.querySelector('img').src,
          w: gridItem.dataset.width,
          h: gridItem.dataset.height,
          msrc: gridItem.querySelector('img').src
        }
      })

      const pswpElement = document.querySelector('.pswp')
      const items = slideObjects
      const options = {
        index: currentGridItemIndex,
        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = gridItems[index].querySelector('img'), // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect()

          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        },
        history: false
      }

      const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
      gallery.init()
    }
  }
})

// const initializePhotoSwipe = () => {
//   const grid = document.querySelector('.grid');
//   let gridItems;
//
//   if (grid) {
//     gridItems = document.querySelectorAll('.grid .item');
//
//     const slides = [...gridItems].map(gridItem => {
//       return {
//         src: gridItem.querySelector('img').src,
//         w: 1200,
//         h: 800,
//         msrc: gridItem.querySelector('img').src
//       }
//     })
//   }
//
//   document.body.addEventListener('click', e => {
//     if (e.target.tagname === 'IMG' && e.target.closest('.item')) {
//
//       const item = e.target;
//
//       const itemsIndex = gridItems.findIndex(gridItem => gridItem === item);
//
//       const index = itemsIndex;
//
//       const options = {
//         getThumbBoundsFn: function (index) {
//           // See Options -> getThumbBoundsFn section of documentation for more info
//           var thumbnail = gridItems[index].querySelector('img'), // find thumbnail
//             pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
//             rect = thumbnail.getBoundingClientRect();
//           console.log(rect)
//
//           return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
//         }
//       };
//
//       const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, slides, options);
//       gallery.init();
//     }
//   })
// }
