function findAccountById(accounts, id) {
  return accounts.find((account) => (account.id === id))
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1:-1))
}


function getTotalNumberOfBorrows(account, books) {
  let total = 0
  for (let i = 0; i < books.length; i++){
    for (let j = 0; j < books[i].borrows.length; j++){
      if (account.id === books[i].borrows[j].id){
        total = total + 1
      }
    }
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  const possessed = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        if (author.id === book.authorId) book["author"] = author;
      });
      if (borrow.returned === false && borrow.id === account.id) {
        possessed.push(book);
      }
    });
  });
  return possessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
