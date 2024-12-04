# Infrastructure as a Service

## Wat wordt hiermee bedoeld?
Infrastructure as a Service (IaaS) is een cloud computing-model waarbij je veel zaken zelf moet regelen zoals virtual machines, opslag, netwerken en andere computerresources via het internet. In plaats van te investeren in en zelf te beheren van fysieke hardware, kunnen organisaties met IaaS on-demand rekenkracht en opslagcapaciteit huren bij cloudproviders. IaaS is te vergelijken met een pizza kopen in de winkel en thuis afbakken. Je moet best nog veel zelf doen. Als je kijkt vanuit een duurzaamheidsbril en security is dat ook de reden dat je zo min mogelijk IaaS moet willen beheren:

- Veel in eigen beheer en dus ben je zelf verantwoordelijk voor Security patching en efficiënte inrichting.

- PaaS en SaaS zijn doorgaans duurzamer dan IaaS omdat ze meer optimalisatie bieden door gedeeld gebruik van infrastructuur en schaalvoordelen. Dit leidt tot een lager energieverbruik per gebruiker. SaaS is bijzonder efficiënt doordat de software volledig wordt beheerd door de provider, wat energieverspilling minimaliseert.

- IaaS daarentegen is duurzamer dan on-premises infrastructuur, omdat cloudproviders geavanceerde energieoptimalisaties en hernieuwbare energie kunnen toepassen. On-premises systemen verbruiken vaak meer energie door inefficiënt beheer en onderbenutte hardware. Zie ook ['Twin Datacenters'](wiki.html?page=twinDatacenters)

![alt text](wiki/pizzaservice.jpg)

## Hoe staan we ervoor?
Wigo4it heeft een mantra waar in staat dat we 30 keer per dag willen releasen voor in potentie 200 gemeenten. Dat kan alleen maar als je geen maatwerk schrijft (maatwerk is sowieso niet duurzaam) en zoveel mogelijk gebruik maakt van wat de cloud te bieden heeft. Wij proberen dan ook IaaS tot het minimum te beperken en nemen vooral andere type resources af:

- Container as a Service (CaaS) in de vorm van Azure Kubernetes Service en Container Apps.

- Appservices zoals WebApps

- SQL managed instances (PaaS)

Al deze diensten schalen veel beter dan IaaS diensten, waardoor we onze omgeving zo efficiënt mogelijk inzetten. 

## Waar kan ik hier meer over lezen?
- <a href="https://engineering.dunelm.com/pizza-as-a-service-2-0-5085cd4c365e">Pizza as a Service</a>