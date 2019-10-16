const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all list_docs
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM list_docs', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An list_docs
router.get('/list_docs/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM list_docs WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An list_docs
router.delete('/list_docs/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM list_docs WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An list_docs
router.post('/list_docs/', (req, res) => {
  const {CUIT, Calle, DNI, Observaciones, Infracciones} = req.body;
  console.log(CUIT, Calle, DNI, Observaciones, Infracciones);
  const query = `
    SET @id = 0;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL ComercioAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/list_docs/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL list_docsAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'list_docs Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;