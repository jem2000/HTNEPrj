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
	return (a*S*I -b*I);
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
    	let check = dS(a,S,I)+ dR(b,I)+dI(a,b,S,I) == 0 
    	let s = S+ss*dS(a,S,I);
    	let i = I+ss*dI(a,b,S,I);
        let r = R+ss*dR(b,I);
        console.log("\t",S,"\t",I,"\t",R);
        S=s;
        I=i;
        R=r;
    	//cstep++;
    }
    return [S,I,R];
}
s0 = 1000000;
a = 0.5;
b = 200000;

var k = SIREulers(20,0,0.001,s0,200,0,a,b);
console.log(k[0],"\t",k[1],"\t",k[2]);
console.log("rval = ",(a*s0)/b);
