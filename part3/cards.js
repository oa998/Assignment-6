 var lastClickedID = "";
        var lastClickedCL = "";
        var allIds = [];
        var timer = document.createElement("p");
        
        function startGame() {
            pairs = Number(document.getElementById("imgs").value);
            delay = Number(document.getElementById("secs").value)*1000;
            remaining = pairs;
            document.body.removeChild(document.getElementById("initialize"));
            allClassesPossible = ["a","b","c","d","e","f","g","h","i","j","k","l"];
            classes=[];
            for(var i = 0; i<pairs; i++){
                classes.push(allClassesPossible[i]);
                classes.push(allClassesPossible[i]);
            }
            classes = shuffle(classes);
            var numCards = classes.length;
            for (var x = 0; x < numCards; x++) {
                var img = document.createElement("div");
                var imgID = "" + x;
                var imgCL = classes.pop();
                allIds.push(imgID);
                img.setAttribute("id", imgID);
                img.setAttribute("class", imgCL);
                img.setAttribute("clickable", true);
                img.style.background = "lightgray";
                img.onclick = clicked;
                img.innerHTML = imgID;
                img.style.textAlign="center";
                img.style.fontSize="2em";
                img.style.border = "solid white 4px";
                img.style.width = "120px";
                img.style.height = "120px";
                img.style.float = "left";
                if(x%4== 0 && x>1)
                    img.style.clear = "both";
                document.body.appendChild(img);

            }
            var p = document.createElement("p");
            p.style.clear = "both";
            var countdown = delay/1000 +1;
            document.body.appendChild(p);
            var cov = createCover(0);
            document.body.appendChild(cov);
            var cd = setInterval(function(){
                countdown -=1;
                if(countdown<1){
                    timer.style.clear="both";
                    document.body.appendChild(timer);
                    clearInterval(cd);
                    setTimeout(function(){
                        document.body.removeChild(p);
                        for(var x in allIds){
                            cardDown(document.getElementById(allIds[x]));
                        }
                        document.body.removeChild(cov);
                        var secs = 120;
                        if(pairs==10)
                            secs=150;
                        else if(pairs == 12)
                            secs=180;
                        gameInterval = setInterval(function(){
                            timer.innerHTML = "seconds remaining: "+(secs--); 
                            if(secs<-1){
                                clearInterval(gameInterval);
                                timer.innerHTML = "game over, try again";
                                var cov = createCover(0);
                                document.body.appendChild(cov); 
                                var restartButton = document.createElement("button");
                                restartButton.innerHTML = "Play again?";
                                restartButton.setAttribute("type","button");
                                restartButton.setAttribute("onclick","window.location.reload()");
                                restartButton.style.position = "relative";
                                restartButton.style.clear = "both";
                                restartButton.style.zIndex = "100";
                                document.body.appendChild(restartButton);
                            }
                        }, 1000);
                    },100);
                }
                p.innerHTML = "You have "+ countdown +" seconds to study the board...";   
            },1000);
            
            for(var x in allIds){
                cardUp(document.getElementById(allIds[x]));
            }
            
        }

        function clicked() {
            var myself = document.getElementById(this.id);
            cardUp(myself);
            myself.style.border = "solid blue 4px";
            myself.clickable = false;
            myself.onclick = "";
            if (lastClickedID != "") 
                var previous = document.getElementById(lastClickedID);

            if (lastClickedCL == "") {
                lastClickedCL = this.className;
                lastClickedID = this.id;
            }
            else if (myself.id != lastClickedID && myself.className == lastClickedCL) {
                myself.style.border = "solid green 4px";
                previous.style.border = "solid green 4px";
                lastClickedCL = "";
                lastClickedID = "";
                previous.clickable = false;
                previous.onclick = "";
                myself.clickable = false;
                myself.onclick = "";
                remaining-=1;
                if(remaining==0)
                    winGame();
            }
            else {
                myself.style.border = "solid red 4px";
                previous.style.border = "solid red 4px";
                var cov = createCover(0.2);
                document.body.appendChild(cov);
                setTimeout(function () {
                    myself.style.border = "solid white 4px";
                    previous.style.border = "solid white 4px";
                    myself.style.content = "";
                    previous.style.content = "";
                    myself.style.background = "lightgray";
                    previous.style.background = "lightgray";
                    previous.clickable = true;
                    previous.onclick = clicked;
                    myself.clickable = true;
                    myself.onclick = clicked;
                    document.body.removeChild(cov);
                }, 1400);
                lastClickedCL = "";
                lastClickedID = "";
            }
        }

        function cardUp(cardElement){
            cardElement.style.content= "url(images/"+cardElement.className+".jpg)";
        }
        
        function cardDown(cardElement){
            cardElement.style.content = "";
            cardElement.style.background = "lightgray";
            cardElement.innerHTML = cardElement.id;
        }
        
        function shuffle(ary) {
            var currentIndex = ary.length
                , temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = ary[currentIndex];
                ary[currentIndex] = ary[randomIndex];
                ary[randomIndex] = temporaryValue;
            }
            return ary;
        }
        
        function createCover(opacity){
            var cover = document.createElement("div");
            cover.className = "cover";
            cover.style.opacity = ""+opacity;
            return cover;
        }
        
        function winGame(){
            var p = document.createElement("p");
            p.innerHTML= "Congratulations!  You win!";
            p.style.fontFamily = "monospace";
            p.style.fontSize = "2em";
            p.style.clear = "both";
            p.style.fontWeight = "bolder";
            p.style.textAlign = "center";
            document.body.appendChild(p);
            clearInterval(gameInterval);
            var x = 0;
            var flash = setInterval(function(){
                if(x %2 == 0)
                    p.style.color = "blue";
                else
                    p.style.color = "green";
                if(x>9){
                    p.style.color = "yellow";
                    p.style.background = "red";
                    clearInterval(flash);
                    var restartButton = document.createElement("button");
                    restartButton.innerHTML = "Play again?";
                    restartButton.setAttribute("type","button");
                    restartButton.setAttribute("onclick","window.location.reload()");
                    restartButton.style.clear = "both";
                    document.body.appendChild(restartButton);
                }
                x++;
            },500);
        }
        