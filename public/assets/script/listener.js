const socket = io()


let newUser = []
let pending 
let setTime = 0
socket.on('newUserSignUp', message =>
{
   
    newUser.unshift(message)
   if(newUser.length > 0 && newUser.length <= 1 )
   {
      pendingList()
   }

   if(newUser.length < 1)
   {
     setTime = 0
   }
   else
   {
     setTime = 3000
   }

})

function pendingList()
{
  pending = setInterval(() => {
   
    if(newUser.length > 0)
    {
      console.log(newUser[newUser.length - 1 ])
    $('#container').append(`  <div class="notification">
      <p> ${newUser[newUser.length - 1 ]}</p>
    </div>
    `);

    setTimeout(() => {
      $('.notification').css('top', '15%')
    }, 100);
    setTimeout(() => {
      $('.notification').css('right', '-50%')
    }, 1000);
    setTimeout(() => {
      $(`.notification`).remove()
    }, 1900);
    newUser.pop()
    }
    else
    {
      clearInterval(pending)
    }

  }, setTime);

}


socket.on('Update',message =>
{
  if(message[0] === 'comment')
  {
  $(`${message[1]}`).append(message[2])
  $(`${message[1]}`).animate({ scrollTop: $(`${message[1]}`).height() * 100000}, 1000);
  }
  if(message[0] === 'deletePost')
  {
    let post = document.querySelectorAll(`${message[1]}`)
    post.forEach(item => {
    if(item.dataset.id === message[2])
    {
      item.css('height : 0px;')
    }})
  }
})