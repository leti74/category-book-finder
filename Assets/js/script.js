class Libro {
  constructor(
    title,
    keyBooks,
    authors,
    descriptionBook = "Descrizione non disponibile"
  ) {
    this.title = title;
    this.keyBooks = keyBooks;
    this.authors = authors;
    this.descriptionBook = descriptionBook;
  }

  async fetchDescription() {
    try {
      let response = await fetch(
        `https://openlibrary.org${this.keyBooks}.json`,
        {
          method: "GET",
        }
      );
      let data = await response.json();
      this.descriptionBook = data.description
        ? typeof data.description === "string"
          ? data.description
          : data.description.value
        : "Descrizione non disponibile";
    } catch (error) {
      console.error("Errore nel recupero della descrizione:", error);
      this.descriptionBook = "Errore nel recupero della descrizione.";
    }
  }

  render() {
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = `
        <div class="info-book">
          <h2 class="js-title">${this.title}</h2>
          <p>${this.authors}</p>
        </div>
      `;

    let titleBook = resultItem.querySelector(".js-title");
    titleBook.addEventListener("click", async () => {
      await this.fetchDescription();
      let resultDescription = resultItem.querySelector(".js-description");
      if (!resultDescription) {
        resultDescription = document.createElement("div");
        resultDescription.classList.add("js-description");
        resultDescription.innerHTML = `<p>${this.descriptionBook}</p>`;
        resultItem.appendChild(resultDescription);
      } else {
        resultDescription.remove();
      }
    });

    return resultItem;
  }
}

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const result = document.querySelector(".js-result");

button.addEventListener("click", async () => {
  let categoria = input.value.toLowerCase();
  result.innerHTML = "";

  if (!categoria) {
    result.innerHTML = "<p>Inserisci una categoria valida.</p>";
    return;
  }

  try {
    let response = await fetch(
      `https://openlibrary.org/subjects/${categoria}.json`
    );
    let data = await response.json();

    data.works.forEach((work) => {
      let libro = new Libro(work.title, work.key, [
        ...new Set(work.authors.map((author) => author.name)),
      ]);

      result.appendChild(libro.render());
    });
  } catch (error) {
    console.error("Errore:", error);
    result.innerHTML = "<p>Si è verificato un errore.</p>";
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
