var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 /* 회원가입 */
router.post('/signup', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;

  var db = req.app.get('database');

  if (db == undefined){
    res.json({message:'503 Server Error'});
    return;
  }

  var validate = userValidation(username, password);
  if (validate == false){
    res.json({message:'400 Bad Request'});
  }

  var usersCollection = db.collection('users');

  usersCollection.count({'username': username}, function(err, result){
    if (err) throw(err);

    if (result > 0){
      res.json({message:'400 Bad Request'});
      return;
    } else{
      //var cryptoPassword = crypto.createHash('sha512').update(password).digest('base64');

      crypto.randomBytes(64, function(err, buf) {
        
        const saltStr = buf.toString('base64');
        crypto.pbkdf2(password, saltStr , 100, 64, 'sha512', function(err, key) {
          const cryptoPassword = key.toString('base64');

          usersCollection.insertOne({'username': username,
           'password': cryptoPassword, 'name': name, 'salt': saltStr}, function(err, result){
            if(err) throw(err);
            if(result.ops.length > 0)
              res.json(result.ops[0]);
            else
              res.json({message:'503 Server Error'});
          });
        });
      });

      
    }
  });
  
});

var userValidation = function(username, password) {
  if (username == '' || password == ''){
    res.json({message:'400 Bad Request'});
    return false;
  }
  if (username.length < 4 || username.length > 12){
    res.json({message:'400 Bad Request'});
    return false;
  }
  if (password.length < 4 || password.length > 12){
    res.json({message:'400 Bad Request'});
    return false;
  }
  return true;
}

 /* 로그인 */
router.post('/signin', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  
  var db = req.app.get('database');

});
 
module.exports = router;
