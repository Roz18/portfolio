const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".preve-button");
const nextButton = document.querySelector(".nexts-button");

const slideWidth = slider.clientWidth / 5;
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
