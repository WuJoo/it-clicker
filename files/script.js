$(document).ready(function() {

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
        $(item).html(value);
    }
    
    function updateShowItemCost(item, value) {
        $(item).html(value);
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
        refToItem = items["item"+item];
        if (refToItem.cost <= parseInt(realPoints)) {
            realPoints=realPoints-refToItem.cost;
            incrementer=incrementer+(refToItem.speedUp*0.1);
            refToItem.quantity=refToItem.quantity+1;
            refToItem.cost=Math.round(1.15*refToItem.cost)
            updateShowItemQuantity("#showItem"+item, ""+refToItem.quantity+"");
            updateShowItemCost("#costOfItem"+item, "Koszt "+ refToItem.cost);
            updateShowPoints();
        }
    }

    updateShowPoints();
    updateShowAverage();
    start();
    
    $('.clicker').click(function() {
        onClick();
    });
    
    $('.buy').click(function() {
        var item = $(this).attr('data-item');
        buyItem(item);
    });

});
