
async function getSIRfromData(t,state){// gets covid data from a certain state based on the day time converted to a string  state in state code abrevs
	var sp1 = "https://api.covidtracking.com/v1/states/";
	var sp3 = "/daily.json";
	var fullstring = sp1+String(state).toLowerCase()+sp3;
	var index = t;
	const data = await getData(fullstring);
	console.log({ data });

	console.log(data[t].date);
	console.log(data[t].total-data[t].positive-data[t].death);
	console.log(data[t].positive);
	console.log(data[t].death);
	var S = await data[t].date;
	var I = await data[t].positive;; 
	var R = await data[t].death + 43;
	return [S,I,R];
}
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}
// async function querryapi(instring){
	
//   	return { data };
// }

getSIRfromData(0,"ca");