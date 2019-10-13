var express = require('express');
var router = express.Router();
var app = express();
const assert = require('assert');
var mongojs = require('mongojs');
var db = mongojs('nodejs', ['car']);
const { check, validationResult } = require('express-validator');
router.get('/', function(req, res){
	const findDocuments = function(db, callback) {
  // Get the documents collection
		const collection = db.collection('car');
		// Find some documents
		collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs)
	    res.render('index.ejs',{data:docs,check:1})
	    callback(docs);
        })};
		findDocuments(db,function(){});
    });
router.get('/book',(req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  		const findDocuments = function(db, callback) {
  // Get the documents collection
		const collection = db.collection('car');
		// Find some documents
		collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs)
	    res.render('index.ejs',{data:docs,check:1})
	    callback(docs);
        })};
		findDocuments(db,function(){});
    });
router.post('/add', [
	check('capacity','Enter Valid Number...').isInt(),
	check('rent','Enter Valid Number...').isInt() ],(req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  var number = req.body.number;
  	var model = req.body.model;
  	var capacity = req.body.capacity;
  	var rent = req.body.rent;
  if (!errors.isEmpty()) {
  	console.log(errors);
    res.render('index',{
    	error:1,
    	number:number,
    	model:model,
    	capacity:capacity,
    	rent:rent
    });
  }
  else
  	var newUser = {
			number:number,
	    	model:model,
	    	capacity:capacity,
	    	rent:rent,
	    	available:"yes"
		}

		db.car.insert(newUser, function(err, doc){
			if(err){
				res.send(err);
			} else {
				console.log('Car Added...');

				//Success Message
				req.flash('success', 'Your Car is Successfully registered with us');
				// Redirect after register
				res.location('/');
				res.redirect('/');
			}
		});
  	console.log('success');
});



module.exports = router;