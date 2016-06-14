$(document).ready(function(){
      console.log(window.location.href)
      var url = window.location.href.split("/").splice(0,5).join("/");
      console.log(url)
      $('#share-on-facebook-inner').click(function(e){
        e.preventDefault();
          FB.ui(
          {
            method: 'feed',
            name: "Celebrate the Father's Day",
            link: url+"?value=1",
            picture: document.getElementById("image-preview").src,
            caption: "father's day is near",
            description: 'Share a message to show the love towards your father',
            message: ''
          });
      });
    });