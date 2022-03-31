const { getAuthors, getBooks, getMagazines } = require("./model");
const fs = require("fs");

exports.getOverview = async (req, res, next) => {
  const authors = await getAuthors();
  const books = await getBooks();
  const magazines = await getMagazines();

  const bookArr = [];
  books.split("\n").forEach((book, i) => {
    if (i !== 0 && book !== "") {
      const innerBookArr = book.split(";");
      let authorEmail = innerBookArr[2].split(",");
      bookArr.push({
        title: innerBookArr[0],
        isbn: innerBookArr[1],
        authors: authorEmail,
        description: innerBookArr[3],
      });
    }
  });

  const magazinesArr = [];
  magazines.split("\n").forEach((magazine, i) => {
    if (i > 0 && magazine !== "") {
      const innerMagazineArr = magazine.split(";");
      let authorEmail = innerMagazineArr[2].split(",");

      magazinesArr.push({
        title: innerMagazineArr[0],
        authors: authorEmail,
        isbn: innerMagazineArr[1],
        publishedAt: innerMagazineArr[3],
      });
    }
  });

  // let bookStr = JSON.parse(JSON.stringify(bookArr));
  let bookStr = [...bookArr];
  bookStr.push({
    title: "Engineering Mathematics",
    isbn: "2826-2827-9402",
    authors: ["null-walla@ecodog.com", "null-wufnu@echocat.org"],
    description: "iraten-Kochbuch GU-Kochbuch Kochen",
  });
  let magazineStr = [...magazinesArr];
  magazineStr.push({
    title: "node.js textbook",
    isbn: "2826-3922-9322",
    authors: ["null-walla@ecodog.com", "null-wufnu@echocat.org"],
    publishedAt: "21.05.2011",
  });

  const bookData = `title;isbn;authors;description\n${bookStr
    .map(
      (book) => `${book.title};${book.isbn};${book.authors};${book.description}`
    )
    .join("\n")}`;

  const magazineData = `title;isbn;authors;description\n${magazineStr
    .map((mgz) => `${mgz.title};${mgz.isbn};${mgz.authors};${mgz.publishedAt}`)
    .join("\n")}`;

  fs.writeFileSync("./newBooks.csv", bookData);
  fs.writeFileSync("./newMagazines.csv", magazineData);

  const allResources = JSON.stringify({ bookArr, authors, magazinesArr });

  res.status(200).render("index", {
    allResources,
  });
};
