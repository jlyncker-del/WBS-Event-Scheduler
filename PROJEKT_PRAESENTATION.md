# Präsentation: Event Scheduler

## Folie 1: Titel

**Event Scheduler**

Eine React + Vite Frontend-Anwendung für ein lokales Event-Management-System.

**Sprechtext:**
In meinem Projekt habe ich eine Event-Scheduler-App gebaut. Die App ist ein Frontend mit React und Vite und kommuniziert mit einer lokalen Node.js/Express Events API. Nutzer können Events ansehen, Details öffnen, sich registrieren, einloggen und nach dem Login neue Events erstellen.

---

## Folie 2: Projektziel

**Ziel des Projekts**

- Events aus einer echten REST API laden
- Event-Details anzeigen
- Benutzer registrieren und einloggen
- JWT-Token im Browser speichern
- Geschützte Route für Event-Erstellung
- Fehlerzustände und Ladezustände sauber darstellen
- Responsives, professionelles UI

**Sprechtext:**
Das Ziel war nicht nur eine statische Oberfläche, sondern eine echte Frontend-Anwendung mit API-Anbindung. Besonders wichtig waren Authentifizierung, Token-Speicherung, geschützte Seiten und eine saubere User Experience mit Loading-, Empty- und Error-States.

---

## Folie 3: Tech Stack

**Verwendete Technologien**

- React
- Vite
- JavaScript
- React Router
- TailwindCSS
- Fetch API
- localStorage
- Lucide React Icons
- Node.js/Express Events API

**Sprechtext:**
Ich habe React für die Komponentenstruktur benutzt und Vite als schnelles Build-Tool. Für Routing verwende ich React Router. TailwindCSS nutze ich für das Styling. Die API-Anfragen laufen über eine eigene zentrale Fetch-Client-Datei. Der Login-Token wird im localStorage gespeichert.

---

## Folie 4: Hauptfunktionen

**Was die App kann**

- Startseite zeigt Events chronologisch sortiert
- Klick auf Event öffnet Detailseite
- Sign-up erstellt Benutzer über `POST /api/users`
- Sign-in loggt Benutzer über `POST /api/auth/login` ein
- Token wird unter `events_api_token` gespeichert
- `/create-event` ist geschützt
- Event-Erstellung sendet Authorization Header
- Logout entfernt den Token

**Sprechtext:**
Die wichtigsten User-Flows sind: Events anschauen, Details lesen, Account erstellen, einloggen und dann ein neues Event erstellen. Ohne Login kommt man nicht auf die Create-Event-Seite.

---

## Folie 5: App-Struktur

**Ordnerstruktur**

- `src/api` enthält die API-Kommunikation
- `src/components` enthält wiederverwendbare UI-Komponenten
- `src/context` verwaltet Authentifizierung global
- `src/hooks` enthält eigene React Hooks
- `src/pages` enthält die einzelnen Seiten
- `src/utils` enthält Hilfsfunktionen für Event-Daten

**Sprechtext:**
Ich habe das Projekt bewusst modular aufgebaut. API-Code, UI-Komponenten, Seiten, Context und Hilfsfunktionen sind getrennt. Dadurch ist der Code wartbarer und einfacher zu erklären.

---

## Folie 6: API-Anbindung

**Zentraler API Client**

- Basis-URL kommt aus `VITE_API_BASE_URL`
- Kein Hardcoding in Komponenten
- JSON Requests und Responses werden zentral verarbeitet
- Fehler werden als `ApiError` geworfen
- Auth-Header wird automatisch gesetzt
- Netzwerkfehler bekommen verständliche Fehlermeldung

**Sprechtext:**
Die wichtigste technische Entscheidung war, API-Anfragen nicht direkt in den Komponenten zu schreiben. Stattdessen habe ich `src/api/client.js` gebaut. So haben alle Requests dieselbe Fehlerbehandlung und Authentifizierung.

---

## Folie 7: Authentifizierung

**Login und Token**

