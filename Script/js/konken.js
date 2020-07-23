var modalLoad = document.getElementById("id01");
var page = document.getElementById("page");

//$(document).ready(function () {
//    if ($(window).width() < 500) {
//        document.getElementById("id01").style.width = "100%";
//        document.getElementById("id01").style.width = "100%";
//    }
//    else {
//        document.getElementById("id01").style.width = "100%";
//        document.getElementById("id01").style.height = "100%";
//    }
//});

function playerTable() {

    var count = $("#uName").val();

        $("#table").empty();
        for (i = 1; i <= count; i++) {
            $('#myTable').append('<tr>' +
                '<td>Player ' + i + '</td>' +
                '<td><input id="pName'+i+'" type="text" placeholder="Enter Player Name" value=""></td>' +
                '</tr >');
        }
}

function createGame() {
    var count = $("#uName").val();
    var players = [];

    for (j = 1; j <= count; j++) {
        var string = "#pName" + j;
        var x = $(string).val();
        players.push(x);
    }

    createTable(count, players);
       

    modalLoad.style.display = "none";
    page.style.visibility = "visible";
}

function createTable(columns, players) {
    var table = document.getElementById("gameTable");
    table.border = "1"; 

    //Get header done
    var row = table.insertRow(-1);
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "Round";
    row.appendChild(headerCell);

    for (var i = 1; i <= columns; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = players[i-1];
        row.appendChild(headerCell);
    }

    //add all the game rounds - lengthy but no choice with unique row names
    //However, we can use populate
    populate(table, "3 K", columns);
    populate(table, "3 S", columns);
    populate(table, "3 KK", columns);
    populate(table, "3 SS", columns);
    populate(table, "3 KS", columns);
    populate(table, "4 K", columns);
    populate(table, "4 S", columns);
    populate(table, "4 KK", columns);
    populate(table, "4 SS", columns);
    populate(table, "4 KS", columns);
    populate(table, "5 S", columns);
    populate(table, "KONKEN", columns);
    //populate(table, "Total", columns);

    row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = "Total";
    for (i = 1; i <= columns; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = '<input id="total' + i + '" type="number" value="0"></input>';
    }

    var dvTable = document.getElementById("page");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function populate(table, roundName, columns) {
    row = table.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = roundName;
    for (i = 1; i <= columns; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = '<input class="score' + i + '" inputmode="numeric" pattern="[0-9]*" type="number" onchange="updateScore(' + i +');"></input>';
    }
}

function updateScore(player) {
    var update = "total" + player;
    var output = 0;

    var scores = "score" + player;
    var allScores = document.getElementsByClassName(scores);

    console.log(allScores);

    Array.from(allScores).forEach(function (element) {
        console.log(element);
        output = output + Number(element.value);
    });

    document.getElementById(update).value = 0;
    document.getElementById(update).value = output;
}