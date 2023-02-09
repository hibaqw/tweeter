/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  // Test / driver code (temporary). Eventually will get this from the server.
  //function to validate user input
  const validateTweet = function (){
    $('.counter').text(140);
    const $newTweet = $('textarea');
    // if clause to handle input in the case that it is null
    if ($newTweet.val() === null){
      $(".create-new-tweet").prepend($("<div>").addClass("isa_error").text("Oops 😨. Looks like there was a problem. Please try again").fadeIn(200).fadeOut(4500));
      return;
    }
    // if clause to handle input in the case that it is empty
    if ($newTweet.val() === ""){
      $(".create-new-tweet").prepend($("<div>").addClass("isa_error").text("Oops 😨. Looks like you've tired to post an empty tweet. Please try again").fadeIn(200).fadeOut(4500));
      return;
    }
    // if clause to handle input that exceeds maximum count
    if ($newTweet.val().length > 140){
      $(".create-new-tweet").prepend($("<div>").addClass("isa_error").text("Oops 😨. Characters must not exceed 140...Please try again.").fadeIn(200).fadeOut(4500));
      return;

    }

    return true; 
  };
//function to send user tweet to "database"
  const handleFormData = function () {
    const serializedData = $(".create-new-tweet").serialize();
      $.post("/tweets", serializedData, function () {
        $("textarea").val("");
        loadTweets();
      });
    }
//loads database of tweets onto webpage
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
//creates html for tweet
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
      const $tweet = $("<h5>").text(tweet.content.text).attr('id', 'user-comment');
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
         const $tweetContainer = $("section");
         $tweetContainer.empty();
        for( const tweet of tweets){
          let $newPost = createTweetElement(tweet);
          $('section').prepend($newPost);

        }
      }
     

//handles submit event
  $(".create-new-tweet").submit(function(event){
    event.preventDefault();
    if (validateTweet()) {
      handleFormData();
     
    }
    
});

});


