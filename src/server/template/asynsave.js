/*

function aysnsave(callback) {

	var ocomptes = [];

	for (var i = 0; i < seeddata.ocomptedata.length; i++) {

		var ocompte = new Models.oCompte({

				CompteNumber: seeddata.ocomptedata[i].CompteNumber,
				Exception: seeddata.ocomptedata[i].Exception,
				Taux: seeddata.ocomptedata[i].Taux
			})
			// Add newly create User model to 'users' array
			ocomptes.push(ocompte);
	};

	async.eachSeries(

		ocomptes,

		function (ocompte, ocompteSavedCallBack) {

		ocompte.save(function (err) {

			if (err) {
				throw (err);
			}

			ocompteSavedCallBack();
		});

	},

		function (err) {

		if (err)
			throw (err);

		console.log("Finished aysnc.each in seeding db")

		callback(null, 'SUCCESS - Seed database');

	});

}
*/
