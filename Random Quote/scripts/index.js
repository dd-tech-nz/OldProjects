/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

var quotes = [
['"It\'s not whether you get knocked down; it\'s whether you get up."', "– Vince Lombardi"]
['"Only he who can see the invisible can do the impossible."', "– Frank L. Gaines"],
['"Age is no barrier. It’s a limitation you put on your mind."' , "– Jackie Joyner-Kersee"],
['"A trophy carries dust. Memories last forever."', "– Mary Lou Retton"],
['"Most people give up just when they’re about to achieve success. They quit on the one yard line. They give up at the last minute of the game one foot from a winning touchdown."', "– Ross Perot"],
['"You have to do something in your life that is honorable and not cowardly if you are to live in peace with yourself."', "– Larry Brown"],
['"The five S’s of sports training are: stamina, speed, strength, skill, and spirit; but the greatest of these is spirit."', "– Ken Doherty"],
['"When you’ve got something to prove, there’s nothing greater than a challenge."', "– Terry Bradshaw"],
['"Persistence can change failure into extraordinary achievement."', "– Marv Levy"],
['"Make sure your worst enemy doesn’t live between your own two ears."', "– Laird Hamilton"],
['"If at first you don’t succeed, you are running about average."', "– M.H. Alderson"],
['"The difference between the impossible and the possible lies in a person’s determination."', "– Tommy Lasorda"],
['"If you fail to prepare, you’re prepared to fail."', "– Mark Spitz"],
['"The road to Easy Street goes through the sewer."', "– John Madden"],
['"The more difficult the victory, the greater the happiness in winning."', "– Pele"],
['"The mind is the limit. As long as the mind can envision the fact that you can do something, you can do it, as long as you really believe 100 percent."', "– Arnold Schwarzenegger"],
['"You have to expect things of yourself before you can do them."', "– Michael Jordan"]
];
var dispQuote = "";
// displayQuote() function
function displayQuote() {
  var index = Math.floor(Math.random() * 17); //gives a integer value from 1 - 17
 
  document.getElementById("quote").style.display = "block"; //displays the quote as a block-level element
  document.getElementById("inspire").innerHTML = quotes[index][0];
  document.getElementById("before").style.display = "none"; // removes the "Hit the button for..." text
  document.getElementById("author").innerHTML = quotes[index][1];
// var quote = quotes[index][0];
  
 dispQuote = quotes[index][0];

}

function shareTweet() {
 
  var tweetText = encodeURI(dispQuote)
    window.open("https://twitter.com/intent/tweet?text=" + tweetText);
    
   }
  
  


// Clicking the button calls the displayQuote() function
document.getElementById("generate").onclick = function() { displayQuote(); };

// Clicking the Twitter button calls the sendTweet() function
document.getElementById("twitter").onclick = function() { shareTweet(); };