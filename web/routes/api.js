const express = require('express')
const router = express.Router()
const apiData = require('./db.json')
module.exports = router.post('/:name',(req,res)=>{
  if(apiData[req.params.name]){
    res.json(apiData[req.params.name]
    )
  }else{
    res.send('no such a name')
  }
})