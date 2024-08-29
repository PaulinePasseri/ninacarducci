// Gestion du carrousel 

let bannerContainer = document.querySelector(".banner-container")
let images = bannerContainer.querySelectorAll(".banner-img")
let slideLeft = document.querySelector(".fa-chevron-left")
let slideRight = document.querySelector(".fa-chevron-right")
let currentSlide = 1
let imageWidth = images[0].offsetWidth
const transitionDuration = 800

// Fonction de throttling
function throttle(func, limit) {
    let inThrottle
    return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// Animation pour faire défiler les images
function slideImages(direction) {
    currentSlide += direction
    
    // Transition normale
    bannerContainer.style.transition = `transform ${transitionDuration}ms ease`
    bannerContainer.style.transform = `translateX(-${currentSlide * imageWidth}px)`
    
    // Vérifie si nous sommes sur un clone et ajuste si nécessaire
    setTimeout(() => {
        if (currentSlide <= 0) {
            bannerContainer.style.transition = "none"
            currentSlide = images.length - 2
            bannerContainer.style.transform = `translateX(-${currentSlide * imageWidth}px)`
        } else if (currentSlide >= images.length - 1) {
            bannerContainer.style.transition = "none"
            currentSlide = 1
            bannerContainer.style.transform = `translateX(-${currentSlide * imageWidth}px)`
        }
        updateBulletPoint()
    }, transitionDuration)

    updateBulletPoint()
}

// Mise à jour des bullet points
function updateBulletPoint() {
    let bulletList = document.querySelector(".bulletpoints")
    let bullets = bulletList.querySelectorAll('.bulletpoint')
    bullets.forEach((bullet, index) => {
        if (index === (currentSlide - 1 + images.length - 2) % (images.length - 2)) {
            bullet.classList.add("bulletpoint_selected")
        } else {
            bullet.classList.remove("bulletpoint_selected")
        }
    })
}

// Création des fonctions throttled pour les clics sur les flèches
const throttledSlideLeft = throttle(() => slideImages(-1), transitionDuration)
const throttledSlideRight = throttle(() => slideImages(1), transitionDuration)

// Event Listeners pour les flèches avec throttling
slideLeft.addEventListener("click", throttledSlideLeft)
slideRight.addEventListener("click", throttledSlideRight)

// Initialisation des Bullet Points
function initBulletPoints() {
    let bulletList = document.querySelector(".bulletpoints")
    bulletList.innerHTML = ""
    for (let i = 0; i < images.length - 2; i++) {
        let bullet = document.createElement("span")
        bullet.classList.add("bulletpoint")
        bulletList.append(bullet)
    }
    updateBulletPoint()
}

// Initialisation
bannerContainer.style.transform = `translateX(-${imageWidth}px)` // Commencez à la première vraie image
initBulletPoints()

// Ajustement de la largeur du conteneur
bannerContainer.style.width = `${images.length * 100}%`

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    imageWidth = images[0].offsetWidth
    bannerContainer.style.transform = `translateX(-${currentSlide * imageWidth}px)`
})


// ___________________________________________________________


// Gestion de la galerie
let gallery = document.querySelector(".gallery")
let works = []
let currentFilteredImages = []

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
    currentFilteredImages = images
    gallery.innerHTML = ""
    images.forEach((image, index) => {
        const img = document.createElement('img')
        img.src = image.src
        img.alt = image.alt
        img.id = image.id
        img.addEventListener('click', () => openModal(index))
        gallery.appendChild(img)
    })
}

// Gestion des filtres 
const btnTous = document.getElementById("btn-tous")
btnTous.addEventListener("click", function() {
    generateGallery(works)
    btnActive(btnTous)
})

const btnConcerts = document.getElementById("btn-concerts")
btnConcerts.addEventListener("click", function () {
    const galerieConcerts = works.filter(item => item.tag === "Concerts")
    generateGallery(galerieConcerts)
    btnActive(btnConcerts)
})
const btnEntreprises = document.getElementById("btn-entreprises")
btnEntreprises.addEventListener("click", function () {
    const galerieEntreprises = works.filter(item => item.tag === "Entreprises")
    generateGallery(galerieEntreprises)
    btnActive(btnEntreprises)
})

const btnMariages = document.getElementById("btn-mariages")
btnMariages.addEventListener("click", function () {
    const galerieMariages = works.filter(item => item.tag === "Mariages")
    generateGallery(galerieMariages)
    btnActive(btnMariages)
})

const btnPortraits = document.getElementById("btn-portraits")
btnPortraits.addEventListener("click", function () {
    const galeriePortraits = works.filter(item => item.tag === "Portraits")
    generateGallery(galeriePortraits)
    btnActive(btnPortraits)
})

function btnActive(e) {
    document.querySelector(".filters__btn--clicked").classList.remove("filters__btn--clicked")    
    e.classList.add("filters__btn--clicked")
}


getWorks()




// ______________________________________________________


// Gestion de la modale 
let modal = null
const focusableSelector = "i"
let focusables = []
let currentImageIndex = 0

function updateModalImage() {
    const image = currentFilteredImages[currentImageIndex]
    const modalImage = document.createElement('img')
    modalImage.src = image.src
    modalImage.alt = image.alt
    modalImage.classList.add('modal-image')
    
    const galleryFocus = modal.querySelector("#galleryFocus")
    galleryFocus.innerHTML = ''
    galleryFocus.appendChild(modalImage)
}

// Ouverture de la modale 
const openModal = function (index) {
    currentImageIndex = index
    modal = document.querySelector("#modal")
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")

    updateModalImage();

    modal.addEventListener("click", closeModal)
    modal.querySelector(".chevron-left-modal").addEventListener("click", showPreviousImage)
    modal.querySelector(".chevron-right-modal").addEventListener("click", showNextImage)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

function showPreviousImage(e) {
    e.stopPropagation()
    if (currentImageIndex > 0) {
        currentImageIndex--
    } else {
        currentImageIndex = currentFilteredImages.length - 1
    }
    
    updateModalImage()
}

function showNextImage(e) {
    e.stopPropagation()
    if (currentImageIndex < currentFilteredImages.length - 1) {
        currentImageIndex++
    } else {
        currentImageIndex = 0
    }
    
    updateModalImage()
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".chevron-left-modal").removeEventListener("click", showPreviousImage)
    modal.querySelector(".chevron-right-modal").removeEventListener("click", showNextImage)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}