var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');
app.set('port', 7400);

// to allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * = allow all
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.render('lotto');
});

app.get('/microservice', function(req,res){
  const tasks = [
    "Take out the trash",
    "Do the dishes",
    "Vacuum",
    "Change air filters",
    "Back up computer",
    "Pay bills",
    "Read a book",
    "Review emails",
    "Mop floors",
    "Clean windows",
    "Dust",
    "Review finances",
    "Deep clean bathroom",
    "Deep clean kitchen",
    "Organize photos",
    "Laundry",
    "Meal prep",
    "Water plants",
    "Exercise",
    "Change bedding"
  ];
  randomtask = Math.floor(Math.random() * 20);
  data = {"yourTask":tasks[randomtask]};
  console.log(data);
  res.json(data);
});

app.get('/example',function(req,res){
  res.render('example');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});