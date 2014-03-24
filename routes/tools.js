exports.index = function(req,res){
	res.render('tools/tools',{
		title:'Tools',
		desc:'This is Tools Page'
	});
}