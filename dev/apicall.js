


async function getSIRfromData(t,state){// gets covid data from a certain state based on the day time converted to a string  state in state code abrevs
    let sp1 = "https://api.covidtracking.com/v1/states/";
    let sp3 = "/daily.json";
    let fullstring = sp1+String(state).toLowerCase()+sp3;
    let index = t;
    const data = await getData(fullstring);
    console.log({ data });

    console.log(data[t].date);
    console.log(data[t].total-data[t].positive-data[t].death);
    console.log(data[t].positive);
    console.log(data[t].death);
    console.log(typeof data[t].death)

    let S = await data[t].date;
    let I = await data[t].positive;
    let R = await data[t].death + 43;

    console.log(S)
    console.log(I)
    console.log(R)
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
        D.value = (await getSIRfromData(0, 'ca'))[0]

    } catch(error) {
        D.value = `There was a problem: ${error}`;
    }
})



// async function querryapi(instring){

//   	return { data };
// }

getSIRfromData(0,"ca");
