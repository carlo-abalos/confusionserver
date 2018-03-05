const express = require('express');
const bodyParser = require('body-parser');

const authenticate = require('../authenticate');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req,res,next) => {
	res.end("Will send all the promos to you!");
})
.post(authenticate.verifyUser,(req, res, next) => {
	res.end('Will add the promo: ' + req.body.name + " with details " + req.body.description);
})
.put(authenticate.verifyUser,(req, res, next) => {
	res.statusCode = 403;
	res.end("PUT operation not supported on /promotions");
})
.delete(authenticate.verifyUser,(req, res, next) => {
	res.end('Deleting all the promos!');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req,res,next) => {
	res.end("Will send details of the promo: " + req.params.promoId + " to you!");
})
.post(authenticate.verifyUser,(req, res, next) => {
	res.statusCode = 403;
	res.end("POST operation not supported on /promotions/" + req.params.promoId);
})
.put(authenticate.verifyUser,(req, res, next) => {
	res.write('Updating the promo: ' + req.params.promoId + "\n");
	res.end('Will update the promo: ' + req.body.name + " with details: " + req.body.description);
})
.delete(authenticate.verifyUser,(req, res, next) => {
	res.end('Deleting promo: ' + req.params.promoId);
});

module.exports = promoRouter;