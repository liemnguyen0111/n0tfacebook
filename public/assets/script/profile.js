const logOut = () => {
    console.log('hello')
    var date = new Date();
    
    var utcDate = new Date(date.toUTCString());
    utcDate.setHours(utcDate.getHours());
    var usDate = new Date(utcDate);
    document.cookie = `name=''; expires = ${usDate.toUTCString()}`; 
    window.location.replace("/");
    }

function loggedInStatus () {
  if (!document.cookie.split("=")[1]) {
  } else {
    axios
      .get(`/api/users/info/${document.cookie.split("=")[1]}`)
      .then(({ data }) => {
        
          generateRecentPost()
          userPost(data.UserPost,data.UserInfo.FirstName,data.UserInfo.LastName)
        document.getElementById("loggedIn").innerHTML = `
              Logged in as ${data.UserInfo.FirstName} ${data.UserInfo.LastName}
              <button id='logOut' onclick='logOut()'>Log Out</button>
              `;

      })
      .catch((err) => console.log(err));
  }
}

function userPost(userPost,firstName,lastName)
{ 
    userPost.forEach(post => { 
        // console.log("In userpost")
        // console.log(post)
        let comments = post.comments.reduce((allComments, comments) =>
        {
          console.log(comments)
            return allComments +=  
            `<p>${comments.username} : ${comments.title} <span class="time">${comments.time}</span></p>`
          
            
            // console.log(comments)
        }
        ,'')

        $('.main').prepend(
            `     
            <div class="myPost" data-id="${post.id}">
            <button class="deletePost" name = "delete" data-deleteid ="${post.id}">Delete | x</button>
            <h3 class ="username"> ${firstName} ${lastName} : <span class ="postbody">${post.body}</span></h3>
            
            <div class="image"> 
            <img src="${post.image}" alt="" class="postImage">
               </div>
            <hr />
            <div class="commentArea comment${post.id}">
            ${comments}
            </div>
            <form  method="POST" data-postId="${post.id}" name="comment" class="commentForm">
              <input type="text" name="text" placeholder="Add your comment" />
              <input type="submit"  name="Send" value="Send" />
            </form>
          </div>`)
          $(`.comment${post.id}`).animate({ scrollTop: $(`.comment${post.id}`).height() * 100000}, 1000);
            })  
}


  // Tim recent friend post
  function generateRecentPost()
  {
        axios.get(`api/posts/friendrecentposts/${document.cookie.split("=")[1]}`)
        .then( ({data}) =>
            {

                data.forEach(item => {
                    console.log(item)
                    $(".postlist").prepend(
                        `  <div class="userpost" data-postid='${item.id}'>
                        <button onclick=showPost('${item.id}','${item.user.firstName}','${item.user.lastName}')>
                        <p>User:${item.user.firstName}<p>
                        <p> ${item.body.slice(0,20)}... </p>
                        <p>At: ..... <p>
                       </button>
                      </div>`
                    )
                });
              
            }
        )
        .catch(err => console.error(err))
  }
// Show post
function showPost(data,fname,lname)
{
  // console.log(fname)
    axios.get(`api/posts/getpost/${data}`)
    .then(({data}) => 
      {
        $('.main').empty()
        userPost([data],fname,lname)
      }
    )
    .catch(err => console.error(err))
}

// Add new post
let recent = false
document.getElementById('post').addEventListener('click', event =>
{
  event.preventDefault()

  let formData = new FormData(document.getElementById('POSTIT'))
  // formData.append('files', )
  if(document.getElementById('file').value.length > 0 || document.getElementById('posttext').value !== '')
  {
  axios.post('api/posts/addpost', formData)
  .then(({ data }) => {
    if(!recent)
    {
      $('.main').scrollTop(0)
      userPost([data[0].data],data[1].firstName,data[1].lastName)
    }
    else
    {
      loggedInStatus()
    }
  
  })
  .catch(err => console.error(err))
  
  // console.log(formData)

  document.getElementById('file').value = null
  document.getElementById('posttext').value = ''
}

document.getElementById('posttext').focus()

})

// Add friend on click


