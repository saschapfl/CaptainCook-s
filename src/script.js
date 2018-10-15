let switchtoaddRecipe = () =>{
    let a = document.querySelector("#Rezept_hinzufuegen");
    a.classList.remove("hidden");

}
let switchtolist = (source) =>{
      let Startseite = document.querySelector("#Startseite");
      Startseite.classList.remove("active");
      Startseite.classList.add("hidden");
      let Rezeptliste = document.querySelector("#Rezeptliste");
      Rezeptliste.classList.remove("hidden");
      Rezeptliste.classList.add("active");
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
