 const path = require('path')
 const express = require('express')
 const hbs =require('hbs');
const { query } = require('express');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js');

const app = express()
// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public'); 
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
// set up static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
     res.render('index',{
        title:'Home page',
        name : 'Eslam Ashraf'
     })   
})
app.get('/about',(req,res)=>{
    res.render('about',{
       title:'About Page',
       name : 'Eslam Ashraf'
    })   
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'Help page',
       name : 'Eslam Ashraf', 
       helpText:'This is some helpful text'
    })   
})

app.get('/about/*',(req,res) => {
    res.render('404.hbs',{
        title:'404',
        errorMessage:'About Article Not Found!!',
        name:'Eslam Ashraf'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404.hbs',{
        title:'404',
        errorMessage:'Help Article Not Found!!',
        name:'Eslam Ashraf'
    })
})
app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide a address!!'
        })
    }
        geocode(req.query.address,(error,{latitude,longitude,location} ={}) => { 
            
            if(error){
                return res.send({ error })
            }

            forecast(latitude,longitude,(error,forecstData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecstData,
                    location,
                    address:req.query.address
                })
            })

            })

})


app.get('*',(req,res) => {
    res.render('404.hbs',{
        title:'404',
        errorMessage:'Page Not Found',
        name:'Eslam Ashraf'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.');
})