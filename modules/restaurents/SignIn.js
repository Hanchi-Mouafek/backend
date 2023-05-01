
const pool=require("../../config/index")


const signIn=pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query('SELECT * FROM clients', (error, results, fields) => {
      // When done with the connection, release it.
      connection.release();
  
      // Handle errors and results
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    });
  });

module.export=signIn