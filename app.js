const { createApp } = Vue
  createApp({
    data() {
      return {
        isMobile:/Mobile/.test(navigator.userAgent),
        currentSection:'',
    }},
    mounted(){
       
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
        }

    }
  }).mount('#app')

// Click en botón "Regresar"
// Funcion que permite regresar a la posición incial de la página al hacer click sobre el
// botón "Regresar"
let topScrollBtn = document.getElementById("scroll-top-btn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topScrollBtn.style.display = "block";
  } else {
    topScrollBtn.style.display = "none";
  }
}
function scrollBack() {
  document.body.scrollTop = 0; //Safari
  document.documentElement.scrollTop = 0; //Chrome, Firefox, IE and Opera
}


// Click en botones de navegación
// La función acepta un parámetro Id al cual la vista se moverá al momento de hacer click 
// en el botón.
function scrollToElement(element, margin = window.innerHeight * 0.11){
  elemento = document.getElementById(element);
  elementoPosition = elemento.getBoundingClientRect().top; 
  offsetPosition = elementoPosition + window.screenY - margin;
  window.scrollTo({
    top: offsetPosition });
}


