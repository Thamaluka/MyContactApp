function PersonDao(connection) {
    this._connection = connection;
}


PersonDao.prototype.create = function (person, callback) {
    this._connection.query('INSERT INTO person SET ?', person, callback);
}

PersonDao.prototype.getAll = function (callback) {
    this._connection.query('SELECT * FROM person', callback);
}

PersonDao.prototype.deletePerson = function (id, callback) {
    this._connection.query(`DELETE FROM person where id=${id}`, callback);
}

PersonDao.prototype.getPersonById = function (id, callback) {
    this._connection.query(`SELECT * FROM person where id=${id}`, callback);
}

PersonDao.prototype.update = function (person, callback) {
    this._connection.query(`UPDATE person SET name =? WHERE id =?`, [person.name, person.id], callback);
}

module.exports = function () {
    return PersonDao;
};