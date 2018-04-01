// Javascript for Crystal game

window.onload = function () {

}

$( ".crystal-btn" ).click(function() {
    // console.log(this);
    var opa = $( "#skull-chamber" ).css("opacity");
    opa = parseFloat(opa) + .1;
    $( "#skull-chamber" ).css("opacity", opa);
    console.log(opa);
  });