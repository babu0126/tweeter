
$(document).ready(() => {
  
  loadTweets();
  
  $('.new-tweet form').submit(function(event) {
    event.preventDefault();
    const inputText = $('#tweet-text').val();
    const data = $(this).serialize();
    const errorMsg = $('.new-tweet p');
    
    errorMsg.html('');
     
    if (!inputText) {
      errorMsg.append("<b>🚨 Error:</b> All tweets cannot be empty! 🚨");
      errorMsg.slideDown('slow');
      errorMsg.delay(2000).slideUp();
    } else if (inputText.length > 140) {
      errorMsg.append("<b>Error:</b>🚨 The maximum of characters are 140! 🚨");
      errorMsg.slideDown('slow');
      errorMsg.delay(2000).slideUp();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: data
      }).then(() => {
        $('#tweet-text').val('');
        $('.counter').val(140);
        loadTweets();
      });
    }
  });
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const ago = timeago.format(tweet.created_at);
  const $tweet = `
    <article>
    <header>
      <img src="${tweet.user.avatars}">
      <span id="nameDisplay">${tweet.user.name}</span>
      <span id="userID">${tweet.user.handle}</span>
    </header>
    <main>
      <p><strong>${escape(tweet.content.text)}</strong></p>
    </main>
    <footer>
      <span id="tweetDate">${ago}</span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article> `;
  return $tweet;
};

const renderTweets = (tweets) => {
  const container = $('.all-tweets');
  container.empty();
  for (let tweet of tweets) {
    container.prepend(createTweetElement(tweet));
  }
};

const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then((allTweets) => {
    renderTweets(allTweets);
  })
};



