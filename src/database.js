"use strict";

//import Dexie from "dexie/dist/dexie.js";

// Datenbankdefinition:
//
//   * ++id = Automatisch Hochgezählter Datenbankschlüssel
//   * artist, title = Indexfelder für WHERE-Abfragen und die Sortierung
//   * Alle anderen Felder müssen nicht deklariert werden!
//   * Vgl. http://dexie.org/docs/API-Reference
let database = new Dexie("CaptainCook");

database.version(1).stores({
    recipes: "++id, recipename, picture, categorie, description,ingredients",
});

/**
 * Datenbankzugriffsklasse für Songtexte. Diese Klasse bietet verschiedene
 * Methoden, um Songtexte zu speichern und wieder auszulesen. Im Hintergrund
 * wird hierfür Dexie zur lokalen Speicherung im Browser genutzt.
 */
class Recipes {

    /**
     * Einen neues Rezept speichern oder ein vorhandenes Rezept
     * aktualisieren. Das Rezept-Objekt sollte hierfür folgenden Aufbau
     * besitzen:
     *
     * {
     *     recipename: "Name des Rezepts",
     *     picture: "Bildpfad",
            categorie: " Kategorie",
            description: "Kochbeschreibung",
            ingredients: "Zutaten",
     *     format: "html",
     *     data: "HTML-String",
     * }
     *
     * @param  {Object}  recipe Zu speicherndes Rezept
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async saveNew(recipe) {
        return database.recipes.add(recipe);
    }
    /**
     * Bereits vorhandenen Songtext aktualisieren.
     * @param  {Object}  recipe Zu speicherndes Rezept
     * @return {Promise} Asynchrones Promise-Objekt
     */

    async update(recipe) {
        return database.recipes.put(recipe);
    }
    /**
     * Vorhandene Rezepte anhand seiner ID löschen.
     * @param  {String}  id ID des zu löschenden Rezepts
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async delete(id) {
        return database.recipes.delete(id);
    }

    /**
     * Löscht alle Songtexte!
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async clear() {
        return database.recipes.clear();
    }

    /**
     * Vorhandene Rezepte anhand seiner ID auslesen.
     * @param  {String}  id ID des zu lesenden Rezepts
     * @return {Promise} Asynchrones Promise-Objekt mit dem Rezept
     */
    async getById(id) {
        return database.recipes.get(id);
    }

    /**
     * Gibt eine Liste mit allen Rezepten zurück, deren Name oder Kategorie
     * den gesuchten Wert enthalten.
     *
     * @param  {String}  query Gesuchter Name oder Kategorie
     * @return {Promise} Asynchrones Promise-Objekt mit dem Suchergebnis
     */
    async search(query) {
        if (!query) query = "";
        query = query.toUpperCase();

        let result = database.recipes.filter(recipe => {
            let recipename = recipe.recipename.toUpperCase();
            let categorie  = recipe.categorie.toUpperCase();
            return recipename.search(query) > -1 || categorie.search(query) > -1;
        });

        return result.toArray();
    }
}
