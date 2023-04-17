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