// //show a list of other users who are not friends yet with me - hoyeon
const renderFriendSuggestion = () => {

  if (!document.cookie.split("=")[1]) {
    console.log("Not logged in");
  } else {
    axios
      .get(`/api/friend/findfriend/${document.cookie.split("=")[1]}`)
      .then(({ data }) => {
        document.getElementById("friendSuggest").innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          let notfriendElem = document.createElement("div");
          notfriendElem.innerHTML = `<button id='add'  onclick=addFriend('${data[i].uuid}') > + ${data[i].firstName} ${data[i].lastName}</button>`;
          document.getElementById("friendSuggest").append(notfriendElem);
        }
      })
      .catch((err) => console.log(err));
  }
  renderMyFriends();
};

// let addFriend = document.querySelector('#myfriend')
// function addFriend( id ) {
//   if (event.target.id === "add") {
//     axios
//       .post("api/friend/addfriend", {
//         userUuid: document.cookie.split("=")[1],
//         friendUuid: id,
//       })
//       .then(() => {
//         renderFriendSuggestion();
//         renderMyFriends();
//       })
//       .catch((err) => console.error(err));
//   }
// }

function addFriend( id ) {
  axios
    .post("api/friend/addfriend", {
      userUuid: document.cookie.split("=")[1],
      friendUuid: id,
    })
    .then(() => {
      renderFriendSuggestion();
      renderMyFriends();
      document.getElementById("friends").innerHTML = `
      <section class="myFriends">
        <div>My current friends</div>
        <div class="user" data-uid="" id="friendList">
          <!-- <button>User 1</button> -->
        </div>
      </section>
      <!-- add friend button -->
      <section class="addFriends">
        <div>Add new friends</div>
        <div class="user"  id="friendSuggest">
          <!-- <button>+ hoyeon</button> -->
        </div>
      </section>
      `;
    })
    .catch((err) => console.error(err));
}

$('#searchFriendForm').submit((e) => {
  e.preventDefault()
  let friend = document.getElementById('searchFriend').value
  axios.post('/api/searchFriend', { firstName : friend })
    .then(({data}) => {
      document.getElementById('friends').innerHTML = data.reduce((acc, friend) => {
        acc += `<div>${friend.firstName}<button onclick="addFriend('${friend.uuid}')">Add Friend</button></div>`;
        return acc
      }, '')

    })
    .catch(err => {console.log(err)})
  }
)

//delete a friend from myfriendList - hoyeon
function unFriend(id) {
    axios
      .delete("api/friend/unfriend", {
        data: {
          userUuid: document.cookie.split("=")[1],
          friendUuid: id,
        },
      })
      .then(() => {
        renderMyFriends();
        renderFriendSuggestion();
      })
      .catch((err) => console.error(err));
}

//show all users who are currently friends with me- hoyeon
const renderMyFriends = () => {
  
  axios.get(`/api/users/info/${document.cookie.split("=")[1]}`)
    .then(({ data }) => {
      let friendData = data.UserFriends;
      document.getElementById("friendList").innerHTML = "";
      for (let i = 0; i < friendData.length; i++) {
        let friendElem = document.createElement("div");
        friendElem.innerHTML = `<div class="friendbox"><button class='myfriend'> ${friendData[i].firstName} ${friendData[i].lastName}</button><button id='unFriend' onclick=unFriend('${friendData[i].Id}')><span>🗑️</span></button></div>`;
        document.getElementById("friendList").append(friendElem);
      }
    })
    .catch((err) => console.log(err));
};

// Generate comment
function generateComment(commId,user,value,time)
{
  $(`${commId}`).append(`<p>${user}: ${value} <span class="time">${time}</span></p>`)
}

// Add comment
document.addEventListener('submit', event =>
{
    event.preventDefault()
    if(event.target.name === 'comment')
    {
   if (!document.cookie.split("=")[1]) {
    } else {
      axios
        .get(`/api/users/info/${document.cookie.split("=")[1]}`)
        .then(({data}) => {
          console.log(Date())
          let body = {username: (data.UserInfo.FirstName +" "+ data.UserInfo.LastName[0]), title: event.target.text.value, postId : event.target.dataset.postid}
          axios.post('api/comments',body)
          .then((message ) => {
            socket.emit('Update', ['comment',`.comment${event.target.dataset.postid}`,`<p>${message.data.username} : ${message.data.title} <span class="time">${message.data.time}</span></p>`] )
            event.target.text.value = ''
            $(`.comment${event.target.dataset.postid}`).animate({ scrollTop: $(`.comment${event.target.dataset.postid}`).height() * 100000}, 1000);
          })
          .catch(err => console.error(err))
        }
        )
        .catch(err => console.error(err))
      }
   
    }
   
    
})

