/**
 * From ALD team ( Alban Lionel Damien Team)
 *              ***
 * module to connect to mysql database
 * database is store on Lionel desktop
 */
var mysql = require('mysql');
 
function Connection() 
{
  this.pool = null;
 
  this.init = function() 
  {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'cdi',
      password: 'cdi',
      database: 'suricat'
    });
  };
 
  this.acquire = function(callback) 
  {
    this.pool.getConnection(function(err, connection) 
    {
      callback(err, connection);
    });
  };
}
 
module.exports = new Connection();