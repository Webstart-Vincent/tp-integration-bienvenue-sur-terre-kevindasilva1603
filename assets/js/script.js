const previousButton = document.querySelector('.bi-chevron-left')
const nextButton = document.querySelector('.bi-chevron-right')
const carouselContainer = document.querySelector('.carousel')
const carouselItems = document.querySelectorAll('.carousel > section')
const body = document.querySelector('body')
const sections = document.querySelectorAll('section')
const allIndicators = document.querySelectorAll(
    '.carousel-indicators > .indicator'
)

const carouselLength = carouselItems.length
let index = 0

const setUi = () => {
    carouselContainer.style.transform = `translateX(-${index * 100}%)`
    allIndicators.forEach((indicator) => {
        indicator.classList.remove('active')
    })
    allIndicators[index].classList.add('active')

    if (index === 0) previousButton.style.display = 'none'
    else previousButton.style.display = 'grid'

    if (index === carouselLength - 1) nextButton.style.display = 'none'
    else nextButton.style.display = 'grid'

    const section = sections[index]
    const sectionComputedStyle = window.getComputedStyle(section)
    const backgroundColor = sectionComputedStyle.backgroundColor
    body.style.backgroundColor = backgroundColor
}

const touchData = {
    carouselWidth: carouselContainer.offsetWidth, // Largeur du carrousel
    startTouchX: 0, // Position du doigt sur l’axe horizontal quand il commence à toucher l’écran
    lastDeltaX: 0, // Dernier mouvement connu du doigt sur l’axe horizontal
}

nextButton.addEventListener('click', () => {
    if (index < carouselLength - 1) index++
    setUi()
})

previousButton.addEventListener('click', () => {
    if (index > 0) index--
    setUi()
})

setUi()

carouselContainer.addEventListener('touchstart', (e) => {
    // Mémoriser la position de départ du doigt sur l’axe horizontal
    touchData.startTouchX = e.touches[0].screenX
    // Mémoriser la largeur du carrousel
    touchData.carouselWidth = carouselContainer.offsetWidth
    // Désactiver la transition CSS des diapositives du carrousel
    carouselContainer.style.transition = 'none'
})

carouselContainer.addEventListener('touchmove', (e) => {
    const deltaX = e.touches[0].screenX - touchData.startTouchX
    if (
        (index === 0 && deltaX > 0) ||
        (index === carouselLength - 1 && deltaX < 0)
    )
        return
    touchData.lastDeltaX = deltaX
    const basePercentTranslate = index * -100
    const percentTranslate =
        basePercentTranslate + (100 * deltaX) / touchData.carouselWidth
    carouselContainer.style.transform = `translate(${percentTranslate}%)`
})

carouselContainer.addEventListener('touchend', (e) => {
    if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
        if (index !== 0 && touchData.lastDeltaX > 0) index--

        if (index !== carouselLength - 1 && touchData.lastDeltaX < 0) index++
    }
    // Annuler le style injecté précédement par le JS
    carouselContainer.style.transition = ''
    // Afficher la bonne diapositive en fonction de l’index
    setUi()
})

allIndicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        index = i
        setUi()
    })
})
