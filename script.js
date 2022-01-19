var divination = [
  "星座早見盤の計算", // "Calculating star charts",
  "茶葉の読み方", // "Reading tea leafs",
  "ヤギの生け贄", // "Sacrificing a goat",
  "マヤ暦の確認", // "Consulting Mayan calenders",
  "血液型を比較中", // "Checking blood types",
  "手相をなぞる", // "Tracing palm lines"
];

var usedNums = [];
var rndNum = 0;

function rndMsg() {
  if (usedNums.length == divination.length) {
    usedNums = [];
  }

  rndNum = Math.floor(Math.random() * divination.length);

  while (usedNums.indexOf(rndNum) > -1) {
    rndNum = Math.floor(Math.random() * divination.length);
  }

  usedNums.push(rndNum);

  if (divination[rndNum].slice(5) == $("#div-msg").text().trim().slice(5)) {
    rndMsg();
  } else {
    var dM = divination[rndNum];
    $("#div-msg").text(dM);
    setTimeout(function () {
      $("#div-msg").text(dM + ".");
    }, 200);
    setTimeout(function () {
      $("#div-msg").text(dM + "..");
    }, 400);
    setTimeout(function () {
      $("#div-msg").text(dM + "...");
    }, 600);
  }
}

$(document).ready(function () {
  setInterval(function () {
    rndMsg();
  }, 1200);
  $("#name1-label").click(function () {
    $("#name1").focus();
  });
  $("#name2-label").click(function () {
    $("#name2").focus();
  });
  $("input").keypress(function (e) {
    if (e.which == 13) {
      $("#calculate").click();
    }
  });

  $("#calculate").click(function () {
    var name1 = $("#name1").val();
    var name2 = $("#name2").val();

    if (name1.length > 0 && name2.length > 0) {
      var seed = name1.length + name2.length;
      var megaName = name1 + " " + name2;
      var today = new Date();
      var love = 0;
      megaName = megaName.split("");
      for (i = 0; i < megaName.length; i++) {
        seed += megaName[i].charCodeAt(0);
      }
      seed = seed / (today.getMonth() + today.getDay());
      seed = Math.round(seed);
      seed = seed.toString().slice(-2);
      if (seed == "00") {
        seed = "100";
      }

      love = parseInt(seed);
      $("#initial-prompt").animate(
        {
          height: 0,
          width: 0,
          opacity: 0,
        },
        300,
        function () {
          $("#initial-prompt").hide(function () {
            $("#calculating").fadeIn(300, function () {
              setTimeout(function () {
                $("#love-results").html(
                  "現在の" +
                    name1 +
                    "と" +
                    name2 +
                    "の相性は<span class='strong'>" +
                    love +
                    "%</span>です。"
                );
                $("#calculating").fadeOut(300, function () {
                  $("#results").fadeIn(300, function () {
                    $("#try-again").focus();
                  });
                });
              }, 3000);
            });
          });
        }
      );
    } else {
      $("#warning").animate(
        {
          opacity: 1,
        },
        300
      );
    }
  });

  $("#try-again").click(function () {
    $("#initial-prompt").css({
      height: "auto",
      width: "100%",
      opacity: 1,
    });
    $("#name1").val("");
    $("#name2").val("");
    $("#results").fadeOut(300, function () {
      $("#initial-prompt").fadeIn(300, function () {
        $("#name1").focus();
      });
    });
  });
});
