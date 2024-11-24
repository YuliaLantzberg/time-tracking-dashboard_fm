// TODO: hover effect on dots
const menu = document.getElementsByClassName("dashboard__list-item");
const cards = document.getElementsByClassName("card__content");
const fullCards = document.getElementsByClassName("card");

const hover = "hsl(235, 45%, 61%)";
const not_hover = "hsl(235, 46%, 20%)";
async function fetchData() {
	try {
		const data = await fetch("/data.json");
		const res = await data.json();
		return res;
	} catch (err) {
		console.log(err);
	}
}

const dataTime = fetchData();

async function populateData(item, period) {
	const textPrevious =
		period === "daily" || !period ? "yesterday" : `Last ${period.slice(0, -2)}`;
	const data = await dataTime;
	Array.from(menu).forEach((item) => {
		if (item.id !== period) item.classList.remove("active");
	});
	item.classList.add("active");

	for (const card of cards) {
		const cardData = data.find(
			(item) => item.title.toLowerCase() === card.dataset.card
		);
		const currentHours = card.querySelector(".card__hours");
		const previousHours = card.querySelector(".card__previous");
		currentHours.innerText = cardData.timeframes[period].current + "hrs";
		previousHours.innerText = `${period} - ${cardData.timeframes[period].previous}hrs`;
	}
}

function hanldeHoverDots(e) {
	if (Array.from(e.target.classList).includes("card__title-dots")) {
		e.currentTarget.style.backgroundColor = not_hover;
	} else {
		e.currentTarget.style.backgroundColor = hover;
	}
}

function removeHoverColor(e) {
	e.currentTarget.style = not_hover;
}

Array.from(menu).forEach((item) => {
	item.addEventListener("click", () => {
		populateData(item, item.id);
	});
});

// Set default to daily
const daily = Array.from(menu).find((item) => item.id === "daily");
populateData(daily, "daily");

//Hanlde hover over dots
Array.from(fullCards).forEach((card) => {
	card.addEventListener("mouseover", hanldeHoverDots);
	card.addEventListener("mouseout", removeHoverColor);
});
