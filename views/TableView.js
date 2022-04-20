import DateFormat from "../helpers/DateFormat.js";

class TableView {
  constructor() {
    this._form = document.querySelector(".js-form");
    this._table = document.querySelector(".js-table");
    this._tableBody = document.createElement("tbody");
    this._handleValidity();
  }

  displayContactList(contactList) {
    while (this._tableBody.firstChild) {
      this._tableBody.removeChild(this._tableBody.firstChild);
    }

    contactList.forEach((contact) => {
      const tr = document.createElement("tr");
      tr.id = contact.id;

      const name = document.createElement("td");
      name.contentEditable = true;
      name.innerText = contact.name;

      const birthdate = document.createElement("td");
      birthdate.contentEditable = true;
      birthdate.innerText = DateFormat.UStoBR(contact.birthdate);

      const button = document.createElement("button");
      button.textContent = "Delete";

      tr.append(name, birthdate, button);
      this._tableBody.append(tr);
    });

    this._table.append(this._tableBody);
  }

  bindAddContact(handler) {
    this._form.onsubmit = (evt) => {
      evt.preventDefault();
      let { name, birthdate } = this._form;
      handler(name.value, birthdate.value);
      this._form.reset();
    };
  }

  bindEditContact(handler) {
    this._tableBody.addEventListener("focusout", (evt) => {
      if (evt.target.tagName === "TD") {
        let id = parseInt(evt.target.parentNode.id);
        let name = evt.target.parentNode.children[0].innerHTML;
        let birthdate = DateFormat.BRtoUS(evt.target.parentNode.children[1].innerHTML);
        handler(id, name, birthdate);
      }
    });
  }

  bindDeleteContact(handler) {
    this._tableBody.addEventListener("click", (evt) => {
      if (evt.target.tagName === "BUTTON") {
        handler(evt.target.parentNode.id);
      }
    });
  }

  _handleValidity() {
    this._form.querySelectorAll("input").forEach((input) => {
      input.oninvalid = () => {
        input.setCustomValidity("");
        if (!input.validity.valid)
          input.setCustomValidity(input.title);
      };
    });
  }
}

export default TableView;
