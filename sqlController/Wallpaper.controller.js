const { connection } = require('../config/sql.config');

exports.fetchWallPapers = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from wallpaper', (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);     
      } else {
        res.send(err);
      }
    });
  });
};

exports.fetchWallPaperById = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from wallpaper WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });
};

exports.filterWallpapers = async (req, res) => {
  console.log('query', req.query);
  connection.getConnection(async (err, connection) => {
    if (err) throw err;
    try {
      let query = 'SELECT * FROM wallpaper WHERE 1';
      const conditions = [];
      const values = [];

      if (req.query.category) {
        conditions.push('category LIKE ?');
        values.push(`%${req.query.category}%`);
      }
      if (req.query.wallpaperColor) {
        conditions.push('wallpaperColor LIKE ?');
        values.push(`%${req.query.wallpaperColor}%`);
      }
      if (req.query.type) {
        conditions.push('type LIKE ?');
        values.push(`%${req.query.type}%`);
      }

      if (conditions.length > 0) {
        query += ' AND ' + conditions.join(' AND ');
      }

      const result = await connection.query(query, values);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    } finally {
      connection.release();
    }
  });
};

exports.createWallpaper = async (req, res) => {
  const wallpaper = req.body.wallpaper ? JSON.parse(req.body.wallpaper) : {};
  const { filename } = req.file;
  const imagePath = `uploads/${filename}`;

  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    connection.query(
      'INSERT INTO wallpaper (category, subCategory, type, wallpaperTitle, img, wallpaperTags, wallpaperColor, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        wallpaper.category,
        wallpaper.subCategory,
        wallpaper.type,
        wallpaper.wallpaperTitle,
        imagePath,
        wallpaper.wallpaperTags,
        wallpaper.wallpaperColor,
        wallpaper.status,
      ],
      (err, result) => {
        connection.release();

        if (!err) {
          res.send('Wallpaper added successfully!');
        } else {
          res.send(err);
        }
      }
    );
  });
};

exports.deleteWallPaper = async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('DELETE FROM wallpaper WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send('Data deleted successfully');
      } else {
        res.send(err);
      }
    });
  });
};

exports.updateWallPaper = async (req, res) => {
  const { wallpaper } = req.body.wallpaper ? JSON.parse(req.body.wallpaper) : {};
  
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    if (!req.body.OldImage) {
      const {filename} = req.file;
      const imagePath = `uploads/${filename}`;
      connection.query(
        'UPDATE wallpaper SET category = ?, subCategory = ?, type = ?,wallpaperTitle = ?, img = ?, wallpaperTags = ?, wallpaperColor = ?, status = ? WHERE id = ?',
        [
          wallpaper.category,
          wallpaper.subCategory,
          wallpaper.type,
          wallpaper.wallpaperTitle,
          imagePath,
          wallpaper.wallpaperTags,
          wallpaper.wallpaperColor,
          wallpaper.status,
          req.params.id,
        ],
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
        'UPDATE wallpaper SET category = ?, subCategory = ?, type = ?,wallpaperTitle = ?, wallpaperTags = ?, wallpaperColor = ?, status = ? WHERE id = ?',
        [
          wallpaper.category,
          wallpaper.subCategory,
          wallpaper.type,
          wallpaper.wallpaperTitle,
          wallpaper.wallpaperTags,
          wallpaper.wallpaperColor,
          wallpaper.status,
          req.params.id,
        ],
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

