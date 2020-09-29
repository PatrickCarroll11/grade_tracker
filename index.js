
var table = document.getElementById("myTable");
var count = 10;
var colCount = 5;
var unsubmitted = 0;


//checkSubmitted();
controlChange();
getAverage();

/*This loop checks how many assignments must be submitted*/
  
for (var i = 1; i <table.rows.length; i++){
  for (var j = 2; j<table.rows[i].cells.length-1; j++){
    if($("#assign").html() == "-"){
      unsubmitted++;
      console.log(unsubmitted + " count");
      document.getElementById("counter").innerHTML = "Assignments due: " + unsubmitted;

    }
  }
 }
//This loop makes sure the final grades are alligned to the right
for (var i = 1; i<table.rows.length; i++){
  document.getElementById("val"+i).style.textAlign = "right";
}
/* This function calculates the average sore once all 5 assignments are submitted and the user */
// USER MUST CLICK ON A CELL IN DIFFERENT ROW ONCE ALL 5 ASSIGNMENTS HAVE BEEN FILLED IN ORDER TO CALCULATE 
// AVERAGE OF THAT ROW.
// code based off video: https://www.youtube.com/watch?v=zeJ4lKgUqig
function getAverage(){
for (var i = 1; i <table.rows.length; i++){
  var sumVal= 0;
  for (var j = 2; j<table.rows[i].cells.length-1; j++){
    sumVal = sumVal + parseInt(table.rows[i].cells[j].innerHTML);
    document.getElementById("val" + i).innerHTML = parseInt(sumVal/colCount);
    checkGrade(i);
      if(isNaN(document.getElementById("val" + i).innerHTML)){
       document.getElementById("val" + i).innerHTML = 0;
      
    }
    else { document.getElementById("val" + i).innerHTML = parseInt(sumVal/colCount);
  
    }

   }
}
  
// this function sets the final grade css depending on if it greater or less than 60
function checkGrade(i){
  if (document.getElementById("val" + i).innerHTML < 60){
    document.getElementById("val" + i).setAttribute("class", "failing");
    console.log(document.getElementById("val" + i).innerHTML);
  }
  if  (document.getElementById("val" + i).innerHTML > 60){
    document.getElementById("val" + i).setAttribute("class", "passing");
    console.log(document.getElementById("val" + i).innerHTML);
  }
 }
}
/*This function allows the user to enter in the name of an assignment and it adds in a new colulmn which can 
be user edited to add results. The avergae is then recalucluted once all cells are filled in and the user click
ON A CELL IN ANOTHER ROW. This code is based off the function "addRow" below*/

function addAssignment(){
  colCount++;
var assignment = document.getElementById('assignment').value;
var col=[];
var row = [];
for (let j = 0; j<table.rows.length; j++){
row = document.getElementById("row" + j);
col[j] = row.insertCell(table.rows[j].cells.length-1);
col[j].innerHTML = '-';
}
//set new cells to unsubmitted
for (let j = 0; j<table.rows.length-1; j++){
  unsubmitted++;
}
document.getElementById("counter").innerHTML = "Assignments Due:" + unsubmitted;
 
// Sets the first cell to the user input header
col[0].innerHTML = assignment;
 col[0].classList.add("result");

for (let k = 1; k<table.rows.length; k++){
$(col[k]).addClass("changeable");
$(col[k]).attr('contenteditable','true');
}
controlChange();
}


/* This function addeds in an extra row for a new student. ive added two input boxes for student name and 
student number. when a new assignment cell is added it is given a dash and set to 'changeable' class with the
rest of assignment cells*/


