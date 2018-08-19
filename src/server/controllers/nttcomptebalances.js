/* eslint-disable  no-console */
///*eslint-disable no-unused-vars */


// var async = require('async')

//var mongoose = require('mongoose');
var Models = require('../omodels')
var async = require('async')
// var nsbalanceinputCtrl = require('../../api/nstbalanceinputs');

function BuildnttCompteBalance(objparam) {
  // let nttcomptebalancedetails=[];
  var comptebalance = new Models.nttCompteBalance(
    {
      '_oexerccompta_id': objparam._oexerccompta_id,
      '_otableauposte_id': objparam._otableauposte_id,
      '_oreference_id': objparam._oreference_id
    });

  objparam.nttcomptebalancedetails.forEach(function (entry) {
    comptebalance.addBalanceDetail({"_nttcomptebalance_id": comptebalance._id,
      "NumCompte": entry.NumCompte,
      "IntitulCompte": entry.IntitulCompte,
      "SoldeDebit": entry.SoldeDebit,
      "SoldeCredit": entry.SoldeCredit
 })

});
return comptebalance;
  }

function init(objparam) {
  var balance = BuildnttCompteBalance(objparam)
  return {
    balance: balance,
    getData: balance.getData()
  }

}


// query.sort({ field: 'asc', test: -1 });

module.exports.getAll = function (req, res, next) {
  var getquery = Models.nttCompteBalance.find({}, {});
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
  Models.nttCompteBalance.findById(req.params.id,
    function (err, doc) {
      if (err)
      {
        return next(err);

      } else {

        Models.nttCompteBalanceDetail.find({ _nttcomptebalance_id: req.params.id }, {},
          function (err, nttcomptebalancedetails) {
            if (err) throw err;
            doc.nttcomptebalancedetails = nttcomptebalancedetails

            res.json(doc);
          })





      }


    })
};

module.exports.create = function (req, res, next) {
  var comptebalanceParam = req.body;

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

  Models.nttCompteBalance.findOne(qy, {},
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
    var  _comptebalance = obj.balance;
   var  _getdata = obj.getData;
    var _details = [],
    __details=[];
    _details = _getdata.nttcomptebalancedetails;

    for (var i = 0; i < _details.length; i++) {
    var   objdetail = new Models.nttCompteBalanceDetail(_details[i]);

      __details.push(objdetail);
    }

    if (!(_comptebalance._oexerccompta_id && _comptebalance._otableauposte_id && _comptebalance._oreference_id
    )) {
      res.status(400).json({
        error: 'There was an error!'
      });
    } else {

      _comptebalance.save(function (err, result) {

        if (err) {
          console.dir(err);
        }
        res.status(200).send(`compte balance:  ${result}  entered successfully`)

        // callback(JSON.stringify(nstbalanceinputdata))


        async.eachSeries(

          __details,

          function (objdetail, detailSavedCallBack) {


            objdetail.save(function (err) {

              if (err) {
                console.dir(err);
              }

              detailSavedCallBack();
            });

          },

          function (err) {

            if (err)
            {
              console.dir(err)
            }else {
              res.status(200).json('Details entered successfully')
            }



            //   nttbalanceSavedCallBack();
          }
        );

      });

      // nttbalanceSavedCallBack();




    }
  }

}



module.exports.edit = function (req, res, next) {
  Models.nttCompteBalance.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};

module.exports.del = function (req, res, next) {
  //console.log('Deleting a balanceinput');
  Models.nttCompteBalance.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    /*let response={
    message:'Deleting a balanceinput',
    id: post._id
    }*/
    res.json(post);
  })
};