- Login sendet Email und Passwort an die API
- API liefert einen JWT-Token zurück
- Token wird in `localStorage` gespeichert
- `AuthContext` stellt Login-Status global bereit
- Bei ungültigem Token wird automatisch ausgeloggt

**Sprechtext:**
Nach dem Login speichert die App den Token im Browser. Beim Neuladen bleibt man dadurch eingeloggt. Wenn die API einen Fehler wie 401 oder 403 zurückgibt, wird der Token gelöscht und der Nutzer wird wieder zur Sign-in-Seite geleitet.

---

## Folie 8: Routing

**Routen der Anwendung**

- `/` Startseite mit Eventliste
- `/events/:id` Eventdetails
- `/signup` Registrierung
- `/signin` Login
- `/create-event` geschützte Event-Erstellung
- `/not-found` Fehlerseite
- `*` leitet auf `/not-found`

**Sprechtext:**
Das Routing wird zentral in `App.jsx` definiert. Alle Seiten liegen innerhalb des Layouts mit Navbar. Die Create-Event-Seite ist zusätzlich in `ProtectedRoute` eingebettet.

---

## Folie 9: UI und Design

**Design-Entscheidungen**

- Farbpalette mit Dunkelgrün, Gold und Cream
- Dark-Green-Gradient nur im Header/Hero
- Weiße Karten mit dezenten Gold-Borders
- Keine Hover-Animationen bei Cards
- Formulare mit klaren Labels
- Responsives Layout für Mobile und Desktop

**Sprechtext:**
Beim Design habe ich eine ruhige, professionelle Oberfläche umgesetzt. Die Farben sind konsistent: Grün für Struktur und Vertrauen, Gold für Akzente, Cream für den Hintergrund. Die Event-Cards sind bewusst ruhig gehalten und bewegen sich nicht beim Hover.

---

## Folie 10: Fehlerbehandlung

**Behandelte Zustände**

- API nicht erreichbar
- Ladezustand
- Leere Eventliste
- Ungültige Login-Daten
- Validierungsfehler im Formular
- Event nicht gefunden
- Ungültige Event-ID
- Abgelaufener oder ungültiger Token

**Sprechtext:**
Ich habe versucht, nicht nur den Erfolgsfall zu bauen. Die App zeigt verständliche Meldungen, wenn Daten laden, leer sind oder Fehler auftreten. Das macht die Anwendung robuster und nutzerfreundlicher.

---

## Folie 11: Event-Erstellung

**Geschützter Create Flow**

- Nur eingeloggte Nutzer können `/create-event` öffnen
- Formular validiert Titel, Datum und Location
- Datum wird als ISO-String an die API gesendet
- Token wird automatisch als Bearer Token mitgeschickt
- Nach Erfolg Weiterleitung zur neuen Event-Detailseite

**Sprechtext:**
Bei der Event-Erstellung prüfe ich zuerst die Pflichtfelder. Danach sende ich das Event an die API. Weil der API Client den Token automatisch anhängt, muss die Seite selbst den Header nicht manuell setzen.

---

## Folie 12: Tests und Verifikation

