class Contacts {
  constructor() {
    this._contactList = JSON.parse(localStorage.getItem("contactList")) || [];
    this.contact = (name, birthdate, id = null) => ({ name, birthdate, id });
  }

  bindOnListChanged(callback) {
    this.onListChanged = callback;
  }

  _commit(contactList) {
    this.onListChanged(contactList);
    localStorage.setItem("contactList", JSON.stringify(contactList));
  }

  addContact(name, birthdate) {
    let contact = {
      ...this.contact(name, birthdate),
      id: this._contactList.length > 0 ? this._contactList[this._contactList.length - 1].id + 1 : 0,
    };

    this._contactList.push(contact);
    this._commit(this._contactList);
  }

  editContact(id, name, birthdate) {
    this._contactList = this._contactList.map((contact) =>
      contact.id === id ? { name, birthdate, id } : contact
    );
    this._commit(this._contactList);
  }

  deleteContact(id) {
    this._contactList = this._contactList.filter((contact) => contact.id != id);
    this._commit(this._contactList);
  }
}

export default Contacts;
