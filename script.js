import dateFormat from "./helpers/DateFormat.js"

const form = document.querySelector(".js-form");
const table = document.querySelector(".js-table");
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

tableView(pessoas, table)

form.onsubmit = (evt) => {
  evt.preventDefault();
  const { name, birth_date } = form;
  insertData({ name: name.value, birthdate: birth_date.value });
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

function insertData(user) {
  pessoas.push(user);
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function tableView(model, view) {
  var tableBody = view.querySelector("tbody");
  tableBody.innerHTML = model
    .map((user) => `<tr><td>${user.name}</td> <td>${dateFormat(user.birthdate)}</td></tr>`)
    .join("");
}