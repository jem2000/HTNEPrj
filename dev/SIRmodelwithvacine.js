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
function SIREulersPrt1(){
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
    
    return [S,R,I]
}
function dSv(a,S,I,vaxRate){
    return -a*S*I -vaxRate;
}
function dRv(b,I,vaxRate){
    return b*I+vaxRate
}
function SIREulersWVac(vaxtime,vaxRatePerWeek){
    let S = s0
    let I = i0
    let R = r0
    let array;  
    if(vaxtime<t){
        let tempT = t; 
        t = vaxtime;
        array =  SIREulersPrt1();
        t0 = vaxtime;
        t = tempT;
        s0 = array[0];
        i0 = array[1];
        r0 = array[2];
        
        let S = s0
        let I = i0
        let R = r0
        //var cstep = t0
        for(let i = 0; i < ((t - t0) / ss); i++){
            let s = S+ss*dSv(a,S,I,vaxRatePerWeek)
            let i = I+ss*dI(a,b,S,I)
            let r = R+ss*dR(b,I,vaxRatePerWeek)
            S = s>0?s:0
            I = i>0?i:0
            R = r>0?r:0
            //cstep++
        }
        S = S * pop
        I = I * pop
        R = R * pop
        let SS = Math.round(S);
        let CI = Math.round(I);
        let TI = Math.round(I + R);
        let Rec = Math.round(R * (1 - dr));
        let D = Math.round(R * dr);

        array =  [SS, CI, TI, Rec, D] ;
    }
    else{
       array= SIREulers();
    }

    return array;
}

