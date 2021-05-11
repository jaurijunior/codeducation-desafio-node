const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    port: 3306,
    password: 'root',
    database:'nodedb'
};


app.get('/', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    connection.query("CREATE TABLE if not exists people(name VARCHAR(255))")
    connection.query(`INSERT INTO people(name) values('Jauri da Cruz Junior')`)
    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;

        let body = '<h1>Full Cycle Rocks!</h1>';

        body += '<ul>';

        for (let i = 0; i < result.length; i++) {
            body += "<li>" + result[i].name + "</li>"
        }

        body += '</ul>';

        res.send(body)

        connection.end()
    });


})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})