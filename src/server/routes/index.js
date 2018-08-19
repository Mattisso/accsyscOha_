const path = require('path');
var  routes = require('express').Router();
/*
var  nstbalanceinputsRoutes= require( path.join(__dirname,'../../api/nstbalanceinputs'));
var  nsbalanceRouter= require( path.join(__dirname,'../../api/nstbalances'));
var  nttbalanceRouter= require( path.join(__dirname,'../../api/nttbalances'));
var  nttcomptebalanceRouter= require( path.join(__dirname,'../../api/nttcomptebalances'));
var userRouter =require( path.join(__dirname,'../../api/users'));

var  nttcomptebalancedetailRouter= require( path.join(__dirname,'../../api/nttcomptebalancedetail'));
*/

var  nstbalanceinputsRoutes= require('./nstbalanceinputs');
var  nsbalanceRouter= require('./nstbalances');
var  nttbalanceRouter= require('./nttbalances');
var  nttcomptebalanceRouter= require('./nttcomptebalances');
var userRouter =require('./users')

var  nttcomptebalancedetailRouter= require('./nttcomptebalancedetail');

routes.get('/', (req, res) => {
 return  res.status(200).json({ message: 'Connected!' });
});

/*routes.use('/api', function(req, res, next) {
  return   nstbalanceinputsRoutes();
    //process each request nstbalanceinputsRoutes
    });*/

routes.use('/api',nstbalanceinputsRoutes);
routes.use('/api',nsbalanceRouter);
routes.use('/api',nttbalanceRouter);
routes.use('/api',nttcomptebalanceRouter);
routes.use('/api',nttcomptebalancedetailRouter);
routes.use('/api', userRouter);
//routes.use(nstbalanceinputsRoutes);

module.exports = routes;
