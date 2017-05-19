const mysql = require('mysql2/promise');

async function main() {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node-test',
    namedPlaceholders: true,
  });

  let rows;
  let fields;

  await connection.query('INSERT INTO orders SET  title = :title', {title: 'baz'});

  [rows, fields] = await connection.query('SELECT * FROM orders');

  rows.forEach((row) => console.log(row.id, row.title, row.created));

}

main();

// CREATE TABLE `orders` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `title` VARCHAR(256) NULL,
//   `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`id`)
// )
// COLLATE='utf8_general_ci'
// ENGINE=InnoDB
// ;
