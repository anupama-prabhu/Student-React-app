var express=require('express')
var router=express.Router()
var jwt=require('jsonwebtoken')
var getDBConnection=require('../shared/dbConn')
var validateToken=require('../shared/validateToken')
router.post('/test-q',function(req,res,next){
    var n=req.query.name
    var l=req.query.loc
    res.send(`Hi this is ${n} , I am from ${l}`)
})


router.post('/test-p/:n/:loc',function(req,res,next){
    var n=req.params.n;
    var l=req.params.loc
    res.send(`Hi this is ${n} , I am from ${l}`)
})

router.post('/test-h',function(req,res,next){
    var n=req.headers.name
    var l=req.headers.loc
    res.send(`Hi this is ${n} , I am from ${l}`)
})

router.post('/test-b',function(req,res,next){
    var n=req.body.name
    var l=req.body.loc
    res.send(`Hi this is ${n} , I am from ${l}`)
})


router.post('/reg-std',function(req,res,next){
     var dataObj=  req.body.data
     getDBConnection(res,function(db){
        var collection=db.collection('students')
        collection.insertOne(dataObj,function(e,s){
            if(e){
                res.send(e)
            }else{
                res.send(s)
            }
        })
     })
     
})

router.get('/get-std-uid',validateToken,function(req,res,next){
   var uid= req.query.uid
   getDBConnection(res,function(db){
    var collection=db.collection('students')
    collection.find({uid}).toArray(function(e,s){
        if(e){
            res.send(e)
        }else{
            res.send(s)
        }
    })
   })
  
})

router.post('/login',function(req,res,next){
    var dataObj=req.body.data;
    getDBConnection(res,function(db){
          var collection=  db.collection('students')
          collection.find(dataObj).toArray(function(e,s){
                if(e){
                    res.send(e)
                }else{
                    if(s.length>0){
                        var token=jwt.sign(dataObj,'appToken')
                        s[0].token=token
                    }
                    res.send(s)
                }
          })
    })
})

router.put('/update-std/:uid',validateToken,function(req,res,next){
    var uid=req.params.uid 
    var newData=req.body.data 

    getDBConnection(res,function(db){
         var collection=db.collection('students')
         collection.updateOne({uid},{$set:newData},function(e,s){
             if(e){
                res.send(e)
             }else{
                res.send(s)
             }
         })
    })

})

router.delete('/delete-std',validateToken,function(req,res,next){
       var uid= req.query.uid
       getDBConnection(res,function(db){
           var collection= db.collection('students')
           collection.deleteOne({uid},function(e,s){
                if(e){
                    res.send(e)
                }else{
                    res.send(s)
                }
           })
       })
})

module.exports=router;