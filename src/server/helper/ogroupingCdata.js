"use strict"

var Models = require('../omodels');
var async = require('async');
var _ = require('lodash')
var odashared = require('./odashared');
var ogroupingdata = require('../seed/data-seed/ogroupingdata')

module.exports =
	{
		populate: function (callback) {
			async.waterfall([
				function (callback) {
					var obj = {};
					var mergeoreference = [];

					var ogroupings = odashared.groupingsBfilter(ogroupingdata);

					async.eachSeries(ogroupings,
						function (ogrouping, ogestioncallback) {
							var qyrparm = ogrouping.oreferencesB;
							//	console.log(qyrparm)

							Models.oReference.find(
								{
									RefCode:
										{
											'$in': qyrparm
										}
								}, '_id  RefCode Description',
								function (err, docs) {
									if (err) {
									throw (err);
									}
									else {

										//	 console.log(JSON.stringify(otaleaupostes))
										async.eachSeries(docs, function (doc, ocompteidscallback) {
											obj = {
												oreferencesB_id: doc._id,
												RefCode: doc.RefCode,
												Description: doc.Description,
												ogroupingsC: ogrouping.groupingsC

											}
											mergeoreference.push(obj);

											ocompteidscallback()
										}, function (err) {
											if (err) {
											throw (err);
											}
											else {


												ogestioncallback();
											}
										}
										);
									}
								}
							);

						}, function (err) {
              if (err) {
                throw (err);
                }
                else {
              callback(null, mergeoreference)
                }
						}
					);

				},

				function (ogroupings, callback) {
					var obj = {};
					var mergeoreference = [];


					//    var ogroupings = odahelper.oarray(ogestiondata);
					async.eachSeries(ogroupings,
						function (ogrouping, ogestioncallback) {
							var qyrparm = _.map(ogrouping.ogroupingsC, 'oreferenceC');

							Models.oReference.find(
								{
									RefCode:
										{
											'$in': qyrparm
										}
								}, '_id RefCode Description',
								function (err, docs) {

									if (err) {
									throw (err);
									}

									else {
										obj = {

											oreferencesB_id: ogrouping.oreferencesB_id,
											RefCode: ogrouping.RefCode,
											Description: ogrouping.Description,
											ogroupingsC: docs

										}
										mergeoreference.push(obj);

										ogestioncallback();

									}


								});



						}, function (err) {
              if (err)
              {
                throw (err);
              }
else{
	callback(null, mergeoreference)
}


						}
					);

				}


			], function (err, results) {

				if (err) {

			throw err;
				}
				else {

					callback(null, results)

				}

			}
			);
		}
	}
