const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get( '/', ( req, res )=>{
    console.log( '/todo GET' );
    // assemble query
    const queryText = 'SELECT * FROM todos ORDER by "id"';
    // run pool.query
    pool.query( queryText ).then( ( results )=>{
        // return results.rows
        res.send( results.rows );
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})
// POST
router.post( '/', ( req, res )=>{
    console.log( 'in /todo POST:', req.body );
        // assemble query
        const queryText = `INSERT into "todos" ( "text", "isComplete" ) VALUES ( $1, $2 );`;
        const values = [ req.body.text, req.body.isComplete ];
        // run pool.query
        pool.query( queryText, values ).then( ( results )=>{
            // return results.rows
            res.sendStatus( 200 ); // "CREATED"
        }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 500 );
        })
})
// PUT
router.put('/:id', (req,res)=> {
    const { id } = req.params;
    const values = [req.body.isComplete, id];
    const queryText = 'UPDATE "todos" SET "isComplete"=$1 WHERE "id"=$2'
    pool.query(queryText, values)
    .then((results)=> {
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(400);
    })

})
// DELETE
router.delete( '/:id', ( req, res )=>{
    
    const id = req.params.id;
    console.log( 'Deleting to do with id:', id );
    const queryText = `DELETE FROM "todos" WHERE id=$1;`;
  
        // run pool.query
    pool.query( queryText, [id] )
        .then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
            // handle any errors
            console.log( err );
            res.sendStatus( 500 );
        })
})

module.exports = router;