function addRow(){
  console.log(unsubmitted);
  count++;
   var name = document.getElementById('name').value;
   var studentNum = document.getElementById('studentNum').value;
   var newRow = table.insertRow(table.rows.length);
   newRow.id = 'row'+count;
   var cel = [];
   for (let i = 0; i<table.rows[2].cells.length; i++){
     cel[i] = newRow.insertCell(i); 
     
   }
  // assign first two cells the name and student input boxes
     cel[0].innerHTML = name;
     cel[1].innerHTML = studentNum;

     cel[table.rows[1].cells.length-1].innerHTML = '-';
     console.log(cel[table.rows[1].cells.length]);
     cel[table.rows[1].cells.length-1].id = 'val'+count;
     document.getElementById("val"+count).style.textAlign = "right";
  for (let j = 2; j < table.rows[j].cells.length-1; j++){
    unsubmitted++;
    cel[j].id = "assign";
    cel[j].innerHTML = '-'
    $(cel[j]).addClass("changeable");
    $(cel[j]).attr('contenteditable','true');
    $(cel[j]).attr('text-align', 'center');
   
  }
   
 // checkSubmitted();
 controlChange();
}


/*This function keeps track of changes made to the table by user input*/
function controlChange(){
let num = /^[0-9]+(.)*[0-9]*$/;
$(document).ready(function(){
var contents = $('.changeable').html();
$('.changeable').blur(function() {
  //If user changes the editable cells , call getAverage
    if (contents!=$(this).html()){
      getAverage();
  //if the contents of the cell are not a number, then set these settings 
       if (contents !== num ){
          $(this).css("background-color", "white");
          $(this).css("text-align", "right");
          // assignment has been submitted
          unsubmitted--;
           document.getElementById("counter").innerHTML = "Assignments due: " + unsubmitted;
           console.log(unsubmitted);
       }
      // this just sets all empty cells to yellow
       $("td").each(function() {
       if ($(this).html() == "") $(this).css("background", "yellow");
       if ($(this).html() == "-") $(this).css("background", "yellow");
      });
    }
});
// this says that only numbers are allowed to be entered in the cells
$('.changeable').keypress(function(e) {
  if (!(e.which >= 48 && e.which <= 57)) {
    //return $(this).text("");
    return false;
  }
});
});


}

// This function removes all new rows which have been added
function resetTable() {

var x = table.rows.length
  while ( count>10){
    var element = document.getElementById("row"+ count);
    count--;
    element.parentNode.removeChild(element);
  }
  //resets count to zero and adds up cells again
  unsubmitted = 0;
  for (var i = 1; i <table.rows.length; i++){
    for (var j = 2; j<table.rows[i].cells.length-1; j++){
      if($("#assign").html() == "-"){
        unsubmitted++;
        document.getElementById("counter").innerHTML = "Assignments due: " + unsubmitted;
  
      }
    }
   }
 
}



// This loop is used to show the different marking systems for the grade. Whenever you click on each students
// final grade, a seperate table toggles underneath the table for each students final grade, you must click
//each individual grade to see the different scores. 
for (let j = 1; j <table.rows.length; j++){
  $("#val"+j).click(function(){
    console.log('val'+ table.rows.length);
    
    if (document.getElementById("val" +j).innerHTML<101 && document.getElementById("val"+j).innerHTML > 92){
    $("#TableA").toggle();
    }
    if (document.getElementById("val"+ j).innerHTML>= 90 && document.getElementById("val"+ j).innerHTML<=92){
      $("#TableA-").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 87 && document.getElementById("val"+ j).innerHTML<=89){
      $("#TableBplus").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 83 && document.getElementById("val"+ j).innerHTML<=86){
      $("#TableB").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 80 && document.getElementById("val"+ j).innerHTML<=82){
      $("#TableB-").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 77 && document.getElementById("val"+ j).innerHTML<=79){
      $("#TableCplus").toggle();
      console.log("yes");
    }
       if (document.getElementById("val"+ j).innerHTML>= 73 && document.getElementById("val"+ j).innerHTML<=76){
      $("#TableC").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 70 && document.getElementById("val"+ j).innerHTML<=72){
      $("#TableC-").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 67 && document.getElementById("val"+ j).innerHTML<=69){
      $("#TableDplus").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 63 && document.getElementById("val"+ j).innerHTML<=66){
      $("#TableD").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML>= 60 && document.getElementById("val"+ j).innerHTML<=62){
      $("#TableD-").toggle();
      console.log("yes");
    }
    if (document.getElementById("val"+ j).innerHTML< 60){
      $("#TableF").toggle();
      console.log("yes");
    }
  });
  }
    
    
    
    
    
  
