import DateFormat from "../helpers/DateFormat.js";

class TableView {
  constructor() {
    this._form = document.querySelector("[data-form]");
    this._table = document.querySelector("[data-table]");
    this._tableBody = document.createElement("tbody");
    this._handleValidity();
    feather.replace()
  }

  displayContactList(contactList) {
    while (this._tableBody.firstChild) {
      this._tableBody.removeChild(this._tableBody.firstChild);
    }

    contactList.forEach((contact) => {
      const tr = document.createElement("tr");
      tr.id = contact.id;

      const name = `<td contenteditable>${contact.name}</td>`

      const birthdate = `<td contenteditable>${DateFormat.UStoBR(contact.birthdate)}</td>`

      const button = `
        <td>
          <button class="btn btn-outline-danger" data-delete>
            <i data-feather="trash-2" class="icon"></i></i>
          </button>
        </td>
      `

      tr.innerHTML = name + birthdate + button
      this._tableBody.append(tr);
    });

    this._table.append(this._tableBody);
    feather.replace()
  }

  bindAddContact(handler) {
    this._form.onsubmit = (evt) => {
      evt.preventDefault();
      let { name, birthdate } = this._form;
      handler(name.value, birthdate.value, evt.target.checkValidity());
    };
  }

  bindEditContact(handler) {
    this._tableBody.addEventListener("focusout", (evt) => {
      if (evt.target.tagName === "TD") {
        let id = parseInt(evt.target.closest("TR").id);
        let name = evt.target.parentNode.children[0].innerHTML;
        let birthdate = DateFormat.BRtoUS(evt.target.parentNode.children[1].innerHTML);
        handler(id, name, birthdate);
      }
    });
  }

  bindDeleteContact(handler) {
    this._tableBody.addEventListener("click", (evt) => {
      if (evt.target.closest("BUTTON")) {
        handler(evt.target.closest("TR").id);
      }
    });
  }

  _handleValidity() {
      this._form.addEventListener('submit', function (event) {
        if (this.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        this.classList.add('was-validated')
      }, false)
  }

}

export default TableView;
