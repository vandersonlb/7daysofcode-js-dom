import Contacts from "./models/Contacts.js"
import TableView from "./views/TableView.js"
import Controller from "./controllers/Controller.js"

const app = new Controller(new Contacts(), new TableView())