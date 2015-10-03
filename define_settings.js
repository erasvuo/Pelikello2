var hometeam = "JOUK.";
var visitorteam = "NIMI";
var ajanlasku = "YLÖS";
var w;
var pause_time = 0;
var new_pause_time = 0;
var str;

var myVar;
var timeout_timer = 0;
var painettu = 0;
var hometimeoutcount = 0;
var visitortimeoutcount = 0;

var break_time = 1;
var menu_state = 0;
var game_period = 20;
var break_period = 15;
var set_timeout = 0;
var short_penalty = 2;
var long_penalty = 5;
var period_count = 1;
var given_number = "";
var last_penalty_player = "";
var lastpenalty = "";
var extralongpenalty = 10;
var doubleextralongpenalty = 2*extralongpenalty;

var home = 0;
var visitor = 0;

var ActionEnum = Object.freeze({"gameperiod":1, 
                                "breakperiod":2, 
                                "timeoutperiod":3,
                                "changepenaltytimes":4,
                                "periodcount":5, 
                                "hometimeout":6,
                                "visitortimeout":7,
                                "homepenalty":8,
                                "visitorpenalty":9, 
                                "penaltyforplayer":10,
                                "savevalues":11,
                                "countingdirection":12,
                                "penaltytime":13
                                });

function setGamePeriod(){
    game_period = given_number;
    var game_time = new Date();
    var col=document.getElementById("E1");
    col.style.color="black";
    game_time.setMinutes(game_period);
    document.getElementById("E1").value = game_time.getMinutes() + ":00";
    painettu = 0;
    given_number = "";
}


function addDigit(digit){
    
    if (given_number.length === NaN || given_number.length < 2){
        given_number = given_number + digit;

        switch (painettu) {
        case ActionEnum.gameperiod:
            document.getElementById("E1").value = given_number;
            break;
        case ActionEnum.breakperiod:
            document.getElementById("F1").value = given_number;
            break;
        case ActionEnum.timeoutperiod:
            document.getElementById("B2").value = given_number;
            break;     
        case ActionEnum.periodcount:
            document.getElementById("E2").value = given_number;            
            break;        
        case ActionEnum.homepenalty:
            document.getElementById("C2").value = "H:" + given_number;            
            break;
        case ActionEnum.visitorpenalty:
            document.getElementById("D2").value = "G:" + given_number;
            break;

        case ActionEnum.penaltytime:
            document.getElementById("C2").value = given_number;
            setLongPenalty();
            break;
            
        default:
            break;
        }

    }    
    else
        alert("no can do"+given_number.length);
}

function setBreakPeriod(){
    break_period = given_number;
    var break_time = new Date();    
    var col=document.getElementById("F1");
    col.style.color="black";
    break_time.setMinutes(break_period);
    document.getElementById("F1").value = break_time.getMinutes() + ":00";
    painettu = 0;
    given_number = "";    
}

function setTimeoutPeriod(){
    set_timeout = given_number;    
    timeout_timer = set_timeout;
    var timeout_time = new Date(); 
    var col=document.getElementById("B2");
    col.style.color="black";
    timeout_time.setSeconds(set_timeout);
    document.getElementById("B2").value = timeout_time.getSeconds() + "s";
    painettu = 0;
    given_number = ""; 
}

function setLongPenalty(){
    long_penalty = given_number;
    var long_penalty_time = new Date();
    var col=document.getElementById("D1");
    col.style.color="black";
    long_penalty_time.setMinutes(long_penalty);
    document.getElementById("D1").value = long_penalty_time.getMinutes() + ":00"; 
    //painettu = 0;
    given_number = "";
}



function setPeriodCount(){
    period_count = given_number;
    alert("per_count: " + period_count);
    var col=document.getElementById("E2");
    col.style.color="black";
    document.getElementById('E2').value = period_count;    
    painettu = 0;
    given_number = "";
}



function setHomeTimeout(){
    var col=document.getElementById("F2");   
    col.style.color="black";
    painettu = 0;
    if (hometimeoutcount >= 3)
        alert("no more timeouts for Home");
    else{
        startTimeout();
        hometimeoutcount = hometimeoutcount + 1;
        if (hometimeoutcount === 1)
            document.getElementById('hometimeout').innerHTML = "H"; 
        else if (hometimeoutcount === 2)
            document.getElementById('hometimeout').innerHTML = "H H";
        else
            document.getElementById('hometimeout').innerHTML = "H H H";
    }
    document.getElementById('F2').value = "H/" + hometimeoutcount;

}

