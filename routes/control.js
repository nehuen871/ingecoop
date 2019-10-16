const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all control
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM control', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An control
router.get('/control/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM control WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An control
router.delete('/control/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM control WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An control
router.post('/control/', (req, res) => {
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
      res.json({status: 'control Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/control/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL controlAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'control Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;