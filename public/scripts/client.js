/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  // Test / driver code (temporary). Eventually will get this from the server.
  $(".create-new-tweet").submit(function(event){
    event.preventDefault();
   const $newTweet = $(this).children('textarea');

    if ($newTweet.val() === null){
      alert("Oops. There was an error. Please try submitting a tweet again");
      return;
    }
    if ($newTweet.val() === ""){
      alert("Oops. Looks like you tried to an empty tweet. Please try submitting a tweet again");
      return;
    }
    if ($newTweet.val().length > 140){
      alert("Oops. Looks like your tweet exceeds the maximum character count. Please try submitting a tweet again");
      return;
    }
   // Fetch tweets that have been created and tweets that are in Database
  const handleFormData = function () {
    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: $(".create-new-tweet").serialize(),
      dataType: 'json',
      success: function (data) {
        console.log('success!');
      }
    })
  }

  handleFormData();
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: 'GET',
      data: $(".create-new-tweet").serialize(),
      dataType: 'json',
      success: function (data) {
        renderTweets(data);
      }
    })
  }
  loadTweets();
  const createTweetElement = function(tweet){
    const $article = $("<article>").addClass('article-tweet');
    const $header = $("<header>").addClass('header-tweet');
    const $footer = $("<footer>").addClass('footer-tweet');
    const $aviDiv = $("<div>").addClass('avi-div');
    const $username = $("<h6>").addClass('tweet-text').text(tweet.user.handle);
    const $name = $("<h6>").addClass('tweet-text').text(tweet.user.name);
    // const image = new Image();
    // const $userIcon = new Image().addClass('avi');
    const $userIcon =  $("<img/>", {
      src: tweet.user.avatars }).addClass('avi');
      // $userIcon.src = tweet.user.avatars;
      const $border = $("<div>").addClass('tweet-border');
      const $tweet = $("<h5>").text("If I have Seen further it is by standing on the shoulders of giants").attr('id', 'user-comment');
      const $dateIconContainer = $("<div>").addClass('date-icon-container');
      const $iconContainer = $("<div>").addClass('icon-container');
      const date = $("<h6>").addClass('tweet-text').text(timeago.format(tweet.created_at));
      const flag = $('<i>').addClass("fa-solid fa-flag");
      const retweet = $('<i>').addClass("fa-solid fa-retweet");
      const heart = $('<i>').addClass("fas fa-heart");

      $iconContainer.append(flag,retweet,heart);
       $dateIconContainer.append(date,$iconContainer);
      $aviDiv.append($userIcon, $name);
      $header.append($aviDiv,$username);
      $footer.append($dateIconContainer);
      $article.append($header, $tweet, $border, $footer);
      return $article;
      }
      const renderTweets = function(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container

        for( const tweet of tweets){
          let $newPost = createTweetElement(tweet);
          $('#tweets-container').append($newPost);

        }
      }

      // renderTweets(data);
     });

});

