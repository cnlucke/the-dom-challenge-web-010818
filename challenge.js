const counter = document.getElementById('counter')
let counterInterval = setInterval(incrementCounter, 1000);

function incrementCounter() {
  counter.innerHTML = (parseInt(counter.innerHTML) + 1).toString();
}

function decrementCounter() {
  counter.innerHTML = (parseInt(counter.innerHTML) - 1).toString();
}

const decrementButton = document.getElementById('-');
decrementButton.addEventListener("click", decrementCounter)

const incrementButton = document.getElementById('+');
incrementButton.addEventListener("click", incrementCounter)

const likeButton = document.getElementById('<3');
likeButton.addEventListener("click", addLike)

function addLike() {
  const ul = document.getElementsByClassName('likes')[0];
  const likes = document.getElementsByClassName('like')
  const lastLike = likes[likes.length - 1]
  const currentCount = parseInt(counter.innerHTML).toString();
  let matchingLikes;
  let msg;

  // find li with matching counter number
  if ((lastLike) && (lastLike.innerHTML.includes(`${currentCount} has been liked`)))  {
    matchingLikes = parseInt((lastLike.innerHTML).split(" ")[4]);
    lastLike.remove();
    msg = `${currentCount} has been liked ${++matchingLikes} times`
  } else {
    msg = `${currentCount} has been liked 1 time`
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(msg));
  li.classList.add("like");
  ul.appendChild(li);
}

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener("click", pause)

function pause() {
  if ((pauseButton.innerHTML.trim()) === "pause") {
    pauseButton.innerHTML = "resume"
    clearInterval(counterInterval);
    likeButton.removeEventListener("click", addLike)
    decrementButton.removeEventListener("click", decrementCounter)
    incrementButton.removeEventListener("click", incrementCounter)
  } else {
    pauseButton.innerHTML = "pause"
    likeButton.addEventListener("click", addLike)
    decrementButton.addEventListener("click", decrementCounter)
    incrementButton.addEventListener("click", incrementCounter)
    counterInterval = setInterval(incrementCounter, 1000);
  }
}

const form = document.getElementById('comment-form');

form.onsubmit = function() {
  const comment = form.getElementsByTagName('input')[0].value
  const commentDiv = document.getElementsByClassName('comments')[0]
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(comment));
  commentDiv.appendChild(p);
  form.getElementsByTagName('input')[0].value = "";
  return false;
}
