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

					var ogroupings = odashared.oarray(ogroupingdata);
					async.eachSeries(ogroupings,
						function (ogrouping, ogestioncallback) {
							var qyrparm = ogrouping.otableauPoste;

							Models.oReference.find(
								{
									RefCode:
										{
											'$in': qyrparm
										}
								}, '_id  RefCode Description',
								function (err, otaleaupostes) {
									if (err) {
										throw (err);
									}
									else {

										//	 console.log(JSON.stringify(otaleaupostes))
										async.eachSeries(otaleaupostes, function (otaleauposte, ocompteidscallback) {
											obj = {
												_otableauposte_id: otaleauposte._id,
												RefCode: otaleauposte.RefCode,
												Description: otaleauposte.Description,
												ogroupingA: ogrouping.groupingsA

											}
											mergeoreference.push(obj);

											ocompteidscallback()
										}, function (err) {
											if (err) {
												throw (err);
											}
											else {
												//	mergeoreference.push(obj);

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
							callback(null, mergeoreference)}
						}
					);

				},

				function (ogroupings, callback) {
					var obj = {};
					var mergeoreference = [];


					//    var ogroupings = odahelper.oarray(ogestiondata);
					async.eachSeries(ogroupings,
						function (ogrouping, ogestioncallback) {


							var qyrparm = _.map(ogrouping.ogroupingA, 'oreferencesA');
							//	console.log(ogrouping)

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
											_otableauposte_id: ogrouping._otableauposte_id,
											RefCode: ogrouping.RefCode,
											Description: ogrouping.Description,
											ogroupingA: docs

										}
										mergeoreference.push(obj);



											ogestioncallback();

									}


								}
							);



						}, function (err) {
              if (err) {
                throw (err);
            }

            else {


							callback(null, mergeoreference)}

						}
					);

				}


			], function (err, results) {

				if (err) {

					throw (err);
				}
				else {

					callback(null, results)

				}

			}
			);
		}
	}