**Geprüft**

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`
- API-Verbindung zu `localhost:3001`
- Registrierung über API
- Login mit Token
- Eventliste und Event-Erstellung

**Sprechtext:**
Zum Schluss habe ich geprüft, dass die App startet, baut und mit der API kommuniziert. Außerdem habe ich Merge-Konflikte entfernt, weil sie den Build blockiert hatten.

---

## Folie 13: Herausforderungen

**Was schwierig war**

- API-Schema genau einhalten
- Token sauber speichern und löschen
- Authentifizierte Requests zentral lösen
- Unterschiedliche API-Response-Formate normalisieren
- Merge-Konflikte bereinigen
- Responsive Design ohne überladenes UI

**Sprechtext:**
Eine Herausforderung war, dass die API Events paginiert zurückgibt. Deshalb musste ich im Event-Mapping auch `results` auslesen. Außerdem war wichtig, Auth-Fehler zentral zu behandeln, damit der Nutzer nicht in einem ungültigen Login-Zustand bleibt.

---

## Folie 14: Fazit

**Was ich gelernt habe**

- Strukturierte React-Projektarchitektur
- Arbeiten mit REST APIs
- Authentifizierung mit JWT und localStorage
- Protected Routes in React Router
- Wiederverwendbare Komponenten
- Professionelles Error Handling
- Deployment-Vorbereitung mit Umgebungsvariablen

**Sprechtext:**
Durch dieses Projekt habe ich gelernt, wie man ein React-Frontend sauber mit einer echten REST API verbindet. Besonders wichtig waren für mich die Trennung von API-Logik und UI, die Authentifizierung und die robuste Fehlerbehandlung.

---

# Datei-für-Datei-Erklärung

## Root-Dateien

### `.env.example`
Hier habe ich die benötigte Umgebungsvariable dokumentiert:

```text
VITE_API_BASE_URL=http://localhost:3001
```

Damit weiß jeder Entwickler, welche API-URL die App erwartet.

### `.gitignore`
Hier habe ich Dateien und Ordner eingetragen, die nicht ins Repository gehören, zum Beispiel `node_modules`, `dist`, Log-Dateien und lokale `.env` Dateien.

### `.oxlintrc.json`
Hier habe ich Regeln für den Linter definiert. Besonders wichtig sind React-Regeln wie `rules-of-hooks`, damit Hooks korrekt verwendet werden.

### `index.html`
Das ist die HTML-Einstiegsdatei von Vite. Dort gibt es das `div` mit `id="root"`, in das React die App rendert. Außerdem wird `src/main.jsx` geladen.

### `package.json`
Hier stehen Projektname, Scripts und Dependencies. Wichtige Scripts sind:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Außerdem sind hier React, React Router, TailwindCSS, Vite und Lucide Icons eingetragen.

### `package-lock.json`
Diese Datei wurde automatisch von npm erzeugt. Sie speichert die genauen Versionen der installierten Pakete, damit das Projekt auf anderen Rechnern gleich installiert wird.

### `postcss.config.js`
Hier werden TailwindCSS und Autoprefixer für die CSS-Verarbeitung eingebunden.

### `tailwind.config.js`
Hier habe ich die Tailwind-Konfiguration erweitert. Besonders wichtig ist die feste Farbpalette:

- Dunkelgrün
- Main Green
- Accent Green
- Gold
- Cream
- Secondary Text

Außerdem habe ich einen dezenten `soft` Shadow definiert.

### `vite.config.js`
Hier wird Vite für React konfiguriert. Das React Plugin sorgt dafür, dass JSX und React Fast Refresh funktionieren.

### `README.md`
Hier habe ich das Projekt dokumentiert: Beschreibung, Tech Stack, Features, Routen, API-Setup, Swagger, Seeding, Docker, Frontend-Setup, Umgebungsvariablen, Auth-Verhalten und Deployment-Hinweise.

### `DEVELOPMENT.md`
Hier habe ich einen professionellen Entwicklungsplan mit Pull-Request-Schritten dokumentiert. Das zeigt, wie man das Projekt sauber in Etappen entwickeln kann.

## Public und Assets

### `public/favicon.svg`
Das ist das Browser-Icon der App. Es wird in `index.html` eingebunden.

### `public/icons.svg`
Diese Datei enthält SVG-Symbole. Aktuell wird sie in der App nicht direkt verwendet und ist eher ein Rest-Asset.

### `src/assets/react.svg`
Das ist ein Standard-Asset aus dem Vite/React-Template. Aktuell wird es nicht in der App verwendet.

### `src/assets/vite.svg`
Das ist ebenfalls ein Standard-Asset aus dem Vite-Template. Aktuell wird es nicht verwendet.

### `src/assets/hero.png`
Das ist ein Bild-Asset. Aktuell wird es nicht importiert und nicht auf der Seite angezeigt.

## Einstieg und Routing

### `src/main.jsx`
Hier startet die React-App. Ich rendere `App` in das HTML-Element `root`. Außerdem wickle ich die App in:

- `StrictMode`
- `BrowserRouter`
- `AuthProvider`

Dadurch funktionieren Routing und globale Authentifizierung in der gesamten App.

### `src/App.jsx`
Hier habe ich alle Routen definiert:

- Home
- Event Details
- Sign Up
- Sign In
- Create Event
- Not Found

Außerdem ist `/create-event` durch `ProtectedRoute` geschützt.

### `src/index.css`
Hier habe ich Tailwind eingebunden und globale Basisstile gesetzt:

- Hintergrundfarbe Cream
- Textfarbe Dunkelgrün
- System-Font-Stack
- `box-sizing: border-box`
- kein horizontales Overflow

## API-Dateien

### `src/api/client.js`
Das ist der zentrale API Client. Hier habe ich umgesetzt:

- API Base URL aus `VITE_API_BASE_URL`
- Fallback auf `http://localhost:3001`
- JSON Parsing
- Fehlerbehandlung über `ApiError`
- Netzwerkfehler-Meldung
- automatische `Content-Type` Header
- automatische `Authorization: Bearer <token>` Header
- Token löschen bei Auth-Fehlern

