const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const slideWidth = slider.clientWidth / 3;
let currentIndex = 0;
const totalSlides = slider.childElementCount;

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  slideTo(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  slideTo(currentIndex);
});

function slideTo(index) {
  const translateX = -index * slideWidth;
  slider.style.transform = `translateX(${translateX}px)`;
}
