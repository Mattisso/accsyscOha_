/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */

var async = require('async')

//var mongoose = require('mongoose');
var nstBalance= require('../omodels').nstBalance
// var nsbalanceinputCtrl = require('../../api/nstbalances');

module.exports.getAll =function (req, res, next) {
  var getquery = nstBalance.find({}, {});
  getquery.sort({ IntitulCompte: 'desc' })
    .limit(6)
    .exec(function (err, docs) {
      if (err)
      return next(err);
      res.json(docs);
    })
// return  nsbalanceinputCtrl.findAll(req, res, next)
};

module.exports.getById=  function (req, res, next) {
  console.log('Requesting a specific nstBalance');
  nstBalance.findById(req.params.id,
  function (err, docs) {
        if (err)
          return next(err);
        res.json(docs);
      })
  };


  module.exports.create =  function (req, res, next) {
  var arr = []
  var obj = new nstBalance(req.body);

  if (!((req.body.NumCompte && req.body.IntitulCompte && req.body.SoldeDebit
    && req.body.SoldeDebit > 0) ||
    (req.body.NumCompte && req.body.IntitulCompte && req.body.SoldeCredit
      && req.body.SoldeCredit > 0))) {
    res.status(400).json({ error: 'There was an error!' });
  }
  else {
    arr.push(obj);
  }

  async.eachSeries(

    arr,

    function (obj, SavedCallBack) {
      obj.save(function (err) {
        if (err) {
         //  return SavedCallBack(err)
          return res.status(500).json({
            error: 'Error inserting new record.'
          })

        } else {

      res.status(201).json(obj);

          SavedCallBack();
        }


      })

    },
    function (err, obj) {
      if (err) return next(err);
      return res.status(200).json(obj);
    });
};

module.exports.edit =  function (req, res, next) {
  nstBalance.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.status(200).json(post);
  });

};

module.exports.del = function (req, res, next) {
   //console.log('Deleting a balanceinput');
   nstBalance.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
/*let response={
message:'Deleting a balanceinput',
id: post._id
}*/
    res.json(post);
  })
};
