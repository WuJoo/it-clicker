function Game() {
    var self = this;
    
    this.realPoints = 0.0;
    this.incrementer = 0.0;
    this.items = {};
    this.amountOfItems = 0;
    
    this.initVars = function() {
        this.realPoints = 0.0;
        this.incrementer = 0.0;
        this.amountOfItems = 0;
        //speedUp = x => x*0.1 points per second
        this.items[1] = {cost: 15, quantity: 0, speedUp: 1};
        this.items[2] = {cost: 100, quantity: 0, speedUp: 5};
        this.items[3] = {cost: 500, quantity: 0, speedUp: 40};
        this.items[4] = {cost: 3000, quantity: 0, speedUp: 100};
        this.items[5] = {cost: 10000, quantity: 0, speedUp: 400};
        this.items[6] = {cost: 40000, quantity: 0, speedUp: 1000};
        this.items[7] = {cost: 200000, quantity: 0, speedUp: 4000};
        this.items[8] = {cost: 1667000, quantity: 0, speedUp: 66660};
    };

    this.initExp = function() {
        var exps = document.getElementsByClassName("exp");
        for (var i = 0; i < exps.length; i++) {
            var x = this.items[i+1].speedUp/10;
            exps[i].innerHTML = "each written line gives you " + x.toFixed(1) + " exp each second";
        }
    };

    this.updateShowItemExp = function(i) {
        var temp = (this.items[i].speedUp/10) * this.items[i].quantity;
        $("#exp" + i).html(this.items[i].quantity + " lines gives you " + temp.toFixed(1) + " exp");
    };

    this.updateShowAllItemsExp = function() {
        for(var i = 1; i < 9; i++) {
            var temp = (this.items[i].speedUp/10) * this.items[i].quantity;
            $("#exp" + i).html(this.items[i].quantity + " lines gives you " + temp.toFixed(1) + " exp");
        }
    };

    this.updateShowAmountOfItems = function() {
        $("#showAmountOfItems").html("You wrote " + this.amountOfItems +" lines of code");
    };

    this.updateShowPoints = function() {
        $("#showPoints").html("You have " + parseInt(this.realPoints) +" exp");
    };

    this.updateShowAverage = function() {
        $("#showAverage").html("every second you get " + this.incrementer.toFixed(1) +" exp");
    };

    this.updateShowItemQuantity = function(i) {
        $("#showItem" + i).html("Lines of code " + this.items[i].quantity);
    };

    this.updateShowAllItemsQuantity = function() {
        for(var i = 1; i < 9; i++) {
            $("#showItem" + i).html("Lines of code " + this.items[i].quantity);
        }
    };

    this.updateShowItemCost = function(i) {
        $("#costOfItem" + i).html("Cost " + this.items[i].cost + " exp");
    };

    this.updateShowAllItemsCost = function() {
        for(var i = 1; i < 9; i++) {
            $("#costOfItem" + i).html("Cost " + this.items[i].cost + " exp");
        }
    };

    this.allUpdatesForAll = function() {
        this.updateShowPoints();
        this.updateShowAverage();
        this.updateShowAllItemsQuantity();
        this.updateShowAllItemsCost();
        this.updateShowAmountOfItems();
        this.updateShowAllItemsExp();
        this.updateProgressBars();
        this.updateLockItems();
    };

    this.allUpdatesForOne = function(i) {
        this.updateShowItemExp(i);
        this.updateShowItemQuantity(i);
        this.updateShowItemCost(i);
        this.updateShowAmountOfItems();
        this.updateShowAverage();
        this.updateShowPoints();
        this.updateLockItems();
        this.updateProgressBars();
    };

    this.progressBar = function(percent, $element) {
        var progressBarWidth = percent * $element.width() / 100;
        $element.find('div').animate({ width: progressBarWidth }, 1).html(percent + "%&nbsp;");
    };

    this.updateProgressBars = function() {
        for(var i = 1; i < 9; i++) {
            var percent = parseInt(this.realPoints / this.items[i].cost * 100);
            if(percent > 100) {
                percent = 100;
            }
            this.progressBar(percent, $('#progressBar' + i));
        }
    };

    this.runPointsCounter = function() {
        setInterval(
            function() {
                self.realPoints = self.realPoints + self.incrementer;
                self.updateShowPoints();
                self.updateLockItems();
                self.updateProgressBars();
            },
        1000);
    };

    this.onClick = function() {
        this.realPoints = this.realPoints + 1.0;
        this.updateShowPoints();
        this.updateLockItems();
        this.updateProgressBars();
	var pointsy = $('<div>+1exp;</div>');
	$(showAverage).append(pointsy);
	pointsy.animate({top: -200, opacity:0}, 2000, 'swing', function(){
	  $(this).remove();
	  });
    };

    this.buyItem = function(i) {
        var item = this.items[i];
        if (item.cost <= parseInt(this.realPoints)) {
            this.realPoints = this.realPoints - item.cost;
            this.incrementer = this.incrementer + (item.speedUp * 0.1);
            item.quantity = item.quantity + 1;
            this.amountOfItems = this.amountOfItems + 1;
            item.cost = Math.round(1.12 * item.cost);
            this.allUpdatesForOne(i);
        }
    };

    this.updateLockItems = function() {
        var lockedItems = document.getElementsByClassName("buy");
        for(var i = 0; i < lockedItems.length; i++) {
            if(this.items[i+1].cost <= parseInt(this.realPoints)) {
                lockedItems[i].disabled = false;
            }
            else {
                lockedItems[i].disabled = true;
            }
        }
    };

    this.saveGame = function() {
        localStorage.setItem("realPoints", this.realPoints);
        localStorage.setItem("incrementer", this.incrementer);
        localStorage.setItem("amountOfItems", this.amountOfItems);
        for(var i = 1; i < 9; i++) {
            localStorage.setItem(i, JSON.stringify(this.items[i]));
        }
    };

    //automatyczne zapisanie stanu co 30 sek
    this.automaticSave = function() {
        setInterval(
            function() {
                self.saveGame();
            },
        30000);
    };

    this.loadGame = function() {
        var temp = localStorage.getItem("realPoints");
        if (temp !== null) {
            this.realPoints = parseFloat(temp);
        }
        temp = localStorage.getItem("incrementer");
        if (temp !== null) {
            this.incrementer = parseFloat(temp);
        }
        temp = localStorage.getItem("amountOfItems");
        if (temp !== null) {
            this.amountOfItems = parseInt(temp);
        }
        for(var i = 1; i < 9; i++) {
            temp = localStorage.getItem(i);
            if (temp !== null) {
                this.items[i] = JSON.parse(temp);
            }
       }
    };

    this.resetGame = function() {
        localStorage.clear();
        this.initVars();
        this.allUpdatesForAll();
    };

    this.onStart = function() {
        this.initVars();
        this.initExp();
        this.loadGame();
        this.allUpdatesForAll();
        this.runPointsCounter();
        this.automaticSave();

        $('.clicker').click(function() {
            self.onClick();
        });

        $('.buy').click(function() {
            var item = $(this).attr('data-item');
            self.buyItem(item);
        });

        $('.save').click(function() {
            self.saveGame();
        });

        $('.reset').click(function() {
            self.resetGame();
        });
    };

}

$(document).ready(function() {
    var game = new Game();
    game.onStart();
});
