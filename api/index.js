var app = require('./config/custom-express')();

app.listen(3000, () => {
    console.log("Run on port: 3000!")
})