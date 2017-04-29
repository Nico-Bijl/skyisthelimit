var flightContainer = document.getElementById("flight-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var ourRequest = new XMLHttpRequest();
  //ourRequest.open('GET', 'https://raw.githubusercontent.com/Nico-Bijl/flightinfo/master/flightinfo.json');
  ourRequest.open('GET', 'http://flightxml.flightaware.com/json/FlightXML2/Enroute?airport=PHNL', true, 'nicobijl', '0ea32a93f4389c4c347ad4fb59fb1889b9657fd1');
  ourRequest.withCredentials = true;
  // http://nicobijl:0ea32a93f4389c4c347ad4fb59fb1889b9657fd1@flightxml.flightaware.com/json/FlightXML2/Enroute?airport=EHAM
  // var user = "nicobijl"
  // var pass = "0ea32a93f4389c4c347ad4fb59fb1889b9657fd1"
  // ourRequest.open('GET', 'http://flightxml.flightaware.com/json/FlightXML2/Enroute?airport=EHAM');
  // ourRequest.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
  ourRequest.onload = function() {
    //console.log(ourRequest.responseText);
    var ourData = JSON.parse(ourRequest.responseText);
    //console.log(ourData.EnrouteResult.enroute[0].ident);
    renderHTML(ourData);
  };
  ourRequest.send();
});

function renderHTML(data) {
  //console.log(data.EnrouteResult.enroute[0].ident);
  var htmlString = "";
  htmlString += "<table table-resposive table-hover table-condensed>";
  htmlString += "<tr>";
  htmlString += "<th>FLIGHT NUMBER</th>";
  //htmlString += "<th>TYPE OF AIRPLANE</th>";
  htmlString += "<th>DEPARTURE (FILED)</th>";
  //htmlString += "<th>DEPARTURE (ACTUAL)</th>";
  htmlString += "<th>ARRIVAL (EXPECTED)</th>";
  htmlString += "<th>ORIGIN</th>";
  //htmlString += "<th>NAME</th>";
  //htmlString += "<th>CITY</th>";
  htmlString += "<th>DESTINATION</th>";
  //htmlString += "<th>NAME</th>";
  //htmlString += "<th>CITY</th>";
  htmlString += "</tr>";


  for (i = 0; i < data.EnrouteResult.enroute.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + data.EnrouteResult.enroute[i].ident + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].aircrafttype + "</td>";
    htmlString += "<td>" + data.EnrouteResult.enroute[i].filed_departuretime + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].actualdeparturetime + "</td>";
    htmlString += "<td>" + data.EnrouteResult.enroute[i].estimatedarrivaltime + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].origin + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].originName + "</td>";
    htmlString += "<td>" + data.EnrouteResult.enroute[i].originCity + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].destination + "</td>";
    //htmlString += "<td>" + data.EnrouteResult.enroute[i].destinationName + "</td>";
    htmlString += "<td>" + data.EnrouteResult.enroute[i].destinationCity + "</td>";
    htmlString += "</tr>";
  }

  htmlString += "</table>";

  flightContainer.insertAdjacentHTML('beforeend', htmlString);
}
