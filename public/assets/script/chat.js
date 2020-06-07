import Axios from "axios"

// friendlist template - need to prepend to class .contacts
{/* <li>
<div class="d-flex bd-highlight">
  <div class="img_cont">
    <img src="./assets/Image/noiconicon.png" class="rounded-circle user_img">
  </div>
  <div class="user_info">
    <span>Rashid Samim</span>
    <p>Rashid left 50 mins ago</p>
  </div>
</div>
</li>*/}




// <div class="card-body msg_card_body"> <<---- container for messages

// user chat info
{/* <div class="user_info">
<span>Chat with Khalid</span>
<p>1767 Messages</p>
</div> */}

// message list
{/* <div class="d-flex justify-content-start mb-4">
<div class="img_cont_msg">
  <img src="./assets/Image/noiconicon.png" class="rounded-circle user_img_msg">
</div>
<div class="msg_cotainer">
  I am good too, thank you for your chat template
  <span class="msg_time">9:00 AM, Today</span>
</div>
</div> */}

  // User right
{/* <div class="d-flex justify-content-end mb-4">
<div class="msg_cotainer_send">
  You are welcome
  <span class="msg_time_send">9:05 AM, Today</span>
</div>
<div class="img_cont_msg">
<img src="./assets/Image/noiconicon.png" class="rounded-circle user_img_msg">
</div>
</div> */}

document.addEventListener('click', event =>
{
    console.log(event.target)
})


// Friendsearch
let keySearch = ''
let timer 
$('.search').keyup( event =>
{
    // console.log(event.key)
    keySearch += event.key
  
    clearInterval(timer)
    timer = setTimeout(() => {
        console.log(keySearch)
    }, 1000);

})

$('#msgInput').submit(event =>
    {
        event.preventDefault()
        console.log(event.target.message.value)

        $('.type_msg').val('')
    })

// document.getElementById('msgInput').addEventListener('submit', e=>
// {
//     e.preventDefault()
//     console.log(e)
// })



function init()
{
    axios.get('')
}

init()