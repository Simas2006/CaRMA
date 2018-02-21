var qualifiers = ["AAA","AMI","BMI>25","CAD","CVA","depression","DM","female","HTN","ICMP","PVD","smoking","smoking15"];
var qualifierResults = "0".repeat(qualifiers.length).split("").map(item => false);
var data;

function buildCheckboxes() {
  var boxes = document.getElementById("boxes");
  for ( var i = 0; i < qualifiers.length; i++ ) {
    var item = document.createElement("p");
    var box = document.createElement("input");
    box.type = "checkbox";
    box.id = "b:" + i;
    box.onchange = function() {
      var index = parseInt(this.id.split(":")[1]);
      qualifierResults[index] = ! qualifierResults[index];
      calculateItems();
    }
    item.appendChild(box);
    var span = document.createElement("span");
    span.innerText = " " + qualifiers[i] + " ";
    item.appendChild(span);
    boxes.appendChild(item);
  }
}

function calculateItems() {
  var table = document.getElementById("results");
  while ( table.firstChild ) {
    table.removeChild(table.firstChild);
  }
  var results = data.filter(item => {
    return item[2].map(jtem => {
      var val = qualifierResults[qualifiers.indexOf(jtem.startsWith("-") ? jtem.slice(1) : jtem)];
      if ( ! jtem.startsWith("-") ) return val;
      else return ! val;
    }).indexOf(false) <= -1;
  });
  for ( var i = 0; i < results.length; i++ ) {
    var row = document.createElement("tr");
    var col = document.createElement("td");
    col.innerText = results[i][0];
    row.appendChild(col);
    var col = document.createElement("td");
    col.innerText = results[i][3];
    row.appendChild(col);
    var col = document.createElement("td");
    var box = document.createElement("input");
    box.type = "checkbox";
    col.appendChild(box);
    row.appendChild(col);
    table.appendChild(row);
  }
}

window.onload = function() {
  var req = new XMLHttpRequest();
  req.open("GET","data.json");
  req.onload = function() {
    data = JSON.parse(this.responseText);
    buildCheckboxes();
    calculateItems();
  };
  req.send();
};
