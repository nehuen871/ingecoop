const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/database.js');

// GET all cliente
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM cliente', (err, rows, fields) => {
    if(!err) {
      console.log(rows[0].nombre);
      res.render('cliente', { data: rows });
    } else {
      console.log(err);
    }
  });
});

// GET An cliente
router.get('/cliente/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM cliente WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An cliente
router.delete('/cliente/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM cliente WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An cliente
router.post('/cliente/', (req, res) => {
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
      res.json({status: 'cliente Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/cliente/:id', (req, res) => {
  const { CUIT, Calle, DNI, Observaciones, Infracciones } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @CUIT = ?;
    SET @Calle = ?;
    SET @DNI = ?;
    SET @Observaciones = ?;
    SET @Infracciones = ?;
    CALL clienteAddOrEdit(@id, @CUIT, @Calle, @DNI, @Observaciones, @Infracciones);
  `;
  mysqlConnection.query(query, [id, CUIT, Calle, DNI, Observaciones, Infracciones], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'cliente Updated'});
    } else {
      console.log(err);
    }
  });

});




module.exports = router;