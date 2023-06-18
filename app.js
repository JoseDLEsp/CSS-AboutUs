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
        scrollToElement(element, margin = window.innerHeight * 0.11) {
          const elemento = document.getElementById(element);
          const elementoPosition = elemento.getBoundingClientRect().top;
          const offsetPosition = elementoPosition + window.screenY - margin;
          window.scrollTo({
            top: offsetPosition
          });
        },/*
        moveCarousel() {
          this.carousel.style.transform = `translateX(${-this.currentPosition}px)`;
        },
        nextSlide() {
          this.carouselItems = document.querySelectorAll(".carouselItem")
          this.itemWidth = this.carouselItems[0].offsetWidth;
          this.currentPosition += this.itemWidth * 1.1;
          if (window.innerHeight <= 412 && window.innerWidth >= 320 && this.currentPosition > (this.carouselItems.length) * this.itemWidth) {
            this.currentPosition = 0; // slide in phone landscape orientation
          } else if (window.innerWidth >= 520 && window.innerHeight > 412 && this.currentPosition > (this.carouselItems.length - 2) * this.itemWidth) {
            this.currentPosition = 0; // for any other device
          } else if (window.innerWidth >= 320 && this.currentPosition > (this.carouselItems.length) * this.itemWidth) {
            this.currentPosition = 0; // slide in phone portrait orientation
          }
          this.moveCarousel();
        },
        prevSlide() {
          this.carouselItems = document.querySelectorAll(".carouselItem")
          this.itemWidth = this.carouselItems[0].offsetWidth;
          this.currentPosition -= this.itemWidth * 1.1;
          if (window.innerHeight > 412 && window.innerWidth >= 520 && this.currentPosition < -(this.itemWidth * 0.5)) {
            this.currentPosition = (this.carouselItems.length - 3) * (this.itemWidth * 1.09); // any other device
          } else if (window.innerWidth >= 320 && window.innerHeight <= 412 && this.currentPosition < -(this.itemWidth * 0.5)) {
            this.currentPosition = (this.carouselItems.length - 1) * this.itemWidth * 1.08; // slide in phone landscape orientation
          } else if (window.innerWidth >= 320 && this.currentPosition < -(this.itemWidth * 0.5)) {
            this.currentPosition = (this.carouselItems.length - 1) * (this.itemWidth * 1.12); // slide in phone portrait orientation
          }
          this.moveCarousel();
        } */
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


/**
 * Carousel controller
 */
document.addEventListener('DOMContentLoaded', function() {
  const carouselItems = document.querySelectorAll('.carousel-item');
  const itemWidth = carouselItems[0].offsetWidth;
  console.log(itemWidth)

  let currentPosition = 0;

  function moveCarousel() {
    carousel.style.transform = `translateX(${-currentPosition}px)`;
  }

  function nextSlide() {
    currentPosition += itemWidth * 1.1;
    console.log(currentPosition)
    if (window.innerHeight <= 412 && window.innerWidth >= 320 && currentPosition > (carouselItems.length) * itemWidth) {
        currentPosition = 0;  // slide in phone landscape orientation
    }
    else if (window.innerWidth >= 520 && window.innerHeight > 412 && currentPosition > (carouselItems.length - 2) * itemWidth) {
        currentPosition = 0;  // for any other device
    }
    else if (window.innerWidth >= 320 && currentPosition > (carouselItems.length) * itemWidth) {
      currentPosition = 0; // slide in phone portrait orientation
    }
    moveCarousel();
  }

  function prevSlide() {
    currentPosition -= itemWidth * 1.1;
    console.log(currentPosition)
    if (window.innerHeight > 412 && window.innerWidth >= 520  && currentPosition < -(itemWidth * 0.5) ) {
      currentPosition = (carouselItems.length - 3) * (itemWidth * 1.09);  // any other device
    }
    else if (window.innerWidth >= 320 && window.innerHeight <= 412  && currentPosition < -(itemWidth * 0.5)) {
      console.log("phone")
      currentPosition = (carouselItems.length-1 ) * itemWidth * 1.08; // slide in phone landscape orientation
    }
    else if (window.innerWidth >= 320 && currentPosition < -(itemWidth * 0.5)  ){
      currentPosition = (carouselItems.length-1 ) * (itemWidth * 1.12) ; // slide in phone portrait orientation
    }  
    moveCarousel();
  }

  nextCard.addEventListener('click', nextSlide);
  prevCard.addEventListener('click', prevSlide);
});