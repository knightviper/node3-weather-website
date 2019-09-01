console.log('Client side Javascript file is loaded!');

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.location);
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

//messageOne.textContent = "Form Javascript";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        }else{
            console.log('Data :', data);
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.summary;
        }
    })
})
})