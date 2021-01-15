
const path = require('path')
const express =require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT||3000
const hbs = require('hbs')
//setup paths for express configuration
const publicdirectorypath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')
//setup static directory to serve
app.use(express.static(publicdirectorypath))
//setup handers engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialpath)
//index route
app.get('',(req,res)=>{

    res.render('index',{
        title:'weather ',
        name: 'subha'
    })
})
//about route
app.get('/about',(req,res)=>{

    res.render('about',{

        title:'About me',
        name:'Subha'
    })
})


//help route
app.get('/help',(req,res)=>{

    res.render('help',{

        helptext:'helptext',
        title:'help',
        name:'Subha'
    })
})
//weather route
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address !'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }
    
    console.log(req.query)//we can access the queary values
    res.send({
        products:[]
    })

})
//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{

res.render('404',{
    title:'404',
    name:'subha',
    errorMessage:'help article not found .'
})

})
app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:'subha',
        errorMessage:'Page not found.'
    })

})
app.listen(port,()=>{

    console.log('Server is Up on port '+port)

})