const  mysql = require('mysql');

//конфигурация
const connection = mysql.createConnection({
    host:"",
    user:"",
    database:"",
    password:"",

});


connection.connect(err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('Database.........ok')
    }
})