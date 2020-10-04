const preloader = document.querySelector('.preloader');


const preloadImage = imageSrc => {
    return new Promise(resolve => {
        const image = document.createElement('img');
        image.src = imageSrc

        image.onload = resolve
    })
}

const sources = [];

for (let i = 2; i < 5; i++) {
    // const source = `./assets/k${}.jpeg`

    let source;

    sources.push(source)
}

// const promises = sources.map(source => {
//     return new Promise(resolve => {
//         resolve(preloadImage(source))
//     })
// })

// Promise.all(promises)
//   .then(() => preloader.style.display = 'none') // fade away

preloader.style.display = 'none'
