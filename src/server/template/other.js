// var async=require('async')
/*
async.each('', function (file, callback_s1)
{

	if (file.length > 32)
	{console.log('')	}
	else
	{
    async.each('', function (file, callback_s2)
{

	if (file.length > 32)
	{console.log('')	}
	else
	{

		callback_s2();
	}
}, function (err)
{

	if (err)
	{
console.log('')
	}
	else
	{
    callback_s1();
	}
}
);


	}
}, function (err)
{

	if (err)
	{

console.log('')
	}
	else
	{
    console.log('')
	}
}
);*/

/*
var obj =
{
	dev: "/dev.json",
	test: "/test.json",
	prod: "/prod.json"
};
var configs = {};

async.forEachOf(obj, function (value, key, callback)
{
	fs.readFile(__dirname + value, "utf8", function (err, data)
	{
		if (err)
			return callback(err);
		try
		{
			configs[key] = JSON.parse(data);
		}
		catch (e)
		{
			return callback(e);
		}
		callback();
	}
	);
}, function (err)
{
	if (err)
		console.error(err.message);
	// configs is now a map of JSON data
//	doSomethingWith(configs);
}
);


var a1 = [1,2,3,4,5,6,7,8];
async.forEachSeries(a1, function(n1, callback_s1) {
    console.log(n1);
    var a2 = [10,11,12,13,14];
    async.forEachSeries(a2, function(n2, callback_s2) {
        console.log(n1 + " " + n2);
        callback_s2();
    }, function () {

        callback_s1();
    } );
});
*/

/*
async.each(openFiles, function (file, callback) {

  if (file.length > 32) { }
  else {

    callback();
  }
}, function (err) {

    if (err) {

    }
    else {

    }
  }
)
*/