// Delete post - Tim
document.addEventListener('click', event =>
{
  event.preventDefault()
  console.log(event.target.name)
  if(event.target.name === 'delete')
  {
    axios.delete(`api/posts/delete/${document.cookie.split("=")[1]}/${event.target.dataset.deleteid}`)
    .then(data => {
      console.log(data)
    let post = document.querySelectorAll('.myPost')
    post.forEach(item => {if(item.dataset.id === event.target.dataset.deleteid) 
      {
        item.classList.add('delete') 
        item.style.height = '50px'
        item.innerHTML = '<p></p>'
        setTimeout(() => {
          item.remove()
        }, 2000);
     }
      
    })
    socket.emit('Update', ['deletePost',`.myPost`,`${event.target.dataset.deleteid}`] )
    })
    .catch(err => console.error(err))
      }
})

// Pravin - 
document.getElementById('dropdown').addEventListener('click', event =>
{
  event.preventDefault()
  console.log(event.target.value)
  if(event.target.value === 'home')
  {
    loggedInStatus()
    $('.postarea').show()
    $('.main').scrollTop(0)
  }

  if(event.target.value === 'recentpost')
  {
    recentPostsMobile()
    $('.main').scrollTop(0)
  }

  if(event.target.value === 'friends')
  {
    $('.postarea').hide()
    axios.get(`/api/users/info/${document.cookie.split("=")[1]}`)
    .then(({ data }) => {
      let friendData = data.UserFriends;
      $('.main').empty()
      $('.main').innerHTML = "";
      for (let i = 0; i < friendData.length; i++) {
        let friendElem = document.createElement("div");
        friendElem.innerHTML = `<div class="friendbox"><button class='myfriendmobileview'> ${friendData[i].firstName} ${friendData[i].lastName}</button><button id='unFriend' onclick=unFriend('${friendData[i].Id}')><span>🗑️</span></button></div>`;
       $('.main').append(friendElem)
      }
    })
    .catch((err) => console.log(err));
    // $('.main').scrollTop(0)
  }

  if(event.target.value === 'logout')
  {
    logOut()
  }
  
})

// function 

function recentPostsMobile() {
  axios.get(`api/posts/friendrecentposts/${document.cookie.split("=")[1]}`)
        .then( ({data}) =>
            {
                // console.log(data)
                $('.main').empty()
                $('.main').prepend(data.reduce((acc,posts) =>
                {
                    console.log(posts)
                  acc +=  `  <div class="" data-postid='${posts.id}'>
                  <button onclick=showPost('${posts.id}','${posts.user.firstName}','${posts.user.lastName}')>
                  <p>User:${posts.user.firstName}<p>
                  <p> ${posts.body.slice(0,20)}... </p>
                  <p>At: ${posts.time} <p>
                 </button>
                </div>`
                return acc
                },''))
              })}


//                 // data.forEach(item => {
//                 //     console.log(item)
//                 //     $(".postlist").prepend(
//                 //         `  <div class="userpost" data-postid='${item.id}'>
//                 //         <button onclick=showPost('${item.id}','${item.user.firstName}','${item.user.lastName}')>
//                 //         <p>User:${item.user.firstName}<p>
//                 //         <p> ${item.body.slice(0,20)}... </p>
//                 //         <p>At: ${item.createdAt.split(/[a-zA-Z.]/)[1]} <p>
//                 //        </button>
//                 //       </div>`
//                 //     )
//                 // });
              
//             }
//         )
//         .catch(err => console.error(err))
//   }

// const logOut = () => {
//   console.log("hello");
//   var date = new Date();
//   var utcDate = new Date(date.toUTCString());
//   utcDate.setHours(utcDate.getHours());
//   var usDate = new Date(utcDate);
//   document.cookie = `name=''; expires = ${usDate.toUTCString()}`;
//   window.location.replace("/");
// };

// //show all users who are currently friends with me- hoyeon
// const renderMyFriends = () => {
//   axios
//     .get(`/api/users/info/${document.cookie.split("=")[1]}`)
//     .then(({ data }) => {
//       let friendData = data.UserFriends;
//       console.log(friendData);
//       document.getElementById("friendList").innerHTML = "";
//       for (let i = 0; i < friendData.length; i++) {
//         let friendElem = document.createElement("div");
//         friendElem.innerHTML = `<button id='myfriend'> ${friendData[i].firstName} ${friendData[i].lastName}</button>`;
//         document.getElementById("friendList").append(friendElem);
//       }
//     })
//     .catch((err) => console.log(err));
// };

