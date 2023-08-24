const { connection } = require('../config/sql.config');

exports.fetchAllCategories = (req, res) => {
  connection.getConnection((err, connection) => {
    connection.release();
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from category', (err, result) => {
      

      if (!err) {
        res.send(result);
      
      } else {
        res.send(err);
      }
    });
  });
};

exports.createCategory = async (req, res) => {
  console.log(req.body.category);
  const categories = req.body.category ? JSON.parse(req.body.category) : {};
  const image = req.file.buffer;
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query(
      'INSERT INTO category (categoryName, img, status) VALUES (?, ?, ?)',
      [categories.categoryName, image, categories.status],
      (err, result) => {
        connection.release();

        if (!err) {
          res.send('Category added successfully!');
        } else {
          res.send(err);
        }
      }
    );
  });
};

exports.deleteCategory = async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('DELETE FROM category WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send('Data deleted successfully');
      } else {
        res.send(err);
      }
    });
  });
};
exports.fetchCategoryById = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from category WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });
};

exports.updateCategory = async (req, res) => {
  const { category } = req.body.category ? JSON.parse(req.body.category) : {};
  const image = req.body.OldImage ? JSON.parse(req.body.OldImage).data : req.file.buffer;

  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    if (!req.body.OldImage) {
      connection.query(
        'UPDATE category SET categoryName = ?, img = ?, status = ? WHERE id = ?',
        [category.categoryName, image, category.status, req.params.id],
        (err, result) => {
          connection.release();

          if (!err) {
            res.send('Data updated successfully');
          } else {
            res.send(err);
          }
        }
      );
    } else {
      connection.query(
        'UPDATE category SET categoryName = ?, status = ? WHERE id = ?',
        [category.categoryName, category.status, req.params.id],
        (err, result) => {
          connection.release();

          if (!err) {
            res.send('Data updated successfully');
          } else {
            res.send(err);
          }
        }
      );
    }
  });
};
