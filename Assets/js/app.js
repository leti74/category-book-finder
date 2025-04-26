

let input = document.querySelector('.js-input'); 
const button = document.querySelector('.js-button'); 
const result = document.querySelector('.js-result'); 

button.addEventListener('click', async () => {
    let categoria = input.value; // Recupera il valore dell'input

     // Svuota i risultati precedenti
     result.innerHTML = '';

     if (!categoria || categoria == undefined) {
        result.innerHTML = '<p>Inserisci una categoria valida.</p>';
        return;
    }

    try {
        let response = await fetch( 'https://openlibrary.org/subjects/' + categoria + '.json', {
            method: 'GET',
        });
        let data = await response.json();
       
        // Itera attraverso i libri e aggiungi il titolo e gli autori al DOM

        data.works.forEach((work) => {
            let title = work.title;
            let keyBooks = work.key;
            let authors = work.authors.map(author => author.name).join
            (', '); // Lista di autori come stringa
            
            // Crea un elemento HTML per il risultato
            let resultItem = document.createElement('div');
            resultItem.classList.add('result-item')
            resultItem.innerHTML = `
            <div class = "info-book">
            <h2 class= "js-title">${title}</h2>
            <p> ${authors}</p>
            </div>`;

            result.appendChild(resultItem);


            // Aggiungi evento click per il titolo del libro
            
            let titleBook = resultItem.querySelector('.js-title');

            titleBook.addEventListener('click', async () => {

                

                try {
                    let bookResponse = await fetch('https://openlibrary.org' + keyBooks +'.json', {
                    method: 'GET',
                    });
                    let dataBook = await bookResponse.json();
                    console.log(dataBook)
                    let descriptionBook = dataBook.description?
                    (typeof dataBook.description === 'string' ? dataBook.description : dataBook.description.value) : 'descrizione non disponibile'

                

            // Mostra descrizione del libro
                 let resultDescription = resultItem.querySelector('.js-description');
                 if (!resultDescription) {
                resultDescription = document.createElement('div');
                resultDescription.classList.add('js-description')
                resultDescription.innerHTML= 
                `<p> ${descriptionBook} </p>`
                resultItem.appendChild(resultDescription)}
            
            } catch (error) {
                console.log('Errore:', error);
                let resultDescription = document.createElement('div');
                resultDescription.classList.add('js-description');
                resultDescription.innerHTML = `<p>Errore nel recupero della descrizione.</p>`;
                titleBook.appendChild(resultDescription);
            }
        }) 

        }); 

    } catch (error) {
            console.log('Errore:', error);
            result.innerHTML = '<p>Si è verificato un errore. Riprova più tardi.</p>';
        }
    });


input.addEventListener ('keydown', (e) => {
    if (e.key === 'Enter') {
        button.click()
    }
})

            
       
   








