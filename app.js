function desplegarNavBar() {
    console.log("Click en hamburguesa")
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }

    var y = document.getElementById("hamburguesa");
    if(y.className === "hamburguesa"){
        y.className += " hide";
    }else{
        y.className = "hamburguesa";
    }
  }




// Funcion de scroll al inicio
let topScrollBtn = document.getElementById("scroll-top-btn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    topScrollBtn.style.display = "block";
  } else {
    topScrollBtn.style.display = "none";
  }
}
function scrollBack() {
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //Chrome, Firefox, IE and Opera
}


// Botones de navegacion

function scrollToElement(elemento){
  document.getElementById(elemento).scrollIntoView();
}


// Carousel
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});