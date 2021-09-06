/*---Imports---*/
import './styles/modern-normalize.css';
import './styles/style.css';
import './styles/queries.css'; 

// To import the entire images directory
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./styles/images/', false, /\.(png|jpe?g|svg|ico)$/));

/*---Nav Toggle Logic---*/

const navCheckbox = document.querySelector('#menu-toggle');
const navLinks = document.querySelectorAll('.navigation__link');

for (const link of navLinks) {
  link.addEventListener('click', () => {
    navCheckbox.checked = false;
  });
}

/* ---App Popup Logic---*/

const close = document.querySelector('.js-close');
const open = document.querySelector('.js-open');
const appPopup = document.querySelector('.js-app-popup');

// Show app popup
open.addEventListener('click', () => appPopup.classList.add('show-popup'));

// Hide app popup
close.addEventListener('click', () => appPopup.classList.remove('show-popup'));

// Hide app popup on  click outside popup container
window.addEventListener('click', (e) =>
  e.target === appPopup ? appPopup.classList.remove('show-popup') : false
);

/*---App Steps Slide-in Logic---*/

const appSteps = document.querySelectorAll('.app-steps');

const visibleOnScreen = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

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

/* ---Testimonial Slideshow Logic---*/

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll('.slideshow__slide');
  const dots = document.querySelectorAll('.dot');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('show-slide');
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].classList.add('show-slide');
  dots[slideIndex - 1].classList.add('active');
}

// Event listeners for prev/next slide
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const prevSlide = function () {
  plusSlides(-1);
  clearInterval(autoplaySlides);
};

const nextSlide = function () {
  plusSlides(1);
};

prev.addEventListener('click', prevSlide);

next.addEventListener('click', nextSlide);

// Autoplay slides on interval
const autoplaySlides = window.setInterval(nextSlide, 7000);

// Event listeners for individual dots
const slide1 = document.querySelector('.slide--1');
const slide2 = document.querySelector('.slide--2');
const slide3 = document.querySelector('.slide--3');

slide1.addEventListener('click', () => {
  currentSlide(1);
});

slide2.addEventListener('click', () => {
  currentSlide(2);
});

slide3.addEventListener('click', () => {
  currentSlide(3);
});

/* ---Contact Form Validation---*/

const form = document.querySelector('.contact-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([name, email]);
  checkEmail(email);
});

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `Please enter your ${getFieldName(input)}`);
    } else {
      showSuccess(input);
    }
  });
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const small = formControl.querySelector('.error-message');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid Email');
  }
}
