
module.exports = (app) => {

    app.get('/people/contacts', (req, res) => {
        var connection = app.database.connectionFactory();
        var personDao = new app.database.personDao(connection);
        personDao.getAll((error, result) => {
            if (error) {
                res.status(400).send(error);
            } else {
                var person = result;
                for (let index = 0; index < person.length; index++) {
                    person[index].contacts;
                    var contactDao = new app.database.contactDao(connection);
                    contactDao.getContactById(person[index].id, (error, result) => {
                        if (error) {
                            res.status(400).send(error);
                        } else {
                            let contact = result;
                            person[index].contacts = contact;
                            if (index === person.length - 1) {
                                res.json(person);
                            }
                        }
                    });
                }
            }
        });
    })

    app.get('/person', (req, res) => {
        var id = req.query.id;
        var connection = app.database.connectionFactory();
        var personDao = new app.database.personDao(connection);
        personDao.getPersonById(id, (error, result) => {
            if (error) {
                res.status(400).send(error);
            } else {
                var contactDao = new app.database.contactDao(connection);
                var person = {
                    person: result
                }
                contactDao.getContactById(id, (error, resp) => {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let contact = resp;
                        person.contacts = contact;
                        res.json(person);
                    }
                });
            }
        })
    })

    app.get('/people', (req, res) => {
        var connection = app.database.connectionFactory();
        var personDao = new app.database.personDao(connection);
        personDao.getAll((error, result) => {
            if (error)
                res.status(400).send(error);
            else {
                if (result.length > 0) {
                    res.json(result)
                } else {
                    res.status(200).send('Empty')
                }
            }
        })
    })

    app.post('/person/create', (req, res) => {
        var person = req.body;
        var connection = app.database.connectionFactory();
        var personDao = new app.database.personDao(connection);
        personDao.create(person, (error, result) => {
            if (error)
                res.status(400).send(error);
            else {
                person.id = result.insertId;
                res.json(person)
            }
        })
    })


    app.patch('/person', (req, res) => {
        var person = req.body;
        var connection = app.database.connectionFactory();
        var personDao = new app.database.personDao(connection);
        personDao.update(person, (error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.json(result)
        })
    })

    app.delete('/person', (req, res) => {
        var id = req.query.id;
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);

        contactDao.deleteContacts(id, (error, result) => {
            if (error)
                res.status(400).send(error);
            else {
                var personDao = new app.database.personDao(connection);
                personDao.deletePerson(id, (error, result) => {
                    if (error)
                        res.status(400).send(error);
                    else
                        res.json('OK')
                });
            }
        });
    })
}

