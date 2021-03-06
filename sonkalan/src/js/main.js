// 2 tuntia offset
let countDown = new Date('2020-02-28T16:00:00Z').getTime();
var TDays = document.getElementById("days");
var THours = document.getElementById("hours");
var TMinutes = document.getElementById("minutes");
var TSeconds = document.getElementById("seconds");
const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let now = new Date().getTime(),
distance = countDown - now;

TDays.innerText = "00";
THours.innerText = "00";
TMinutes.innerText = "00";
TSeconds.innerText = "00";

function updateTime() {
    let now = new Date().getTime(),
    distance = countDown - now;

    TDays.innerText = Math.floor(distance / (day)).toString(),
    THours.innerText = Math.floor((distance % (day)) / (hour)).toString(),
    TMinutes.innerText = Math.floor((distance % (hour)) / (minute)).toString(),
    TSeconds.innerText = Math.floor((distance % (minute)) / second).toString();

    if(distance < 0){
        clearInterval(Timer)
        TDays.innerText = "00";
        THours.innerText = "00";
        TMinutes.innerText = "00";
        TSeconds.innerText = "00";
    }
}

let Timer = setInterval(updateTime, second)

document.getElementById("godown").addEventListener("click", MouseEffect, false);

function MouseEffect()
{
    document.querySelector("#godown i").classList.remove("faa-falling");
    document.querySelector("#godown i").classList.add("faa-burst");
    setTimeout(() => {
        document.querySelector("#godown i").classList.remove("faa-burst");
        document.querySelector("#godown i").classList.add("faa-falling");
    }, 1600);
}


//Aikataulu

let TGCONT = document.getElementsByClassName("time-day");
let WeekDays = document.getElementsByClassName("weekstyle");
for(let i = 0; i < WeekDays.length; i++){
    WeekDays[i].addEventListener("click", ChangeWeek)
}

function ChangeWeek(){
    for(let i = 0; i < WeekDays.length; i++)
    {
        TGCONT[i].classList.remove("day-activated");
        WeekDays[i].classList.remove("day-selected");
    }
    let TGID = this.getAttribute("value");
    this.classList.add("day-selected");
    document.getElementById(TGID).classList.add("day-activated");
    

}

window.addEventListener("resize", ReSize);

function ReSize(){
    let TRANS = document.getElementsByClassName("transition");
    for(let x = 0; x < TRANS.length; x++) {
        TRANS[x].setAttribute("style", "border-width: 0 "+ window.innerWidth+ "px 130px 0")
    }
    if(window.innerWidth < 380){
        document.getElementById("disc-size").setAttribute("width", (window.innerWidth - 25).toString())
    }
}

$(document).ready(function() {
    $(window).scroll( function(){
        $('.fadein_normal').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).animate({'opacity':'1'},500);   
            }
        }); 
        $('.fadein_left').each( function(x){
            
            let Fbottom_of_object = $(this).offset().top + $(this).outerHeight();
            let Fbottom_of_window = $(window).scrollTop() + $(window).height();
            if( Fbottom_of_window > Fbottom_of_object - 400){
                $(this).animate('slide');
            }
        }); 
    });
});

//AJAX => hommataan data
$(document).ready(function() {
    $.getJSON("https://cors.io/?https://liput.io/e/16/ticketsale-status", function(json) {
        document.getElementById("paikat").innerText = json.sold + "/" + json.total + " paikkaa varattu!"
    });
});


$("#godown").click(function() {
    if(!document.getElementById("dropdown-disc").classList.contains("hidden")){
        document.getElementById("dropdown-disc").classList.add("hidden")
    }
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#scrollto").offset().top
    }, 1300);
});

document.getElementById("disc-button").addEventListener("click", TOGGLESLIDER, false)

function TOGGLESLIDER(){
    let DIV = document.getElementById("dropdown-disc");
    if(DIV.classList.contains("hidden")){
        DIV.classList.remove("hidden")
    } else {
        DIV.classList.add("hidden");
    }
}

//UKK
if(document.location.hash == "#ukk") {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#ScrollFAQ").offset().top
    }, 1300);
}

let kysymykset = document.getElementsByClassName("kysymys");
for(let i = 0; i < kysymykset.length; i++) {
    kysymykset[i].addEventListener("click", HandleDropDown(), false);
}

function HandleDropDown() {
    return function(event) {
        let ParentElement = event.target.parentElement;
        if(ParentElement.classList.contains("avattu")) {
            if(ParentElement.classList.contains("kysymykset")) {
                event.target.classList.remove("avattu");
            } else {
                ParentElement.classList.remove("avattu");
            }
        } else {
            if(ParentElement.classList.contains("kysymykset")) {
                event.target.classList.remove("avattu");
            } else {
                ParentElement.classList.add("avattu");
            }
        }
    }
}

function bootstrap() {
    updateTime()
    ReSize();
}

bootstrap()
