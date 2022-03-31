console.log("Hi");

// Elements queryh selectors

const allResources = document.getElementById("resources").dataset.resource;
const resetBtn = document.querySelector(".reset");
const booksAndMagazines = document.querySelector(".all");
const searchByISBN = document.querySelector(".chooseisbn");
const searchByTitle = document.querySelector(".choosetitle");
const search = document.querySelector(".search--btn");
const inputQuery = document.getElementById("inputquery");
const bodytableBooks = document.querySelector(".bodytablebooks");
const bodyTableMagazines = document.querySelector(".bodytablemagazines");
const chooseISBN = document.querySelector(".chooseisbn");
const chooseEmail = document.querySelector(".choosetitle");

const { bookArr, authors, magazinesArr } = JSON.parse(allResources);

console.log(bookArr);
console.log(magazinesArr);

// DOM removal of elements functions
const clearInnerHTML = function () {
  const booksSection = document.querySelector(".table-books__div");
  const magazineSection = document.querySelector(".table-magazine__div");
  const bookMagazineSection = document.querySelector(".table-books-mgs__div");
  if (booksSection) booksSection.remove();
  if (magazineSection) magazineSection.remove();
  if (bookMagazineSection) bookMagazineSection.remove();
};

// DOM manipulation functions

const fnBookEl = function (arr) {
  return `
    <div class="table-books__div">
      <h1>Books</h1>
      <table class="bodytablebooks">
        <tr class="row main">
          <th>Title</th>
          <th>Authors</th>
          <th>ISBN</th>
          <th>Description</th>
        </tr>
        ${arr
          .map((el) => {
            return `
              <tr class="row">
                  <td>${el.title}</td>
                  <td>${el.authors.join(", ")}</td>
                  <td>${el.isbn}</td>
                  <td>
                    ${el.description}
                  </td>
              </tr>
              `;
          })
          .join("")}
      </table>
    </div>
  `;
};

const fnMagazineEl = function (arr) {
  return `
    <div class="table-magazine__div">
      <h1>Magazines</h1>
      <table class="bodytablemagazines">
        <tr class="row main">
          <th>Title</th>
          <th>Authors</th>
          <th>ISBN</th>
          <th>Published At</th>
        </tr>
        ${arr
          .map((el) => {
            return `
              <tr class="row">
                  <td>${el.title}</td>
                  <td>${el.authors.join(", ")}</td>
                  <td>${el.isbn}</td>
                  <td>
                    ${el.publishedAt}
                  </td>
              </tr>
              `;
          })
          .join("")}
      </table>
    </div>
  `;
};

const fnAllBooksAndMgzEl = function (arr) {
  return `
    <div class="table-books-mgs__div">
      <h1>All sorted Books and Magazines</h1>
      <table class="bodytablebooksmgz">
        <tr class="row main">
          <th>Type</th>
          <th>Title</th>
          <th>Authors</th>
          <th>ISBN</th>
          <th>Description</th>
          <th>Published At</th>
        </tr>
        ${arr
          .map((el) => {
            return `
                <tr class="row">
                  <td>${el.publishedAt ? "Magazine" : "Book"}</td>
                  <td>${el.title}</td>
                  <td>${el.authors.join(", ")}</td>
                  <td>${el.isbn}</td>
                  <td>
                    ${el.description ? el.description : "-"}
                  </td>
                  <td>${el.publishedAt ? el.publishedAt : "-"}</td>
                </tr>              
               `;
          })
          .join("")}
        <tr></tr>
      </table>
    </div>
  `;
};

const errHTML = () => {
  return `
    <button class="error reset">No book or Magazine found! Please try with another ISBN or Author's email</button>
    `;
};

// Event listeners on buttons

booksAndMagazines.addEventListener("click", function () {
  let allArr = [...bookArr, ...magazinesArr];

  allArr = allArr.sort((a, b) => a.title.localeCompare(b.title));

  clearInnerHTML();
  document
    .getElementById("resources")
    .insertAdjacentHTML("afterend", fnAllBooksAndMgzEl(allArr));
});

search.addEventListener("click", function () {
  let newBookArr, newMagazineArr;
  if (inputQuery.placeholder === "Search by ISBN") {
    newBookArr = bookArr.filter((book) => book.isbn === inputQuery.value);

    newMagazineArr = magazinesArr.filter(
      (magazine) => magazine.isbn === inputQuery.value
    );
  }
  if (inputQuery.placeholder === "Search by email") {
    newBookArr = bookArr.filter((book) =>
      book.authors.includes(inputQuery.value)
    );

    newMagazineArr = magazinesArr.filter((magazine) =>
      magazine.authors.includes(inputQuery.value)
    );
  }
  if (newMagazineArr.length === 0 && newBookArr.length === 0) {
    resetBtn.insertAdjacentHTML("beforeend", errHTML());
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
    inputQuery.value = "";

    return;
  }
  clearInnerHTML();
  const bookEl = fnBookEl(newBookArr);
  const magazineEl = fnMagazineEl(newMagazineArr);

  document
    .getElementById("resources")
    .insertAdjacentHTML("afterend", magazineEl);

  document.getElementById("resources").insertAdjacentHTML("afterend", bookEl);
  inputQuery.value = "";
});

chooseISBN.addEventListener("click", function (e) {
  e.preventDefault();

  inputQuery.placeholder = "Search by ISBN";
});

chooseEmail.addEventListener("click", function (e) {
  e.preventDefault();

  inputQuery.placeholder = "Search by email";
});

resetBtn.addEventListener("click", function () {
  clearInnerHTML();
});
