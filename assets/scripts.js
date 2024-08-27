// $(document).ready(function() {
//     $('.gallery').mauGallery({
//         columns: {
//             xs: 1,
//             sm: 2,
//             md: 3,
//             lg: 3,
//             xl: 3
//         },
//         lightBox: true,
//         lightboxId: 'myAwesomeLightbox',
//         showTags: true,
//         tagsPosition: 'top'
//     });
// });


let gallery = document.querySelector(".gallery")
let works = []

function getWorks() {
    fetch("../images.json").then(response => {
        response.json().then(data => {
            works = data
            generateGallery(works)
        })
    })
}

// Galerie générée 
function generateGallery(images) {
    gallery.innerHTML = ""
    images.forEach(image => {
        gallery.innerHTML += 
        `<img src="${image.src}" alt="${image.alt}" id="${image.id}">`
    })
}

getWorks()