function ContactDao(connection) {
    this._connection = connection;
}


ContactDao.prototype.create = function (contact, callback) {
    this._connection.query('INSERT INTO contact SET ?', contact, callback);
}

ContactDao.prototype.getAll = function (callback) {
    this._connection.query('SELECT * FROM contact', callback);
}

ContactDao.prototype.getContactById = function (id, callback) {
    this._connection.query(`SELECT c.id, c.contact, c.idType, t.name FROM contact c INNER JOIN type t  WHERE idPerson=${id} and t.id = c.idType`, callback);
}

ContactDao.prototype.deleteContacts = function (id, callback) {
    this._connection.query(`DELETE FROM contact where idPerson=${id}`, callback);
}

ContactDao.prototype.deleteContact = function (id, callback) {
    this._connection.query(`DELETE FROM contact where id=${id}`, callback);
}

ContactDao.prototype.update = function (contact, callback) {
    console.log(contact)
    this._connection.query(`UPDATE contact SET contact =? , idType =?  WHERE id =?`, [contact.contact, contact.idType, contact.id], callback);
}



module.exports = function () {
    return ContactDao;
};