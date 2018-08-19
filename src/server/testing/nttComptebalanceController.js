/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */


// var async = require('async')

//var mongoose = require('mongoose');
var Models = require('../omodels')
var async = require('async')
// var nsbalanceinputCtrl = require('../../api/nstbalanceinputs');

function BuildnttCompteBalance (objparam) {
  //let nttcomptebalancedetails=[];
  var comptebalance = new Models.nttCompteBalance(
   {'_oexerccompta_id': objparam._oexerccompta_id,
    '_otableauposte_id': objparam._otableauposte_id,
    '_oreference_id': objparam._oreference_id});

    objparam.nttcomptebalancedetails.forEach(function(entry) {

    var comptebalancedetail= new Models.nttCompteBalanceDetail(
      {"_nttcomptebalance_id": comptebalance._id,
    "NumCompte":  entry.NumCompte,
    "IntitulCompte": entry.IntitulCompte,
    "SoldeDebit": entry.SoldeDebit,
    "SoldeCredit": entry.SoldeCredit
   }
  )
  comptebalance.addBalanceDetail(comptebalancedetail)

  });
  return  comptebalance;
  }

function init(objparam) {
    var balance= BuildnttCompteBalance(objparam)
    return {
      balance: balance,
      getData: balance.getData()
     }

  }




module.exports.getAll = function (req, res, next) {
  var getquery = Models.nttCompteBalance.findOne({}, {});
  getquery.sort({ IntitulCompte: 'desc' })
    .limit(6)
    .exec(function (err, docs) {
      if (err)
        return next(err);
      res.json(docs);
    })
  // return  nsbalanceinputCtrl.findAll(req, res, next)
};

module.exports.getById = function (req, res, next) {
  console.log('Requesting a specific nstBalanceInput');
  Models.nttCompteBalance.findById(req.params.id,
    function (err, docs) {
      if (err)
        return next(err);
      res.json(docs);
    })
};

module.exports.create = function (req, res, next) {
  var comptebalanceParam=req.body;

  var qy = {
    '$and': [

      {
        '_oexerccompta_id': comptebalanceParam._oexerccompta_id
      },
      {
      '_otableauposte_id': comptebalanceParam._otableauposte_id
    }, {
      '_oreference_id': comptebalanceParam._oreference_id
    }
    ]
}

Models.nttCompteBalance.findOne(qy,{},
  function (err, nttcomptebalance) {
  if (err) {
  next(err);
    // return next((err.name + ': ' + err.message))
  }

  if (nttcomptebalance) {
    // username already exists
    res.status(403).send(`refenrence: ${comptebalanceParam._oreference_id
    }}  is already existed`);
  }
  else {
    createUser();

  }


});
function createUser() {
var obj = init(req.body);
var result = obj.balance;



if (!((result._oexerccompta_id && result._otableauposte_id && result._oreference_id
   ))) {
  res.status(400).json({
    error: 'There was an error!'
  });
} else {

  result.save(function (err) {

    if (err) {
      console.dir(err);
    }
    var objdetail;
    var _details = [];
    _details=result.nttcomptebalancedetails;

    for (var i = 0; i < _details.length; i++) {
    objdetail = _details[i];
    }

    async.eachSeries(

      _details,

      function (objdetail, detailSavedCallBack) {


        objdetail.save(function (err) {

          if (err) {
            console.dir(err);
          }

          detailSavedCallBack();
        });

      },

      function (err) {

        if (err) console.dir(err);

        res.status(200).send(`IntitulCompte:  ${objdetail.IntitulCompte}  entered successfully`)

    //   nttbalanceSavedCallBack();
      }
    );

      //    callback(JSON.stringify(nstbalanceinputdata))

    });

    // nttbalanceSavedCallBack();


  }
}

}
