console.log("Hello, your script is running...");

let userForm = document.getElementById("userForm");

userForm.addEventListener("submit", function(e) {
	e.preventDefault();

	let totalNumsField = document.getElementById("totalNums");
	let totalPoolField = document.getElementById("totalPool");

	let totalNumsValue = totalNumsField.value;
	let totalPoolValue = totalPoolField.value;

	console.log(totalNumsValue);
	console.log(totalPoolValue);

	if (parseInt(totalNumsValue) > parseInt(totalPoolValue)){
		alert("Not enough unique numbers to draw from pool... Increase pool size or decrease numbers needed");
		return false;
	}

	let data = {
		totalNums: totalNumsValue,
		totalPool: totalPoolValue
	}

	document.getElementById("userNums").textContent = "Sends the following JSON file to teammate's service: " + JSON.stringify(data);
	document.getElementById("odds").textContent = "Your odds of winning the jackpot are 1 in " + lottoOdds(totalPoolValue, totalNumsValue) + " good luck!";


	// Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "teammateService", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Do something with the response
            doSomething(xhttp.response);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the service.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

doSomething = (data) => {
	//get reference to html object, display data/numbers
	let parsedData = JSON.parse(data);
}

function facto(num){
	if (num === 0){
		return 1;
	} else{
		return num * facto(num - 1);
	}
}

function lottoOdds(n, k){
	// add check for none inputs
	let odds = facto(n) / (facto(k) * facto(n - k));
	return odds.toLocaleString('en-US');
}
