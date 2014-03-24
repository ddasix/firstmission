exports.index = function(req,res){
	res.render('team/team',{
		title:'Team',
		desc:'This is Team Page'
	});
}