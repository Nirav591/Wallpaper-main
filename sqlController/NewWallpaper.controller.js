const { connection } = require('../config/sql.config');

exports.fetchNewWallPapers = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from new_wallpaper', (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);     
      } else {
        res.send(err);
      }
    });
  });
};

exports.fetchNewWallPaperById = (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('SELECT * from new_wallpaper WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  });
};


exports.createNewWallpaper = async (req, res) => {
  const wallpaper = req.body.wallpaper ? JSON.parse(req.body.wallpaper) : {};
  const { filename } = req.file;
  const imagePath = `uploads/${filename}`;

  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    connection.query(
      'INSERT INTO new_wallpaper (category, subCategory, type, wallpaperTitle, img, wallpaperTags, wallpaperColor, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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
          res.send('New Wallpaper added successfully!');
        } else {
          res.send(err);
        }
      }
    );
  });
};

exports.deleteNewWallPaper = async (req, res) => {
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);

    connection.query('DELETE FROM new_wallpaper WHERE id = ?', [req.params.id], (err, result) => {
      connection.release();

      if (!err) {
        res.send('Data deleted successfully');
      } else {
        res.send(err);
      }
    });
  });
};

exports.updateNewWallPaper = async (req, res) => {
  const { wallpaper } = req.body.wallpaper ? JSON.parse(req.body.wallpaper) : {};
  
  connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connection as id ${connection.threadId}`);
    if (!req.body.OldImage) {
      const {filename} = req.file;
      const imagePath = `uploads/${filename}`;
      connection.query(
        'UPDATE new_wallpaper SET category = ?, subCategory = ?, type = ?,wallpaperTitle = ?, img = ?, wallpaperTags = ?, wallpaperColor = ?, status = ? WHERE id = ?',
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
        'UPDATE new_wallpaper SET category = ?, subCategory = ?, type = ?,wallpaperTitle = ?, wallpaperTags = ?, wallpaperColor = ?, status = ? WHERE id = ?',
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

