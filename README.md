# SIR Covid-19 Visualizer
A repository for all our code worked on during Hack The North East Hack-a-thon to build our SIR Covid-19 Visualizer

## Domain Name

This project was built as a way to visualize the spread of infectious diseases, especially Covid-19 using easy-to-understand graphics. To do this, we used an SIR model, which is one of the simplest differential equations models for diseases. The name SIR comes from Susceptible, Infected and Recovered, which are the three compartments the model uses. 

To use this website, users must enter four pieces of information: 
  1. The city they want to model
  2. The disease they want to model (Only Covid-19 is currently implemented with accurate data)
  3. How many people were infected at day 1?
  4. How long has the virus been spreading?
  
In order to compare the SIR model numbers with the real-life data for Covid-19 tracking, users can click the 'retrieve' button, which will show the statistics for the inputted information. In order to view this data on the map, select the checkbox immmediately beneath this data to change the map view. 

The 'animate' button creates a short animation from day 1 to the inputted day showing how the various sections of the model change over time. 
