
var firstEmpty = true;
var secondEmpty = true;
var foesLeft = 2;

$(document).ready(function () {

    $(".container").click(function () {
        var activate = function () {

            if (firstEmpty) {

                $("#ironman").one("click", function () {
                    $("#ironman").detach().appendTo('#player');
                    $("#ironman").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    firstEmpty = false;
                });
                $("#cap").one("click", function () {
                    $("#cap").detach().appendTo('#player');
                    $("#cap").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    firstEmpty = false;
                    console.log(firstEmpty);
                });
                $("#thor").one("click", function () {
                    $("#thor").detach().appendTo('#player');
                    $("#thor").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    firstEmpty = false;
                    console.log(firstEmpty);
                });
                $("#hulk").one("click", function () {
                    $("#hulk").detach().appendTo('#player');
                    $("#hulk").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    firstEmpty = false;
                });
            } else {
                $(".gallery #ironman").one("click", function () {
                    $("#ironman").detach().appendTo('#opponent');
                    $("#ironman").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    $("#attackbtn").prop("disabled", false);
                    secondEmpty = false;
                });
                $(".gallery #cap").one("click", function () {
                    $("#cap").detach().appendTo('#opponent');
                    $("#cap").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    $("#attackbtn").prop("disabled", false);
                    secondEmpty = false;
                });
                $(".gallery #thor").one("click", function () {
                    $("#thor").detach().appendTo('#opponent');
                    $("#thor").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    $("#attackbtn").prop("disabled", false);
                    secondEmpty = false;
                });
                $(".gallery #hulk").one("click", function () {
                    $("#hulk").detach().appendTo('#opponent');
                    $("#hulk").removeClass("col-lg-3 col-md-3 col-sm-6").addClass("col-sm-12");
                    $("#attackbtn").prop("disabled", false);
                    secondEmpty = false;
                });

            }
        };

        activate();
    });

    $("#attackbtn").on("click", function () {
        if (!firstEmpty && !secondEmpty) {
            console.log(firstEmpty);
            $(".thumb").off("click");
            var baseAttack = $("#player .attack").attr("value");
            var selfAttack = $("#player .attack").text();
            var oppAttack = $("#opponent .attack").text();
            var selfHP = $("#player .HP").text();
            var oppHP = $("#opponent .HP").text();
            var selfCounter = $("#player .counterAttack").text();
            var oppCounter = $("#opponent .counterAttack").text();

            console.log(selfAttack);
            console.log(oppAttack);
            selfHP = parseInt(selfHP) - parseInt(oppCounter);
            $("#player .HP").text(selfHP);
            oppHP = parseInt(oppHP) - parseInt(selfAttack);
            $("#opponent .HP").text(oppHP);

            $("#message").html("<p>Your character dealt " + selfAttack + " damage points.</p><p>Your opponent dealt " + oppCounter + " damage points.</p>");
            selfAttack = parseInt(selfAttack) + parseInt(baseAttack);
            $("#player .attack").text(selfAttack);
            console.log(selfAttack);


            if (oppHP <= 0 && selfHP <= 0 & foesLeft === 0) {
                $("#message").text("It's a tie! Everyone was defeated!");
                $("body").attr("style", "background-image:url('assets/images/defeat.jpg');");
                $("#opponentArea p").hide();
                $("#playerArea p").hide();
                $("#opponent .thumb").detach().appendTo(".gallery").hide();
                $("#player .thumb").detach().appendTo(".gallery").hide();
                $("#attackbtn").prop("disabled", true);
            } else if (selfHP <= 0) {
                $("#message").html("<p>You lost!</p>");
                $("#player .thumb").detach().appendTo(".gallery").hide();
                $("#attackbtn").prop('disabled', true);
                $("body").attr("style", "background-image:url('assets/images/stark.jpg');");
                $("#opponentArea p").hide();
                $("#playerArea p").hide();
                $("#opponent").hide();
                $(".gallery").hide();
            } else if (oppHP <= 0 && foesLeft > 0) {
                $("#message").html("<p>You defeated " + $("#opponent img").attr("alt") + "!</p>");
                $("#opponent .thumb").detach().appendTo(".gallery").hide();
                $("#attackbtn").prop("disabled", true);
                foesLeft--;
            } else if (oppHP <= 0 && foesLeft === 0) {
                $("#message").text("Congratulations, " + $("#player img").attr("alt") + "! You defeated all enemies!");
                $("#opponent .thumb").detach().appendTo(".gallery").hide();
                $("#opponentArea p").hide();
                $("#playerArea p").hide();
                $("#player .thumb").attr("style", "position: absolute; top: 120%; left: 70%;");
                $("body").attr("style", "background-image:url('assets/images/antman.png');");
                $("#attackbtn").prop("disabled", true);
            }

        }
    });

    $("#resetbtn").on("click", function () {
        $(".thumb").off("click");
        var resetAttack = $(".attack").attr("value");
        $(".attack").text(resetAttack);

        var resetIronHP = $("#ironman .HP").attr("value");
        $("#ironman .HP").text(resetIronHP);
        var resetCapHP = $("#cap .HP").attr("value");
        $("#cap .HP").text(resetCapHP);
        var resetThorHP = $("#thor .HP").attr("value");
        $("#thor .HP").text(resetThorHP);
        var resetHulkHP = $("#hulk .HP").attr("value");
        $("#hulk .HP").text(resetHulkHP);

        $("#player .thumb").attr("style", "position: static;");
        $("#opponentArea p").show();
        $("#playerArea p").show();
        $(".gallery").show();
        $("#attackbtn").prop("disabled", true);
        $("#message").text("Double-click to choose your character, then click your opponent. Avenge!");
        $(".gallery").append($("#ironman").show().attr("class", "col-lg-3 col-md-3 col-sm-6 thumb"));
        $(".gallery").append($("#cap").show().attr("class", "col-lg-3 col-md-3 col-sm-6 thumb"));
        $(".gallery").append($("#thor").show().attr("class", "col-lg-3 col-md-3 col-sm-6 thumb"));
        $(".gallery").append($("#hulk").show().attr("class", "col-lg-3 col-md-3 col-sm-6 thumb"));
        $("body").attr("style", "background-image:url('../images/setting.jpg') no-repeat center center fixed;");
        $("#opponentArea").html("<p>Your opponent:</p><div id='opponent'><!-- Opponent image goes here --></div>");
        foesLeft = 2;

        $("#player").empty();
        $("#opponent").empty();
        firstEmpty = true;

    });
});

