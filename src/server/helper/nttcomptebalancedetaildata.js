"use strict"

var Models = require('../omodels');
var async = require('async');
var odata = require('./models')
// var _ = require('lodash')

module.exports = {
  popular: function (callback) {
    var arr = [];
    odata.Nttbalance.popular(function (err, nttbalances) {
      if (err) {
        throw err
      } else {
        async.eachSeries(nttbalances, function (nttbalance, nttbalancecallback)
        {
     var otableauposteid=nttbalance._otableauposte_id,
          oreferenceids=nttbalance._oreference_id,
          oexerccomptaids=nttbalance._oexerccompta_id;

          Models.nttCompteBalance.find({
            '$and': [{
            '_otableauposte_id': otableauposteid
            }, {
            '_oreference_id': oreferenceids
            }, {
            '_oexerccompta_id': oexerccomptaids
            }
            ]
            }, {},

						function (err, elems) {
						if (err) {
              throw err;
            } else {
							var obj;
							async.eachSeries(elems, function (elem, elemcallback) {
								obj = {
									_nttcomptebalance_id: elem._id,
									NumCompte: nttbalance.NumCompte,
									IntitulCompte: nttbalance.IntitulCompte,
									SoldeCredit: nttbalance.SoldeCredit,
									SoldeDebit: nttbalance.SoldeDebit

								}
								arr.push(obj);
								//  console.log(arr);

								elemcallback();

							}, function (err) {
								if (err) {
									throw err
								} else {
									nttbalancecallback();

								}

							});
						}

					});

				}, function (err) {
					if (err) {
						throw err;
					} else {

						callback(null, arr)
					}
				});

			}

		})
	}
}
