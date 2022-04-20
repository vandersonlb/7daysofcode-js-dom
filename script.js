import DateFormat from "./helpers/DateFormat.js"

const form = document.querySelector(".js-form");
const table = document.querySelector(".js-table");

const model = (name, birthdate) => ({ name, birthdate })
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

tableView(pessoas, table)

form.onsubmit = (evt) => {
  evt.preventDefault();
  const { name, birth_date } = form;
  insertUser(model(name.value, birth_date.value));
  tableView(pessoas, table);
  form.reset()
};

(function handleValidity() {
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.oninvalid = () => {
      input.setCustomValidity("");
      if (!input.validity.valid) input.setCustomValidity(input.title);
    };
  });
})();

function tableView(modelList, view) {
  var tableBody = view.querySelector("tbody");
  tableBody.innerHTML = modelList
  .map((user, idx) => `<tr id="${idx}"><td contenteditable>${user.name}</td> <td contenteditable>${DateFormat.UStoBR(user.birthdate)}</td></tr>`)
  .join("");
}

table.addEventListener("focusout", (evt) => {
  let id = evt.target.parentNode.id;
  let name = evt.target.parentNode.children[0].innerHTML;
  let birth_date = evt.target.parentNode.children[1].innerHTML;
  updateUser(pessoas, id, model(name, DateFormat.BRtoUS(birth_date)))
})

function insertUser(user) {
  pessoas.push(user);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function updateUser(modelList, id, userUpdated) {
  modelList.splice(id, 1, userUpdated)
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
  tableView(pessoas, table)
}