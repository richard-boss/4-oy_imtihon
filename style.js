function findElement(element,parent=document){
  return parent.querySelector(element);
}

const elTodos = findElement(".cards");
const elMarks = findElement(".marks");
const elTemplate = findElement("#todo-template");
const template2 = findElement("#mark-tmp");
const elLoader = findElement(".spinner-border");
const elSearchForm = findElement("#searchForm");
const elSearch = findElement("#search");
const ttl = findElement(".tittlee");
const sun = findElement(".sun");
const logout=findElement(".lgg")
const a = findElement(".des");
const deletee = findElement(".btn-delete");
const ElCarusel=findElement(".swp")
let books = [];
var Bookmarks = [];
let searchPost = [];
let newPosts = [];


function sww(){
const imagee = findElement("#swp");
imagee.src = books.image;
imagee.style.width = "100%";
}


logout.addEventListener("click", () => {
  window.location.href="http://127.0.0.1:5501/login.html";
});



if (books.length === 0) {
  elLoader.style.display = "block";
} else {
  elLoader.style.display = "none";
}

function generateDate(date) {
  return `${date.getFullYear()}`;
}

function renderTodos(array, parent = elTodos) {
  parent.textContent = "";
  array.forEach((todo) => {
    const template = elTemplate.content.cloneNode(true);

    const id = todo.id;
    const category = todo.category;
    const description = todo.description;
    const image = findElement("#image", template);
    const name = findElement("#name", template);
    const authors = findElement("#authors", template);
    const date = findElement("#date", template);

    const btnB = findElement(".btn-bmk", template);
    const btnS = findElement(".btn-lg", template);
    const buts = findElement(".btns", template);

    btnS.dataset.id = todo.id;
    btnB.dataset.id = todo.id;

    image.src = todo.image;
    image.style.width = "201px";
    authors.textContent = todo.publisher;

    name.textContent = todo.name;

    const datee = new Date(todo.published);
    const result = generateDate(datee);

    date.textContent = result;
    parent.appendChild(template);

    btnB.addEventListener("click", (evt) => {
      const target = evt.target;
      if (target.className.includes("btn-bmk")) {
        const id = target.dataset.id;

        fetch("https://63ef848b4d5eb64db0cb446f.mockapi.io/Books")
          .then((res) => res.json())
          .then((data) => {
            data.forEach((element) => {
              if (id == element.id) {
                Bookmarks.push(element);
              }
            });

            renderMarks(Bookmarks);


          });
        localStorage.setItem("bookMarks", JSON.stringify(Bookmarks));
        Bookmarks = JSON.parse(localStorage.getItem("bookMarks"));
        console.log(Bookmarks);
      }
    });



  






  });
}




renderTodos(books);




    
function renderMarks(Bookmarks) {
  elMarks.innerHTML = ``;
  Bookmarks.forEach((books) => {
    elMarks.innerHTML += `
                <div class="box">
                <div class="txt">
                    <h2 id="name2" class="card-title">${books.name}</h2>
                    <p  class="card-text">${books.author}</p>
                  </div>
                  <div class="btns d-flex">
                    <a href="https://www.pdfdrive.com/electron-in-action-e187688481.html" class="btn text-danger"><img src="./images/read.svg" alt="read"></a>
                    <img class="btn-delete" src="./images/delete.svg" alt="delete">
                    </div>
                    </div>
                </div>
                `;
  });
}

elMarks.addEventListener("click", (evt) => {
  const target = evt.target;
  newPosts = [];
   if (target.className.includes("btn-delete")) {
    const id = target.dataset.id;
    Bookmarks.forEach((post) => {
      if (newPosts.id !== id) {
        newPosts.push(post);
      }
    });
    console.log(newPosts);
    renderMarks(newPosts);
   
  }
});
    












const BASE_URL = "https://63ef848b4d5eb64db0cb446f.mockapi.io";

async function getData() {
  let res = await fetch(BASE_URL + "/Books");

  let data = await res.json();
  console.log(data);
  books = data;
  ttl.textContent = "Showing " + books.length + " result(s)";
}
getData();

fetch("https://63ef848b4d5eb64db0cb446f.mockapi.io/Books ")
  .then((res) => res.json())
  .then((data) => {
    elLoader.style.display = "none";
    books = data;
    renderTodos(books);
  })
  .catch((err) => {
    err.textContent = "Afsuski ma'lumot yuklanmadi😞";
  });






/************Search **************/

elSearchForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  searchPost = [];

  let value = elSearch.value;
  books.forEach((evt) => {
    if (evt.name.toLowerCase().includes(value.toLowerCase())) {
      searchPost.push(evt);
    }
  });
  renderTodos(searchPost);
  ttl.textContent = "Showing " + searchPost.length + " result(s)";
});






