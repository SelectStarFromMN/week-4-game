// Javascript for Crystal game

window.onload = function () {

    var gameOver = false;
    var randomCombination;
    var blueCrystalValue = 0;
    var redCrystalValue = 0;
    var greenCrystalValue = 0;
    var purpleCrystalValue = 0;
    var crystalSum = 0;
    var treasure;
    var wins = 0;
    var losses = 0;
    var winnings = 0;
    var crystalArray = [];

    // Setup Victory Sound
    var audioWin = document.createElement("audio");
    $(audioWin).attr("src", "./assets/javascript/TaDa.mp3");
    // Setup ULose Sound
    var audioLose = document.createElement("audio");
    $(audioLose).attr("src", "./assets/javascript/WaWa.mp3");


    // INIT function (common place for reset vars)
    var initState = function () {
        gameOver = false;
        crystalArray = [];
        crystalSum = 0;
        blueCrystalValue = rollNewCrystal();
        redCrystalValue = rollNewCrystal();
        greenCrystalValue = rollNewCrystal();
        purpleCrystalValue = rollNewCrystal();
        console.log(crystalArray);
        randomCombination = Math.floor(Math.random() * 120) + 19;
        treasure = Math.floor(Math.random() * 10000) + 1000;
        $("#blue-crystal").attr("value", blueCrystalValue);
        $("#red-crystal").attr("value", redCrystalValue);
        $("#green-crystal").attr("value", greenCrystalValue);
        $("#purple-crystal").attr("value", purpleCrystalValue);
        $("#skull-chamber").css("opacity", .1);
    }

    // Don't roll a duplicate value
    var rollNewCrystal = function () {
        var newRandy;

        newRandy = Math.floor(Math.random() * 12) + 1;
        // If already rolled, while already-rolled, do re-roll
        if (crystalArray.includes(newRandy)){
            do {
                newRandy = Math.floor(Math.random() * 12) + 1;
            } while (crystalArray.includes(newRandy));
        }

        crystalArray.push(newRandy);
        return newRandy;
    }

    // Refresh display
    var refreshBoard = function () {
        $(".chamberCombo").text("Combination: " + randomCombination);
        $(".crystal-sum").text("Crystal Sum: " + crystalSum);
        $(".player-treasure").text("Total Treasure: $" + winnings);
    }

    // Check win/loss
    var checkWin = function () {
        if (crystalSum == randomCombination) {
            winnings += treasure;
            wins ++;
            $("#skull-chamber").css("opacity", 1);
            audioWin.load();
            audioWin.play();
            alert("You Won: $" + treasure + " Accumulated: $" + winnings);
            gameOver = true;
        }
        else if (crystalSum > randomCombination) {
            winnings -= treasure;
            losses ++;
            audioLose.load();
            audioLose.play();
            alert("You Lost: $" + treasure + " Accumulated: $" + winnings);
            gameOver = true;
        }
    }

    // Play
    var play = function () {
        initState();
        refreshBoard();
    }

    // Let's play the game
    play();

    // On crystal-btn click
    $(".crystal-btn").click(function () {
        if (!gameOver) {
            // brighten the crystal-skull chamber image
            var opa = $("#skull-chamber").css("opacity");
            opa = parseFloat(opa) + .1;
            $("#skull-chamber").css("opacity", opa);
            crystalSum += parseInt(this.value);
            // console.log(this.id + ": " +this.value);
            checkWin();
            refreshBoard();
        }
    });

    // Reset
    document.getElementById('resetBtn').onclick = function () {
        play();
    }

}