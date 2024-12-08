const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get( '/', ( req, res )=>{
    console.log( '/todo GET' );
    // assemble query
    const queryText = 'SELECT * FROM todos';
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

// DELETE

module.exports = router;