function setVisitorTimeout(){
    var col=document.getElementById("G2");
    col.style.color="black";
    painettu = 0;
    if (visitortimeoutcount >= 3)
        alert("no more timeouts for Visitor");
    else{
        startTimeout();
        visitortimeoutcount = visitortimeoutcount + 1;
        if (visitortimeoutcount === 1)
            document.getElementById('visitortimeout').innerHTML = "G"; 
        else if (visitortimeoutcount === 2)
            document.getElementById('visitortimeout').innerHTML = "G G";
        else
            document.getElementById('visitortimeout').innerHTML = "G G G";
    }
    document.getElementById('G2').value = "G/" + visitortimeoutcount; 
}


function startTimeout(){
    myVar = setInterval(function(){ setTimeout(); }, 1000);    
}

function setTimeout() {
    if (timeout_timer === 0){
        clearInterval(myVar);
        document.getElementById('breakperiod').innerHTML = '';
        playSound();
        timeout_timer = set_timeout;
    }
    else if (timeout_timer < 0)
        clearInterval(myVar);
    else{
        timeout_timer = timeout_timer - 1;
        document.getElementById('breakperiod').innerHTML = timeout_timer;
        }
}
 
function stopTimeout() {
  clearInterval(myVar);
}

function resetTimeout() {
  document.getElementById('hometimeout').innerHTML = ""; 
  document.getElementById('visitortimeout').innerHTML = ""; 
  document.getElementById('breakperiod').innerHTML = "";
  document.getElementById('F2').value = "H/" + 0;
  document.getElementById('G2').value = "G/" + 0;
  hometimeoutcount = 0;
  visitortimeoutcount = 0;
  timeout_timer = 0;
}

