var socket = io();

$(document).ready(function(){
  $("#chatMessageSend").click(function(){
    var msg = $('#chatMessageInput').val();
    $('#chatMessageInput').val('');
    if(msg){
      socket.emit('msg', {message: msg, user: 'user'});
    }
  });
  var user;

  socket.on('userExists',function(data){
  //  $('#nickName').val('');
  //  $("#usernameInput").css("border-bottom", "2px solid #f00");
  });

  socket.emit('setUserName', user);

  socket.on('userSet',function(data){
    // $('#nickName').val('');
    // user = data.userName;
    // $(".login.page").css("display","none");
    // $(".chat.page").css("display","block");
    // flag = true;
    // initialize();
    // scroll();
  });

  socket.on('newmsg', function(data){
    if(user){
    var item = $('<div class="timeslot" style="height: 94px;"> <div class="task"> <span> <span class="type"> ' + data.user + ' </span> <span class="details"> ' + data.message + ' </span><div class="arrow"></div> </div> <div class="icon green"> </div> <div class="time"> ' + data.time + ' </div> </div>');
      $('.timeline').append(item);
      scroll();
    }
  });
});	
function toTime(input){
	var h, cycle, time;
	h = input.substr(0, 2);
	cycle = (h >= 12) ? 'pm' : 'am';
	time = {
		hr: h % 13 + 1,
		min: input.substr(3, 2),
		cycle:  cycle
	};
	return time;
}

