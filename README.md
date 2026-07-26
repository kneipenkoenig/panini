# StickerTausch 2026

Mobile Webapp zum Verwalten von gesuchten und doppelten WM-2026-Stickern mit zentraler Speicherung über Cloudflare Pages + D1.

## Aktuelle App-Version

- `0.5.12`

## Was jetzt funktioniert

- eigene Sammlung pro Person, geschützt durch persönliche PIN (bis zu 10 Personen)
- Admin-Bereich ("Personen"-Tab) zum Anlegen, Bearbeiten (Name/PIN) und Entfernen von Personen
- Tauschbörse ("Tausch"-Tab): zeigt pro Person, wer doppelte Sticker hat, die sie sucht, und wer ihre eigenen Dubletten gebrauchen könnte
- mobile Einzeleingabe und Batch-Eingabe
- Filter nach Team und Suche nach Nummer
- öffentlicher Freigabelink pro Person für Tauschpartner außerhalb der Gruppe
- Speicherung in Cloudflare D1 statt nur im Browser
- als PWA installierbar (Homescreen-Icon, Offline-Shell, Standalone-Fenster)

## Projektstruktur

- `index.html` - Oberfläche
- `styles.css` - Design und mobile UI
- `app.js` - Frontend-Logik, API-Anbindung, Freigabelink, PWA-Installation
- `manifest.webmanifest` - PWA-Manifest (Name, Icons, Theme)
- `sw.js` - Service Worker für Offline-App-Shell
- `icons/` - App-Icons (inkl. maskable-Varianten und Apple-Touch-Icon)
- `functions/api/*.js` - Cloudflare Pages Functions
- `db/migrations/0001_init.sql`, `0002_multi_person.sql` - D1-Schema-Referenz (die eigentliche Migration läuft automatisch bei jedem Request über `functions/api/_lib/db.js`)
- `.openai/hosting.json` - logische Sites-/D1-Bindings

## Benötigte Runtime-Variablen

- `ADMIN_PIN` - deine persönliche PIN als Admin. Damit kannst du dich einloggen, deine eigene Sammlung pflegen und im "Personen"-Tab weitere Personen (max. 10 insgesamt) mit eigener PIN anlegen oder entfernen. Deren PINs werden in der D1-Datenbank gespeichert, nicht als eigene Runtime-Variable.

## Cloudflare-Einrichtung

1. Ein Pages-Projekt für diesen Ordner anlegen.
2. Eine D1-Datenbank an das Projekt binden, Binding-Name `DB`.
3. Runtime-Variable `ADMIN_PIN` setzen.
4. Projekt deployen.

## Wichtiger Hinweis

Die zentrale Speicherung funktioniert erst nach dem Deployment auf Cloudflare Pages mit angebundener D1-Datenbank. Das bloße Öffnen von `index.html` als Datei reicht dafür nicht mehr.
