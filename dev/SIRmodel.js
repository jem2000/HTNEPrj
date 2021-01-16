// This is a conversion to js from the SIRmodelTesting.py
// function to model a sir model of desease spread using assumptions
// t is time desired, t0 is start time,ss is step size small is longer but better accuracy
// s0 is initial susceptible population
// i0 is the initial infected population
// r0 is the initial recovered population
// a is the rate of infection
// b is the rate of recovery

//global vars
let t = 0;
let t0 = 0;
let ss;
let s0 = 874961;
let i0 = 0;
let r0 = 0;
let a = 2.2;
let b = 3.0;

function setCityData(city) {
    if (city === "nyc")
        s0 = 18804000;
    if (city === "boston")
        s0 = 4309000;
}

function setVirusData(virus) {
    if (virus === "flu") {
        a = 3;
        b = 2.5;
    }
    if (virus === "cold") {
        a = 1.5;
        b = 2.8;
    }
}


function dS(a,S,I){
    return -a*S*I;
}
function dI(a,b,S,I){
    return a*S*I -b*I;
}
function dR(b,I){
    return b*I;
}
function SIREulers(){
    let S = s0;
    let I = i0;
    let R = r0;
    //var cstep = t0;
    for(let i=0;i< ((t-t0)/ss);i++){
        let s = S+ss*dS(a,S,I);
        let i = I+ss*dI(a,b,S,I);
        let r = R+ss*dR(b,I);
        S=s;
        I=i;
        R=r;
        //cstep++;
    }
    return [S,I,R];
}
