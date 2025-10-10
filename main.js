import { addMachine, deleteMachine, updateValues} from "./crud.js";

const btnEnergia = document.getElementById("btn-energia");
const btnLiga = document.getElementById("btn-ligar");
const btnEncher = document.getElementById("btn-encher");
const btnEsfriar = document.getElementById("btn-esfriar");

const imgEnergia = document.getElementById("img-energia");
const imgLigar = document.getElementById("img-ligar");
const imgEncher = document.getElementById("img-encher");
const imgEsfriar = document.getElementById("img-esfriar");

const drill = document.getElementById("drill");

const togglePin = document.getElementById("toggleConnection");
const pin = document.getElementById("pin");

const dspEnergia = document.getElementById("dsp-energia");
const dspLigado = document.getElementById("dsp-liga");
const dspCool = document.getElementById("dsp-cool");
const dspTemp = document.getElementById("dsp-temp");

const AdspEnergia = document.getElementById("Adsp-energia");
const AdspLigado = document.getElementById("Adsp-liga");
const AdspCool = document.getElementById("Adsp-cool");
const AdspTemp = document.getElementById("Adsp-temp");

/////////////////////////////////////////////////////////////////////
//VARIÁVEIS GLOBAIS//
let isPinShowing = false
let isPowered = false;
let isOn = false;
let temp = 25;
let cool = 5;
let activeTime = 0;
let consumption = 0;
let tempTime = 1000;
let durability = 1000;
let maxtemp = 300
let ftempcoolTimeout;
let reduceCoolantLevelTimeout;
let pinValue;
(async ()=>{
    pinValue = await addMachine()
})();
let updateAllTimeout;

//BOTÕES//
btnEnergia.addEventListener('click', () => {
    if (isPowered == false && temp<maxtemp) {
        isPowered = true;
        imgEnergia.src = "./img/switch/onSwitch.png"
        AdspEnergia.textContent = "🟢"
        if (isOn == true) {
            AdspLigado.textContent = "🟢"
        }

    }
    else {
        isPowered = false;
        imgEnergia.src = "./img/switch/offSwitch.png"
        AdspEnergia.textContent = "🔴"
        AdspLigado.textContent = "🔴"
    }
})

btnLiga.addEventListener('click', () => {
    {
        if (isOn == false && temp<maxtemp) {
            isOn = true;
            imgLigar.src = "./img/switch/onSwitch.png"
            if (isPowered) {
                AdspLigado.textContent = "🟢"

            }

        }
        else {
            isOn = false;
            imgLigar.src = "./img/switch/offSwitch.png"
            AdspLigado.textContent = "🔴"

        }
    }
})
btnEncher.addEventListener('click', () => {
    if(temp<maxtemp){
    cool = 5;
    AdspCool.textContent = "5.00L"}
})

btnEsfriar.addEventListener('click', () => {
    if(temp<maxtemp){
    temp = 25
    AdspTemp.textContent = "25°C"}
})

togglePin.addEventListener('click', () => {
    if (!isPinShowing) {
        isPinShowing = true
        togglePin.textContent = "-"
        pin.textContent = pinValue
    }
    else {
        isPinShowing = false
        togglePin.textContent = "👁"
        pin.textContent = "**************************"
    }
})

//DRILL//
setInterval(fdrill, 16);
function fdrill() {
    if (isPowered && isOn && temp<maxtemp) {
        drill.src = "./img/drill/on.png"
    }
    else {
        drill.src = "./img/drill/off.png"
    }
}
//TEMP//
function ftempcool() {
    clearTimeout(ftempcoolTimeout)
    if (isPowered && isOn && temp >= 25 && cool > 0 && temp<maxtemp) {
        if (temp < 50) temp = temp + 1;
        else if (temp > 50) temp = temp - 1
        tempTime = 1000
        activeTime = activeTime + tempTime/1000
        consumption = 700 * activeTime
        durability = durability-1
    }
    else if (temp > 25 && cool > 0 && temp<maxtemp) {
        temp = temp - 1;
        tempTime = 2000
    }
    else if (temp < 25) {
        temp = 25;
    }
    else if (cool <= 0 && isPowered && isOn && temp<maxtemp) {
        temp = temp + 1;
        tempTime = 200
        activeTime = activeTime + tempTime/1000
        consumption = 700 * activeTime
        durability = durability-1
    }
    else if (cool <= 0 && temp<maxtemp) {
        if (!isPowered || !isOn) {
            temp = temp - 1;
            tempTime = 2000
        }
    }
    if(temp>maxtemp){
        temp = maxtemp
    }
    else if(temp===maxtemp){
        document.querySelector(".broken").style.display = "block"
        isPowered = false
        isOn = false
        imgLigar.src = "./img/switch/offSwitch.png"
        imgEnergia.src = "./img/switch/offSwitch.png"
        AdspLigado.textContent = "🔴"
        AdspEnergia.textContent = "🔴"

    }
    else{
        document.querySelector(".broken").style.display = "none"
    }

    if(durability<0){
        durability = 0
    }
    if(durability<100){
        document.querySelector(".nobit").style.display = "block"
    }
    if(durability==0){
        document.querySelector(".nobit").style.display = "block"
        isPowered = false
        isOn = false
        imgLigar.src = "./img/switch/offSwitch.png"
        imgEnergia.src = "./img/switch/offSwitch.png"
        AdspLigado.textContent = "🔴"
        AdspEnergia.textContent = "🔴"
    }

    AdspCool.textContent = cool.toFixed(2) + "L";
    AdspTemp.textContent = temp + "°C";
    ftempcoolTimeout = setTimeout(ftempcool, tempTime)
}
ftempcool()

function reduceCoolantLevel() {
    clearTimeout(reduceCoolantLevelTimeout)
    if (isPowered && isOn && temp >= 25 && cool > 0) {
        if (cool > 0) cool = cool - 0.01       
        AdspCool.textContent = cool.toFixed(2) + "L";
    }
    if (cool < 0) {
        cool = 0;
    }
    reduceCoolantLevelTimeout = setTimeout(reduceCoolantLevel, 500);
}
reduceCoolantLevel()

async function updateAll() {
    clearTimeout(updateAllTimeout)
    updateValues(pinValue, isPowered, isOn, Number(cool.toFixed(2)), temp, Number(activeTime.toFixed(2)), Number(consumption.toFixed(2)), Number(durability.toFixed(2)))
    updateAllTimeout = setTimeout(updateAll, 1000);
}
updateAll()

window.addEventListener('unload', () => {
    deleteMachine(pinValue)
});
window.addEventListener('reload', () => {
    deleteMachine(pinValue)
});

document.querySelector(".broken").addEventListener('click',()=>{
    temp = 25;
    isOn = false
    isPowered = false
    btnEnergia.src = "./img/switch/offSwitch.png"
    btnLiga.src = "./img/switch/offSwitch.png"
    cool = 5;
    activeTime = 0
    consumption = 0
    durability = 1000
})

document.querySelector(".nobit").addEventListener('click',()=>{
    durability = 1000
    document.querySelector(".nobit").style.display = "none"
})










