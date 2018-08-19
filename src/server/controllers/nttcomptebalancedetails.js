/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */


// var async = require('async')

//var mongoose = require('mongoose');
var Models = require('../omodels')
// var async = require('async')
// var nsbalanceinputCtrl = require('../../api/nstbalanceinputs');


// query.sort({ field: 'asc', test: -1 });

module.exports.getAll = function (req, res, next) {
  var getquery = Models.nttCompteBalanceDetail.find({}, {});
  getquery.sort({ CreatedOn: -1 })
    //.limit(6)
    .exec(function (err, docs) {
      if (err)
        return next(err);
      res.json(docs);
    })
  // return  nsbalanceinputCtrl.findAll(req, res, next)
};

module.exports.getById = function (req, res, next) {
  console.log('Requesting a specific nstBalance');
  Models.nttCompteBalanceDetail.findById(req.params.id,
    function (err, docs) {
      if (err)
        return next(err);
      res.json(docs);
    })
};


module.exports.edit = function (req, res, next) {
  Models.nttCompteBalanceDetail.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};

module.exports.del = function (req, res, next) {
  //console.log('Deleting a balanceinput');
  Models.nttCompteBalanceDetail.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    /*let response={
    message:'Deleting a balanceinput',
    id: post._id
    }*/
    res.json(post);
  })
};
