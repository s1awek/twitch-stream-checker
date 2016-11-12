$(document).ready(function () {
    'use strict';
    var baseUrl = 'https://wind-bow.hyperdev.space/twitch-api/';
    var user = '/users/';
    var channel = '/channels/';
    var stream = '/streams/';
    var usersList = ['quickybaby', 'orzanel', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin', 'comster404', '404_feded'];

    function getData(parm, user_name) {
        function myUserFunction(json) {
            if (json.status == '404') {
                $('#streamers-list').append('<li class="clearfix" id="' + user_name + '"><div class="left-container"><span class="name-404 name">' + user_name + '</span></div></li>');
                $('#' + user_name + ' .left-container').prepend('<img src="https://res.cloudinary.com/s1awek/image/upload/twitchtv/placeholder.png" class="logo clearfix" alt="Logo placeholder" width="100" height="100" / >');
            } else {
                $('#streamers-list').append('<li class="clearfix" id="' + user_name + '"><div class="left-container"><a href="#" class="name ' + user_name + '">' + json.display_name + '</a></div></li>');

                if (json.bio !== null) {
                    //console.log(json._id);
                    $('#' + user_name + ' .left-container').append('<p class="bio"><span class="highlight">Bio: </span>' + json.bio + '</p>');
                }
                if (json.logo !== null) {
                    $('#' + user_name + ' .left-container').prepend('<a href="#" class="' + user_name + '"><img src="' + json.logo + '" class="logo clearfix" alt="Logo" width="100" height="100" / ></a>');
                } else {
                    $('#' + user_name + ' .left-container').prepend('<img src="https://res.cloudinary.com/s1awek/image/upload/twitchtv/placeholder.png" class="logo clearfix" alt="Logo placeholder" width="100" height="100" / >');
                }
            }
        }

        function myStreamFunction(json) {
            $('a.' + user_name).attr({
                'href': 'https://twitch.tv/' + user_name,
                'target': '_blank'
            });
            //console.log(json.stream);
            if (json.stream === null) {
                $('#' + user_name).append('<div class="right-container clearfix"><span class="icon-offline"></span>Offline</div>');
                $('#' + user_name).addClass('offline');
            } else if (json.stream === undefined) {
                $('#' + user_name).append('<div class="right-container clearfix">' + json.message + '</div>');
                $('#' + user_name).addClass('offline');
            } else {
                $('#' + user_name).append('<div class="right-container clearfix"><span class="icon-online"></span>Online</div>');
                $('#' + user_name + ' .left-container').append('<p class="stream-info"><span class="highlight">Game: </span>' + json.stream.game + '</p>');
                $('#' + user_name).addClass('online');

            }
        }

        if (parm === user) {
            $.ajax({
                type: 'GET',
                url: 'https://wind-bow.hyperdev.space/twitch-api' + parm + user_name,
                dataType: 'jsonp',
                success: myUserFunction,
                data: {},
                async: false

            });
        } else if (parm === stream) {
            $.ajax({
                type: 'GET',
                url: 'https://wind-bow.hyperdev.space/twitch-api' + stream + user_name,
                dataType: 'jsonp',
                success: myStreamFunction,
                data: {},
                async: false

            });
        }
    }

    for (var i = 0; i < usersList.length; i = i + 1) {
        getData(user, usersList[i]);
    }

    for (var i = 0; i < usersList.length; i = i + 1) {
        getData(stream, usersList[i]);
    }


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
