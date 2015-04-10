function initNoJSON(x) {
	console.log(x);
	if (x == 'home') {
		document.getElementById("home").style.display = "block";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
	else if (x == 'lists') {
		retrieveActiveListsJSON('lists');
		document.getElementById("home").style.display = "none";
		document.getElementById("lists").style.display = "block";
		document.getElementById("gList").style.display = "none";		
	}
	else if (x == 'gList') {
		document.getElementById("home").style.display = "none";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "block";
	}
	else {
		document.getElementById("home").style.display = "block";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
}
function init(x) {
	console.log(x);
	if (x == 'home') {
		document.getElementById("home").style.display = "block";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
	else if (x == 'lists') {
		populateListsView('lists');
		//retrieveActiveListsFromServer('listsJSON.html');
		document.getElementById("home").style.display = "none";
		document.getElementById("lists").style.display = "block";
		document.getElementById("gList").style.display = "none";		
	}
	else if (x == 'gList') {
		document.getElementById("home").style.display = "none";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "block";
	}
	else {
		document.getElementById("home").style.display = "block";
		document.getElementById("lists").style.display = "none";
		document.getElementById("gList").style.display = "none";
	}
}
function retrieveActiveListsJSON(url) {
	var lists = [
	 {
	  "name": "Grocery List",
	  "description": "Grocery List for home.",
	  "id": "1",
	  "due": "04-07-2015",
	  "state": "A",
	  "ownwer": "israelh",
	  "items": "5"
	 },
	 {
	  "name": "Car Shopping List",
	  "description": "Cars I need to try before buying a car.",
	  "id": "2",
	  "due": "05-17-2015",
	  "state": "A",
	  "ownwer": "israelh",
	  "items": "4"
	 },
	 {
	  "name": "School Supply List",
	  "description": "Supply list for school classes.",
	  "id": "3",
	  "due": "08-07-2015",
	  "state": "A",
	  "ownwer": "israelh",
	  "items": "7"
	 },
	];
	
	return lists;
}
var lists;
function retrieveActiveListsFromServer(url) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			lists = JSON.parse(xmlhttp.responseText);
			populateListsview('lists');
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function populateListsView(elementId) {
	var lists = retrieveActiveListsJSON('lists');
	element = document.getElementById(elementId);
	var newElement = "<h3 class=\"panel-heading\">Active Lists</h3>";

	for (var i = 0; i < lists.length; i++) {
		newElement += "<div class=\"panel panel-default\">";
		newElement += "<h4 class=\"panel-heading\"><a href=\"javascript:init('gList')\">" + (i+1) + ". " + lists[i].name + "</a></h4>";
		newElement += "<div class=\"panel-body\">";
		newElement += "<p>" + lists[i].description  + "</p>";
		newElement += "</div>";
		newElement += "<table class=\"table\" style=\"font-size:10pt;\">";
		newElement += "<tbody>";
		newElement += "<tr>";
		newElement += "<td>Due: <span>" + lists[i].due + "</span></td>";
		newElement += "<td align=\"right\">Items: <span class=\"badge\">" + lists[i].items + "</span></td>";
		newElement += "</tr>";
		newElement += "</tbody>";
		newElement += "</table>";
		newElement += "</div>";
	}

	element.innerHTML = newElement;
}