function showActive(x){

    switch (x){
        
        case "A1": 
            if (menu_state === 1){            
                var col=document.getElementById("A2");
                painettu = ActionEnum.savevalues;
            }
            else if (menu_state === 0){
                var col=document.getElementById("A1");
                painettu = ActionEnum.changepenaltytimes;
                checkChanges();
            }
            else if (menu_state === 6){
                var col=document.getElementById("A2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = short_penalty.toString();
                checkChanges();
            } 
            break;
        
        case "B1":
            if (menu_state === 0){ 
                var col=document.getElementById("B2");
                painettu =  ActionEnum.timeoutperiod;                
            }
            else if (menu_state === 6){
                var col=document.getElementById("B2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = long_penalty.toString();
                checkChanges();
            }
            
            else if (menu_state === 7){
                var col=document.getElementById("B2");
                painettu = ActionEnum.penaltytime;
                checkChanges();
            }
            break;

        case "C1": 
            if (menu_state === 0){
                var col=document.getElementById("C2");
                painettu = ActionEnum.homepenalty;                
                checkChanges();                
            }
            else if (menu_state === 6){
                var col=document.getElementById("C2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = extralongpenalty.toString();
                checkChanges();
            }            
            break;        
        
        case "D1": 
            if (menu_state === 0){
                var col=document.getElementById("D2");
                painettu = ActionEnum.visitorpenalty;
                checkChanges();
            }
            else if (menu_state === 6){
                var col=document.getElementById("D2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = short_penalty.toString() + "+" + short_penalty.toString();
                checkChanges();
            }             
            break; 
            
        case "E1":
            if (menu_state === 1){
                var col=document.getElementById("E1");
                painettu = ActionEnum.gameperiod;    
            }
            else if (menu_state === 0){
                var col=document.getElementById("E2");
                painettu = ActionEnum.periodcount;            
            }
            else if (menu_state === 6){
                var col=document.getElementById("E2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = long_penalty.toString() + "+" + long_penalty.toString();
                checkChanges();
            }             
            break;
            
        case "F1":
            if (menu_state === 1){
                var col=document.getElementById("F1");
                painettu = ActionEnum.breakperiod;    
            }
            else if (menu_state === 6){
                var col=document.getElementById("F2");
                painettu = ActionEnum.penaltyforplayer;
                lastpenalty = doubleextralongpenalty.toString();
                checkChanges();
            }
            else if (menu_state === 0){
                var col=document.getElementById("F2");
                painettu = ActionEnum.hometimeout;            
            }             
            break;

        case "G1":             
            if (menu_state === 1){
                var col=document.getElementById("G2");
                painettu = ActionEnum.countingdirection;    
            }        
            else if (menu_state === 0){            
                var col=document.getElementById("G2");
                painettu = ActionEnum.visitortimeout;
            }                           
        default:
            break;
    }
    col.style.color="red";
}

function clearChanges(){
    var col=document.getElementById("A1");
    col.style.color="black";
    col=document.getElementById("B1");
    col.style.color="black";    
    col=document.getElementById("C1");
    col.style.color="black";
    col=document.getElementById("D1");
    col.style.color="black";    
    col=document.getElementById("E1");
    col.style.color="black";
    col=document.getElementById("F1");
    col.style.color="black";
    col=document.getElementById("G1");
    col.style.color="black";
    col=document.getElementById("H1");
    col.style.color="black";
    col=document.getElementById("A2");
    col.style.color="black";
    col=document.getElementById("B2");    
    col.style.color="black";
    col=document.getElementById("C2");
    col.style.color="black";
    col=document.getElementById("D2");
    col.style.color="black";
    col=document.getElementById("E2");
    col.style.color="black";
    col=document.getElementById("F2");
    col.style.color="black";
    col=document.getElementById("G2");
    col.style.color="black";
    col=document.getElementById("H2");
    col.style.color="black"; 
    
    painettu = 0;
}

function checkChanges(){
    switch (painettu){
        case ActionEnum.gameperiod:
            setGamePeriod();
            break;
        case ActionEnum.breakperiod:
            setBreakPeriod();
            break;
        case ActionEnum.timeoutperiod:
            setTimeoutPeriod();
            break;            

        case ActionEnum.changepenaltytimes:
            menu_state = 2;            
            openMenu();
            break;        
        
        case ActionEnum.penaltytime:          
            openMenu();
            break;
        
        case ActionEnum.periodcount:
            setPeriodCount();
            document.getElementById("period").innerHTML = document.getElementById("E2").value;
            break;            
        case ActionEnum.hometimeout:
            setHomeTimeout();
            break;   
        case ActionEnum.visitortimeout:
            setVisitorTimeout();
            break;
                        
        case ActionEnum.homepenalty:
            if (menu_state === 0){             
                menu_state = 3;
            }
            openMenu();
            break;
            
        case ActionEnum.visitorpenalty:
            if (menu_state === 0){
                menu_state = 5;
            }           
            openMenu();
            break;   
            
        case ActionEnum.penaltyforplayer:                    
            openMenu();
            if(home === 1){
                setHomePenalty();
                setPenaltyForPlayer(lastpenalty,last_penalty_player, home);
            }
            else if(visitor === 1){ 
                setVisitorPenalty();
                setPenaltyForPlayer(lastpenalty,last_penalty_player, home);
            }
            break;

        
        case ActionEnum.savevalues:
//       saveSetupData();
            break;     
        
        case ActionEnum.countingdirection:  
            if (ajanlasku ==="YLÖS") {
                ajanlasku = "ALAS";
            }
            else {
                ajanlasku = "YLÖS";            
            }  
            document.getElementById('G2').value = ajanlasku;
            var col=document.getElementById("G2");
            col.style.color="black";
            break;             
        
        default:
            break;            
    }
    
}


function openMenu(){
    if (menu_state === 0){     
        document.getElementById('A1').value = "JÄÄKIE";        
        document.getElementById('B1').value = "KKO";
        document.getElementById('C1').value = hometeam;
        document.getElementById('D1').value = visitorteam;
        document.getElementById('E1').value = game_period + ":00";
        document.getElementById('F1').value = break_period + ":00";
        document.getElementById('G1').value = "AIKA";                        
        document.getElementById('H1').value = "ÄÄNI";                        

        document.getElementById('A2').value = "TALL";
        document.getElementById('B2').value = "ULOS";
        document.getElementById('C2').value = "H";
        document.getElementById('D2').value = "G";
        document.getElementById('E2').value = "AIKA";
        document.getElementById('F2').value = "TAUKO";
        document.getElementById('G2').value = ajanlasku;                        
        document.getElementById('H2').value = "AUTO";         
        menu_state = 1;
    }
    else if (menu_state === 1){
        clearChanges();
        document.getElementById('A1').value = "RANGAIST.";
        document.getElementById('B1').value = "ISTUS";        
        document.getElementById('C1').value = short_penalty +":00";
        document.getElementById('D1').value = long_penalty + ":00";
        document.getElementById('E1').value = "ERÄ";
        document.getElementById('F1').value = "AIKALISÄ";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "0:00";                        
        
        document.getElementById('A2').value = "";
        document.getElementById('B2').value = set_timeout + "s";               
        document.getElementById('C2').value = "H:XX";
        document.getElementById('D2').value = "G:XX";
        document.getElementById('E2').value = period_count;
        document.getElementById('F2').value = "H/" + hometimeoutcount;
        document.getElementById('G2').value = "G/" + visitortimeoutcount;                        
        document.getElementById('H2').value = "+";         
        menu_state = 0;
    }

    else if (menu_state === 2){
        document.getElementById('A1').value = "MUUTA";
        document.getElementById('B1').value = "RANGAIST";        
        document.getElementById('C1').value = "AIKA:";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        

        
        document.getElementById('A2').value = short_penalty;
        document.getElementById('B2').value = long_penalty;
        document.getElementById('C2').value = "10";
        document.getElementById('D2').value = short_penalty.toString() + "+" + short_penalty.toString();
        document.getElementById('E2').value = long_penalty.toString() + "+" + long_penalty.toString();
        document.getElementById('F2').value = "20";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";
        menu_state = 7;
    }
    else if (menu_state === 3){
        document.getElementById('A1').value = "KOTI";
        document.getElementById('B1').value = "RANGAIST.";        
        document.getElementById('C1').value = "";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        
        
        document.getElementById('A2').value = "SET";
        document.getElementById('B2').value = "PE-NR:";
        document.getElementById('C2').value = "H:";
        document.getElementById('D2').value = "";
        document.getElementById('E2').value = "";
        document.getElementById('F2').value = "";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";
        home = 1;
        visitor = 0;
        menu_state = 4;
    }
    else if (menu_state === 4){
        document.getElementById('A1').value = "PE-NR:";
        document.getElementById('B1').value = given_number;        
        document.getElementById('C1').value = "KESTO:";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        

        
        document.getElementById('A2').value = short_penalty;
        document.getElementById('B2').value = long_penalty;
        document.getElementById('C2').value = "10";
        document.getElementById('D2').value = short_penalty.toString() + "+" + short_penalty.toString();
        document.getElementById('E2').value = long_penalty.toString() + "+" + long_penalty.toString();
        document.getElementById('F2').value = "20";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";         
        menu_state = 6;
    }
    else if (menu_state === 5){
        document.getElementById('A1').value = "VIERAS";
        document.getElementById('B1').value = "RANGAIST.";        
        document.getElementById('C1').value = "";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        
        
        document.getElementById('A2').value = "SET";
        document.getElementById('B2').value = "PE-NR:";
        document.getElementById('C2').value = "";
        document.getElementById('D2').value = "G:";
        document.getElementById('E2').value = "";
        document.getElementById('F2').value = "";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";
        home = 0;
        visitor = 1;
        menu_state = 4;
    }

    else if (menu_state === 6){
        document.getElementById('A1').value = "HYVÄK";
        document.getElementById('B1').value = "PELAAJA";        
        document.getElementById('C1').value = "RANGAIST";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        
        
        document.getElementById('A2').value = given_number;
        document.getElementById('B2').value = ":";
        document.getElementById('C2').value = lastpenalty;
        document.getElementById('C2').style.color="red";
        document.getElementById('D2').value = "";
        document.getElementById('E2').value = "";
        document.getElementById('F2').value = "";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";
        menu_state = 1;
    }
    else if (menu_state === 7){
        document.getElementById('A1').value = "ASETA";
        document.getElementById('B1').value = "UUSI";        
        document.getElementById('C1').value = "RANGAIST";
        document.getElementById('D1').value = "";
        document.getElementById('E1').value = "";
        document.getElementById('F1').value = "";
        document.getElementById('G1').value = "";                        
        document.getElementById('H1').value = "";                        
        
        document.getElementById('A2').value = long_penalty;
        document.getElementById('B2').value = "->";
        document.getElementById('C2').value = "-";
        document.getElementById('C2').style.color="red";
        document.getElementById('D2').value = "";
        document.getElementById('E2').value = "";
        document.getElementById('F2').value = "";
        document.getElementById('G2').value = "";                        
        document.getElementById('H2').value = "";
        menu_state = 1;
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
    new_pause_time = 0;
    pause_time = 0;
    menu_state = 1;
    openMenu();
}


function pauseWorker() {
    if (pause_time < new_pause_time)
        pause_time = new_pause_time;
    w.terminate();
    w = undefined;
    menu_state = 1;
    openMenu();
    checkAndStopPenalties();
}

function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) === "undefined"  /*&& (break_time === 1 || break_time <= period_count)*/) {
            w = new Worker("workers.js");
        }
        //pÃ¤ivitÃ¤ erÃ¤
      //if (break_time > period_count)            
      //    break_time = period_count;
      //else{
            document.getElementById("period").innerHTML = period_count;    
            w.onmessage = function(event) {             
            new_pause_time = pause_time + event.data;
            if (new_pause_time >= game_period*60){  //game_period sekenteina //erÃ¤n pituus 10s!!!!!!!!!!!!!!!!!!
                playSound();
                str = prefixZero(event.data + pause_time);
                document.getElementById("gametime").innerHTML = str;
                if (menu_state === 0){
                    document.getElementById("H1").value = str;
                }
                stopWorker();  //erÃ¤n loppu
                checkAndStopPenalties();
//                break_time += 1;
                play_sound();
            }
            else{ 
                str = prefixZero(event.data + pause_time);
                document.getElementById("gametime").innerHTML = str;
                if (menu_state === 0){
                    document.getElementById("H1").value = str;
                }
                checkAndStartPenalties();
            }
            };
      //}   
    }
    else {
        document.getElementById("gametime").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}
