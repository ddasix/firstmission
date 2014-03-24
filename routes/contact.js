exports.index = function(req,res){
	res.render('contact/contact',{
		title:'Contact',
		desc:'This is Contact Page'
	});
}