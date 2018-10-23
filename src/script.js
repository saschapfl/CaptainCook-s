

    window.addEventListener("load", () => {

        let Standardrezepte = async () => {
            let recipes = new Recipes();
            let recipe =  await recipes.search();
            console.log("Gespeicherte Rezepte:", recipe);

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
        //Modal,trigger,closeButton,saveButton,rezepliste holen
       let modal = document.querySelector(".modal");
       let trigger = document.querySelector(".trigger");
       let closeButton = document.querySelector(".close-button");
       let saveButton = document.querySelector(".save");
       let rezeptliste = document.querySelectorAll("#Rezeptliste > div");
       // Allen Kategorien auf der HP einen Eventlistener adden
       for(let i = 0; i < rezeptliste.length;i++){
         rezeptliste[i].addEventListener("click", switchtoRecipe);
       }
       // Zum öffnen un schließen
       let toggleModal = () =>{
              modal.classList.toggle("show-modal");
       }
       let windowOnClick = (event) =>{
           if (event.target === modal) {
               toggleModal();
           }
       }
       // Dexie
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

    let deleteRecipe = async (event) => {
        // Angeklicktes <img>: evt.target
        // Click-Event nicht an übergeordnetes Element weiterreichen,
        // weil sonst das Rezept aufgerufen werden würde
        event.stopPropagation();
        // Soll das Rezept wirklich gelöscht werden?
        if (confirm("Möcheten Sie das Rezept wirklich löschen?") == true) {
            // id des zu löschendem Rezept holen
            let id = event.target.parentNode.parentNode.getAttribute("id");
            // Raushauen
            let recipes = new Recipes();
            recipes.delete(id);
            //Is das Rezept gelöscht?
            let recipe =  await recipes.search();
            console.log("Gespeicherte Rezepte:", recipe);
        }else {
            //mach nix :)
        }
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
          source = source.childNodes;
          let input = document.querySelector("#Suche");
          let image = source[0].getAttribute("src");
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
       let rezeptname = event.currentTarget.childNodes[3].innerHTML;

       //In Suchleiste aktuellen Rezeptnamen eintragen
       let input = document.querySelector("#Suche");
       input.setAttribute("value", rezeptname);
    }
