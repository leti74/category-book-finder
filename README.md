# Owly Libreria

**Owly** è un'app web che consente agli utenti di cercare libri in base alla categoria inserita. Utilizza l'API di Open Library per ottenere informazioni sui libri disponibili e visualizzarle in modo dinamico.

## Funzionalità
- 🔎 Ricerca di libri per categoria tramite Open Library API.
- 📖 Visualizzazione del titolo e degli autori.
- 📜 Espansione della descrizione del libro con un click.
- 🎨 Design semplice e intuitivo.

## Tecnologie utilizzate
- **HTML** - Struttura della pagina.
- **CSS** - Stile e design responsivo.
- **JavaScript (ES6)** - Logica dinamica e chiamate API.
- **Open Library API** - Fonte dei dati sui libri.

### **File principali**
- `index.html` - Struttura dell'app con input e pulsante di ricerca.
- `style.css` & `risultati-ricerca.css` - Stile e gestione dell'aspetto grafico.
- `script.js` - Logica di ricerca e gestione dei dati API.

##  Procedimento

### **Interfaccia utente (HTML & CSS)**
- Ho creato un **campo di input** in cui gli utenti possono inserire una categoria di libri.
- Ho aggiunto un **pulsante di ricerca** per avviare la richiesta API.
- Ho predisposto un'area dinamica (`.js-result`) dove i risultati vengono visualizzati.
- Ho curato il design con fogli di stile CSS per un aspetto pulito e leggibile.

### **Gestione della logica con JavaScript**
- Quando l'utente preme il pulsante, il mio script invia una **chiamata API** a Open Library per recuperare i libri di una certa categoria.
- Ogni libro trovato viene istanziato come oggetto della classe `Libro`.
- Ho estratto **titolo**, **autori** e **descrizione**, utilizzando `fetch()` per ottenere i dati in formato JSON.

### **API utilizzata**
Il progetto utilizza l'API Open Library:

- Ottenere libri di una categoria:

https://openlibrary.org/subjects/{categoria}.json

 -Ottenere la descrizione di un libro:

https://openlibrary.org/{keyBooks

