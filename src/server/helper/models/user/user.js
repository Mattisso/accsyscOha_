//  async = require('async')
// var nstBalanceInput = require('../../../omodels').nstBalanceInput;
var Models = require('../../../omodels')

var user= (function () {


  var DetailCount = 0,

  _arrusers =[];

function toUser (requestBody) {

  return new Models.User(
    {
      username: requestBody.username,
      role: requestBody.role,
      password: requestBody.password,

    });
}


function UpdateUser (result, requestparamid, requestBody) {
  var d = new Date();
if (result) {
  {
    result._id = requestparamid,
    result.username = requestBody.username,
    result.role= requestBody.role,
    result.password= requestBody.password,
    result.ModifiedOn = d;


  }
}
return result;
}



function BuildUser(requestBody) {

  var userdata = toUser(requestBody);

    _arrusers.push(userdata)


DetailCount = _arrusers.length

return {

  DetailCount: DetailCount,
  _arrusers:_arrusers.slice()

}

  }


  function toInitializeInstance(requestBody) {
    var userdata = BuildUser(requestBody)
    return {

      'DetailCount': userdata.DetailCount,
      '_arrusers':   userdata._arrusers.slice()
    };
  }



function hasitem (obj) {
return this._arrusers.indexOf(obj) !== -1;

}

function removeItem (obj) {
var itemIndex = _arrusers.indexOf(obj);
if (itemIndex !== -1) {
  _arrusers.splice(itemIndex, 1);
}
}


function  addnewUser() {
_arrusers.push({
  "username": "",
  "role": "",
  "password": "",
  "SoldeCredit": ""
});
// this._arrusers.slice();
}




function getTotalCount () {

    if (_arrusers.length !== undefined && _arrusers.length>0) {

      return _arrusers.length;

    }

  }



function getData () {

return {
   'DetailCount': getTotalCount(),
  '_arrusers':   _arrusers.slice()
};
}

function toinit(){
  return {
    toInitializeInstance: toInitializeInstance,
    toUser:toUser,
    BuildUser:BuildUser,
    getData:getData,
    hasitem:hasitem,
    removeItem:removeItem,
    addnewUser:addnewUser,
    UpdateUser:UpdateUser
  }

}


return {
  toinit: toinit
}


})();
module.exports= {
  toinit: user.toinit
}
