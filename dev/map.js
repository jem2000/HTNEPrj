// Initialize and add the map
// This code was written for Hack the North East 2021 by Justin Melville and George Kent-Scheller.
// v20210117
// it incorporates data from:
// CovidTracking.com,
// " Epidemiological parameter review and comparative dynamics of influenza, respiratory syncytial virus, rhinovirus, human coronavirus, and adenovirus"
// it is currently hosted on https://pandemicsimulator.neocities.org/.

function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}