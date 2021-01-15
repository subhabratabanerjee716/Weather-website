console.log('client side javascript is loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const messone = document.querySelector('#msg1')

const messtwo = document.querySelector('#msg2')



weatherform.addEventListener('submit',(e)=>{
    
    e.preventDefault()

    const location = search.value
messone.textContent ='loading ....'
messtwo.textContent = ''
    
fetch('http://localhost:3000/weather?address='+location).then((response) => {

    response.json().then((data)=>{
            if(data.error){
                messone.textContent=data.error
            }else{
                messone.textContent=data.location
                messtwo.textContent=data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
    })

})


    console.log(location)

})