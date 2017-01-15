//Main.js
//Created by Kaushik

(function($d, $w, $, t){
  var Globals = {
        faces: {
          'happy': 'path(\'m80.859 976.07c30.178 21.506 56.922 20.61 81.714 16.196 39.449-8.0074 63.438-42.727 66.369-51.758\')',
          'angry': 'path(\'m 80.859231,989.76816 c 31.514109,-25.26469 43.892999,-11.46159 75.366929,-2.84655 28.30598,8.32906 40.97782,2.71415 67.03677,-16.67957\')',
          'sad': 'path(\'m 91.215578,1002.129 c 31.514112,-25.26472 50.240432,-28.83357 85.055122,-14.53924 19.28594,-0.69098 10.57694,-16.32816 46.99223,1.36052\')',
        }
    },
    $Objects = {
        Expression : []
    },
    Functions = {
        ToSad: function(){
            console.log($Objects.Expression, Globals.faces.sad);
            t.to($Objects.Expression[1], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[2], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[0], 1.5, {
                strokeDashoffset: '0',
                ease: Power4.easeInOut,
                delay: 1.5,
                onComplete: function(){
                    Functions.ToHappy();
                }
            });
        },
        ToHappy: function(){
            t.to($Objects.Expression[0], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[2], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[1], 1.5, {
                strokeDashoffset: '0',
                ease: Power4.easeInOut,
                delay: 1.5,
                onComplete: function(){
                    Functions.ToAngry();
                }
            });
        },
        ToAngry: function(){
            t.to($Objects.Expression[1], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[0], 1.5, {
                strokeDashoffset: '100%',
                ease: Power4.easeInOut
            });
            t.to($Objects.Expression[2], 1.5, {
                strokeDashoffset: '0',
                ease: Power4.easeInOut,
                delay: 1.5,
                onComplete: function(){
                    Functions.ToSad();
                }
            });
        },
        FetchPlaylist: function(){
            $.ajax({
                type: 'get',
                url: '/playList',
                onSuccess: Functions.RenderList
            });
        },
        GenerateDuration: function(){
            var d = {
                min: Math.floor((Math.random() * 10) + 3),
                sec: Math.floor((Math.random() * 55) + 5)
            };
            return d;
        },
        RenderList: function(data){
            console.log(data);
            for (var i = 1; i < data.length; i++){
                var duration = Functions.GenerateDuration();
                var song = $('<li class="song" data-source="' + data[i].Url + '" id="' + data[i].Id + '"><a><img/></a>'
                          + '<div class="song-info"><strong>Song</strong> ' + data[i].Song + ' <br/><strong>Duration</strong>' + duration.min + 'm ' + duration.sec + 's <div></div></div></li>');
                console.log(song);
                $Objects.PlayListContainer.append(song);
            }
        },
        Play: function(){

        },
        UpVote: function(id){
            $.ajax({
                type: 'post',
                url: '/playList/increase',
                data: id
            });
        },
        DownVote: function(id){
            $.ajax({
                type: 'post',
                url: '/playList/Decrease',
                data: id
            });
        },
    };
    $d.ready(function(){
        $Objects.PlayListContainer = $('.dashboard-list');
        $Objects.Expression[0] = $('#happy');
        $Objects.Expression[1] = $('#angry');
        $Objects.Expression[2] = $('#sad');
        $Objects.ChatBox = $('.chat-box');
        $Objects.ChatShowButton = $('.chat-now')
            .bind('click', function(){
                console.log('chatting');
                t.to($Objects.ChatBox,  0.5, {
                    left: '0'
                });
            });
        $Objects.ChatHideButton = $('.chat-hide')
            .bind('click', function(){
                console.log('bye', $Objects.ChatBox);
                t.to($Objects.ChatBox,  0.5, {
                    left: '-' + $Objects.ChatBox.innerWidth() + 'px'
                });
            });
          Functions.ToSad();
        $('.icon-thumbs-up').on('click', function(event){
            var id = $(event.target).closest('li').attr('id');
            Functions.Upvote(id);
        });
        $('.icon-thumbs-down').on('click', function(event){
            var id = $(event.target).closest('li').attr('id');
            Functions.DownVote(id);
        });
    });
})(jQuery(document), jQuery(window), jQuery, TweenMax);
