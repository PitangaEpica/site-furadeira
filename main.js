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
let cool = 5
let tempTime = 1000;
let ftempcoolTimeout;
let reduceCoolantLevelTimeout;

//BOTÕES//
btnEnergia.addEventListener('click', () => {
    if (isPowered == false) {
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
        if (isOn == false) {
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
    cool = 5;
    AdspCool.textContent = "5.00L"
})

btnEsfriar.addEventListener('click', () => {
    temp = 25
    AdspTemp.textContent = "25°C"
})

togglePin.addEventListener('click', () => {
    if (!isPinShowing) {
        isPinShowing = true
        togglePin.textContent = "-"
        pin.textContent = "asdffaffsads"
    }
    else {
        isPinShowing = false
        togglePin.textContent = "👁"
        pin.textContent = "*****************"
    }
})

//DRILL//
setInterval(fdrill, 16);
function fdrill() {
    if (isPowered && isOn) {
        drill.src = "./img/drill/on.png"
    }
    else {
        drill.src = "./img/drill/off.png"
    }
}
//TEMP//
function ftempcool() {
    clearTimeout(ftempcoolTimeout)
    if (isPowered && isOn && temp >= 25 && cool > 0) {
        if (temp < 50) temp = temp + 1;
        else if (temp > 50) temp = temp - 1
        tempTime = 1000
    }
    else if (temp > 25 && cool > 0) {
        temp = temp - 1;
        tempTime = 2000
    }
    else if (temp < 25) {
        temp = 25;
    }
    else if (cool <= 0 && isPowered && isOn) {
        temp = temp + 1;
        tempTime = 200
    }
    else if (cool <= 0) {
        if (!isPowered || !isOn) {
            temp = temp - 1;
            tempTime = 2000
        }
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








