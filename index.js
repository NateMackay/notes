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

  // retrieve data from the database
  .get('/todo', async(req,res) => {
    console.log("received request to access database");
    var user = {id: 5, fname: 'John', access: false};

    try {
      const client = await pool.connect();
      const todo   = await client.query('SELECT * FROM Todo ORDER BY priority, id');
      user   = await client.query("SELECT fname FROM Users WHERE phone='" + req.query.phone + "';");
      // console.log('user ' + user);
      // console.log('user.rows ' + user[0].fname);
      console.log('user.rows[0]' + user.rows[0].fname);

      if (user.rows == "" ) {
        var user = [{id: 5, fname: 'John', access: false}, {id: 5, fname: 'John', access: false}];
      }
      // console.log(user[0]);
      const params = { 'todo'  : (todo)  ?  todo.rows  : null, 
                       'user'  : (user.rows)  ?  user.rows  : user };

      res.send(params);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })

  .get('/update', async (req, res) => {
    try { 
      console.log("request to add an item to the list");
      console.log(" ");
      console.log(req.query.comBy);
      if (req.query.comBy == "") { 
        var assign = new Date();
        req.query.comBy = assign.getFullYear() + "-" + (assign.getMonth() + 2) + "-" + assign.getDate();
        console.log("new date " + req.query.comBy);
      }
      const client = await pool.connect();
      const user   = await client.query("SELECT fname FROM Users WHERE phone='" + req.query.phone + "';");
      // "(SELECT fname FROM Users WHERE phone='" + req.query.phone + "')" 
      // const todo   = await client.query("INSERT INTO Todo (item, priority, date, submittedBy) VALUES ('" + req.query.item + "', " + req.query.priority + ", '" + req.query.comBy + "', '" + user.rows[0].fname + "')");
      const todo   = await client.query("INSERT INTO Todo (item, priority, date, submittedBy) VALUES ('" + req.query.item + "', " + req.query.priority + ", '" + req.query.comBy + "', '(SELECT fname FROM Users WHERE phone='" + req.query.phone + "')')");

      res.redirect('https://nates-notes.herokuapp.com');
      client.release();
    } catch (err) { 
      console.error(err);
      res.send("Error: ", err);
    }
  })

  .get('/delete', async (req, res) => {
    try { 
      console.log("request to delete an item");

      const client = await pool.connect();
      const todo   = await client.query("DELETE FROM Todo WHERE item='" + req.query.delLister + "';");

      res.redirect('https://nates-notes.herokuapp.com');
      client.release();
    } catch (err) { 
      console.error(err);
      res.send("Error: ", err);
    }
  })

  .get('/edit', async (req, res) => {
    try { 
      console.log("request to update an item with a new priorty");

      const client = await pool.connect();
      const todo   = await client.query("UPDATE Todo SET priority=" + req.query.priority + " WHERE item='" + req.query.editLister + "';");

      res.redirect('https://nates-notes.herokuapp.com');
      client.release();
    } catch (err) { 
      console.error(err);
      res.send("Error: ", err);
    }
  })

  .listen(PORT, () => console.log('Listening on ${PORT}'))

  function addItem() { 
    document.getElementById('addForm').style.display = "initial";
    document.getElementById('addItem').style.display = "none";
    return false;
  };
