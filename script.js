var qualifiers = ["AAA","AMI","BMI>25","CAD","CVA","depression","DM","HTN","ICMP","PVD","gender","smoking"];
var qualifierResults = "0".repeat(qualifiers.length).split("").map(item => false);

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
    }
    item.appendChild(box);
    var span = document.createElement("span");
    span.innerText = " " + qualifiers[i];
    item.appendChild(span);
    boxes.appendChild(item);
  }
}

window.onload = buildCheckboxes;
