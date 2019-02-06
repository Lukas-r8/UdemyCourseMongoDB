const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'lukas016!'

var rounds = 14
console.log(Math.pow(2,rounds));
bcrypt.genSalt(rounds, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('hashed and salted value:',hash);
  })
})




// var data2 = {
//   id: 25
// }
// var someSalt = '1234abcd'
// var token = jwt.sign(JSON.stringify(data2), someSalt)
// console.log('token:',token);
//
// var decoded = jwt.verify(token, someSalt);
// console.log(decoded);


// var message = 'number4'
// var hash = SHA256(message).toString();
//
// console.log('message:',message);
// console.log('hash:',hash);
//
// var data = {
//   id: 4
// };
//
// var salt = 'someSalt'
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + salt).toString()
// }
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + salt).toString();
//
// if (resultHash === token.hash){
//   console.log('trustworthy file)');
// } else {
//   console.log('file was altered, do not trust');
// }
