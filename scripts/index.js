//Скролл до якоря

const buttonChoice = document.querySelector(".section-main__button-action ");

buttonChoice.onclick = function() {
	const block = document.getElementById("section-choice");

	block.scrollIntoView({
		behavior: "smooth",
		block: "start"
	})
}


//Бургер
const buttonBurger = document.querySelector(".button-burger");
const headerNav = document.querySelector(".header__nav");

buttonBurger.onclick = function () {
	buttonBurger.classList.toggle("button-burger_active");
	headerNav.classList.toggle("header__nav_active");
}


//Задаем размер карты в секции выбора в зависимости от размера экрана
const mediaQuery = window.matchMedia('(max-width: 1440px)');

function handleTabletChange(e) {
	if (e.matches) {
		const sectionChoice = document.querySelector(".section-choice");
		const cardsFace = sectionChoice.querySelectorAll(".card-face");
		const cardsReverse = sectionChoice.querySelectorAll(".card-reverse");

		const sectionChoiceContent = sectionChoice.querySelector(".section-choice__content-cards");
		const workZone = parseInt(window.getComputedStyle(sectionChoiceContent).width);
		const buttonCard = sectionChoice.querySelector(".section-choice__button-cards");
		const buttonCardWidth = parseInt(window.getComputedStyle(buttonCard).width);
		const fullCard = sectionChoice.querySelector(".section-choice__cards");
		const fullCardGap = parseInt(window.getComputedStyle(fullCard).gap);

		const zoom = ((workZone - (buttonCardWidth * 2) - fullCardGap) / 2) / 640;
		const zoomMob = (workZone - (buttonCardWidth * 2)) / 640;

		if (window.innerWidth <= 700) {
			for (let card of cardsFace) {
				card.style.zoom = zoomMob;
			}
	
			for (let card of cardsReverse) {
				card.style.zoom = zoomMob;
			}
		} else {
			for (let card of cardsFace) {
				card.style.zoom = zoom;
			}
	
			for (let card of cardsReverse) {
				card.style.zoom = zoom;
			}
		}
	} else {
		//Если ширина дисплея более 1440, то мы снимаем с бургера и шапки актив
		buttonBurger.classList.remove("button-burger_active");
		headerNav.classList.remove("header__nav_active");
	}
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)


//Выбор карты

const buttonLeft = document.querySelector(".section-choice__button-cards_left");
const buttonRight = document.querySelector(".section-choice__button-cards_right");

const cards = document.querySelector(".section-choice__cards");
const cardsGap = parseInt(window.getComputedStyle(cards).gap);
const cardWidth = parseInt(window.getComputedStyle(document.querySelector(".section-choice__card")).width);

const step = cardWidth + cardsGap;

const cardsQuantity = document.querySelectorAll(".section-choice__card").length;
const maxPosition = step * (cardsQuantity - 1);

let offset = 0;

buttonRight.onclick = function() {
	offset = offset + step;
	
	if (offset > maxPosition) {
		offset = 0;
	}
	
	cards.style.transform = "translateX(" + -offset + "px)";
}

buttonLeft.onclick = function() {
	offset = offset - step;
	
	if (offset < 0) {
		offset = maxPosition;
	}
	
	cards.style.transform = "translateX(" + -offset + "px)";
}


//Параллакс эффект
const sectionMain = document.querySelector(".section-main");
const sectionMainCards = sectionMain.querySelectorAll(".card-face");

window.addEventListener('mousemove', function(e) {
	let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
	let offset = 30;
	let i = 1;

	for (sectionCard of sectionMainCards) {
		if (i % 2 == 0) {
			if (i == 2) {
				sectionCard.style.transform = "translate(-"+ y * offset +"px, "+ x * offset +"px)";
			} else {
				sectionCard.style.transform = "translate("+ y * offset +"px, -"+ x * offset +"px)";
			}
		} else {
			if (i == 1) {
				sectionCard.style.transform = "translate("+ x * offset +"px, "+ y * offset +"px)";
			} else {
				sectionCard.style.transform = "translate(-"+ x * offset +"px, -"+ y * offset +"px)";
			}
		}
		i += 1;
	}
});