class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);

    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";

    this.showAlert("book added!", "sucess");
  }

  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container"),
      form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  removeBook(target) {
    const book = target.parentElement.parentElement;
    if (target.classList.contains("delete")) {
      book.remove();
    }
    this.showAlert("Book removed!", "sucess");
  }
}

class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static getLocal() {
    const books = Store.getBook();
    books.forEach((book) => {
      const list = document.querySelector("#book-list");
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
      list.appendChild(row);
    });
  }

  static removeLocal(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

document.querySelector("#book-form").addEventListener("submit", (e) => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill out all fields", "error");
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
  }
  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
  Store.removeLocal(e.target.parentElement.previousElementSibling.textContent);
});

window.onload = Store.getLocal;
