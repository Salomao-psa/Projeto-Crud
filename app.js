require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
//esse arquivo abaixo
const methodOverride = require('method-override')
const {flash} = require('express-flash-message')
const session = require('express-session');
const connectDB = require('./server/config/db');
 
const app = express()
const port = 3000 || process.env.PORT;

//connect to databaase
connectDB()

//CONFIG-Express json
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// VEJA QUE TEMOS _METHOD PRESENTES NA NOSSAS VIEWS PARA EDIÇÃO
app.use(methodOverride('_method'));

//Static files
app.use(express.static('public'));

// Express Session
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000 * 60 * 60 * 25 * 7,//1 week
  }
}));
//flash
app.use(flash({ sessionKeyName: 'flashMessage' }));




//Templating Engine
app.use(expressLayouts);
app.set('layout','./layouts/main')
app.set('view engine','ejs');

//Routes
app.use('/',require('./server/routes/customer'));

//handle 404
app.get('*',(req,res)=>{
    res.status(404).render('404');
})



//express listen
app.listen(port, ()=>{
    console.log(`Server is listen on port ${port}`)
});