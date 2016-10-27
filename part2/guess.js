        var choice=0;
        function rand(small, large) {
            small = small - 1;
            var range = large - small;
            return Math.floor(Math.random() * range + small) + 1;
        }
        
        function checkGuess(){
            var guess = document.getElementById("guess").value;
            var gList = document.getElementById("pastGuesses");
            var gCount = document.getElementById("numGuesses");
            var msg = document.getElementById("msg");
            gCount.innerHTML = Number(gCount.innerHTML)-1;
            if(guess>choice && Number(gCount.innerHTML)>0){
                msg.innerHTML="Too high! Guess lower...";
                var lItem = document.createElement("li");
                lItem.innerHTML = guess+" (too high)";
                gList.appendChild(lItem);
            }else if(guess<choice && Number(gCount.innerHTML)>0){
                msg.innerHTML="Too low! Guess higher...";
                var lItem = document.createElement("li");
                lItem.innerHTML = guess+" (too low)";
                gList.appendChild(lItem);
            }else if(guess==choice && Number(gCount.innerHTML)>=0){
                msg.innerHTML="<span>That's it!</span>";
                msg.style.color = "green";
                var lItem = document.createElement("li");
                lItem.innerHTML = "<b>"+guess+" (Got It!)</b>";
                gList.appendChild(lItem);
                var butt = document.getElementById("clicker");
                butt.innerHTML = "Play Again?";
                butt.setAttribute("onclick","window.location.reload()");
                butt.style.borderColor = "lightgreen";
            }else{
                msg.innerHTML="<span>You've run out of guesses!</span>";
                msg.style.color = "red";
                var lItem = document.createElement("li");
                lItem.innerHTML = guess+" (game over!)";
                gList.appendChild(lItem);
                var butt = document.getElementById("clicker");
                butt.innerHTML = "Play Again?";
                butt.setAttribute("onclick","window.location.reload()");
                butt.style.borderColor = "red";
            }
            
        }
        
        
        window.onload = function (e) {
            choice = rand(1, 100);
            console.log(choice);
        }