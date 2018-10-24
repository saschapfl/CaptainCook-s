

    window.addEventListener("load", () => {
        let Standardrezepte = async () => {
            let recipes = new Recipes();
            let recipe =  await recipes.search();
            console.log("Gespeicherte Rezepte:", recipe);
            }

        Standardrezepte();
        //Modal,trigger,closeButton,saveButton,rezepliste holen
       let modal = document.querySelector(".modal");
       let trigger = document.querySelector(".trigger");
       let closeButton = document.querySelector(".close-button");
       let saveButton = document.querySelector(".save");

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
        if (confirm("Möchten Sie das Rezept wirklich löschen?") == true) {
            // id des zu löschendem Rezept holen
            let id = event.target.parentNode.parentNode.getAttribute("id");
            // Raushauen
            let recipes = new Recipes();
            recipes.delete(parseInt(id));
            //Is das Rezept gelöscht?
        }else {
            //mach nix :)
        }
    }

    let switchtolist = async (source) =>{
          //Seite switchen
          let Startseite = document.querySelector("#Startseite");
          Startseite.classList.remove("active");
          Startseite.classList.add("hidden");
          let Rezeptliste = document.querySelector("#Rezeptliste");
          Rezeptliste.classList.remove("hidden");
          Rezeptliste.classList.add("active");

          //Sortieren-Button sichtbar machen
          let dropdown = document.querySelector("#dropdown");
          dropdown.classList.remove("hidden");

          //Datenbank initialisieren
          recipes = new Recipes();

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
             recipe =  await recipes.search();
            break;
            case "scharfe_Rezepte.jpg":
            input.setAttribute("value", "Scharfe Rezepte");
             recipe =  await recipes.search("Scharfe Rezepte");
            break;
          }
          for(let i = 0; i < recipe.length; i++){
            let aktuelles_Rezept = recipe[i];
            let Rezeptbereich = document.createElement("div");
            Rezeptbereich.setAttribute("id", aktuelles_Rezept["id"]);

            //Bild erstellen und einfügen
            let Bild = document.createElement("img");
            Bild.setAttribute("src", aktuelles_Rezept["picture"]);
            Rezeptbereich.appendChild(Bild);
            //Beschriftung erstellen und einfügen
            let Beschriftung = document.createElement("span");
            Beschriftung.textContent = aktuelles_Rezept["recipename"];
            Beschriftung.setAttribute("class", "Beschriftung");
            Rezeptbereich.appendChild(Beschriftung);
            //Löschen-Beschriftung erstellen und Klassennamen für CSS setzen
            Beschriftung = document.createElement("span");
            Beschriftung.setAttribute("class", "Löschen");
            //Löschen-Icon erstellen, klickbar machen und an Löschen-Beschriftung hängen
            Bild = document.createElement("img");
            Bild.setAttribute("src", "deleteIcon.png");
            Bild.addEventListener("click", deleteRecipe);
            Beschriftung.appendChild(Bild);
            //Beschriftung inclusive Löschen-Icon an Rezeptbereich hängen
            Rezeptbereich.appendChild(Beschriftung);
            //Rezeptbereich in Section einfügen
            Rezeptliste.appendChild(Rezeptbereich);
          }
          let rezepte = Rezeptliste.childNodes;
          for(let i = 0; i < rezepte.length;i++){
            rezepte[i].addEventListener("click", switchtoRecipe);
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

        //Inhalt der Listenansicht löschen
        if(activClass.getAttribute("id") === "Rezeptliste"){
          activClass.innerHTML = "";
        }
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
       let rezeptname = event.currentTarget.childNodes[1].innerHTML;

       //In Suchleiste aktuellen Rezeptnamen eintragen
       let input = document.querySelector("#Suche");
       input.setAttribute("value", rezeptname);

       //Inhalt der Listenansicht löschen
       if(aktuelleSeite.getAttribute("id") === "Rezeptliste"){
         aktuelleSeite.innerHTML = "";
       }
    }
