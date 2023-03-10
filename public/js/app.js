// console.log("client javascript file is loading")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    //fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            //console.log(data.error)
            messageOne.textContent = data.error
        }
        else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location + " \n longitude:  " +  data.longitude + " \n latitude: " + data.latitude
            messageTwo.textContent = data.forecast
        }
    })
})

    //console.log(location)
})