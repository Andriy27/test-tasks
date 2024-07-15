document.addEventListener('DOMContentLoaded',()=> {
const addBook = document.getElementById('addBook');
const editBook = document.getElementById('editBook');
const bookList = document.getElementById('bookList');
const searchbyTitle = document.getElementById('searchbyTitle');
const searchbyAuthor = document.getElementById('searchbyAuthor');
const exporting = document.getElementById('exporting');


let books = JSON.parse(localStorage.getItem('books')) || [];

let curentEditIndex = null;



const listUpdater = (filter = {}) => {
    bookList.innerHTML = '';
    books.filter(book => {
        return (!filter.title || book.title.includes(filter.title)) &&
               (!filter.author || book.author.includes(filter.author));
    }).forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
           <span>${book.title} by ${book.author}</span>
           <button onclick = "editB(${index})">Edit</button>
           <button onclick = "dellete(${index})">Delete</button>

        `;
        bookList.appendChild(li);
    });
};

const addB =(title, author) =>{
    books.push({title, author});
    localStorage.setItem('books', JSON.stringify(books));
    listUpdater();
};



const updateB = (index,title,author) =>{
    books[index] = { title, author};
    localStorage.setItem('books', JSON.stringify(books));
    listUpdater();
};

window.updateB = updateB;

const editB =(index) => {
    curentEditIndex = index;
    const book = books[index];
    document.getElementById('editBtitle').value = book.title;
    document.getElementById('editAname').value = book.author;
    editBook.style.display = 'block';
    
};

window.editB = editB;

const dellete =(index) => {
    books.splice(index,1);
    localStorage.setItem('books', JSON.stringify(books));
    listUpdater();
};

window.dellete= dellete;


addBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('Btitle').value;
    const author = document.getElementById('Aname').value;
    addB(title, author);
    addBook.reset();

});



editBook.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const title = document.getElementById('editBtitle').value;
    const author = document.getElementById('editAname').value;
    updateB(curentEditIndex, title, author);
    editBook.reset();
});

searchbyTitle.addEventListener('input',() =>{
    listUpdater({title: searchbyTitle.value, author: searchbyAuthor.value});
});

searchbyAuthor.addEventListener('input',() =>{
    listUpdater({title: searchbyTitle.value, author: searchbyAuthor.value});
});

exporting.addEventListener('click', () =>{
    const dataB = "data:text/json;charset=utf-8,"+ encodeURIComponent(JSON.stringify(books));
    const downloadL = document.createElement('a');
    downloadL.setAttribute("href", dataB);
    downloadL.setAttribute("download","books.json");
    downloadL.click();
    downloadL.remove();
})

listUpdater();
});