document.addEventListener("click", (event) => {
  console.log(event.target);
});

// Friendsearch
let keySearch = "";
let timer;
$(".search").keyup((event) => {
  keySearch += event.key;

  clearInterval(timer);
  timer = setTimeout(() => {
    console.log(keySearch);
  }, 1000);
});

$("#msgInput").submit((event) => {
  event.preventDefault();
  console.log(event.target.message.value);

  $(".type_msg").val("");
});

function init() {
  axios.get("");
}

init();