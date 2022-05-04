console.log("Welcome to My Library");

let display = new Display();
display.displayBooks();

function Book(title, author, category) {
    this.title = title;
    this.author = author;
    this.category = category;
}

function Display() {

    let bookList = localStorage.getItem("books");
    if (bookList == null) {
        bookObj = [];
    }
    else {
        bookObj = JSON.parse(bookList);
    }

    this.clear = function () {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    this.displayBooks = function() {
        let tableBody = document.getElementById("tableBody");
        let template = "";
        bookObj.forEach(function (element, index) {
            template += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.title}</td>
            <td>${element.author}</td>
            <td>${element.category}</td>
            <td><button id="${index}" onClick=display.deleteBook(this.id) class="btn btn-primary">Delete</button></td>
          </tr> 
            `;
        });
        if (bookObj.length != 0) {
            tableBody.innerHTML = template;
        }
        else {
            tableBody.innerHTML = `No new books!`;
        }

    }

    this.addBook = function (book) {
        bookObj.push(book);
        localStorage.setItem("books", JSON.stringify(bookObj));
        this.displayBooks();
    }

    this.validate = function (book) {
        if (book.title.length < 3 || book.author.length < 3) {
            return false;
        }
        else {
            return true;
        }
    }

    this.alert = function (title, message) {
        let alertMessage = document.getElementById("alertMessage");
        alertMessage.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${title}!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        setTimeout(() => {
            alertMessage.innerHTML = ""
        }, 5000);
    }

    this.deleteBook = function(index){
        bookObj.splice(index,1);
        localStorage.setItem("books", JSON.stringify(bookObj));
        this.displayBooks();
        this.alert("Book has been successfully removed", "");
    }
}
















let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("Author").value;
    let category = document.getElementById("selectCategory").value;
    let book = new Book(title, author, category);
    let display = new Display();
    if (display.validate(book)) {
        display.addBook(book);
        display.clear();
        display.alert("Success", "Book has been added to the library");
    }
    else {
        display.alert("Sorry", "Book Title and Author name should be more than 3 letters");
    }
}