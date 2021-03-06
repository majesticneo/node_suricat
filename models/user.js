var connection = require('../connection');
 
function User() 
{
    /**
     * Get ALL users from table
     * @params res response 
     */
    this.getAll = function(res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Users', function(err, result) 
            {
                con.release();
                res.send(result);
            });
        });
    };

    /**
     * Create a user
     * @params user user in json format
     * @params res response
     */
    this.create = function(user, res) 
    {
       
        connection.acquire(function(err, con) 
        {
             console.log(user);
            con.query('insert into users set ?', user, function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER creation failed'});
                } else 
                {
                    getLastId(res);
                }
            });
        });
    };

    /**
     * Get a specific user by id
     */
    this.get = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('select * from Users where idUser = ?', [id], function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'Failed to find'});
                } 
                else 
                {
                    res.send(result[0]);
                }
            });
        });
    };

    /**
     * Update a specific user
     * @params user user in json format
     */
    this.update = function(user, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('update Users set ? where idUser = ?', [user, user.id], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER update failed'});
                } 
                else 
                {
                    res.send({status: 0, message: 'USER updated successfully'});
                }
            });
        });
    };

    /**
     * Desactivate a specific user
     * @params id user's id
     * @params res response
     */
    this.desactivate = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('UPDATE Users SET active=false where idUser = ?', [id], function(err, result) 
            {
                con.release();
                if (err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to desactivate'});
                } 
                else 
                {
                    res.send({status: 0, message: 'Desactivate successfully'});
                }
            });
        });
    };

    /**
    * activate a specific user
    * @params id user's id
    * @params res response
    */
   this.activate = function(id, res) 
    {
        connection.acquire(function(err, con) 
        {
            con.query('UPDATE Users SET active=true where idUser = ?', [id], function(err, result) 
            {
                con.release();
                if (err) 
                {   
                    console.log(err);
                    res.send({status: 1, message: 'Failed to activate'});
                } 
                else 
                {
                    res.send({status: 0, message: 'activate successfully'});
                }
            });
        });
    };



    /**
     * Check a login validity
     * @params user user in json format
     * @params res response
     */
    this.checkLogin = function(user, res) 
    {
        connection.acquire(function(err, con) 
        {
		    console.log(user.email);
            con.query('select idUser from Users where email = ? AND password = ?', [user.email, user.password], function(err, result) 
            {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 2, message: 'Request error'});
                } 
                else 
                {
			        if(result.length > 0) res.send({status: 0, message: 'Connexion OK', id: result[0].id});
			        else res.send({status: 1, message: 'login failed'});
                }
            });
        });
    }; 

    /**
     * get the last id 
     * TODO : move it in logical file
     * @params res response
     */
    function getLastId(res) 
    {
        console.log('get last idUser');
        connection.acquire(function(err, con) 
        {
            con.query('SELECT LAST_INSERT_ID() as idUser',  function(err, result) {
                con.release();
                if (err) 
                {
                    console.log(err);
                    res.send({status: 1, message: 'USER creation failed'});
                }
                 else 
                 {
                    res.send({status: 0, message: 'USER created successfully', id:result[0].id});
                }
            });
        });
    }
}

module.exports = new User();
