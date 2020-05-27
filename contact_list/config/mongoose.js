const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/contact_list-db',{ useNewUrlParser: true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error occured'));
db.once('open',function()
{
    console.log('successfully connected to database');
})