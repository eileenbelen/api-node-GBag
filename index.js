'use strict';

const express = require('express');

const app = express();

app.get ('/', function(req,res){
    res.json({data: {user: {id:111, name: 'TEST'}}});
});

app.listen(8181,function(){
    console.log('Server UP!');
})