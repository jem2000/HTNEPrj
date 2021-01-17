# test python file for testing sir model 
# This code was written for Hack the North East 2021 by Justin Melville and George Kent-Scheller.
# v20210117
# it incorporates data from:
# CovidTracking.com,
# " Epidemiological parameter review and comparative dynamics of influenza, respiratory syncytial virus, rhinovirus, human coronavirus, and adenovirus"
# it is currently hosted on https://pandemicsimulator.neocities.org/.

def dy(y,t):
	return (y*y+t)
def EulerMethod(t,t0,y0,stepsize):
	tlen = t-t0
	y = y0
	tcurr = t0
	for i in range(int(float(tlen)/float(stepsize))):
		y = y + stepsize*dy(y,tcurr) 
		tcurr = tcurr+stepsize
		print(tcurr,"|",y)
	return y
EulerMethod(5,0,0,0.5)

a = 2.0
b = 1
InitiallyInf =0.005
Population = 1
InitallySus = Population -InitiallyInf
InitallyRec = 0 

S = InitallySus
I = InitiallyInf
R = InitallyRec
def dS(S,I):
	#print("in ds:",a,"\t",S,"\t",I)
	return -a*S*I
def dI(S,I):
	#print("in dI:",a,"\t",S,"\t",I)
	return a*S*I -b*I	
def dR(I):
	#print("in dr:",a,"\t",S,"\t",I)
	return b*I
def EulerMethodSRI(S,R,I,t,t0,stepsize):
	tlen = t-t0
	tcurr = t0
	sc = S
	ic = I
	rc = R
	for i in range(int(float(tlen)/float(stepsize))):
		Sn = sc + stepsize*dS(sc,ic) 
		In = ic + stepsize*dI(sc,ic) 
		Rn = rc + stepsize*dR(ic)


		sc = Sn
		ic = In
		rc = Rn 
		
		tcurr = tcurr+stepsize
		print(tcurr,"|",sc,"|",ic,"|",rc)
	return sc,ic,rc
EulerMethodSRI(S,R,I,20,0,0.1)		
