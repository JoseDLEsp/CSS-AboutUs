const { createApp } = Vue
  createApp({
    data() {
      return {
        isMobile:/Mobile/.test(navigator.userAgent),
        currentSection:'',
        carouselStyle: {
          transform: ""
        },
        carouselItems : [],
        itemWidth: 0,
        currentPosition: 0
      };
    },
    methods:{
        /**
         * Display the clicked menu in mobile view
         * @param {String} type - Type of menu
         */
        showMenu(type){
            // Check the type menu and add or remove class to show menu
            (type=="burger" && this.curretSection=="graph") ? (navigationMenu.classList.toggle("show-menu"),settingsButton.classList.toggle("hide-button")) :
             type=="burger"                            ?  navigationMenu.classList.toggle("show-menu") 
                                                       :  settingsMenu.classList.toggle("show-menu");

            // Explicit code for burger menu                                           
            // if (type=="burger" && this.currentSection=="graph") {
            //     navigationMenu.classList.toggle("show-menu")
            //     settingsButton.classList.toggle("hide-button")
            // }else if( type=="burger"){
            //     navigationMenu.classList.toggle("show-menu")
            // }else{
            //     settingsMenu.classList.toggle("show-menu");
            // }

            // Remove scroll in body in desktop, more estetic
            if (!this.isMobile) {
                body.classList.toggle("non-scroll")
            }
        },
        // Vue.js app methods

        scrollBack() {
          document.body.scrollTop = 0; // Safari
          document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
        },

        /**
         * Function that allows to scroll to a particular section of the page
         * @param {*} element button pressed
         * @param {*} margin  margin considering navbar
         */
        scrollToElement(element, margin = 10) {
          const elemento = document.getElementById(element);
          const elementoPosition = elemento.getBoundingClientRect().top;
          const offsetPosition = elementoPosition + window.screenY - margin;
          window.scrollTo({
            top: offsetPosition
          });
        },
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollFunction);
    },
  }).mount('#app')

/** 
 * Functions that displays scroll back to top button
 */
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}


// *****************************************
// ****************CAROUSEL*****************
// *****************************************
const itemsEl = document.querySelectorAll(".carousel-item");
const btnLeft = document.querySelector(".btn-carousel--left");
const btnRight = document.querySelector(".btn-carousel--right");

const mediaQueryPhone = 600; //600px phone
const mediaQueryTabPort = 900; //900px tab-port
const mediaQueryTabLand = 1200; //1200px tab-land
const mediaQueryDesktop = 1800; // 1800px desktop

let elemPerView;

//Scroll counters
let scrollsLeft;
let scrollsRight;
let maxScrolls;

//Detect currrent MEDIAQUERY
const mediaSensor = function (width, height) {
  if ( height <= 412 || width <= mediaQueryPhone ) {
    return mediaQueryPhone;
  } else if (width <= mediaQueryTabPort) {
    return mediaQueryTabPort;
  } else if (mediaQueryTabPort < width) {
    return mediaQueryDesktop;
  }
};

//Get the current MEDIAQUERY
let currentQuery = mediaSensor(window.innerWidth, window.innerHeight);

//Build the carousel according with MEDIAQUERY
const carouselInit = function () {

  //For phone
  if (currentQuery <= mediaQueryPhone) {
    //only one card in carousel per view
    elemPerView = 1;
  } 
  
  //For Tab-port
  else if (currentQuery <= mediaQueryTabPort) {
    //only two cards in carousel per view
    elemPerView = 2;
  } 
  
  //For Desktop
  else if (currentQuery <= mediaQueryDesktop) {
    //Three cards per view
    elemPerView = 3;
  }

  //Determine how many scrolls are allowed according with cards per view
  maxScrolls = Math.ceil(itemsEl.length / elemPerView) - 1;

  scrollsLeft = maxScrolls;
  scrollsRight = 0;


  //Change size of cards
  itemsEl.forEach((c, i) => {
    c.style.left = `${(100 / elemPerView) * i }%`;
    c.style.width = `${100 / elemPerView }%`;
  });
};

carouselInit();

//Detect change in width of the window
window.addEventListener("resize", function () {
  if (currentQuery != mediaSensor(window.innerWidth, window.innerHeight)) {
    currentQuery = mediaSensor(window.innerWidth, window.innerHeight);
    carouselInit();
  }
});

//BUTTONS CONTROLS

//Move to right
btnRight.addEventListener("click", function () {

  //If you're not in max of scrolls
  if (scrollsRight != maxScrolls) {
    //Translate all cards to left
    itemsEl.forEach((item) => {
      item.style.left = `calc(${item.style.left} + ${-100}%)`;
    });


    //Update scrolls counters
    scrollsLeft--;
    scrollsRight++;
  }
});

//Move to left
btnLeft.addEventListener("click", function () {

  //if you're not in max of scrolls
  if (scrollsLeft != maxScrolls) {
    //Translate all cards to right
    itemsEl.forEach((item) => {
      item.style.left = `calc(${item.style.left} + ${100}%)`;
    });

    //Update scrolls counters
    scrollsLeft++;
    scrollsRight--;
  }
});