var points=0;

//PÓKI CO CO SEKUNDĘ
function start() {
    setInterval(function(){ points=points+1; }, 1000);
}

function onClick() {
    points=points+1;
    var divData=document.getElementById("showCount");
    divData.innerHTML="Number of Clicks: "+ points +"";   
}
