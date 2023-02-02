/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  // Test / driver code (temporary). Eventually will get this from the server.
  $('.tweet-form').on( 'submit',function(event){
    event.preventDefault();
    const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]
  
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
        const date = $("<h6>").addClass('tweet-text').text('10 days ago');
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

      renderTweets(data);
    });

});

