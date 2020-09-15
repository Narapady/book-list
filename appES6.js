class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const table = document.querySelector("table");
    if (table.firstChild) {
        table.style.opacity = 1;
    } else {
        table.style.opacity = 0;
    }
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(msg, className) {
    // Create div
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    // Put it right above form
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // The alert disappear after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Event Listenters
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instatiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill out all fields!", "error");
  } else {
    // Add Book to list
    ui.addBookToList(book);
    ui.showAlert("Book added!", "sucess");
    // Clear field
    ui.clearField();
  }
  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  // Instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book removed!", "sucess");
});
