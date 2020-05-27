const express=require('express');
const port=500;
const path=require('path');
const db=require('./config/mongoose.js');
const Contact=require('./models/contact');
const app=express();
const ejsLint = require('ejs-lint');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended : true}));
app.use(express.static('assets'));
var contactList=[
    {name :"relish",
     phone: "9812854888"  
     
       },
     {
         name : "gagan",
         phone:7206802000
     },
     {
        name:"satish",
        phone:9896636557
     },
     {
         name:"darshan",
         phone:9467760401
     },
     ];
     app.get('/',function(req,res)
{ Contact.find({},function (err,contacts)
{
    if(err)
    {
        console.log('error');
        return;
    }


  return  res.render('home',
  {tilte:"contact list",
  contact_list:contacts

  });
});
});
app.post('/create_contact',function(req,res)
{
    //contactList.push(
      //  {
        //    name:req.body.name,
       //     phone:req.body.phone
        //}
   //// );
    //return res.redirect('/');
    Contact.create({
        name :req.body.name,
        phone:req.body.phone
    }, function(err , newContact)
    {
        if(err)
        {
            console.log('error');
            return;
        }
        console.log('*******' ,newContact);
        return res.redirect('back');
    
    });
});
app.get('/delete-contact/',function(req,res)
{
    //console.log(req.query);
    let id=req.query.id;
    // find the contact in databse using id and delete
   // let contactIndex=contactList.findIndex(contact=> contact.phone==phone);
   Contact.findByIdAndDelete(id,function(err)
   {
       if(err)
       {
           console.log('error');
           return;
       }
       return res.redirect('back');
   });
  //  if(contactIndex!=-1)
   // {
     //   contactList.splice(contactIndex,1);

    //}
    //return res.redirect('back');
});
app.listen(port,function(err)
{
if(err)
{
    console.log('error occured',err);

}
    console.log('successfull',port);
});