var mysql = require('mysql');
var pool = mysql.createPool({
    host : 'localhost',
	user : 'sunbowei',
	password : 'Zg0B8Q%LuCSp54Kn',
	database : 'my_music'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放连接
        });
    });
}
exports.query = query;