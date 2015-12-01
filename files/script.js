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
    
    this.updateQuote = function() {
        var text;
        if(this.amountOfItems > 999) {
            text = "One of your Artificial Intelligence systems reached Technological Singularity. This is the end of the world as we know it.";
        }
        else if(this.amountOfItems > 49) {
            text = "People across the Globe want you to work for their companies. ";
        }
        
        else if(this.amountOfItems > 39) {
            text = "You've earned your first Golden Badge on Stack Overflow!";
        }
        else if(this.amountOfItems > 34) {
            text = "You no longer look for job offers. They look for you.";
        }
        else if(this.amountOfItems > 29) {
            text = "Your OpenSource apps are used across the country.";
        }
        else if(this.amountOfItems > 24) {
            text = "You've earned your first badge on StackOverflow!";
        }
        else if(this.amountOfItems > 19) {
            text = "Student associations and schools across the city ask you to design their websites!";
        }
        else if(this.amountOfItems > 14) {
            text = "The website about recent games of local sports teams you created last week for fun gets recognition!";
        }
        else if(this.amountOfItems > 9) {
            text = "A local geek magazine publishes snippets of your code in the 'funny' section.";
        }
        else if(this.amountOfItems > 4) {
            text = "Your text-based tic-tac-toe doesn't really excite your friends as much as yourself.";
        }
        else if(this.amountOfItems > 0) {
            text = "This is it... Your Personal Computer outputs the first 'Hello World' of yours!";
        }
        else {
            text = "You wake up with a new vision of your life as a programmer. But you don't know anything about programming. \nClick on the StackOverflow logo to begin the adventure!";
        }
        
        $("#quote").html(text);  
    }

    this.allUpdatesForAll = function() {
        this.updateShowPoints();
        this.updateShowAverage();
        this.updateShowAllItemsQuantity();
        this.updateShowAllItemsCost();
        this.updateShowAmountOfItems();
        this.updateShowAllItemsExp();
        this.updateProgressBars();
        this.updateLockItems();
        this.updateQuote();
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
        this.updateQuote();
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
    
    this.onClickEfect = function () {
        var pointsy = $('<div>+1exp</div>');
        $(showAverage).append(pointsy);
        pointsy.animate({top: -200, opacity:0}, 2000, 'swing', function(){
            $(this).remove();
        });
    }

    this.onClick = function() {
        this.realPoints = this.realPoints + 1.0;
        this.updateShowPoints();
        this.onClickEfect();
        this.updateLockItems();
        this.updateProgressBars();
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
