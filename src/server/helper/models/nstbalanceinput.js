"use strict"

var nstBalanceInput = require('../../omodels').nstBalanceInput;

var async = require('async')
/*
function BuildnttBalanceinput(body) {
  // let nttcomptebalancedetails=[];
  var balanceinputdata = new nstBalanceInput(
    {
	"NumCompte": body.NumCompte,
      "IntitulCompte": body.IntitulCompte,
      "SoldeDebit": body.SoldeDebit,
      "SoldeCredit": body.SoldeCredit
    });

  body.forEach(function (entry) {
    balanceinputdata.addbalanceinput({
      "NumCompte": entry.NumCompte,
      "IntitulCompte": entry.IntitulCompte,
      "SoldeDebit": entry.SoldeDebit,
      "SoldeCredit": entry.SoldeCredit
 })

});
return balanceinputdata;
  }

  function init(body) {
    var balanceinputdata = BuildnttBalanceinput(body)
    return {
      balanceinputdata: balanceinputdata,
      getData: balanceinputdata.getData()
    }

  }

  console.log(JSON.stringify(init()));*/





function toBalanceinput(body) {

  return new nstBalanceInput(
    {
      NumCompte: body.NumCompte,
      IntitulCompte: body.IntitulCompte,
      SoldeDebit: body.SoldeDebit,
      SoldeCredit: body.SoldeCredit

    });
}

function SearchBy(model, _comptenumber) {
  var getquery = model.findOne((_comptenumber), {});
  return getquery;
}


module.exports = {
  index: function (callback) {
    nstBalanceInput.find({}, {}, { limit: 6, sort: { IntitulCompte: 'desc' } })
      .exec(function (err, nstbalanceinputs) {

        if (err) throw err;
        callback(null, nstbalanceinputs);
      }
      )
  },

  SearchBy: function (model, _comptenumber) {
    var getquery = model.findOne((_comptenumber), {});
    return getquery;
  },

  findByNumCompte: function (_comptenumber, callback) {
    nstBalanceInput.findOne({ NumCompte: _comptenumber }, {},
      function (err, nstbalanceinput) {

        if (err)
          return callback(new Error(
            'No NumCompte matching '
            + _comptenumber
          )
          );

        return callback(null, nstbalanceinput);
      });
  },

  findByid: function (_balanceid, callback) {

    nstBalanceInput.findOne({ _id: _balanceid }, {},
      function (err, nstbalanceinput) {

        if (!nstbalanceinput.id)
          return callback(new Error(
            'No id matching '
            + _balanceid
          )
          );
        return callback(null, nstbalanceinput);
      });
  },

  toEditbalanceinput: function (body) {


    var d = new Date();
    return {
      id: body.id,
      IntitulCompte: body.NumCompte,
      NumCompte: body.IntitulCompte,
      SoldeDebit: body.SoldeDebit,
      SoldeCredit: body.SoldeCredit,
      ModifiedOn: d

    }

  },

  toBalanceinput: function (body) {

    return new nstBalanceInput(
      {
        NumCompte: body.NumCompte,
        IntitulCompte: body.IntitulCompte,
        SoldeDebit: body.SoldeDebit,
        SoldeCredit: body.SoldeCredit

      });
  },
  objectbalanceinputobject: function (NumCompte, IntitulCompte, SoldeDebit, SoldeCredit) {
    var obj = {};
    obj.NumCompte = NumCompte,
      obj.ntitulCompte = IntitulCompte,
      obj.SoldeDebit = SoldeDebit,
      obj.SoldeCredit = SoldeCredit

  },
  /*
editbalanceinput(model, comptenumber, body, callback){
  SearchBy(model, comptenumber)
  .exec(function (err, data) {
    if (err) {
      return (err);
    } else {

            if (data) {

  var arr=[];
  var balanceinput = toEditbalanceinput(body);
  arr.push(balanceinput);

  async.eachSeries(arr, function (balanceinput, SavedCallBack) {
    balanceinput.save(function (err) {
      if (err) {
        if (err.code === 11000) {
          //  return SavedCallBack(err)
          return (new Error({
            error: 'Error  inserting duplicate key.'
          }));
        }
        else {
          //  return SavedCallBack(err)
          return (new Error({
            error: 'Error inserting new record.'
          }));
        }
      }
      else {

        SavedCallBack();
        //  return SavedCallBack(err)
      }
    });
  }, function (err, balanceinput) {
    if (err)
      return (err);
    setTimeout(function () {

      return callback(null, balanceinput);
    }, 200);
  })
            }
          }
})
},*/

  editbalanceinput: function (model, param, body, callback) {
    var d = new Date();
    SearchBy(model, param)
      .exec(function (err, result) {
        // model.findById(param, function (err, result) {
        if (err) {
          return (new Error({
            error: 'Error inserting new record.'
          }));
        }
        else {
          if (result) {
            result._id = body._id,
              result.NumCompte = body.NumCompte,
              result.IntitulCompte = body.IntitulCompte,
              result.SoldeDebit = body.SoldeDebit,
              result.SoldeCredit = body.SoldeCredit,
              result.ModifiedOn = d

            result.save(function (err) {
              if (err) {
                if (err.code === 11000) {
                  //  return SavedCallBack(err)
                  return (new Error({
                    error: 'Error  inserting duplicate key.'
                  }));
                }
                else {
                  //  return SavedCallBack(err)
                  return (new Error({
                    error: 'Error inserting new record.'
                  }));
                }
              }
              else {
                setTimeout(function () {

                  return callback(null, result);
                }, 200);

              }
            });

          }

return;
        }

      });

  },



  createBalanceInput: function (body, callback) {
    var arr = [];

    var balanceinput = toBalanceinput(body);
    /*  if (!((body.NumCompte && body.IntitulCompte && body.SoldeDebit
         && body.SoldeDebit > 0) ||
         (body.NumCompte && body.IntitulCompte && body.SoldeCredit
           && body.SoldeCredit > 0)))*/

    arr.push(balanceinput);

    async.eachSeries(arr, function (balanceinput, SavedCallBack) {
      balanceinput.save(function (err) {
        if (err) {
          if (err.code === 11000) {
            //  return SavedCallBack(err)
            return (new Error({
              error: 'Error  inserting duplicate key.'
            }));
          }
          else {
            //  return SavedCallBack(err)
            return (new Error({
              error: 'Error inserting new record.'
            }));
          }
        }
        else {

          SavedCallBack();
          //  return SavedCallBack(err)
        }
      });
    }, function (err, balanceinput) {
      if (err)
        return (err);
      setTimeout(function () {

        return callback(null, balanceinput);
      }, 200);
    });
  },




  query_by_arg: function (key, value, callback) {
    //build a JSON string with the attribute and the value
    var filterArg = '{"' + key + '":' + '"' + value + '"}';
    var filter = JSON.parse(filterArg);

    nstBalanceInput.find(filter, {},
      function (err, result) {

        if (err)
          return callback(err);

        return callback(null, result);
      });
  }

}
