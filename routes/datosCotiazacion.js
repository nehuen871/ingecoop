const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all datosCotiazacion
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM datosCotiazacion', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An datosCotiazacion
router.get('/datosCotiazacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM datosCotiazacion WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An datosCotiazacion
router.delete('/datosCotiazacion/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM datosCotiazacion WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotiazacion Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An datosCotiazacion
router.post('/datosCotiazacion/', (req, res) => {
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
      res.json({status: 'datosCotiazacion Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/datosCotiazacion/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL datosCotiazacionAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'datosCotiazacion Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;