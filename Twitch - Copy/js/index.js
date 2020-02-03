const streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const clientId = 'q72gvlpgoghyyeyu6cyzp0as60f2p4';

// Runs function after HTML has been fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {
    
 
      
    // loop through streams
    for (let i = 0; i < streams.length; i++) {
        
        //  configure endpoint URLs
        const channelEndpoint = `https://api.twitch.tv/kraken/channels/${streams[i]}?client_id=${clientId}`;
        const streamEndpoint = `https://api.twitch.tv/kraken/streams/${streams[i]}?client_id=${clientId}`; 
        

        //make AJAX request to Twitch TV channels
        fetch(channelEndpoint)
        
        //specifies we are expecting a JSON response
        .then(response => response.json())

        // handle the JSON data 
        .then(data => {
            
            //make AJAX request to Twitch TV streams
            fetch(streamEndpoint)
            
            //specifies we are expecting a JSON response
            .then(response => response.json())
            
            // handle the JSON data 
            .then(data2 => {
                
                // sets variables for the streams and channels JSON data
                const results = data;
                const stream = data2;
                
                // check to see whether stream is online or offline
                const status = stream.stream ? 'Online' : 'Offline';
                                      
                // creates a DOM node for the image logo
                const logPic = document.createElement('img');
            
                     
                //check to see whether a logo exist, if not then assignes a generic image to the img node
                logPic.src = results.logo ? logPic.src = results.logo :"https://7oktng-bn1305.files.1drv.com/y4mU9tPVQCuFBXt5sjRBsmvjxi2f_vXYle9YLtLb69Wqr_z633tw6DxSnovrMxqddOOtdk2YKL916Ura8DSyZvjAY2dKPvrkboK5HMpt6T69hadwwhdJgkax-Cv5UFmN271qwHN8tBvlhtc4ptTTcGmO9rBqsqb3hZPKPRGnWAMyr6ADjXFHph-xDXkkJMOAFHM6akLJuOFv7ekxPGwGCbUsw?width=500&height=500&cropmode=none";

                // checks to see whether channel is streams anything
                if(results.game === null) results.game = "No Content";
               
                // create a row node for the info
                const newNode = document.createElement('row');
                
                // assign Bootstrap columns and template literals to newNode
                newNode.innerHTML = `<div class = 'row'> <div class='col-sm-3 row-height'><a href="${results.url}" target="_blank"><img src=${logPic.src}></a></div><div class='col-sm-3 row-height'><a href="${results.url}" target="_blank">${results.name}</a></div><div class='col-sm-3 row-height game'>${results.game}</div><div class='col-sm-3 row-height stat'>${status}</div></div>`;
                // assign the parent node
                
                // creates a div node for the followerInfo 
                const parentDiv = document.getElementById("followerInfo");
                
                // child element does not exist
                const sp2 = undefined;
                
                // insert the row node into the followerInfo div node
                parentDiv.insertBefore(newNode, sp2); 
                const cells = document.getElementsByClassName("stat");
                console.log(cells);
                for(var i = 0, max = cells.length; i < max; i++) {
                    var node = cells[i];
                    
                    var currentText = node.childNodes[0].nodeValue;
                    
                    if (currentText === "Online") {
                        node.parentNode.style.backgroundColor = "rgba(85, 226, 34, 0.3)";
                        node.style.color = "#49fb35";
                    } else {
                        node.style.color = "#ff0101";
                    }
                    
                    
                  
                   
                    
                        
                
                }
                })
              
            });
    }
  
})


 

 
   


            