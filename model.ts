const axios = require("axios");

exports.getAuthors = async function () {
  try {
    let authors = await axios.get(
      "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv"
    );
    ``;
    return authors.data;
  } catch (err) {
    console.log(err);
  }
};
exports.getBooks = async function () {
  try {
    let books = await axios.get(
      "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv"
    );
    return books.data;
  } catch (err) {
    console.log(err);
  }
};
exports.getMagazines = async function () {
  try {
    let magazines = await axios.get(
      "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv"
    );
    return magazines.data;
  } catch (err) {
    console.log(err);
  }
};
