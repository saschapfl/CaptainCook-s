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

let deleteRecipe = (source) =>{
  
}

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

      //Eingabefeld holen und je nach Bild Wert anpassen
      let input = document.querySelector("#Suche");
      let image = source.getAttribute("src");
      switch(image){
        case "schnelle_Rezepte.jpg":
        input.setAttribute("value", "Schnelle Rezepte");
        break;
        case "vegetarische_Rezepte.jpg":
        input.setAttribute("value", "Vegetarische Rezepte");
        break;
        case "mediterrane_Rezepte.jpg":
        input.setAttribute("value", "Mediterrane Rezepte");
        break;
        case "Pizza_Pasta.jpg":
        input.setAttribute("value", "Pizza und Pasta");
        break;
        case "alle_Rezepte.jpg":
        input.setAttribute("value", "Alle Rezepte");
        break;
        case "scharfe_Rezepte.jpg":
        input.setAttribute("value", "Scharfe Rezepte");
        break;

      }
    }

let backtoHome = () =>{
    let activClass = document.querySelector(".active");
    activClass.classList.remove("active");
    activClass.classList.add("hidden");

    let dropdown = document.querySelector("#dropdown");
    dropdown.classList.add("hidden");

    let Startseite = document.querySelector("#Startseite");
    Startseite.classList.remove("hidden");
    Startseite.classList.add("active");

    //Wert der Suchleiste zurücksetzen
    let input = document.querySelector("#Suche");
    input.setAttribute("value", "");
}


let switchtoRecipe = (event) =>{
  //Seite switchen
   let aktuelleSeite = document.querySelector(".active");
   aktuelleSeite.classList.remove("active");
   aktuelleSeite.classList.add("hidden");
   let Rezeptansicht = document.querySelector("#Rezept_anzeigen");
   Rezeptansicht.classList.remove("hidden");
   Rezeptansicht.classList.add("active");

   //Dropdown-Button verstecken
   let dropdown = document.querySelector("#dropdown");
   dropdown.classList.add("hidden");

   //Das gewünschte Rezept initialisieren
   let id = event.currentTarget.getAttribute("id");

   //In Suchleiste aktuellen Rezeptnamen eintragen
   let input = document.querySelector("#Suche");
   input.setAttribute("value", );
}
