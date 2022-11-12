$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const maxTweetLength = 140;
    let inputCharLength = $(this).val().length;
    let siblingCounter = $(this).siblings().find('.counter');  
    // $(this).siblings('counter') WHY DOESN'T WORK

    // console.log(inputCharLength);

    if (inputCharLength > maxTweetLength) {
      siblingCounter.addClass('overLengthLimit');
    } else if (inputCharLength <= maxTweetLength) {
      siblingCounter.removeClass('overLengthLimit');
    }
    $(siblingCounter).val(maxTweetLength - inputCharLength);
  });
}); 