// document.addEventListener("click", (event) => {
//   event.preventDefault();
//   if (event.target.id === "add") {
//     axios
//       .post("api/friend/addfriend", {
//         userUuid: document.cookie.split("=")[1],
//         friendUuid: event.target.dataset.item,
//       })
//       .then(() => {
//         renderFriendSuggestion();
//         renderMyFriends();
//       })
//       .catch((err) => console.error(err));
//   }
// });

// //show a list of other users who are not friends yet with me - hoyeon
// const renderFriendSuggestion = () => {
//   if (!document.cookie.split("=")[1]) {
//     console.log("Nothing");
//   } else {
//     console.log("connected");
//     axios
//       .get(`/api/friend/findfriend/${document.cookie.split("=")[1]}`)
//       .then(({ data }) => {
//         document.getElementById("friendSuggest").innerHTML = "";
//         for (let i = 0; i < data.length; i++) {
//           console.log(data[i]);
//           let notfriendElem = document.createElement("div");
//           notfriendElem.innerHTML = `<button id='add' data-item="${data[i].uuid}" > + ${data[i].firstName} ${data[i].lastName}</button>`;
//           document.getElementById("friendSuggest").append(notfriendElem);
//         }
//       })
//       .catch((err) => console.log(err));
//   }
//   renderMyFriends();
// };

// const loggedInStatus = () => {
//   if (!document.cookie.split("=")[1]) {
//     console.log("Nothing");
//   } else {
//     console.log("Something");
//     axios
//       .get(`/api/users/info/${document.cookie.split("=")[1]}`)
//       .then(({ data }) => {
//         console.log(data);
//         //Suggestion(hoyeon): how about using an username instaed of first & lastname?
//         document.getElementById("loggedIn").innerHTML = `
//               Logged in as ${data.FirstName} ${data.LastName}
//               <button id='logOut' onclick='logOut()'>Log Out</button>
//               `;
//               generateRecentPost()
//       })
//       .catch((err) => console.log(err));
//   }
// };

// // Generate recent post 
//   function generateRecentPost()
//   {
//       console.log(`${document.cookie.split("=")[1]}`)
//         axios.get(`api/posts/friendrecentposts/${document.cookie.split("=")[1]}`)
//         .then( ({data}) =>
//             {
//                 console.log(data)
//                 data.forEach(item => {
//                     // console.log(item)
//                     $(".postlist").prepend(
//                         `  <div class="userpost" data-postid='${item.id}'>
//                         <button>
//                         <p>User:${item.user.firstName}<p>
//                         <p> ${item.body.slice(0,20)}... </p>
//                         <p>At: ${item.createdAt.split(/[a-zA-Z.]/)[1]} <p>
//                        </button>
//                       </div>`
//                     )
//                 });
              
//             }
//         )
//         .catch(err => console.error(err))
//   }

//   // Submit new post 
//   document.getElementById('post').addEventListener('click', event =>
// {
//   event.preventDefault()
//   let formData = new FormData(document.getElementById('POSTIT'))
//   // formData.append('files', )
//   axios.post('api/posts/addpost', formData)
//   .then(({ data }) => userPost([data[0].data],data[1].firstName,data[1].lastName))
//   .catch(err => console.error(err))
// })

// // User post 
// function userPost(userPost,firstName,lastName)
// {
//   console.log(userPost)
//     userPost.forEach(post => { 
//         // console.log("In userpost")
//         // console.log(post)
//         let comments = post.comments.reduce((allComments, comments) =>
//         {
//             return allComments +=  
//            ` <p>Name: <span>${comments.title}</span></p>`
            
//             // console.log(comments)
//         }
//         ,'')

//         $('.main').prepend(
//             `  
//             <div class="myPost">
//             <p>${firstName} ${lastName}</p>
//             <p>${post.body}</p>
//             <div class="image"> 
//             <img src="${post.image}" alt="" class="postImage">
//                </div>
//             <hr />
//             <div class="commentArea">
//             ${comments}
//             </div>
//             <form  method="POST" data-postId="${post.id}"class="commentForm">
//               <input type="text" placeholder="Add your comment" />
//               <input type="submit" name="Send" value="Send" />
//             </form>
//           </div>`)
//             })            
// }


function init() {
  loggedInStatus();
  renderFriendSuggestion();
}

init();