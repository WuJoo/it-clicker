var realPoints=0.0;
var incrementer=0.0;
var item1 = {cost: 10, quantity: 0, speedUp: 1};
var item2 = {cost: 100, quantity: 0, speedUp: 10};
var item3 = {cost: 500, quantity: 0, speedUp: 20};
var item4 = {cost: 1000, quantity: 0, speedUp: 30};
var item5 = {cost: 5000, quantity: 0, speedUp: 40};
var item6 = {cost: 15000, quantity: 0, speedUp: 50};
var item7 = {cost: 50000, quantity: 0, speedUp: 60};
var item8 = {cost: 100000, quantity: 0, speedUp: 70};

function updateShowPoints() {
    var divData=document.getElementById("showPoints");
    divData.innerHTML="Masz " + parseInt(realPoints) +"$";
}

function updateShowAverage() {
    var divData=document.getElementById("showAverage");
    divData.innerHTML="Średnio co sekundę dostajesz: " + incrementer.toFixed(1) +"$";
}

function start() {
    setInterval(
        function(){ 
            realPoints = realPoints + incrementer; 
            updateShowAverage();
            updateShowPoints();
        }, 
        1000);
}

function onClick() {
    realPoints=realPoints+1.0;
    updateShowPoints();
}

function buyItem(item) {

    switch (item) {
        case 1:
            refToItem = item1;
            var divQuantity=document.getElementById("showItem1");
            var divCost=document.getElementById("costOfItem1");
            break;
        case 2:
            refToItem = item2;
            var divQuantity=document.getElementById("showItem2");
            var divCost=document.getElementById("costOfItem2");
            break;
        case 3:
            refToItem = item3;
            var divQuantity=document.getElementById("showItem3");
            var divCost=document.getElementById("costOfItem3");
            break;
        case 4:
            refToItem = item4;
            var divQuantity=document.getElementById("showItem4");
            var divCost=document.getElementById("costOfItem4");
            break;
        case 5:
            refToItem = item5;
            var divQuantity=document.getElementById("showItem5");
            var divCost=document.getElementById("costOfItem5");
            break;
        case 6:
            refToItem = item6;
            var divQuantity=document.getElementById("showItem6");
            var divCost=document.getElementById("costOfItem6");
            break;
        case 7:
            refToItem = item7;
            var divQuantity=document.getElementById("showItem7");
            var divCost=document.getElementById("costOfItem7");
            break;
        case 8:
            refToItem = item8;
            var divQuantity=document.getElementById("showItem8");
            var divCost=document.getElementById("costOfItem8");
            break;
    }
    
    if (refToItem.cost <= parseInt(realPoints)) {
        realPoints=realPoints-refToItem.cost;
        incrementer=incrementer+(refToItem.speedUp*0.1);
        refToItem.quantity=refToItem.quantity+1;
        refToItem.cost=Math.round(1.2*refToItem.cost)
        divQuantity.innerHTML=""+refToItem.quantity+"";
        divCost.innerHTML="Koszt "+ refToItem.cost +"";
        var divPoints=document.getElementById("showCount");
        divPoints.innerHTML="Masz " + parseInt(realPoints) +"$";
    }
}

$(document).ready(function() {

    updateShowPoints();
    updateShowAverage();
    start();
    
    $('.clicker').click(function() {
        onClick();
    });
    
    $('.buy').click(function() {
        var item = parseInt($(this).attr('data-item'));
        buyItem(item);
    });

});
