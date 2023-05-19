//requisição do nosso model
const Customer = require('../models/Customer');
const mongoose = require('mongoose');


// server/controllers/customerController.js
exports.homepage = async (req,res)=>{

    const messages = await req.consumeFlash('info');
       const locals={
           title:'nodeJs',
           description:'Free NodeJs User Management System'
       }

//Define a quantidade de items por pagina
      let perPage =  12;
//query da url tipo tenis/filtro=vermelho?1 ou seja aba (1)
//com isso ele vai pegar o query do numero da pagina ou sera 1
      let page =  req.query.page || 1;
// em updateAt -1 seria o mais novo e se colocarmos apenas 1 mais antigo


       try{
         const customers = await Customer.aggregate([{ $sort:{updatedAt: -1}}])
         .skip(perPage * page - perPage)
         .limit(perPage)
         .exec();

         const count = await Customer.count();
        res.render('index',{locals,customers,current:page,pages:Math.ceil(count/perPage),messages});

       }catch(error){
    
       }
   }



// server/controllers/customerController.js
/*exports.homepage = async (req,res)=>{

 const messages = await req.consumeFlash('info');
    const locals={
        title:'nodeJs',
        description:'Free NodeJs User Management System'
    }
   
    try{
       const customers = await Customer.find({}).limit(22); 
        res.render('index',{ locals ,messages, customers});
    }catch(error){
 
    }
}*/

// GET/
// NEW CUSTOMER FORM  - criamos a resposta que renderizara a view

exports.addCustomer = async(req,res)=>{
    const locals = {
        title:'Add new Customer - NodeJs',
        description:'free'
    }
    res.render('customer/add',locals,)
}

// POST/
// CREATE NEW CUSTOMER 

exports.postCustomer = async(req,res)=>{
 
    const locals = {
        title:'New Customer Added!',
        description:'free'
    };
    console.log(req,res )

const newCustomer = new Customer({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    details:req.body.details,
    tel:req.body.tel,
    email:req.body.email


});
    try{await Customer.create(newCustomer);
        await req.flash('info','New customer has ben added.')
        res.redirect('/')


      //res.render('../views/partials/success.ejs')
    
        
        
    }catch(error){
        console.log(error)
     // res.render('../views/partials/error.ejs')
     
        
    }

}

//GET VIEW DATA//
exports.view = async (req,res)=>{
    try{
        const customer = await Customer.findOne({ _id:req.params.id })
        const locals = {
            title:'View customer Data',
            description:'free'
    };
    res.render('customer/view',{locals,customer})
}catch(error){
    console.log(error)
}}

//GET EDIT DATA//
exports.edit = async (req,res)=>{
    try{
        const customer = await Customer.findOne({ _id:req.params.id })
        const locals = {
            title:'Edit customer Data',
            description:'free'
    };
    res.render('customer/edit',{locals,customer})
}catch(error){
    console.log(error)
}}

//GET Update DATA//
exports.editPost = async (req,res)=>{
 
try{
// Metodo pegando nosso ``SCHEMA`` encontando-o e atualizando-o
// esse metodo abaixo finByIdAndUpadte e meio que um Where=``id`` set ="firstName-lucas" ele acha e atualiza com base no id
await Customer.findByIdAndUpdate(req.params.id,{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    telephone:req.body.tel,
   email:req.body.email,
    details:req.body.details,
   updateAt:Date.now()
});

res.redirect(`/edit/${req.params.id}`);

}catch(error){
    console.log(error)
}


}


//DELETE  DELETE DATA//
exports.deleteCustomer  = async (req,res)=>{
 
    try{

        await Customer.deleteOne({_id:req.params.id});
        res.redirect("/")
    }catch(error){
        console.log(error)
    }
}
    