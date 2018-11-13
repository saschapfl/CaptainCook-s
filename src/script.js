

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
           let h2 = document.querySelector("#h2");
           h2.innerHTML = "Rezept hinzuf&uuml;gen";
           if (document.querySelector("#update")!= null) {
              document.querySelector("#update").remove();
              let button = document.createElement("button");
              button.setAttribute("class","save");
              button.textContent = "speichern";
              button.addEventListener("click", addRecipe);
              let th = document.querySelector("#saveupdate");
              th.appendChild(button);
            }
              modal.classList.toggle("show-modal");
              fehler = document.querySelector("#fehler")
              fehler.innerHTML ="";
              document.querySelector("#rname").value = "";
              document.querySelector("#bpfad").value = "";
              document.querySelector("#kat").value = "Kategorie auswählen...";
              document.querySelector("#kochleitung").value = "";
              document.querySelector("#Zutaten").value = "";
       }
       let windowOnClick = (event) =>{
           if (event.target === modal) {
               toggleModal();
           }
       }
       // Dexie
       let addRecipe = async () => {
        let recipes = new Recipes();
        let save = document.querySelector("#save");
        if(document.querySelector("#rname").value=="" ||
        document.querySelector("#kochleitung").value == "" ||
        document.querySelector("#Zutaten").value == ""){
            // div holen in das die Fehlermeldung soll
            let div = document.querySelector("#fehler");
            // Prüfen ob Pflichtfelder Inhalt haben!
            if (div.childNodes.length == 0 ){
                fehler = document.createElement("p");
                fehler.textContent = "Bitte füllen sie alle Eingabefelder aus!";
                fehler.setAttribute("id","fehler");
                fehler.style.color = "darkred";
                fehler.style.fontSize = "13pt";
                fehler.style.marginBottom = "0.2em";
                div.appendChild(fehler);
            }
        } else {
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
                document.querySelector("#rname").value = "";
                document.querySelector("#bpfad").value = "";
                document.querySelector("#kat").value = "Kategorie auswählen...";
                document.querySelector("#kochleitung").value = "";
                document.querySelector("#Zutaten").value = "";
            }
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

    let editRecipe = async (source) =>{
        source.stopPropagation();
        let id = source.target.parentNode.parentNode.getAttribute("id");
        //Nachdem der Button gedrückt wurde abgeänderte Daten in Datenbank speichern
        let update = async (source) =>{
             recipe.update({
              id: parseInt(id),
              recipename: document.querySelector("#rname").value,
              picture: document.querySelector("#bpfad").value,
              categorie: document.querySelector("#kat").value,
              description: document.querySelector("#kochleitung").value,
              ingredients: document.querySelector("#Zutaten").value,
            })
            // Modal schließen nach update
            let modal = document.querySelector(".modal");
            modal.classList.toggle("show-modal");
        }
          // holt das th aus dem html code mid id = saveupdate
          let th = document.querySelector("#saveupdate");
          // holt den fest im html gecodeten save button
          let button = document.querySelector(".save");
          // Sollte der Button da sein entferne ihn
          if (button != null){
              button.remove();
          }
          // Wenn kein Button für update im Modal vorhanden dann füge einen hinzu
          if (document.querySelector("#update") == null ) {
            let updateButton = document.createElement("button");
            updateButton.setAttribute("id","update");
            updateButton.setAttribute("class","save")
            updateButton.addEventListener("click", update);
            updateButton.textContent = "speichern";
            th.appendChild(updateButton);
          }
          // Datenbank holen
          let recipe = new Recipes();
          // aktuelles Rezept holen
          let aktuelles_Rezept = recipe.getById(parseInt(id));
          aktuelles_Rezept.then(function(result){
              //Input-Felder mit Daten aus der Datenbank befüllen
              document.querySelector("#rname").value = result["recipename"];
              document.querySelector("#bpfad").value = result["picture"];
              document.querySelector("#kat").value = result["categorie"];
              document.querySelector("#kochleitung").value = result["description"];
              document.querySelector("#Zutaten").value = result["ingredients"];
              let h2 = document.querySelector("#h2");
              h2.textContent = "Rezept bearbeiten";
              // Modal öffnen
              let modal = document.querySelector(".modal");
              modal.classList.toggle("show-modal");
          });

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
          dropdown.classList.add("active");

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
        //Wenn wir uns auf der Startseite befinden, tue nichts
        if(activClass.getAttribute("id") != "Startseite"){
            activClass.classList.remove("active");
            activClass.classList.add("hidden");

            //der Dropdown Box auch die Klasse hidden geben
            let dropdown = document.querySelector("#dropdown");
            dropdown.classList.remove("active");
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
         zutaten.innerHTML = result["ingredients"].replace(/\n/gi,"<br>");

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

         // p2 Anleitungsüberschrift erstellen
         let p2 = document.createElement("p");
         p2.textContent = "Kochanleitung:"

         // div für Kochanleitung erstellen
         let anleitungsbox = document.createElement("div");
         anleitungsbox.setAttribute("id","anleitungsbox");

         // p für Kochanleitung erstellen und mit Daten aus db füllen
         let anleitung = document.createElement("div")
         anleitung.setAttribute("id","kochanleitung");
         anleitung.innerHTML = result["description"].replace(/\n/gi,"<br>");

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

          //Edit-Beschriftung erstellen und Klassennamen für CSS setzen
          Beschriftung = document.createElement("span");
          Beschriftung.setAttribute("class", "edit");
          //Edit-Icon erstellen, klickbar machen und an Beschriftung dranhängen
          Bild = document.createElement("img");
          Bild.setAttribute("src", "edit.png");
          Bild.addEventListener("click", editRecipe);
          Beschriftung.appendChild(Bild);
          //Edit Beschriftung in div einfügen
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
        let placeholder = document.querySelector("#Suche").getAttribute("placeholder");
        let name = "";
        //Wenn sich User auf Startseite befindet, alle Rezepte durchsuchen
        /*Wenn direkt auf der Startseite nach Rezepten gesucht wird, folgt anderer Suchalgorithmus:
          Es werden alle Rezepte aus der Datenbank mit dem Suchbegriff abgeglichen
          und die passenden Rezepte auf der Listenansicht-Seite dargestellt */
        if ( placeholder === "Suche..." ){
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

    // Placeholder je nach Kategorie anderen Wert zuweisen!
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
