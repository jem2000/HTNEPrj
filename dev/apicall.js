var stateData; 
function getSIRfromData(t,state){// gets covid data from a certain state based on the day time converted to a string  state in state code abrevs
	var sp1 = "https://api.covidtracking.com/v1/states/";
	var sp3 = "/daily.json";
	var fullstring = sp1+String(state).toLowerCase()+sp3;
	querryapi(fullstring);
	//console.log(stateData[0].date);
	var S;
	var I; 
	var R;
	return [S,I,R];
}
function querryapi(instring){
   fetch(instring)
  .then(response => response.json())
  .then(json => console.log(json));
}
getSIRfromData(0,"ca");