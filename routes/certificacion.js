const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all certificacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM certificacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An certificacion
router.get('/certificacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM certificacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An certificacion
router.delete('/certificacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM certificacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An certificacion
router.post('/certificacion/', (req, res) => {
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
      res.json({status: 'certificacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/certificacion/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL certificacionAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'certificacion Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;