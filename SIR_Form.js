// This is a conversion to js from the SIRmodelTesting.py
// function to model a sir model of desease spread using assumptions
// t is time desired, t0 is start time,ss is step size small is longer but better accuracy
// s0 is initial susceptible population
// i0 is the initial infected population
// r0 is the initial recovered population
// a is the rate of infection
// b is the rate of recovery

//global vars
let pop = 874961.0
let t = 20.0
let t0 = 0.0
let ss = 0.01
let s0 = 0.995
let i0 = 0.005
let r0 = 0.0
let a = 2.0
let b = 1.0
let dr = 0.01

function setCityData(city) {
    if (city === "sf") {
        pop = 874961.0
    }
    if (city === "nyc") {
        pop = 18804000.0
    }
    if (city === "boston") {
        pop = 4309000.0
    }
}

function setVirusData(virus) {
    if (virus === "covid") {
        a = 2.0
        b = 1.0
        dr = 0.01
    }
    if (virus === "flu") {
        a = 3.0
        b = 2.5
        dr = 0.05
    }
    if (virus === "cold") {
        a = 1.5
        b = 2.8
        dr = 0.001
    }
}

function setTimeLength(time) {
    t = time / 7
    console.log(t)
}

function setInitialInfectedData(infected) {
    i0 = infected / pop
    s0 = 1 - i0
    console.log(i0)
    console.log(s0)
}


function dS(a,S,I){
    return -a*S*I
}
function dI(a,b,S,I){
    return a*S*I -b*I
}
function dR(b,I){
    return b*I
}
function SIREulers(){
    let S = s0
    let I = i0
    let R = r0
    //var cstep = t0
    for(let i = 0; i < ((t - t0) / ss); i++){
        let s = S+ss*dS(a,S,I)
        let i = I+ss*dI(a,b,S,I)
        let r = R+ss*dR(b,I)
        S = s>0?s:0
        I = i>0?i:0
        R = r>0?r:0
        //cstep++
    }
    S = S * pop
    I = I * pop
    R = R * pop
    let SS = Math.round(S)
    let CI = Math.round(I)
    let TI = Math.round(I + R)
    let Rec = Math.round(R * (1 - dr))
    let D = Math.round(R * dr)

    return [SS, CI, TI, Rec, D]
}

// Initialize and add the map
function DrawCircles(S,I,R){
    let c = document.getElementById("myCanvas");
    let N = S+I+R;
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    let shortervar = (c.width<c.height)? c.width:c.height;
    shortervar = shortervar/2;
    let sizechangeS = S/N;
    let sizechangeI = I/N;
    let sizechangeR = R/N;


    centerX = c.width/2;
    centerY = c.height/2;
    ctx.globalAlpha = 0.70;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX, centerY, shortervar*sizechangeI, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    if(R>I){
        ctx.globalAlpha = 0.5;
    }
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(centerX, centerY, shortervar*sizechangeR, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    if(S>I || S>R){
        ctx.globalAlpha = 0.5;
    }
    else{
        ctx.globalAlpha = 0.95;
    }
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(centerX, centerY, shortervar*sizechangeS, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const AnimateToTime = async () => {
  let timefeild = document.getElementById('time')
  let valtime = timefeild.value;
  let array;
  let infectedval =document.getElementById('infected').value;
  setInitialInfectedData(infectedval);
  for(i = 0;i<valtime;i++){
     await sleep(200);
     t = i;
     array = SIREulers();
     DrawCircles(array[0],array[1],array[2]);
  }  
}

function setValues() {
    let SS = document.getElementById('SS')
    let CI = document.getElementById('CI')
    let TI = document.getElementById('TI')
    let R = document.getElementById('R')
    let D = document.getElementById('D')

    let array = SIREulers()

    SS.value = array[0]
    CI.value = array[1]
    TI.value = array[2]
    R.value = array[3]
    D.value = array[4]
}





async function getSIRfromData(t,state){// gets covid data from a certain state based on the day time converted to a string  state in state code abrevs
    let sp1 = "https://api.covidtracking.com/v1/states/";
    let sp3 = "/daily.json";
    let fullstring = sp1+String(state).toLowerCase()+sp3;

    const data = await getData(fullstring);

    let index = Math.round((data.length -1) - t);
    index = (index<0)?0:index;

    console.log("index=",index);
    console.log(data);
    let S = await data[index].total-data[index].positive-data[index].death;
    let I = await data[index].positive;
    let D = await data[index].death ;

    console.log("date=",data[index].date);
    console.log("Susceptible=",data[index].total-data[index].positive-data[index].death);
    console.log("Infected=",data[index].positive);
    console.log("recovered=",data[index].death);
     console.log(S,I,D);
    //console.log(typeof data[index].death);
    //console.log(data.length);


    return [S, I, D];
}



async function getData(url) {
    const response = await fetch(url);
    return response.json();
}


const asyncButton = document.getElementById('button');



asyncButton.addEventListener('click', async () => {
    console.log('clicked')
    let API_SS = document.getElementById('API_SS')
    let API_CI = document.getElementById('API_CI')
    let API_D = document.getElementById('API_D')
    let timefeild = document.getElementById('time')
    let valtime = timefeild.value;
    AnimateToTime();
    try {
        // let API_SS = document.getElementById('API_SS')
        // let API_CI = document.getElementById('API_CI')
        // let API_D = document.getElementById('API_D')
        console.log(t);
        console.log("time value",valtime);
        let array;    
        if (pop === 874961.0)
            array = await getSIRfromData(t*7, 'ca')
        if (pop === 18804000.0) 
            array = await getSIRfromData(t*7, 'ny')
        if (pop === 4309000.0)
            array = await getSIRfromData(t*7, 'ma')
    
        API_SS.value = array[0]
        API_CI.value = array[1]
        API_D.value = array[2]
        console.log(array[0],array[1],array[2]);

    } catch(error) {
        API_SS.value = `There was a problem: ${error}`;
        API_CI.value = `There was a problem: ${error}`;
        API_D.value = `There was a problem: ${error}`;
    }
   
})


// function setAPIValues() {
//     let API_SS = document.getElementById('API_SS')
//     let API_CI = document.getElementById('API_CI')
//     let API_D = document.getElementById('API_D')
    
//     let array;
//     if (pop === 874961.0)
//         array = getSIRfromData(t, 'ca')
//     if (pop === 18804000.0) 
//         array = getSIRfromData(t, 'ny')
//     if (pop === 4309000.0)
//         array = getSIRfromData(t, 'ma')
    
//     API_SS.value = array[0]
//     API_CI.value = array[1]
//     API_D.value = array[2]
// }
