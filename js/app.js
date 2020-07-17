/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
const startTime = performance.now();
/**
 * Define Global Variables
 * 
*/
const navbarList = document.getElementById('navbar__list');
const linkItems = document.getElementsByClassName("menu__link");
const sections = document.getElementsByTagName('section');
const scrollToTop = document.getElementById("scrolltop");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const inViewport = (element) => {
  const bounding = element.getBoundingClientRect();
  return (
    bounding.top < window.innerHeight && bounding.bottom > 0
  );
};
const clearLinksActive = () => {
  for (const linkItem of linkItems) {
    linkItem.parentNode.classList.remove("menu__link__active")
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for (const section of sections) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
  navbarList.appendChild(listItem);  
}

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function(e){
  for( const section of sections){
    if (inViewport(section)) {
      section.classList.add("active__section")
    } else {
      section.classList.remove("active__section")
    } 
  }
});

// Show / hide back to top button based on the scroll event
window.addEventListener("scroll", function() {
  if(window.pageYOffset > 300){
    scrollToTop.className = "is__visible";
  } else {
    scrollToTop.classList.remove('is__visible');
  }
})
// Scroll to anchor ID using scrollTO event
scrollToTop.addEventListener("click", function(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  clearLinksActive()
})


/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 

// Scroll to section on link click
document.addEventListener("click", function(e){
  if(e.target.tagName.toLowerCase() === 'a'){
    e.preventDefault()
    clearLinksActive()
    const targetElement = document.querySelector(e.target.getAttribute('href'));
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
    e.target.parentNode.classList.add("menu__link__active");
  }
})
// Set sections as active


const endTime = performance.now();
console.info('This page took ' + (endTime-startTime) +' milleseconds to load' )