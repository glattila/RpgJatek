let stats = {
    "life": 100,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Jelentéktelen párafarmerként kezdesz!", "profile_lvl0.png"],
    ["Kezdő szintű lázadó vagy egy gyenge sugárvetővel!","profile_lvl1.jpg"],
    ["Jedi lovag vagy, a béke őreként folytatod a harcot (És kaptál egy menő fénykardot)!","profile_lvl2.jpg"],
    ["Megöregedett Jedi Mester lettél, most átathatod a tudásod a nálad fiatalabbaknak!", "profile_lvl3.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = 10;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}

let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kaland(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        fight("Csúnya űrkalóz", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szereztél! (+1)<br>";
        stats.experience += 1;
        refreshProfileStats();
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "Rádtámadott egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.deffense;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Eltalál az egyik lövedék! (-"+e_damage+" élet)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Az Erő segítségével kitérsz a lövedék elől!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.endurance;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Rátámadsz ellenfeledre! ("+e_name+" -"+stats.strength+" élet)<br>";
                e_life -= stats.strength;
                story.innerHTML += e_name + "-nak maradt  " + e_life+" életereje<br>";
                refreshProfileStats();
            }else{
                story.innerHTML += "Zavar van az Erőben! Mellé lőttél!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}