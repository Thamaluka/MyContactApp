
module.exports = (app) => {

    app.get('/contact', (req, res) => {
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);
        contactDao.getAll((error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.json(result);
        })
    })

    app.post('/contact/create', (req, res) => {
        var contact = req.body;
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);
        contactDao.create(contact, (error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.json(contact);
        })
    })

    app.get('/contact/:id', (req, res) => {
        var id = req.query.id;
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);
        contactDao.getContactById(id, (error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.json(result);
        })
    })

    app.patch('/contact', (req, res) => {
        var contact = req.body;
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);
        contactDao.update(contact, (error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.json(result);
        })
    })

    app.delete('/contact', (req, res) => {
        var id = req.query.id;
        var connection = app.database.connectionFactory();
        var contactDao = new app.database.contactDao(connection);
        contactDao.deleteContact(id, (error, result) => {
            if (error)
                res.status(400).send(error);
            else
                res.status(200);
                res.json('OK');
        })
    })
}

