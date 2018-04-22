//returns the value of the selected radio button
function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

//toggles the visiblity of controls
function displayOptions(cal2Visible,inputBoxVisible) {
    
    //resets the text values of labels and input box
    document.getElementById("warningText").innerHTML = "";
    document.getElementById("resultText").innerHTML = "";
    document.getElementById("incrementDayNum").value = "";
    
    if(cal2Visible) {
        document.getElementById("mycalendar2").style.visibility = "visible";
        document.getElementById("selectText2").style.visibility = "visible";
    }
    else {
        document.getElementById("mycalendar2").style.visibility = "hidden";
        document.getElementById("selectText2").style.visibility = "hidden";
        document.getElementById("selecteddate2").style.visibility = "hidden";
    }
    if(inputBoxVisible) {
        document.getElementById("daysInput").style.visibility = "visible";
    }
    else {
        document.getElementById("daysInput").style.visibility = "hidden";
    }
}

//changes the vibility of controls based on selected radio button
function calcOptions(selectedIndex) {
    
    switch(selectedIndex) {
        case 0:
        {
            displayOptions(false,false);
            break;
        }
        case 1:
        {
            displayOptions(true,false);
            break;
        }
        case 2:
        case 3:
        {
            displayOptions(false,true);
            break;
        }  
    }
}

//operation type is determined by radio button (2 = add, 3 = subtract)
function incrementDays(operationType) {
    //check for user input in calendar and text box
    let inputDate = document.getElementById("selecteddate1").innerText;
    let calcDate = new Date("\"" + inputDate + "\"");
    let incDayNum = document.getElementById("incrementDayNum").value;
    
    if(inputDate !== "" && incDayNum !== "" && !isNaN(incDayNum)) {
        let incrementAmt;
        let startDate = new Date(calcDate);
        let operationText;
        let toFromText;
        let resultDate = new Date(calcDate);
        let resultText;
        
        //if adding (type 2), increment is parsed as a positive. 
        //else subtracting (type 3), increment is parsed as a negative.
        if(operationType === 2) {
            //convert the input days text to Float
            incrementAmt = parseFloat(incDayNum);
            operationText = "Adding";
            
            //grammar change for 1 vs multiple days
            if(incrementAmt !== 1 ) {
                toFromText = " days to ";
                
            }
            else {
                toFromText = " day to ";
            }
        }
        else {
            incrementAmt = -1 * parseFloat(incDayNum);
            operationText = "Subtracting";
            
            //grammar change for 1 vs multiple days
            if(incrementAmt !== 1) {
                toFromText = " days from ";
            }
            else {
                toFromText = " day from ";
            }
        }
        resultDate.setDate(startDate.getDate() + incrementAmt);
        resultText = operationText + " " + incDayNum + toFromText +
                startDate.toDateString() + " equals " + resultDate.toDateString();
        document.getElementById("resultText").innerHTML = resultText;
    }
    else {
        document.getElementById("warningText").innerHTML = "Please select a date and " +
                            "enter the number of days to add or substract";
    }
}
//calculates the num of days until a future date
function daysUntil () {
    let today = new Date();
    let inputDate = document.getElementById("selecteddate1").innerText;
    let futureDate = new Date("\"" + inputDate + "\"");
    let numDaysUntil;
    if (futureDate > today) {
        numDaysUntil = Math.ceil((futureDate.getTime() - today.getTime())/(1000 * 60 * 60 * 24));
        let resultText;
        
        if (numDaysUntil === 1) {
            resultText = "There is " +
                    numDaysUntil + 
                    " day from today, " +
                    today.toDateString() +
                    ", until " +
                    futureDate.toDateString();
        }
        else {
            resultText = "There are " +
                    numDaysUntil + 
                    " days from today, " +
                    today.toDateString() +
                    ", until " +
                    futureDate.toDateString();
        }
        document.getElementById("resultText").innerHTML = resultText; 
 
    }
    else {
        document.getElementById("warningText").innerHTML = "Please select a date in the future";
    }
}
//calculates the num of days between two dates
function daysBetween () {
    let inputDate1 = document.getElementById("selecteddate1").innerText;
    let inputDate2 = document.getElementById("selecteddate2").innerText;
    let date1 = new Date("\"" + inputDate1 + "\"");
    let date2 = new Date("\"" + inputDate2 + "\"");
    let dateDifference;
    let resultText;
    
    //checking to make sure user selected two dates
    if(inputDate1 !== "" && inputDate2 !== "") {
        
        //use absolute value to make sure difference is always positive
        dateDifference = Math.abs(date1.getTime() - date2.getTime());
        
        //convert from milliseconds to days
        dateDifference = Math.floor(dateDifference/(1000 * 60 * 60 * 24));
        
        //grammar check for 1 vs multiple days
        if(dateDifference ===1) {
            resultText = "There is " +
                    dateDifference +
                    " day between " +
                    date1.toDateString() +
                    " and " +
                    date2.toDateString();
        }
        else {
            resultText = "There are " +
                    dateDifference +
                    " days between " +
                    date1.toDateString() +
                    " and " +
                    date2.toDateString();
        }
        document.getElementById("resultText").innerHTML = resultText;
    }
    else {
        document.getElementById("warningText").innerHTML = "Please select a date on both calendars";
    } 
}

//calls the corresponding date calc method based on selected radio button
function calcResult(selectedCalculator) {
    document.getElementById("warningText").innerHTML = "";
    let calc = parseInt(selectedCalculator);
    
    switch(calc){
        case 0:
        {
            daysUntil();
            break;
        }
        case 1: 
        {
            daysBetween();
            break;
        }
        case 2:
        {
            incrementDays(2);
            break;
        }
        case 3:
        {
            incrementDays(3);
            break; 
        }
    }
}

//gets the radio button index and uses it to call calcResult()
function calculate(){
    var calcIndex = getRadioVal( document.getElementById('calcRadioButtons'), 'calculator' );
    calcResult(calcIndex);
    
}