const { truncate } = require('fs');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:true
});
const express   = require('express');
const path      = require('path');
const { query } = require('express');
const PORT      = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views',path.join(__dirname, 'views'))

  .get('/todo', async(req,res) => {
    console.log("received request to access todo");

    try {
      const client = await pool.connect();
      const todo   = await client.query('SELECT * FROM Todo ORDER BY id');
      const params = { 'todo'  : (todo)  ?  todo.rows  : null };

      res.send(params);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })


  .listen(PORT, () => console.log('Listening on ${PORT}'))