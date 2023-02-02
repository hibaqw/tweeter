$(document).ready(function() {
  // --- our code goes here ---

  $('textarea').on('input', function(e){
    /* questions: how to determine a better selector
    * how to add to counter i.e delete
    * 
    */
  //  const form = $(this).parent();
  const btnDiv = $(this).parent().children(".btn-div");
  const counter = btnDiv.children(".counter");
  const max = 140;
  counter.html(max - $(this).val().trim().length);
  counter.html() <= 0 ? counter.addClass('overLimit'): counter.removeClass('overLimit');

 });
});