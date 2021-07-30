const inputText = document.querySelector("#texto-tarefa");
const buttonCreateJob = document.querySelector("#criar-tarefa");
const list = document.querySelector("#lista-tarefas");

const removeAllSelection = () => {
  const children = list.children;
  for (let i = 0; i < children.length; i += 1) {
    children[i].style.backgroundColor = "";
    children[i].classList.remove("is-select");
  }
};

function changeColorJob() {
  list.addEventListener("click", function (event) {
    const li = event.target;

    if (
      li.classList.contains("is-select") &&
      li.classList.contains("completed")
    ) {
      li.style.backgroundColor = "";
      li.classList.remove("is-select");
      li.classList.remove("completed");
    } else if (li.classList.contains("is-select")) {
      li.classList.add("completed");
    } else if (!li.classList.contains("is-select")) {
      removeAllSelection();
      li.style.backgroundColor = "rgb(128, 128, 128)";
      li.classList.add("is-select");
    }
  });
}

const buttonRemoveJob = document.querySelector("#apaga-tudo");

function removeJob() {
  buttonRemoveJob.addEventListener("click", function () {
    list.innerHTML = "";
    localStorage.clear();
  });
}

const buttonRemoveCompletedJob = document.querySelector("#remover-finalizados");

function removeCompletedJob() {
  buttonRemoveCompletedJob.addEventListener("click", function () {
    const li = document.getElementsByClassName("completed");
    for (let i = li.length - 1; i >= 0; i -= 1) {
      list.removeChild(li[i]);
    }
  });
}

const buttonSaveJob = document.querySelector("#salvar-tarefas");

function saveJob() {
  buttonSaveJob.addEventListener("click", function () {
    const li = document.querySelectorAll(".li");
    for (let i = li.length - 1; i >= 0; i -= 1) {
      const object = {
        text: li[i].innerText,
        classList: li[i].classList.contains("completed"),
      };

      const stringStorage = JSON.stringify(object);
      localStorage.setItem(i, stringStorage);
    }
  });
}

function clearInput() {
  inputText.value = "";
}

let count = 1;
function createLi(valueLi, liClass) {
  const li = document.createElement("li");
  list.appendChild(li);
  liClass ? li.classList.add("li", liClass) : li.classList.add("li");
  li.innerText = `${count}- ${valueLi}`;
  count += 1;
  clearInput();
}

function updateList() {
  const localStorageLength = localStorage.length;

  for (let i = 0; i < localStorageLength; i += 1) {
    const objectStorage = JSON.parse(localStorage.getItem(i));
    if (objectStorage.classList === true) {
      createLi(objectStorage.text, "completed");
    } else {
      createLi(objectStorage.text);
    }
  }
}

function createJob() {
  buttonCreateJob.addEventListener("click", function () {
    createLi(inputText.value);
  });
}

const buttonMoveUp = document.querySelector("#mover-cima");

function moveUp() {
  buttonMoveUp.addEventListener("click", function () {
    const li = document.getElementsByTagName("li");

    for (let i = 0; i < li.length; i += 1) {
      if (
        li[i].style.backgroundColor === "rgb(128, 128, 128)" &&
        li[i].previousElementSibling !== null
      ) {
        list.insertBefore(li[i], li[i].previousElementSibling);
      }
    }
  });
}

const buttonMoveDown = document.querySelector("#mover-baixo");

function moveDown() {
  buttonMoveDown.addEventListener("click", function () {
    const li = document.getElementsByTagName("li");

    for (let i = 0; i < li.length; i += 1) {
      if (
        li[i].style.backgroundColor === "rgb(128, 128, 128)" &&
        li[i].nextElementSibling !== null
      ) {
        list.insertBefore(li[i].nextElementSibling, li[i]);
        break;
      }
    }
  });
}

const buttonRemoveSelected = document.querySelector("#remover-selecionado");

function removeSelected() {
  buttonRemoveSelected.addEventListener("click", function () {
    const li = document.querySelectorAll(".li");
    for (let i = 0; i < li.length; i += 1) {
      if (li[i].classList.contains("is-select")) {
        list.removeChild(li[i]);
      }
    }
  });
}

window.onload = function () {
  updateList();
  createJob();
  changeColorJob();
  removeJob();
  removeCompletedJob();
  saveJob();
  moveUp();
  moveDown();
  removeSelected();
};
