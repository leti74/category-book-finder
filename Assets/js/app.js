


let input = document.querySelector('.js-input'); 
const button = document.querySelector('.js-button'); 
const result = document.querySelector('.js-result'); 

button.addEventListener('click', async () => {
    let categoria = input.value; // Recupera il valore dell'input

     // Svuota i risultati precedenti
     result.innerHTML = '';

    try {
        let response = await fetch( 'https://openlibrary.org/subjects/' + categoria + '.json', {
            method: 'GET',
        });
        let data = await response.json();

        // Itera attraverso i libri e aggiungi il titolo e gli autori al DOM
        data.works.forEach((work) => {
            let title = work.title;
            let authors = work.authors.map(author => author.name).join(', '); // Lista di autori come stringa
            
            // Crea un elemento HTML per il risultato
            let resultItem = document.createElement('div');
            resultItem.classList.add('result-item')
            resultItem.innerHTML = `
            <h3>${title}</h3>
            <p>Autori: ${authors}</p>`;
            result.appendChild(resultItem);
        });
    } catch (error) {
        console.log('Errore:', error);
        result.innerHTML = '<p>Si è verificato un errore. Riprova più tardi.</p>';
    }
});


