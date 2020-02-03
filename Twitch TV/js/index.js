// Client ID - q72gvlpgoghyyeyu6cyzp0as60f2p4
// ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
// https://api.twitch.tv/kraken/channels/freecodecamp?client_id=q72gvlpgoghyyeyu6cyzp0as60f2p4

$(function(){
    var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?client_id=q72gvlpgoghyyeyu6cyzp0as60f2p4').done(function(data){
       // console.log(data);
        if(data.stream === null) {
            $('#fcc').html(' is offline');
        }else{
            $('#fcc').html(' is online');
        }
        
    });
    
    for( var i = 0; i < streams.length; i++ ) {
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + streams[i],
            headers: {
            'client-ID':'q72gvlpgoghyyeyu6cyzp0as60f2p4'
        },
            success: function(dataI){
               // console.log(dataI);
                
                $.getJSON('https://api.twitch.tv/kraken/streams/'+ dataI.name +'?client_id=q72gvlpgoghyyeyu6cyzp0as60f2p4').done(function(data2){
                    
                    var name = data2._links.self.slice(37);
                    //console.log(name);
                         if(data2.stream === null) {
                        $('#user').append('<a target = "blank" href = "https://www.twitch.tv/'+ name +'">' + name + '</a><br>');
                             $('#status').append('Offline<br>');
                             $('#game').append('N/A<br>');
                    }else{
                       $('#user').append('<a target = "blank" href = "https://www.twitch.tv/'+ name +'">' + name + '</a><br>');
                         $('#status').append('ONLINE!<br>');
                        $('#game').append(data2.stream.game +'<br>');
                    }

                });       
            },
            error: function(err){
                //alert("Error: User not found");
                $('#user').append(streams[i] + '<br>');
                $('#status').append('Not Found<br>');
                $('#game').append('N/A<br>');
            }
            
        });
    };
})