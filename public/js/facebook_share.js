$(document).ready(function(){
      console.log(window.location.href)
      var url = window.location.href.split("/").splice(0,5).join("/");
      console.log(url)
      $('#share-on-facebook-inner').click(function(e){
        e.preventDefault();
          FB.ui(
          {
            method: 'feed',
            name: 'This is the content of the "name" field.',
            link: url,
            picture: document.getElementById("image-preview").src,
            caption: 'This is the content of the "caption" field.',
            description: 'This is the content of the "description" field, below the caption.',
            message: 'this is an awsome message'
          });
      });
    });