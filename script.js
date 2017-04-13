/*jslint browser: true*/
/*global $, Audio, jQuery, alert, console*/
$(document).ready(function () {
    //TODO: add user input for custom streamers
    'use strict';
    var baseUrl = 'https://wind-bow.hyperdev.space/twitch-api/',
        i,
        j,
        usersList = ['quickybaby', 'orzanel', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin', 'comster404', '404_feded'];
    //Convert users names to lower case to avoid spelling mistakes and use json.name (always all lower case) as id for HTML elements
    usersList.forEach(function (elem, index, array) {
        elem = elem.toLowerCase();
        array[index] = elem;
    });

    function createList() {
        var i;
        //Create unordered list based on usersList array
        for (i = 0; i < usersList.length; i = i + 1) {
            $('#streamers-list').append('<li class="clearfix offline" id="' + usersList[i] + '"><div class="left-container"></div><div class="right-container clearfix"><span class="status-icon icon-offline"></span>Offline</div></li>');
        }
        //Append apropriate HTML markup
        $('<a href="" class="a-logo" target="_blank"><img src="" class="logo clearfix" alt="Logo" width="100" height="100"></a><a href="" class="name" target="_blank"></a><p class="bio hidden"><span class="highlight">Bio: </span></p><p class="stream-info hidden"><span class="highlight">Game: </span></p>').appendTo('.left-container');
    }
    createList();

    //Handle JSON response for users
    function users(json) {
        //Setting up some variables
        var name = json.name,
            displayName = json.display_name,
            logo = json.logo,
            bio = json.bio,
            error = json.error,
            nameError;
        if (logo) {
            logo = json.logo;
        } else {
            //Logo placeholder if not present in json.logo
            logo = 'https://res.cloudinary.com/s1awek/image/upload/twitchtv/placeholder.png';
        }
        //If no errors...
        if (!json.error) {
            $('#' + name + ' .left-container .a-logo').addClass(name);
            $('#' + name + ' .left-container .a-logo').attr('href', 'https://twitch.tv/' + name);
            $('#' + name + ' .left-container a img.logo').attr('src', logo);
            $('#' + name + ' .left-container a.name').addClass(name);
            $('#' + name + ' .left-container a.name').attr('href', 'https://twitch.tv/' + name);
            $('#' + name + ' .left-container a.name').text(displayName);
            if (bio) {
                $('#' + name + ' .bio').removeClass('hidden');
                $('#' + name + ' .bio').append(bio);
            }
            //If errors found...
        } else {
            //Extract user name from error message
            nameError = json.message.split('\"');
            nameError = nameError[1];
            $('#' + nameError + ' .left-container .a-logo').addClass(nameError);
            $('#' + nameError + ' img.logo').attr('src', logo);
            $('#' + nameError + ' .left-container a.name').addClass(nameError);
            $('#' + nameError + ' .left-container a.name').text(nameError);
            $('#' + nameError + ' .left-container .bio').removeClass('hidden');
            $('#' + nameError + ' .left-container .highlight').text('Error: ');
            $('#' + nameError + ' .left-container .highlight').addClass('error');
            $('#' + nameError + ' .left-container .bio').append(error);
        }
    }
    //Handle JSON response for streams user online
    function streams(json) {
        var stream = json.stream,
            name,
            game;
        //If user streaming...
        if (stream) {
            name = json.stream.channel.name;
            game = json.stream.game;
            $('#' + name).removeClass('offline');
            $('#' + name).addClass('online');
            $('#' + name + ' .stream-info').removeClass('hidden');
            $('#' + name + ' .stream-info').append(game);
            $('#' + name + ' .status-icon').removeClass('icon-offline');
            $('#' + name + ' .status-icon').addClass('icon-online');
            $('#' + name + ' .right-container').html('<span class="status-icon icon-online"></span>Online');
        }
    }
    //Simple AJAX error handler, just in case
    function errorHandler(xhr, ajaxOptions, thrownError) {
        console.log('Error: ', xhr, ajaxOptions, thrownError);
    }
    //Looping through all users and GET ajax response
    for (i = 0; i < usersList.length; i = i + 1) {
        $.ajax({
            type: 'GET',
            url: 'https://wind-bow.gomix.me/twitch-api/users/' + usersList[i],
            dataType: 'jsonp',
            error: errorHandler,
            success: users,
            async: false
        });
    }
    //Looping through all streams and GET ajax response
    for (j = 0; j < usersList.length; j = j + 1) {
        $.ajax({
            type: 'GET',
            url: 'https://wind-bow.gomix.me/twitch-api/streams/' + usersList[j],
            dataType: 'jsonp',
            error: errorHandler,
            success: streams,
            async: false
        });
    }
    //Filtering all/online/offline users
    $('#online').on('click', function () {
        $('.offline').addClass('hidden');
        $('.online').removeClass('hidden');
        $('#online').parent().addClass('active');
        $('#offline').parent().removeClass('active');
        $('#all').parent().removeClass('active');
    });
    $('#offline').on('click', function () {
        $('.online').addClass('hidden');
        $('.offline').removeClass('hidden');
        $('#offline').parent().addClass('active');
        $('#online').parent().removeClass('active');
        $('#all').parent().removeClass('active');
    });
    $('#all').on('click', function () {
        $('.online').removeClass('hidden');
        $('.offline').removeClass('hidden');
        $('#all').parent().addClass('active');
        $('#offline').parent().removeClass('active');
        $('#online').parent().removeClass('active');
    });
    //Filtering search results
    //Snippet taken and adjusted from here: https://php.quicoto.com/jquery-live-filter/
    $('#filter').keyup(function () {
        // Retrieve the input field text
        var filter = $(this).val();
        // Loop through the streamers list
        $('.name').each(function () {
            // If the list item does not contain the text phrase fade it out
            if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
                $(this).parent().parent().fadeOut();
            } else {
                $(this).parent().parent().fadeIn();
            }
        });
    });
});
