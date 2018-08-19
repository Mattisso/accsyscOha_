"use strict"

/* eslint-disable  no-console */
/*eslint-disable no-unused-vars */
var Models = require('../omodels');

var oshared=( function(){

var getcomptenumber  = function (comptenumber) {
       var getquery = Models.oCompte.find({ CompteNumber: { '$in': comptenumber } })
  //  getquery.select('_id')
return getquery;
};



var getnsbalance = function () {
    var qy={'RefCode' : {'$eq':'UN'}};
      var getquery= Models.oReference.aggregate(
      [

          { $unwind: { path: "$ocomptes", preserveNullAndEmptyArrays: true } },
       { $match : qy}
     /*  {
          $match: { "subocomptes": { $ne: [] } }
       },````*/

      //  { $match :{'RefCode' : {'$eq':'DS'}} } ,


   ]).allowDiskUse(true)

   return getquery;
}

var Getreferenceids = function () {
  //var qy=_.map(ocomptes,'_id')
 //var  qy= {'ocomptes._id': '5a1cc6f46301ee45f8995202'} //'5a1cc6f46301ee45f8995202';
    var getquery= Models.oReference.aggregate(
    [
        /*{
            $unwind: "$ocomptes"
        },*/

     //   { $match :  {'RefCode' : {'$eq':'UN'}}}
     {
        $match: { "ocomptes": { $ne: [] } }
     },

      { $match :{'RefCode' : {'$eq':'DS'}} } ,

    {
       $lookup:
          {
             from: 'oCompte',
             localField: 'ocomptes',
             foreignField: "_id",
        as: "subocomptes"
         }

    }

 ]).allowDiskUse(true)

 return getquery;
/*
    var getquery=getcomptenumber(comptenumber);
    console.log(getquery)
getquery.exec(
    function (err, ocomtes) {
        if (err) {
            throw (err);
        }
        if(ocomtes !== null) {
            ocomtes.forEach(function(ocomte){
                var qy = Models.oReference.find({ 'ocomptes._id': ocomte._id },{})

              return qy;
            })
        }

    })*/
/*
  var   compteids=getcomptenumber(comptenumber)
  console.log(compteids)
    var getbyocompteid = Models.oReference.find({ 'ocomptes._id': compteids },{})
    .exec(
    function (err, ocomte) {
        if (err) {
            throw (err);
        }

      console.log(JSON.stringify(ocomte))

    }

    )*/

}


var updatablance = function () {
    //var qy=_.map(ocomptes,'_id')
  // var  qy= {'ocomptes._id': '5a1cc6f46301ee45f8995202'} //'5a1cc6f46301ee45f8995202';
      var getquery= Models.nstBalance.aggregate(
      [
          {
              $unwind: "$_id"
          },

    { $match :{'SoldeCredit' : {'$gte':0}}},

      {
         $lookup:
            {
               from: 'oReference',
              localField: '_id',
               foreignField: '_oreference_id',
          as: "subocomptes"
           }

      }

   ]).allowDiskUse(true)
   return getquery;
  /*
      var getquery=getcomptenumber(comptenumber);
      console.log(getquery)
  getquery.exec(
      function (err, ocomtes) {
          if (err) {
              throw (err);
          }
          if(ocomtes !== null) {
              ocomtes.forEach(function(ocomte){
                  var qy = Models.oReference.find({ 'ocomptes._id': ocomte._id },{})

                return qy;
              })
          }

      })*/
  /*
    var   compteids=getcomptenumber(comptenumber)
    console.log(compteids)
      var getbyocompteid = Models.oReference.find({ 'ocomptes._id': compteids },{})
      .exec(
      function (err, ocomte) {
          if (err) {
              throw (err);
          }

        console.log(JSON.stringify(ocomte))

      }

      )*/

  }

var Getostblareaids= function (oreferenceids) {
    // return function(getcompteids){
    var getbyocompteid = Models.oStblArea.find({})
        .populate('oreferences')
        .find({ 'oreferences._id': oreferenceids })
        .exec(
        function (err, ocomte) {
            if (err) {
                throw (err);
            }

         //   callback(null, ocomte)
          console.log(JSON.stringify(ocomte))

        }

        )

}


var Getostableauposteids = function (ostblareaids) {
    // return function(getcompteids){
    var getbyocompteid = Models.oStableauPoste.find({})
        .populate('ostblareas')
        .find({ 'ostblareas._id': ostblareaids })
        .exec(
        function (err, ocomte) {
            if (err) {
                throw (err);
            }
            console.log(JSON.stringify(ocomte))

        }

        )


}



var Getotableaupostesids = function (ostableaupostesids) {
    // return function(getcompteids){
    var getbyocompteid = Models.oTableauPoste.find({}, 'tblRefCode TableauName tableauLongName fulltableauname')
        .populate('ostableaupostes')
        .find({ 'ostableaupostes._id': ostableaupostesids })
        .exec(
        function (err, ocomte) {
            if (err) {
                throw (err);
            }

            console.log(JSON.stringify(ocomte))
        }
        )


}


return {
    getcomptenumber: getcomptenumber,
    Getreferenceids:Getreferenceids,
    Getostblareaids:Getostblareaids,
    Getostableauposteids:Getostableauposteids,
    Getotableaupostesids:Getotableaupostesids,
    updatablance:updatablance,
    getnsbalance:getnsbalance

}


})();

module.exports = {
    getcomptenumber:  oshared.getcomptenumber,
    Getreferenceids: oshared.Getreferenceids,
    Getostblareaids:oshared.Getostblareaids,
    Getostableauposteids:oshared.Getostableauposteids,
    Getotableaupostesids:oshared.Getotableaupostesids,
    updatablance:oshared.updatablance,
    getnsbalance:oshared.getnsbalance
};


