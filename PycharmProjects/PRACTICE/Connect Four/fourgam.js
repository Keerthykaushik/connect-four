var player1 = prompt("Player 1 enter your name, you will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player 2 enter your name, you will be red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function colorMatchCheck(color1,color2,color3,color4){
    return (color1===color2 && color1===color3 && color1===color4 && color1!=='rgb(128, 128, 128)' && color1!==undefined);
}

function checkBottom(colIndex){
    colorReport = returnColor(5,colIndex);
    for (var row = 5; row>=0; row--){
        colorReport = returnColor(row,colIndex);
        if (colorReport==='rgb(128, 128, 128)'){
            return row;
        }
    }
}

function horizontalWinCheck(){
    for (var row=0;row<6;row++){
        for(var col=0;col<4;col++){
            if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                console.log('horizontal');
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for (var col=0;col<7;col++){
        for(var row=0;row<3;row++){
            if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for(var col=0; col<5; col++){
        for(var row=0; row<7; row++){
            if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }
            else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
$('h3').text(currentName+" it is your turn");

$('.board button').on('click', function(){
        var col = $(this).closest('td').index();
        var bottomAvail = checkBottom(col);
        changeColor(bottomAvail,col,currentColor);
        if( horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
            gameEnd(currentName);
        }
        currentPlayer = currentPlayer*-1;

        if(currentPlayer===1){
            currentName = player1;
            currentColor = player1Color;
            $('h3').text(currentName+" it is your turn");
        }
        else{
            currentName = player2;
            currentColor = player2Color;
            $('h3').text(currentName+" it is your turn");
        }
})
