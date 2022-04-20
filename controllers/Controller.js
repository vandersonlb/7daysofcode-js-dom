class ContactsController {
  constructor(model, view) {
    this._model = model,
    this._view = view,
    
    // Inicia os listeners na construção, passando os handlers como callback
    this._view.bindAddContact(this.handleAddContact);
    this._view.bindEditContact(this.handleEditContact);
    this._view.bindDeleteContact(this.handleDeleteContact);
    
    // Inicia a view a primeira vez
    this.onListChanged(this._model._contactList);
    this._model.bindOnListChanged(this.onListChanged);
  }

  onListChanged = (contactList) => {
    this._view.displayContactList(contactList);
  };

  handleAddContact = (name, birthdate) => {
    this._model.addContact(name, birthdate);
  };

  handleEditContact = (id, name, birthdate) => {
    this._model.editContact(id, name, birthdate);
  };

  handleDeleteContact = (id) => {
    this._model.deleteContact(id);
  };
}

export default ContactsController;
