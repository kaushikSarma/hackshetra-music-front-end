//Main.js
//Created by Kaushik

(function($d, $w, $, t){
  var Globals = {},
    $Objects = {},
    Functions = {

    };
    $d.ready(function(){
        console.log('script');
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
    });
})(jQuery(document), jQuery(window), jQuery, TweenMax);
