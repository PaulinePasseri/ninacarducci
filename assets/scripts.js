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
        gallery.innerHTML += 
        `<img src="${image.src}" alt="${image.alt}" id="${image.id}">`
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



// Gestion du carousel 
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