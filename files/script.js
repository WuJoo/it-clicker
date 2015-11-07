var realPoints;
var incrementer;
var items = {};

function initVars() {
    realPoints=0.0;
    incrementer=0.0;
    //speedUp = x => x*0.1 points per second
    items[1] = {cost: 15, quantity: 0, speedUp: 1};
    items[2] = {cost: 100, quantity: 0, speedUp: 5};
    items[3] = {cost: 500, quantity: 0, speedUp: 40};
    items[4] = {cost: 3000, quantity: 0, speedUp: 100};
    items[5] = {cost: 10000, quantity: 0, speedUp: 400};
    items[6] = {cost: 40000, quantity: 0, speedUp: 1000};
    items[7] = {cost: 200000, quantity: 0, speedUp: 4000};
    items[8] = {cost: 1667000, quantity: 0, speedUp: 66660};
}

function updateShowPoints() {
    $("#showPoints").html("Masz " + parseInt(realPoints) +"$");
}

function updateShowAverage() {
    $("#showAverage").html("Średnio co sekundę dostajesz: " + incrementer.toFixed(1) +"$");
}

function updateShowItemQuantity(i) {
    $("#showItem"+i).html(items[i].quantity);
}

function updateShowAllItemsQuantity() {
    for(i = 1; i < 9; i++) {
        $("#showItem"+i).html(items[i].quantity);
    }
}

function updateShowItemCost(i) {
    $("#costOfItem"+i).html("Koszt "+items[i].cost);
}

function updateShowAllItemsCost() {
    for(i = 1; i < 9; i++) {
        $("#costOfItem"+i).html("Koszt "+items[i].cost);
    }
}

function runPointsCounter() {
    setInterval(
        function() { 
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

function buyItem(i) {
    item = items[i];
    if (item.cost <= parseInt(realPoints)) {
        realPoints=realPoints-item.cost;
        incrementer=incrementer+(item.speedUp*0.1);
        item.quantity=item.quantity+1;
        item.cost=Math.round(1.15*item.cost)
        updateShowItemQuantity(i);
        updateShowItemCost(i);
        updateShowPoints();
    }
}

function saveGame() {
    localStorage.setItem("realPoints", realPoints);
    localStorage.setItem("incrementer", incrementer);
    for(i = 1; i < 9; i++) {
        localStorage.setItem(i, JSON.stringify(items[i]));
    }
}

function loadGame() {
    if (localStorage.length > 0) {
        realPoints = parseFloat(localStorage.getItem("realPoints"));
        incrementer = parseFloat(localStorage.getItem("incrementer"));
        for(i = 1; i < 9; i++) {
            items[i] = JSON.parse(localStorage.getItem(i));
            updateShowItemQuantity(i, items[i].quantity);
            updateShowItemCost(i, items[i].cost);
        }
    }
}

function resetGame() {
    localStorage.clear();
    initVars();
    updateShowPoints();
    updateShowAverage();
    updateShowAllItemsQuantity();
    updateShowAllItemsCost();
}

function onStart() {
    initVars();
    loadGame();
    updateShowPoints();
    updateShowAverage();
    runPointsCounter();
    
    $('.clicker').click(function() {
        onClick();
    });
    
    $('.buy').click(function() {
        var item = $(this).attr('data-item');
        buyItem(item);
    });
    
    $('.save').click(function() {
        saveGame();
    });
    
    $('.reset').click(function() {
        resetGame();
    });
}


$(document).ready(function() {
    onStart();
});
