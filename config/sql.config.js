const mysql = require('mysql');

exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 't7x?}>rbmCa~we+',
  database: 'wallpaper',
});

// exports.connection = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'wallpaper',
// });