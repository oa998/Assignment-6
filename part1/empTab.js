        var employeeHours = [];
        var timer = "";

        function fadeMsg(message, textcolor) {
            clearInterval(timer);
            var msgBox = document.getElementById("notify");
            msgBox.innerHTML = message;
            msgBox.style.color = textcolor;
            var op = 1; // initial opacity
            timer = setInterval(function () {
                if (op <= 0.01) {
                    clearInterval(timer);
                }
                msgBox.style.opacity = op;
                op -= op * 0.1;
            }, 120);
        }

        function verify() {
            var hoursworked = Number(document.getElementById("hrs").value);
            var divbox = document.getElementById("inputdiv");
            var instructionBox = document.getElementById("step1");
            var msg = "";
            if (hoursworked < 0 && employeeHours.length == 0) {
                console.log(employeeHours.length);
                divbox.style.borderColor = "red";
                fadeMsg("Enter at least 1 valid value before ending.", "red");
                setTimeout(function () {
                    divbox.style.borderColor = "black";
                }, 1500);
            }
            else if (hoursworked >= 0) {
                divbox.style.borderColor = "green";
                employeeHours.push(hoursworked);
                console.log(employeeHours);
                fadeMsg("Data added!", "green");
                setTimeout(function () {
                    divbox.style.borderColor = "black";
                }, 1000);
            }
            else if (hoursworked == -1) {
                document.body.removeChild(instructionBox);
                writeTable(employeeHours);
            }
        }

        function writeTable(hoursList) {
            var runningTotal = 0;
            var myTable = document.createElement("table");
            var headRow = document.createElement("tr");
            var h1 = document.createElement("td");
            h1.innerHTML = "Employee Number";
            var h2 = document.createElement("td");
            h2.innerHTML = "Hours Worked";
            var h3 = document.createElement("td");
            h3.innerHTML = "Total Paid";
            headRow.appendChild(h1);
            headRow.appendChild(h2);
            headRow.appendChild(h3);
            myTable.appendChild(headRow);
            for (var x = 1; x <= hoursList.length; x++) {
                var row = document.createElement("tr");
                var empNum = document.createElement("td");
                empNum.innerHTML = x;
                var empHrs = document.createElement("td");
                empHrs.innerHTML = hoursList[x-1];
                var empPay = document.createElement("td");
                var payAmount = 0;
                if(hoursList[x-1]>40){
                    payAmount = (40 * 15);
                    var otHours = hoursList[x-1]-40;
                    payAmount += (22.5*otHours);  //time-and-half
                }else{
                    payAmount = (hoursList[x-1] * 15);
                }
                runningTotal += payAmount;
                empPay.innerHTML = "$" + payAmount;
                row.appendChild(empNum);
                row.appendChild(empHrs);
                row.appendChild(empPay);
                myTable.appendChild(row);
            }
            document.body.appendChild(myTable);
            var notification = document.createElement("p");
            var infoMsg = "All employees total were paid $" + runningTotal;
            notification.innerHTML = infoMsg;
            document.body.appendChild(notification);
        }