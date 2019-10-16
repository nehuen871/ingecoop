const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cotizacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cotizacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An cotizacion
router.get('/cotizacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An cotizacion
router.delete('/cotizacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cotizacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An cotizacion
router.post('/cotizacion/', (req, res) => {
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
      res.json({status: 'cotizacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/cotizacion/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL cotizacionAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cotizacion Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;