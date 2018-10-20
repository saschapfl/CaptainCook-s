let switchtoaddRecipe = () =>{
    let Startseite = document.querySelector("#Startseite");
    Startseite.classList.remove("active");
    Startseite.classList.add("hidden");
    let Rezept_hinzufuegen = document.querySelector("#Rezept_hinzufuegen");
    Rezept_hinzufuegen.classList.remove("hidden");
    Rezept_hinzufuegen.classList.add("active");

}
let switchtolist = (source) =>{
      let Startseite = document.querySelector("#Startseite");
      Startseite.classList.remove("active");
      Startseite.classList.add("hidden");
      let Rezeptliste = document.querySelector("#Rezeptliste");
      Rezeptliste.classList.remove("hidden");
      Rezeptliste.classList.add("active");
      let dropdown = document.querySelector("#dropdown");
      dropdown.classList.remove("hidden");
      dropdown.classList.add("active");
      let image = source.getAttribute("src");
      switch(image){
        case "schnelle_Rezepte.jpg":
        alert("schnell");
        break;
        case "vegetarische_Rezepte.jpg":
        alert("veggi");
        break;
        case "mediterrane_Rezepte.jpg":
        alert("medi");
        break;
        case "Pizza_Pasta.jpg":
        alert("Pizza");
        break;
        case "alle_Rezepte.jpg":
        alert("alle");
        break;
        case "scharfe_Rezepte.jpg":
        alert("hot");
        break;

      }
    }

let backtoHome = () =>{
    let activClass = document.querySelector(".active");
    activClass.classList.remove("active");
    activClass.classList.add("hidden");

    let Startseite = document.querySelector("#Startseite");
    Startseite.classList.remove("hidden");
    Startseite.classList.add("active");
}


let switchtoRecipe = (event) =>{
    let aktuelleSeite = document.querySelector(".active");
    aktuelleSeite.classList.remove("active");
    aktuelleSeite.classList.add("hidden");
    let Rezeptansicht = document.querySelector("#Rezept_anzeigen");
    Rezeptansicht.classList.remove("hidden");
    Rezeptansicht.classList.add("active");
    let name = event.target.getAttribute("id");
    alert(name);

}


window.addEventListener("load", () => {
   let modal = document.querySelector(".modal");
   let trigger = document.querySelector(".trigger");
   let closeButton = document.querySelector(".close-button");
   let rezeptliste = document.querySelectorAll("#Rezeptliste > div");
   for(let i = 0; i < rezeptliste.length;i++){
     rezeptliste[i].addEventListener("click", switchtoRecipe);
   }
   let toggleModal = () =>{
          modal.classList.toggle("show-modal");
   }
   let windowOnClick = (event) =>{
       if (event.target === modal) {
           toggleModal();
       }
   }

   trigger.addEventListener("click", toggleModal);
   closeButton.addEventListener("click", toggleModal);
   window.addEventListener("click", windowOnClick);
});
