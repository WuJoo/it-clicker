var realPoints=0.0;
var incrementer=0.0;

//speedUp = x => x*0.1 points per second
var item1 = {cost: 15, quantity: 0, speedUp: 1};
var item2 = {cost: 100, quantity: 0, speedUp: 5};
var item3 = {cost: 500, quantity: 0, speedUp: 40};
var item4 = {cost: 3000, quantity: 0, speedUp: 100};
var item5 = {cost: 10000, quantity: 0, speedUp: 400};
var item6 = {cost: 40000, quantity: 0, speedUp: 1000};
var item7 = {cost: 200000, quantity: 0, speedUp: 4000};
var item8 = {cost: 1667000, quantity: 0, speedUp: 66660};
var items = {"item1": item1, "item2": item2, "item3": item3, "item4": item4,
            "item5": item5, "item6": item6, "item7": item7, "item8": item8};

function updateShowPoints() {
    $("#showPoints").html("Masz " + parseInt(realPoints) +"$");
}

function updateShowAverage() {
    $("#showAverage").html("Średnio co sekundę dostajesz: " + incrementer.toFixed(1) +"$");
}

function updateShowItemQuantity(item, value) {
    $("#showItem"+item).html(value);
}

function updateShowItemCost(item, value) {
    $("#costOfItem"+item).html("Koszt "+value);
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

function buyItem(item) {
    refToItem = items["item"+item];
    if (refToItem.cost <= parseInt(realPoints)) {
        realPoints=realPoints-refToItem.cost;
        incrementer=incrementer+(refToItem.speedUp*0.1);
        refToItem.quantity=refToItem.quantity+1;
        refToItem.cost=Math.round(1.15*refToItem.cost)
        updateShowItemQuantity(item, refToItem.quantity);
        updateShowItemCost(item, refToItem.cost);
        updateShowPoints();
    }
}

function saveGame() {
    localStorage.setItem("realPoints", realPoints);
    localStorage.setItem("incrementer", incrementer);
    localStorage.setItem("item1", JSON.stringify(item1));
    localStorage.setItem("item2", JSON.stringify(item2));
    localStorage.setItem("item3", JSON.stringify(item3));
    localStorage.setItem("item4", JSON.stringify(item4));
    localStorage.setItem("item5", JSON.stringify(item5));
    localStorage.setItem("item6", JSON.stringify(item6));
    localStorage.setItem("item7", JSON.stringify(item7));
    localStorage.setItem("item8", JSON.stringify(item8));
}

function loadGame() {
    if (localStorage.length > 0) {
        realPoints = parseFloat(localStorage.getItem("realPoints"));
        incrementer = parseFloat(localStorage.getItem("incrementer"));
        item1 = localStorage.getItem("item1");
        item1 = JSON.parse(item1);
        item2 = localStorage.getItem("item2");
        item2 = JSON.parse(item2);
        item3 = localStorage.getItem("item3");
        item3 = JSON.parse(item3);
        item4 = localStorage.getItem("item4");
        item4 = JSON.parse(item4);
        item5 = localStorage.getItem("item5");
        item5 = JSON.parse(item5);
        item6 = localStorage.getItem("item6");
        item6 = JSON.parse(item6);
        item7 = localStorage.getItem("item7");
        item7 = JSON.parse(item7);
        item8 = localStorage.getItem("item8");
        item8 = JSON.parse(item8);
        items = {"item1": item1, "item2": item2, "item3": item3, "item4": item4,
            "item5": item5, "item6": item6, "item7": item7, "item8": item8};
        for(i = 1; i < 9; i++) {
            updateShowItemQuantity(i, items["item"+i].quantity);
            updateShowItemCost(i, items["item"+i].cost);
        }
    }
}

function resetGame() {
    localStorage.clear();
    realPoints=0.0;
    incrementer=0.0;
    item1 = {cost: 15, quantity: 0, speedUp: 1};
    item2 = {cost: 100, quantity: 0, speedUp: 5};
    item3 = {cost: 500, quantity: 0, speedUp: 40};
    item4 = {cost: 3000, quantity: 0, speedUp: 100};
    item5 = {cost: 10000, quantity: 0, speedUp: 400};
    item6 = {cost: 40000, quantity: 0, speedUp: 1000};
    item7 = {cost: 200000, quantity: 0, speedUp: 4000};
    item8 = {cost: 1667000, quantity: 0, speedUp: 66660};
    items = {"item1": item1, "item2": item2, "item3": item3, "item4": item4,
            "item5": item5, "item6": item6, "item7": item7, "item8": item8};
    updateShowPoints();
    updateShowAverage();
    for(i = 1; i < 9; i++) {
        updateShowItemQuantity(i, items["item"+i].quantity);
        updateShowItemCost(i, items["item"+i].cost);
    }
}

function onStart() {
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
