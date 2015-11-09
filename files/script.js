var realPoints;
var incrementer;
var items = {};
var amountOfItems;
var upClass = 'toggle-up';
var downClass = 'toggle-down';

function initVars() {
    realPoints=0.0;
    incrementer=0.0;
    amountOfItems=0;
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

function initExp() {
    var exps = document.getElementsByClassName("exp");
    var i;
    for (i = 0; i < exps.length; i++) {
        var x = items[i+1].speedUp/10;
        exps[i].innerHTML = "each written line gives you " + x.toFixed(1) + " exp each second";
    }
}

function updateShowItemExp(i) {
    var temp = (items[i].speedUp/10) * items[i].quantity;
    $("#exp"+i).html(""+items[i].quantity+" lines gives you "+temp.toFixed(1)+" exp");
}

function updateShowAllItemsExp() {
    for(i = 1; i < 9; i++) {
        var temp = (items[i].speedUp/10) * items[i].quantity;
        $("#exp"+i).html(""+items[i].quantity+" lines gives you "+temp.toFixed(1)+" exp");
    }
}

function updateShowAmountOfItems() {
    $("#showAmountOfItems").html("You wrote " + amountOfItems +" lines of code");
}

function updateShowPoints() {
    $("#showPoints").html("You have " + parseInt(realPoints) +" exp");
}

function updateShowAverage() {
    $("#showAverage").html("every second you get " + incrementer.toFixed(1) +" exp");
}

function updateShowItemQuantity(i) {
    $("#showItem"+i).html("Lines of code " + items[i].quantity);
}

function updateShowAllItemsQuantity() {
    for(i = 1; i < 9; i++) {
        $("#showItem"+i).html("Lines of code " + items[i].quantity);
    }
}

function updateShowItemCost(i) {
    $("#costOfItem"+i).html("Cost "+items[i].cost+" exp");
}

function updateShowAllItemsCost() {
    for(i = 1; i < 9; i++) {
        $("#costOfItem"+i).html("Cost "+items[i].cost+" exp");
    }
}

function runPointsCounter() {
    setInterval(
        function() {
            realPoints = realPoints + incrementer;
            updateShowPoints();
            lockItems();
        }, 
    1000);
}

function toggle() {
    var clicker = document.querySelector('.clicker');
    if(~clicker.className.indexOf(downClass)) {
        clicker.className = clicker.className.replace(downClass, upClass);
    } 
    else {
        clicker.className = clicker.className.replace(upClass, downClass);
    }
}

function onClick() {
    realPoints=realPoints+1.0;
    toggle();
    updateShowPoints();
    lockItems();
}

function buyItem(i) {
    item = items[i];
    if (item.cost <= parseInt(realPoints)) {
        realPoints=realPoints-item.cost;
        incrementer=incrementer+(item.speedUp*0.1);
        item.quantity=item.quantity+1;
        amountOfItems=amountOfItems+1;
        item.cost=Math.round(1.12*item.cost);
        updateShowItemExp(i)
        updateShowAmountOfItems();
        updateShowAverage();
        updateShowItemQuantity(i);
        updateShowItemCost(i);
        updateShowPoints();
        lockItems();
    }
}

function lockItems() {
    var lockedItems = document.getElementsByClassName("buy");
    for(i = 0; i < lockedItems.length; i++) {
        if(items[i+1].cost <= parseInt(realPoints)) {
            lockedItems[i].disabled = false;
        }
        else {
            lockedItems[i].disabled = true;
        }
    }
}

function saveGame() {
    localStorage.setItem("realPoints", realPoints);
    localStorage.setItem("incrementer", incrementer);
    localStorage.setItem("amountOfItems", amountOfItems);
    for(i = 1; i < 9; i++) {
        localStorage.setItem(i, JSON.stringify(items[i]));
    }
}


//automatyczne zapisanie stanu co 30 sek
function automaticSave() {
    setInterval(
        function() {
            saveGame();
        }, 
    30000);
}

function loadGame() {
    temp = localStorage.getItem("realPoints");
    if (temp != null) {
        realPoints = parseFloat(temp);
    }
    temp = localStorage.getItem("incrementer");
    if (temp != null) {
        incrementer = parseFloat(temp);
    }
    temp = localStorage.getItem("amountOfItems");
    if (temp != null) {
        amountOfItems = parseInt(temp);
    }
    for(i = 1; i < 9; i++) {
        temp = localStorage.getItem(i);
        if (temp != null) {
           items[i] = JSON.parse(temp); 
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
    updateShowAmountOfItems();
    updateShowAllItemsExp();
    lockItems();
}

function onStart() {
    initVars();
    initExp();
    loadGame();
    updateShowAllItemsExp();
    updateShowAmountOfItems();
    updateShowAllItemsQuantity();
    updateShowAllItemsCost();
    updateShowPoints();
    updateShowAverage();
    lockItems();
    runPointsCounter();
    automaticSave();
    
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
