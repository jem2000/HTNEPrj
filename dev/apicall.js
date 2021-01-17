
async function getSIRfromData(t,state){// gets covid data from a certain state based on the day time converted to a string  state in state code abrevs
    let sp1 = "https://api.covidtracking.com/v1/states/";
    let sp3 = "/daily.json";
    let fullstring = sp1+String(state).toLowerCase()+sp3;

    const data = await getData(fullstring);

    let index = (data.length -1) - t*7;
    index = (index<0)?0:index;

    console.log("index=",index);
    
    let S = await data[index].total-data[index].positive-data[index].death;
    let I = await data[index].positive;
    let R = await data[index].death ;

    console.log("date=",data[index].date);
    console.log("Suseptabe=",data[index].total-data[index].positive-data[index].death);
    console.log("Infected=",data[index].positive);
    console.log("recovered=",data[index].death);
    console.log(typeof data[index].death);
    console.log(data.length);


    return [S, I, R];
}
async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const D = document.getElementById('D');
const asyncButton = document.getElementById('asyncButton');

asyncButton.addEventListener('click', async () => {
    console.log('clicked')
    try {
        var array = (await getSIRfromData(52, 'ca'));
        D.value = array[0];


    } catch(error) {
        D.value = `There was a problem: ${error}`;
    }
})



// async function querryapi(instring){

//   	return { data };
// }
