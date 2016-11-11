$(document).ready(function () {
    var baseUrl = 'https://wind-bow.hyperdev.space/twitch-api/';
    var user = '/users/';
    var channel = '/channels/';
    var stream = '/streams/';
    var usersList = ['quickybaby', 'orzanel', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin', 'comster404', 'none_existing_user'];

    function getData(parm, user_name) {
        function myUserFunction(json) {
            //console.log(json);
            if (json.status == '404') {
                $('#streamers-list').append('<li class="clearfix" id="' + user_name + '"><div class="left-container"><a href="#" class="' + user_name + '"> <span class="name">' + user_name + '</span></a></div></li>');
            } else {
                $('#streamers-list').append('<li class="clearfix" id="' + user_name + '"><div class="left-container"><a href="#" class="' + user_name + '"> <span class="name">' + json.display_name + '</span></a></div></li>');

                if (json.bio != null) {
                    $('#' + json._id + ' .left-container').append('<p>Bio: ' + json.bio + '</p>');
                }
                if (json.logo != null) {
                    $('#' + user_name + ' a').prepend('<img src="' + json.logo + '"/ >');
                } else {
                    $('#' + user_name + ' a').prepend('<img src="placeholder.jpg"/ >');
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
                $('#' + user_name).append('<div class="right-container">Stream offline</div>');
            } else if (json.stream === undefined) {
                $('#' + user_name).append('<div class="right-container">' + json.message + '</div>');
            } else {
                $('#' + user_name).append('<div class="right-container"><a href="https://twitch.tv/' + user_name + '/" target="_blank"> Go to stream</a></div>');
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
});