### `src/api/auth.js`
Hier stehen die Auth-Requests:

- `signIn(credentials)` sendet Login-Daten an `/api/auth/login`
- extrahiert den Token aus der Response
- speichert den Token
- `signUp(user)` sendet Registrierungsdaten an `/api/users`

### `src/api/events.js`
Hier stehen die Event-Requests:

- `listEvents()` lädt alle Events
- `getEventById(id)` lädt ein einzelnes Event
- `createEvent(event)` erstellt ein neues Event mit Authentifizierung

Die Ergebnisse werden über `eventMapping.js` normalisiert.

### `src/api/storage.js`
Hier habe ich den Zugriff auf `localStorage` gekapselt:

- Token lesen
- Token speichern
- Token löschen

Der feste Key ist `events_api_token`.

## Context und Hooks

### `src/context/AuthContextValue.js`
Hier wird der React Context für Authentifizierung erstellt. Die Datei trennt den reinen Context von der Provider-Logik.

### `src/context/AuthContext.jsx`
Hier habe ich den `AuthProvider` gebaut. Er:

- liest den Token beim App-Start
- stellt `isAuthenticated`, `token`, `signIn` und `signOut` bereit
- reagiert auf ungültige Tokens
- leitet bei abgelaufener Session zur Sign-in-Seite

### `src/hooks/useAuth.js`
Das ist ein eigener Hook, um einfach auf den AuthContext zuzugreifen. Wenn er außerhalb des Providers benutzt wird, wirft er eine klare Fehlermeldung.

### `src/hooks/useEvents.js`
Hier habe ich zwei Hooks gebaut:

- `useEvents()` lädt die Eventliste
- `useEvent(id)` lädt ein einzelnes Event

Beide Hooks verwalten `loading`, `error` und Datenzustand.

## Utility-Datei

### `src/utils/eventMapping.js`
Hier normalisiere ich API-Daten. Das ist wichtig, weil APIs manchmal verschiedene Feldnamen oder Wrapper nutzen.

Die Datei:

- liest Event-ID, Titel, Datum, Ort und Beschreibung
- unterstützt Arrays und paginierte Responses mit `results`
- sortiert Events chronologisch
- formatiert Datumswerte benutzerfreundlich

## Wiederverwendbare Komponenten

### `src/components/Layout.jsx`
Das Layout enthält die Navbar und den Hauptbereich. Alle Seiten werden über `Outlet` darin angezeigt.

### `src/components/Navbar.jsx`
Die Navbar zeigt:

- Logo/Branding
- Link zu Events
- wenn ausgeloggt: Sign in und Sign up
- wenn eingeloggt: Create und Sign out

