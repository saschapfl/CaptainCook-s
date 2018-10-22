

    window.addEventListener("load", () => {

        let Standardrezepte = async () => {
            let recipes = new Recipes();
            await recipes.clear();

                await Promise.all([
                    recipes.saveNew({
                        recipename: "Pizza",
                        picture: "pic",
                        categorie: "Pizza&Pasta",
                        description: "so mache ich Pizza",
                        ingredients: "das ist drin",
                        format: "html",

                    }),

                ]);
            }

        Standardrezepte();

   let modal = document.querySelector(".modal");
   let trigger = document.querySelector(".trigger");
   let closeButton = document.querySelector(".close-button");
   let saveButton = document.querySelector(".save");
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
   let addRecipe = async () => {
    let recipes = new Recipes();
    recipes.saveNew({
        recipename: document.querySelector("#rname").value,
        picture: document.querySelector("#bpfad").value,
        categorie: document.querySelector("#kat").value,
        description: document.querySelector("#kochleitung").value,
        ingredients: document.querySelector("#Zutaten").value,
        format: "html",



    })
    let modal = document.querySelector(".modal")
    modal.classList.toggle("show-modal");
    let recipe =  await recipes.search();
    console.log("Gespeicherte Rezepte:", recipe);
   }

   trigger.addEventListener("click", toggleModal);
   closeButton.addEventListener("click", toggleModal);
   saveButton.addEventListener("click", addRecipe);
   window.addEventListener("click", windowOnClick);
    });

    let deleteRecipe = (source) =>{

    }

    let switchtolist = async (source) =>{
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
          let recipe = "";
          switch(image){
            case "schnelle_Rezepte.jpg":
            input.setAttribute("value", "Schnelle Rezepte");
             recipe =  await recipes.search("Schnelle Rezepte");
            break;
            case "vegetarische_Rezepte.jpg":
            input.setAttribute("value", "Vegetarische Rezepte");
             recipe =  await recipes.search("Vegetarische Rezepte");
            break;
            case "mediterrane_Rezepte.jpg":
            input.setAttribute("value", "Mediterrane Rezepte");
             recipe =  await recipes.search("Mediterrane Rezepte");
            break;
            case "Pizza_Pasta.jpg":
            input.setAttribute("value", "Pizza und Pasta");
             recipe =  await recipes.search("Pizza und Pasta");
            break;
            case "alle_Rezepte.jpg":
            input.setAttribute("value", "Alle Rezepte");
             recipe =  await recipes.search("Alle Rezepte");
            break;
            case "scharfe_Rezepte.jpg":
            input.setAttribute("value", "Scharfe Rezepte");
             recipe =  await recipes.search("Scharfe Rezepte");
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
