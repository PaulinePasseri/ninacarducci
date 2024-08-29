// Gestion du carrousel 
const slides = [
	{
		"image":"assets/images/slider/carrousel_rue.webp",
		"alt":"Homme traversant un passage piéton"
	},
	{
		"image":"assets/images/slider/carrousel_concert.webp",
		"alt":"Foule dans un concert"
	},
	{
		"image":"assets/images/slider/carrousel_mariage.webp",
		"alt":"Mariés qui dansent"
	}
]

let imageActive = document.querySelector(".banner-img")
let slideLeft = document.querySelector(".fa-chevron-left")
let slideRight = document.querySelector(".fa-chevron-right")
let currentSlide = 0

// Event Listener
slideLeft.addEventListener("click", () => {
	currentSlide--
	if (currentSlide < 0) {
		currentSlide = slides.length - 1
	}
	newSlide(currentSlide)
})


slideRight.addEventListener("click", () => {
	currentSlide++
	if (currentSlide >= slides.length) {
		currentSlide = 0
	}
	newSlide(currentSlide)
})

// Ajout des Bullet Points
function changeBulletPoint(activeBullet) {
	let bulletList = document.querySelector(".bulletpoints")
	bulletList.innerHTML = ""
	for (let i=0; i < slides.length; i++) {
		let bullet = document.createElement("span")
		bullet.classList.add("bulletpoint")
		if (i === activeBullet) {
			bullet.classList.add("bulletpoint_selected")
		} 
		bulletList.append(bullet)
	}
}


// Changement d'image active
function changeImage(image) {
	imageActive.src = slides[image].image
    imageActive.alt = slides[image].alt
}

// Mise à jour de la slide
function newSlide (slide) {
	changeImage(slide)
	changeBulletPoint(slide)
}

// Evénement sur les flèches
changeBulletPoint(currentSlide) 














// Gestion de la galerie
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
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.id = image.id;
        img.addEventListener('click', () => openModal(image));
        gallery.appendChild(img);
    })
}

// Gestion des filtres 
const btnTous = document.getElementById("btn-tous")
btnTous.addEventListener("click", function() {
    const galerieTous = works
    generateGallery(galerieTous)
    btnActive(btnTous)
})

const btnConcerts = document.getElementById("btn-concerts")

btnConcerts.addEventListener("click", function () {
    const galerieConcerts = works.filter(function(item) {
        return item.tag === "Concerts"
        })
        generateGallery(galerieConcerts)
        btnActive(btnConcerts)
})

const btnEntreprises = document.getElementById("btn-entreprises")

btnEntreprises.addEventListener("click", function () {
    const galerieEntreprises = works.filter(function(item) {
        return item.tag === "Entreprises"
        })
        generateGallery(galerieEntreprises)
        btnActive(btnEntreprises)
})

const btnMariages = document.getElementById("btn-mariages")

btnMariages.addEventListener("click", function () {
    const galerieMariages = works.filter(function(item) {
        return item.tag === "Mariages"
        })
        generateGallery(galerieMariages)
        btnActive(btnMariages)
})

const btnPortraits = document.getElementById("btn-portraits")

btnPortraits.addEventListener("click", function () {
    const galeriePortraits = works.filter(function(item) {
        return item.tag === "Portraits"
        })
        generateGallery(galeriePortraits)
        btnActive(btnPortraits)
})

function btnActive(e) {
    document.querySelector(".filters__btn--clicked").classList.remove("filters__btn--clicked")    
    e.classList.add("filters__btn--clicked")
}


getWorks()






// Gestion de la modale 
let modal = null
const focusableSelector = "i"
let focusables = []

// Ouverture de la modale 
const openModal = function (image) {
    modal = document.querySelector("#modal")
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")

    // Ajouter l'image à la modale
    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.classList.add('modal-image');
    
    const galleryFocus = modal.querySelector("#galleryFocus");
    galleryFocus.innerHTML = ''; // Nettoyer le contenu précédent
    galleryFocus.appendChild(modalImage);

    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}