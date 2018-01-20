var express  = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you dont know",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple"
];

app.get('/', function (req, res) {
	res.status(200);
	res.render('home');
});

app.get('/about', function (req, res) {
	var randomFortune = 
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.status(201);
	res.render('about', { fortune: randomFortune });
});

app.use(function (req, res, next) {
	res.status(404);
	res.render('404');
});

app.use(function (req, res, next) {
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on localhost:' + app.get('port') + ';');
});

