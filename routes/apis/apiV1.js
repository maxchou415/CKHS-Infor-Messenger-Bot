var express = require('express')
var router = express.Router()

var request = require('request')
var config  = require('config')
var mongoose = require('mongoose')


router.get('/messenger-bot/', (req, res, next) => {
  let message = req.query.meaasge
  let token = config.get('token')
  let User = require('../../models/messenger-bot')

  User.find({}, (err, data) => {
    data.forEach((i) => {
      let recipient = i.facebook_uid
      request({
    		url: 'https://graph.facebook.com/v2.6/me/messages',
    		qs: {access_token: token},
    		method: 'POST',
    		json: {
    			recipient: {id: recipient},
    			message: {text: message},
    		}
    	}, (error, response, body) => {
    		if (error) {
    			console.log('Error sending messages: ', error)
    		} else if (response.body.error) {
    			console.log('Error: ', response.body.error)
    		}
    	})
    })
  })

});

module.exports = router;
