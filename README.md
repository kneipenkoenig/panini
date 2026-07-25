# StickerTausch 2026

Mobile Webapp zum Verwalten von gesuchten und doppelten WM-2026-Stickern mit zentraler Speicherung über Cloudflare Pages + D1.

## Aktuelle App-Version

- `0.2.2`

## Was jetzt funktioniert

- gemeinsame Sammlung für Handy und PC
- PIN-geschützte Bearbeitungsansicht
- mobile Einzeleingabe und Batch-Eingabe
- Filter nach Team und Suche nach Nummer
- öffentlicher Freigabelink für Tauschpartner
- Speicherung in Cloudflare D1 statt nur im Browser

## Projektstruktur

- `index.html` - Oberfläche
- `styles.css` - Design und mobile UI
- `app.js` - Frontend-Logik, API-Anbindung, Freigabelink
- `functions/api/*.js` - Cloudflare Pages Functions
- `db/migrations/0001_init.sql` - D1-Schema
- `.openai/hosting.json` - logische Sites-/D1-Bindings

## Benötigte Runtime-Variablen

- `ADMIN_PIN` - deine Bearbeitungs-PIN

## Cloudflare-Einrichtung

1. Ein Pages-Projekt für diesen Ordner anlegen.
2. Eine D1-Datenbank an das Projekt binden, Binding-Name `DB`.
3. Runtime-Variable `ADMIN_PIN` setzen.
4. Projekt deployen.

## Wichtiger Hinweis

Die zentrale Speicherung funktioniert erst nach dem Deployment auf Cloudflare Pages mit angebundener D1-Datenbank. Das bloße Öffnen von `index.html` als Datei reicht dafür nicht mehr.
