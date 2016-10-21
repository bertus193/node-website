var jwt = require('jwt-simple');
var moment = require('moment');

var payload = {
    login: 'pepito',
    exp: moment().add(7, 'days').valueOf()
}

var secret='123456';

var token = jwt.encode(payload, secret);
console.log(token);

var decoded = jwt.decode(token, secret);
console.log(decoded);

