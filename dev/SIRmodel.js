// This is a converstion to js from the SIRmodelTesting.py
// function to model a sir model of desease spread using assumptions 
// t is time desiried, t0 is start time,ss is step size small is longer but better accuracy
// s0 is inital sepible population 
// i0 is the inital infected population 
// r0 is the inital recoved population
// a is the rate of infection 
// b is the rate of recovery
function dS(a,S,I){
	return -a*S*I;
}
function dI(a,b,S,I){
	return a*S*I -b*I;
}
function dR(b,I){
	return b*I;
}
function SIREulers(t,t0,ss,s0,i0,r0,a,b){
	var S = s0;
    var I = i0;
    var R = r0;
	//var cstep = t0;
    for(i=0;i< ((t-t0)/ss);i++){
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