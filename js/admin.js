var items = document.querySelectorAll(".deletebtn");
var movieinput = document.getElementById("movieinput");
var submitbtn = document.getElementById("submitbtn");

var selectBox = document.getElementById("selectBoxGenre");
var genreinput = document.getElementById("genreinput");

var selectBoxCountry = document.getElementById("selectBoxCountry");
var countryinput = document.getElementById("countryinput");

var selectBoxYear = document.getElementById("selectBoxYear");
var yearinput = document.getElementById("yearinput");

var logout = document.getElementById("logoutbtn");

window.onload = funonload;
function funonload() {
    for (var i = 0; i < items.length; i++) {
            items[i].onclick = function handleClick(event) {
                movieinput.value = event.target.name;
                submitbtn.click();
            };
    }
    logout.onclick = function(){
        document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
        //if(getCookie("login") == "admin")
    }
}

function changeGenreFunc() {
    genreinput.value = selectBox.options[selectBox.selectedIndex].value;
   }
   function changeCountryFunc() {
    countryinput.value = selectBoxCountry.options[selectBoxCountry.selectedIndex].value;
   }
   function changeYearFunc() {
    yearinput.value = selectBoxYear.options[selectBoxYear.selectedIndex].value;
   }