Beim Logout wird der Token entfernt und zur Startseite navigiert.

### `src/components/ProtectedRoute.jsx`
Diese Komponente schützt private Routen. Wenn kein Login vorhanden ist, wird der Nutzer zu `/signin` weitergeleitet.

### `src/components/EventCard.jsx`
Diese Komponente zeigt ein Event als Karte:

- Status-Badge
- Titel
- Datum
- Location
- kurze Beschreibung

Ein Klick führt zur Detailseite des Events.

### `src/components/FormInput.jsx`
Das ist eine wiederverwendbare Formular-Komponente. Sie kann normale Inputs oder Textareas rendern und unterstützt:

- Label
- Hint
- Fehlermeldung
- einheitliches Styling

### `src/components/ErrorMessage.jsx`
Diese Komponente zeigt Fehler einheitlich an. Sie akzeptiert Strings oder Error-Objekte und zeigt nur etwas an, wenn wirklich eine Fehlermeldung vorhanden ist.

### `src/components/LoadingState.jsx`
Diese Komponente zeigt einen Ladezustand mit Spinner und Text.

### `src/components/EmptyState.jsx`
Diese Komponente zeigt eine leere Ansicht, wenn keine Events vorhanden sind.

## Seiten

### `src/pages/HomePage.jsx`
Das ist die Startseite. Sie:

- lädt Events mit `useEvents`
- zeigt Hero-Bereich
- zeigt Loading, Error oder Empty State
- rendert Events als Grid mit `EventCard`
- zeigt abhängig vom Login-Status einen passenden CTA

### `src/pages/EventDetailsPage.jsx`
Diese Seite zeigt ein einzelnes Event. Sie:

- liest die ID aus der URL
- prüft ungültige IDs
- lädt Eventdaten mit `useEvent`
- zeigt Loading, Error und Not Found States
- zeigt Eventbeschreibung, Datum und Location

### `src/pages/SignUpPage.jsx`
Diese Seite enthält das Registrierungsformular. Sie:

- verwaltet Formularwerte mit `useState`
- validiert Name, Email und Passwort
- sendet Daten an `signUp`
- leitet nach Erfolg zu `/signin`
- zeigt API-Fehler verständlich an

### `src/pages/SignInPage.jsx`
Diese Seite enthält das Loginformular. Sie:

- validiert Email und Passwort
- ruft `signIn` aus dem Auth Hook auf
- speichert dadurch den Token
- leitet nach Login zur vorherigen Route oder Startseite
- zeigt Login-Fehler an

### `src/pages/CreateEventPage.jsx`
Diese Seite ist geschützt. Sie:

- enthält Formularfelder für Titel, Datum, Ort und Beschreibung
- validiert Pflichtfelder
- konvertiert Datum in ISO-Format
- sendet Eventdaten an `createEvent`
- leitet nach Erfolg zur Detailseite des neuen Events

### `src/pages/NotFoundPage.jsx`
Diese Seite wird angezeigt, wenn eine Route nicht existiert. Sie bietet einen Link zurück zur Eventliste.

---

# Kurzer Demo-Ablauf für die Präsentation

1. Startseite öffnen: `http://127.0.0.1:5173/`
2. Eventliste zeigen und erklären, dass Events von der API kommen.
3. Eine Eventkarte öffnen und Detailseite erklären.
4. Zur Sign-up-Seite gehen und Formular erklären.
5. Zur Sign-in-Seite gehen und Token-Konzept erklären.
6. Nach Login die Navbar zeigen: Create und Sign out erscheinen.
7. `/create-event` öffnen und geschützte Route erklären.
8. Neues Event erstellen und Weiterleitung zur Detailseite zeigen.

---

# Kurzer Abschluss-Satz

Mit diesem Projekt habe ich gezeigt, dass ich ein React-Frontend strukturiert aufbauen, mit einer echten REST API verbinden, Authentifizierung umsetzen und eine professionelle responsive Benutzeroberfläche entwickeln kann.
