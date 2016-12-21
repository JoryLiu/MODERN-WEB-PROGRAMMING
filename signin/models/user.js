/// <reference path="../public/javascripts/jquery.js" />
var bcrypt = require('bcrypt-nodejs');
var validator = require('../public/javascripts/validator.js');
var debug = require('debug')('signin:user');
var _ = require('lodash');

module.exports = function (db) {
    var users = db.collection('users');

    return {

        findUser: function (name, password) {
            return users.findOne({ name: name }).then(function (user) {
                if (user) {
                    var result = bcrypt.compareSync(password, user.password);
                    if (result) return Promise.resolve(user);
                    else return Promise.reject('wrong password');
                } else
                    return Promise.reject('There\'s no such user');
                /*return user ? bcrypt.compareSync(password, user.password).then(function() {
                    return user;
                }) : Promise.reject("There's no such user");*/
            });
        },

        createUser: function (user) {
            bcrypt.hash(user.password, null, null, function (err, hash) {
                user.password = hash;
                return users.insert(user);
            });
        },

        checkUser: function(user) {
            var formatErrors = validator.findFormatErrors(user);

            return new Promise(function(resolve, reject) {
                formatErrors ? reject(formatErrors) : resolve(user);
            }).then(function() {
                return users.findOne(getQuery(user)).then(function(exitedUser) {
                    debug("exited user ", exitedUser);
                    return exitedUser ? Promise.reject("There's some infomation same as registered user") : Promise.resolve(user);
                })
            })
        }

    }
}

function getQuery(user) {
    return {
        // $or: _(user).omit('password').pairs().map(pairToObject).value()
        $or: [{'name': user.name}, {'id': user.id}, {'email': user.email}, {'phone': user.phone}]
    };
}
/*
function pairToObject(pair) {
    obj = {};
    obj[pair[0]] = pair[1];
    return object;
}*/