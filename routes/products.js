exports.index = function(req,res){
	res.render('products/products',{
		title:'Tools',
		desc:'This is Product Page',
		img:'jeju.jpg'
	});
}