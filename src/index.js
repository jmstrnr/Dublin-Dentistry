/*---------------------------------------------------------------------------------*/
/*---Imports---*/
import './styles/modern-normalize.css';
import './styles/style.css';
import './styles/queries.css';

// To import the entire images directory
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./styles/images/', false, /\.(png|jpe?g|svg|ico)$/));

/*---------------------------------------------------------------------------------*/
/*---Nav Toggle Logic---*/

const navCheckbox = document.querySelector('.navigation__checkbox');
const navLinks = document.querySelectorAll('.navigation__link');

// If a click is detected on any of the navigation menu links, close the navigation menu
for (const link of navLinks) {
  link.addEventListener('click', () => {
    navCheckbox.checked = false;
  });
}

/*---------------------------------------------------------------------------------*/
/*---App Steps Slide-in Logic---*/

const appSteps = document.querySelectorAll('.app__steps');

// Helper function to check if the passed in element is visible on the screen
const visibleOnScreen = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// When each step is visible on the screen, slide it in by adding the 'show' class
const runSlideIn = () => {
  appSteps.forEach((appStep) => {
    if (visibleOnScreen(appStep)) {
      appStep.classList.add('show');
    }
  });
};

window.addEventListener('load', runSlideIn);
window.addEventListener('resize', runSlideIn);
window.addEventListener('scroll', runSlideIn);

/*---------------------------------------------------------------------------------*/
/* ---App Popup Logic---*/

const appPopup = document.querySelector('.app-popup');
const openPopupButton = document.querySelector('.js-open-popup');
const closePopupButton = document.querySelector('.js-close-popup');

// Show app popup
openPopupButton.addEventListener('click', () => appPopup.classList.add('show-popup'));

// Hide app popup
closePopupButton.addEventListener('click', () => appPopup.classList.remove('show-popup'));

// Hide app popup on  click outside popup container
window.addEventListener('click', (e) =>
  e.target === appPopup ? appPopup.classList.remove('show-popup') : false
);

/*---------------------------------------------------------------------------------*/
/* ---Testimonial Slideshow Logic---*/

const slides = document.querySelectorAll('.slideshow__slide');
const slideshowIndicators = document.querySelectorAll('.slideshow__indicator');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const slideshowIndicator1 = document.querySelector('.slideshow__indicator--1');
const slideshowIndicator2 = document.querySelector('.slideshow__indicator--2');
const slideshowIndicator3 = document.querySelector('.slideshow__indicator--3');

/* Displaying the Active Slide */

// Shows the current slide by adding a CSS class, while also removing that class from
// the previously active slide.
function showSlides(n) {
  // After reaching the last slide when moving forwards, loop back to the beginning
  if (n > slides.length) {
    slideIndex = 1;
  }

  // After reaching the first slide when moving backwards, loop back to the end
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Remove styling classes from the previous slide/slideshow indicator that is no longer active
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('show-slide');
  }
  for (i = 0; i < slideshowIndicators.length; i++) {
    slideshowIndicators[i].className = slideshowIndicators[i].className.replace(' active', '');
  }

  // Add styling classes to the current slide/slideshow indicator that is active
  slides[slideIndex - 1].classList.add('show-slide');
  slideshowIndicators[slideIndex - 1].classList.add('active');
}

// Start the slideshow at the first slide and call showSlides to show the first slide
let slideIndex = 1;
showSlides(slideIndex);

/* Slideshow Next/Previous Buttons */

// Helper method to go to the next/previous slide
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Clicking the next/previous button moves to the next/previous slide
const prevSlide = function () {
  plusSlides(-1);
};

const nextSlide = function () {
  plusSlides(1);
};

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

/* Slideshow Autoplay */

// Autoplays slides on an interval
function autoplaySlides() {
  window.setInterval(nextSlide, 6000);
}

autoplaySlides();

/* Slideshow Indicator Buttons */

// Helper method to set the current slide to be the slide associated with the passed in number
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// When the user clicks on the slideshow indicator for each slide, that slide will be
// set as the current slide and displayed.
// E.g, when the first slideshow indicator is clicked on, slide 1 will be displayed, etc.
slideshowIndicator1.addEventListener('click', () => {
  currentSlide(1);
});

slideshowIndicator2.addEventListener('click', () => {
  currentSlide(2);
});

slideshowIndicator3.addEventListener('click', () => {
  currentSlide(3);
});

/*---------------------------------------------------------------------------------*/
/* ---Contact Form Validation---*/

const form = document.querySelector('.contact-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');

// Run validation when the form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkName(name);
  checkEmail(email);
});

// Check the name field to ensure it is not empty, and use helper functions to give user feedback
function checkName(input) {
  if (input.value.trim() === '') {
    showError(input, 'Please enter your name');
  } else {
    showSuccess(input);
  }
}

// Check that the email is valid using regex, and use helper functions to give user feedback
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid email');
  }
}

// Helper function to show that there is an error in the input by adding error styling and showing the error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const small = formControl.querySelector('.error-message');
  small.innerText = message;
}

// Helper function to show that the input was filled correctly by adding a CSS class for styling
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}
