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

// PUT

// DELETE

module.exports = router;
