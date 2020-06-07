
const socket = io()

document.getElementById('signin').addEventListener('submit', event =>
{
    event.preventDefault()
    console.log("123123")
    signIn(event.target.username.value, event.target.password.value)
   
})

function signIn (val1,val2)
{
    axios.get(`/api/users/${val1}/${val2}/login`)
    .then(({data}) => {
  
    if(!data){document.getElementById('loginError').innerHTML = "Wrong username or password, please try again"}
    else{
        sessionSet(data)
        window.location.replace('/profile')
    }
    })
    .catch(err => console.error(err))
}

document.getElementById('signup').addEventListener('submit', event =>
{   
    event.preventDefault()
    console.log("singup")
    if(ValidateEmail(event.target.email.value))
    {
    let newUser = {
    username : event.target.username.value,
	password : event.target.password.value,
	firstName : event.target.firstName.value,
	lastName : event.target.lastName.value,
	age : event.target.age.value,
	email : event.target.email.value,
	gender : event.target.gender.value,
	activated : 0
    }
    axios.post('/api/users/register',newUser)
    .then(() => {
        socket.emit('newUserSignUp', `User ${event.target.firstName.value} ${event.target.lastName.value} has joined NotFaceBook!` )
    })
    .catch(err => console.log(err))
    document.getElementById("signupForm").innerHTML = `
    <h1>Success!</h1>
    `
    document.getElementById('signupForm').classList.add("signupSuccess")
    setTimeout(() => {
        signIn(event.target.username.value, event.target.password.value)
    }, 2000);
    }
    else{
        console.log("Error")
        document.getElementById("invalid").innerText = `Invalid! Please try again.`
    }
})



document.getElementById('email').addEventListener('keyup', event =>
    {
       let time
       clearInterval(time)
       time = setTimeout(() => {
            if(ValidateEmail(document.getElementById('email').value) || !/\S/.test(document.getElementById('email').value))
            {
                document.getElementById('emailError').innerHTML = `` }
            else
            {
                document.getElementById('emailError').innerHTML = "Invalid email !"
            }
        }, 1000);
       
    })

    function ValidateEmail(email) 
    {
      return(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    }

function sessionSet(data)
{
    var date = new Date();
    var utcDate = new Date(date.toUTCString());
    utcDate.setHours(utcDate.getHours() + 1);
    var usDate = new Date(utcDate);
    document.cookie = `name=${data}; expires = ${usDate.toUTCString()}` 
}

window.addEventListener("blur", event =>
{
    sessionSet(document.cookie.split('=')[1])
});