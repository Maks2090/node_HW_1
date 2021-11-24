const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve(`${__dirname}/db/contacts.json`);

async function listContacts() {
   const data = await fs.readFile(contactsPath);
   const contacts = JSON.parse(data);
   console.table(contacts);
   return contacts;
};


async  function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find( (contact) => contact.id === parseInt(contactId) );
    if(!result){
        return null
    }
    console.table(result);
}


async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {id: uuidv4(), name, email, phone };
    const contact = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(contact) );
    console.table(contact)
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const filterContacts = contacts.filter((contact) => contact.id !==  parseInt(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts) );
    console.table(filterContacts)
}


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}