exports.index = function(req,res){
	res.render('mission/mission',{
		title:'Tools',
		desc:'This is Mission Page'
	});
}