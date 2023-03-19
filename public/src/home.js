function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let borrowed = books.filter(
    (book) =>
      book.borrows.filter((borrows) => borrows.returned === false).length > 0
  );
  return borrowed.length
}

function getMostCommonGenres(books) {
    const genresOfBooks = books.map((book) => book.genre);
    const commonGenres = [];
  genresOfBooks.map((genre) => {
      const location = commonGenres.findIndex((element) => element.name === genre);
      if (location >= 0) {
        commonGenres[location].count = commonGenres[location].count + 1;
      } else {
        commonGenres.push({ name: genre, count: 1 });
      }
    });
    commonGenres.sort((a, b) => b.count - a.count);
    if (commonGenres.length > 5) {
      return commonGenres.slice(0, 5);
    }
  return commonGenres;
}

function getMostPopularBooks(books) {
  return books.map((book) => {return {name: book.title, count: book.borrows.length}}).sort((a,b) => (a.count < b.count ? 1:-1)).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let author of authors) {
    const authorName = `${author.name.first} ${author.name.last}`;
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    const authorObject = { name: authorName, count: count };
    popularAuthors.push(authorObject);
  }
  function topFive(array) {
    let popularBooks = array

      .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
      .slice(0, 5);

    return popularBooks;
  }

  return topFive(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
