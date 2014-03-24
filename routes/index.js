
/*
 * GET home page.
 */

exports.index = function(req, res){
	var tools = [{
		Language:[
			{tool:'PHP',level:4},
			{tool:'javascript',level:4},
			{tool:'jQuery',level:4},
			{tool:'Node.js',level:3},
			{tool:'JAVA',level:3},
			{tool:'Python',level:2}
		],
		Sever:[
			{tool:'Apache',level:3},
			{tool:'nginX',level:3}
		],
		DB:[
			{tool:'MySql',level:4},
			{tool:'MSSQL',level:2},
			{tool:'mongoDB',level:2}
		],
		Framework:[
			{tool:'Codeigniter',level:3},
			{tool:'Express',level:3}
		],
		etc:[
			{tool:'Jade',level:3},
			{tool:'Socket.io',level:3}
		]
	}];
	
	res.render('index',
	{
		title: 'SHINHYOSIK',
		mission_desc:'About Me',
		products_desc:'Portfolio',
		tools_desc:'Useable Tools',
		team_desc:'Team',
		contact_desc:'Contact Me',
		tools:tools[0]
	});
};
exports.robots = function(req,res,next){
	if ('/robots.txt' == req.url) {
        	res.type('text/plain')
        	res.send("User-agent: *\nDisallow: ");
    	} else {
        	next();
    	}	
};
