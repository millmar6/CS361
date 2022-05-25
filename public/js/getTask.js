console.log("Hello, your script is running...");

document.getElementById("userForm").addEventListener("click", function(event) {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:7400/microservice", true);
  req.addEventListener("load", function() {
    if(req.status >= 200 && req.status < 400) {
      console.log(req.responseText);
      console.log(JSON.parse(req.responseText));
      resObj = JSON.parse(req.responseText);
      document.getElementById("randomTask").textContent = resObj.yourTask;
    }
  });
  req.send(null);
  event.preventDefault();
});
