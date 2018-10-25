

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

       //Suchfunktion
       let suche = document.querySelector("#Suche");
       suche.addEventListener("enter", suche);

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
        let placeholder = document.querySelector("#Suche").getAttribute("placeholder");

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

            let active = document.querySelector("#Rezeptliste");
            active.innerHTML = "";
            let recipe = "";


            switch(placeholder){
              case "Schnelle Rezepte...":
               recipe =  await recipes.search("Schnelle Rezepte");
              break;
              case "Vegetarische Rezepte...":

               recipe =  await recipes.search("Vegetarische Rezepte");
              break;
              case "Mediterrane Rezepte...":

               recipe =  await recipes.search("Mediterrane Rezepte");
              break;
              case "Pizza und Pasta...":

               recipe =  await recipes.search("Pizza und Pasta");
              break;
              case "Alle Rezepte...":

               recipe =  await recipes.search();
              break;
              case "Scharfe Rezepte...":

               recipe =  await recipes.search("Scharfe Rezepte");
              break;
            }
            rezepte_erstellen(recipe);
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
            input.setAttribute("placeholder", "Schnelle Rezepte...");
             recipe =  await recipes.search("Schnelle Rezepte");
            break;
            case "vegetarische_Rezepte.jpg":
            input.setAttribute("placeholder", "Vegetarische Rezepte...");
             recipe =  await recipes.search("Vegetarische Rezepte");
            break;
            case "mediterrane_Rezepte.jpg":
            input.setAttribute("placeholder", "Mediterrane Rezepte...");
             recipe =  await recipes.search("Mediterrane Rezepte");
            break;
            case "Pizza_Pasta.jpg":
            input.setAttribute("placeholder", "Pizza und Pasta...");
             recipe =  await recipes.search("Pizza und Pasta");
            break;
            case "alle_Rezepte.jpg":
            input.setAttribute("placeholder", "Alle Rezepte...");
             recipe =  await recipes.search();
            break;
            case "scharfe_Rezepte.jpg":
            input.setAttribute("placeholder", "Scharfe Rezepte...");
             recipe =  await recipes.search("Scharfe Rezepte");
            break;
          }
          rezepte_erstellen(recipe);
        }

    //Funktion, wenn man auf das CapatinCook Logo klickt wieder zurück auf die Startseite kommt
    let backtoHome = () =>{
        //zuerst die aktive Klasse raussuchen und ihr wieder die Klassen hidden geben
        let activClass = document.querySelector(".active");
        activClass.classList.remove("active");
        activClass.classList.add("hidden");

        //der Dropdown Box auch die Klasse hidden geben
        let dropdown = document.querySelector("#dropdown");
        dropdown.classList.add("hidden");

        //der Startseite wieder die Klasse active geben
        let Startseite = document.querySelector("#Startseite");
        Startseite.classList.remove("hidden");
        Startseite.classList.add("active");

        //Wert der Suchleiste zurücksetzen
        let input = document.querySelector("#Suche");
        input.value = "";
        input.setAttribute("placeholder", "Suche...");

        // Suchleiste sichtbar machen
        let Suchleiste = document.querySelector("#Suche");
        Suchleiste.classList.remove("hidden");

        //Hinzufügen-Button sichtbar machen
        let hinzufügen = document.querySelector("#Neu");
        hinzufügen.classList.remove("hidden");

        // Die Seite von der aus Home gedrückt wird, wird gecleared
        activClass.innerHTML ="";
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

       // Suchleiste unsichtbar machen
       let Suchleiste = document.querySelector("#Suche");
       Suchleiste.classList.add("hidden");

       //Hinzufügen-Button unsichtbar machen
       let hinzufügen = document.querySelector("#Neu");
       hinzufügen.classList.add("hidden");

       // Datenbank holen
       let recipe = new Recipes();

       // aktuelles Rezept holen
       let aktuelles_Rezept = recipe.getById(parseInt(id));

       // Values aus dem Promise-Objekt holen
       aktuelles_Rezept.then(function(result) {

         // Section holen
         let Rezeptansicht = document.querySelector("#Rezept_anzeigen");

         // div für Zutaten aus Datenbank erstellen
         let zutaten = document.createElement("div");
         zutaten.textContent = result["ingredients"];

         // Rezept anzeige
         let rezept = document.createElement("div");
         rezept.setAttribute("id", result["id"]);

         // Bild
         let bild = document.createElement("img");
         let pfad = "file:///" + result["picture"];
         bild.setAttribute("src", pfad);

         //In Suchleiste aktuellen Rezeptnamen eintragen
         let input = document.querySelector("#Suche");
         input.setAttribute("value", rezeptname);

         // Tabelle erstellen
         let tabelle = document.createElement("table");
         tabelle.setAttribute("class","tabelle_rezeptliste");
         // Zeile erstellen
         let tr = document.createElement("tr");
         // Spalte erstellen
         let td1 = document.createElement("td");
         let td2 = document.createElement("td");

         // p erstellen
         let p1 = document.createElement("p");
         p1.textContent = "Zutaten:";

         // p2 Anleitung erstellen
         let p2 = document.createElement("div");
         p2.textContent = "Kochanleitung:"

         // div für Kochanleitung erstellen
         let anleitungsbox = document.createElement("div");
         anleitungsbox.setAttribute("id","anleitungsbox");

         // p für Kochanleitung erstellen und mit Daten aus db füllen
         let anleitung = document.createElement("div")
         anleitung.setAttribute("id","kochanleitung");
         anleitung.textContent = result["description"];

         // dranhängen
         td1.appendChild(bild);
         td2.appendChild(p1);
         td2.appendChild(zutaten);
         tr.appendChild(td1);
         tr.appendChild(td2);
         tabelle.appendChild(tr);
         rezept.appendChild(tabelle);
         anleitungsbox.appendChild(p2);
         anleitungsbox.appendChild(anleitung);

         // Section Tabelle und Div übergeben
         Rezeptansicht.appendChild(rezept);
         Rezeptansicht.appendChild(anleitungsbox);
     });

       //Inhalt der Listenansicht löschen
       if(aktuelleSeite.getAttribute("id") === "Rezeptliste"){
         aktuelleSeite.innerHTML = "";
       }
    }

    //Rezepte nach Alphabet sortieren
    let sortbyA = async () => {

        //Datenbank initialisieren
        recipes = new Recipes();

        //Platzhalter aus Inputfeld auslesen
        let placeholder = document.querySelector("#Suche").getAttribute("placeholder");

        //Auswählen, welche Kategorie gesucht werden muss
        placeholder = placeholder_switch(placeholder);

        //Array befüllen mit Rezepten die aus der Kategorie entsprechen dessen Wert das Inputfeld hat
        let sortiere = await recipes.search(input);

        //wenn man sich auf der Kategegorie alle Rezepte befindet werden alle Rezepte in sortiere geschrieben
        if( input === "Alle Rezepte"){
            sortiere = await recipes.search();
        }
        else{
        //Funktion um Objekte nach ihrem recipename zu sortieren
            function compare (a,b){
                const erstesR = a.recipename.toUpperCase();
                const zweitesR = b.recipename.toUpperCase();

                let comparison = 0;
                //Tauscht sie bei eins
                if (erstesR > zweitesR){
                    comparison = 1;
                }
                //Tauscht nicht bei -1
                else if (erstesR < zweitesR){
                    comparison = -1;
                }

                return comparison;
            }
        }

        sortiere.sort(compare);
        //stellt Rezepte dar
        rezepte_erstellen(sortiere);

    }

    //Rezept nach zuletzt hinzugefügt sortieren
    let sortbyD = async () => {

        //Datenbank initialisieren
        recipes = new Recipes();

        //Platzhalter aus Inputfeld auslesen
        let placeholder = document.querySelector("#Suche").getAttribute("placeholder");

        //Auswählen, welche Kategorie gesucht werden muss
        placeholder = placeholder_switch(placeholder);

        //Array befüllen mit Rezepten die aus der Kategorie entsprechen dessen Wert das Inputfeld hat
        let sortiere = await recipes.search(input);

        //Funktion um Objekte nach ihrer Id umgekehrt zu Sortieren
        if( input === "Alle Rezepte"){
            sortiere = await recipes.search();
        }
            sortiere.reverse();
            rezepte_erstellen(sortiere);


    }

    //Function um Rezepte anzuzeigen
    let rezepte_erstellen = (rezeptsammlung) => {

        let rezeptliste = document.querySelector("#Rezeptliste");
        rezeptliste.innerHTML = "";

        for(let i = 0; i < rezeptsammlung.length; i++){
          let aktuelles_Rezept = rezeptsammlung[i];
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
    };

    //Function für die Suchleiste dass nur die Begriffe angezeigt werden die eingegeben wurden
    let suche = () => {
        let input = document.querySelector("#Suche").value;
        let activeClass = document.querySelector(".active");
        let name = "";
        if ( activeClass.getAttribute("id") === "Startseite" ){
            let recipe = new Recipes();
            let allrecipes = recipe.search(input);
            allrecipes.then(function(result) {
                rezepte_erstellen(result);
            });

            let Startseite = document.querySelector("#Startseite");
            Startseite.classList.remove("active");
            Startseite.classList.add("hidden");
            let Rezeptliste = document.querySelector("#Rezeptliste");
            Rezeptliste.classList.remove("hidden");
            Rezeptliste.classList.add("active");
        }
        else {
            let rezeptesammlung = activeClass.childNodes;

            for(let i = 0; i < rezeptesammlung.length;i++){
                name = rezeptesammlung[i].childNodes[1].innerHTML;
                if( name.includes(input)){
                    rezeptesammlung[i].style.display = "";
                }
                else {
                    rezeptesammlung[i].style.display = "none";
                }

            }
        }
    };

    // Placeholder je nach Kategorie anderen Wert zuweisen
    let placeholder_switch = (placehold) =>{
        let placeholder = document.querySelector("#Suche").getAttribute("placeholder");

        switch(placeholder){
          case "Schnelle Rezepte...":
           input = "Schnelle Rezepte";
          break;
          case "Vegetarische Rezepte...":
            input = "Vegetarische Rezepte";
          break;
          case "Mediterrane Rezepte...":
            input = "Mediterrane Rezepte";
          break;
          case "Pizza und Pasta...":
           input = ("Pizza und Pasta");
          break;
          case "Alle Rezepte...":
            input = "";
          break;
          case "Scharfe Rezepte...":
            input = "Scharfe Rezepte";
          break;
        }
    }
