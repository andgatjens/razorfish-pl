'use strict';
$(function() {

  // Global Variables
  var slickAlbum = $('.slick-album'),
      navAlbum = $('.nav-album'),
      // JSON url
      jsonUrl = '../api/gallery_json.js',
      // AJAX call to get the JSON content
      getJson = $.ajax({
        type: 'GET',
        url: jsonUrl,
        contentType: 'application/json',
        dataType: 'json'
      });

  // Success function called once the JSON was retrieved.
  getJson.done(function( data ) {
    // Set the album name 'h1' to the JSON name field.
    $('.album-name').text( data.album.name );

    var slickContent = '',
        navContent = '';

    // Get all the photos.
    $(data.photos).each(function(index) {
      var image = data.photos[index];
      // Get all the content on the 'slickContent' variable to just make one append.
      slickContent += '<div>' +
                        '<img src="images/slides/' + image.image + '" alt="">' +
                        '<h2>' + image.title + '</h2>' +
                        '<p>Taken at the Intel Conference in ' + image.location + ' on ' + image.date + '</p>' +
                      '</div>';

      // Get all the content on the 'navContent' variable to just make one append.
      navContent += '<li><img src="images/thumbnails/' + image.thumb_url + '" alt=""></li>';
    });

    // Append dynamically the content for each image of the slider.
    slickAlbum.append(slickContent);
    // Append dynamically the content for each thumbnail of the slider.
    navAlbum.find('ul').append(navContent);

    // Function to update the thubmnail nav.
    var updateNav = function (index) {
      // Remove active class from all the 'li's on $('.nav-album').
      navAlbum.find('li').removeClass('active');
      // Add active class to the selected 'li'.
      navAlbum.find('li').eq(index).addClass('active');
    };

    // Init slick slider for '$('.slick-album')'.
    slickAlbum.slick({
      autoplay: true,
      // Custom slider arrows.
      prevArrow: '<button type="button" class="prev-slick">Previous</button>',
      nextArrow: '<button type="button" class="next-slick">Next</button>'
    });

    // Event 'afterChange' to update the thumbnail nav.
    slickAlbum.on('afterChange', function(event, slick, currentSlide){
      updateNav(currentSlide);
    });

    // Add the 'active' class to the first item of the thubmanil.
    navAlbum.find('li').eq(0).addClass('active');
    // Click event for the slider thumbnails.
    navAlbum.on('click', 'li', function() {
      var $this = $(this),
          index = $this.index();

      // If this does not have class 'active', execute code below, else don't do anything.
      if(!$this.hasClass('active')) {
        updateNav(index);
        // Move the slider to the 'li' index selected.
        slickAlbum.slick('slickGoTo', index);
      }
    });

  });

});
