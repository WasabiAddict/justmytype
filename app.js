$(document).ready(function () {
    $("#keyboard-upper-container").hide();
});

$(document).keydown(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    };
});

$(document).keyup(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    };
});

$(document).keydown(function (e) {
    if (e.keyCode == 16) {
        e.preventDefault();
    } else {
        $(`#${e.key.charCodeAt()}`).css('background-color', 'yellow');

    };

});

$(document).keyup(function (e) {
    $(`#${e.key.charCodeAt()}`).css('background-color', '');
});

let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let array = 0;
let writing = sentences[array];
let letterPlace = 0;
let letter = writing.substring(letterPlace, letterPlace + 1);
let timerOn = false;
let startDate;
let startTime;
let errors = 0;

$("#sentence").text(writing);
$("#target-letter").text(letter);

$(document).keypress(function (e) {
    if (timerOn === false) {
        startDate = new Date();
        startTime = startDate.getTime();
        timerOn = true;
    }

    if (e.which == sentences[array].charCodeAt(letterPlace)) {
        let correct = $('<span>✓</span>');
        correct.css("color", "green");
        $(correct).appendTo("#feedback");
        $("#yellow-block").css("left", "+=17.3px");
        letterPlace++;
        letter = writing.substring(letterPlace, letterPlace + 1);
        $("#target-letter").text(letter);
        if (letterPlace === writing.length) {
            array++;
            if (array === sentences.length) {
                let endDate = new Date();
                let endTime = endDate.getTime();
                let minutes = (endTime - startTime) / 60000;
                wpm = Math.round(54 / minutes - 2 * errors);
                var confirmBox = confirm(
                    `You finished and you typed ${wpm} words per minute! Try again?`
                );
                if (confirmBox == true) {
                    location.reload();
                }
            } else {
                writing = sentences[array];
                $("#sentence").text(writing);
                letterPlace = 0;
                letter = writing.substring(letterPlace, letterPlace + 1);
                $("#target-letter").text(letter);
                $("#yellow-block").css("left", "15px");
                $("#feedback").text("");
            }
        }
    } else {
        let wrong = $('<span class="red">✗</span>');
        wrong.css("color", "red");
        $(wrong).appendTo("#feedback");
        errors++;
    }
});

