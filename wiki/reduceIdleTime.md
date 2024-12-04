# Reduce idle time

## Wat wordt hiermee bedoeld?
Reducing idle time is een belangrijk duurzaamheidsprincipe, omdat het gaat om het minimaliseren van het energieverbruik en de resourceverspilling wanneer systemen niet actief worden gebruikt. Door ervoor te zorgen dat resources, zoals virtuele machines of AKS nodes, niet onnodig draaien tijdens inactiviteit, kan er veel energie worden bespaard en wordt de CO2-uitstoot verminderd. Dit is vooral relevant in cloudomgevingen, waar resources dynamisch kunnen worden geschaald op basis van gebruik. Waarom is het nog meer verstandig om idle time zoveel mogelijk te reduceren:

- Het uitschakelen van inactieve processen zorgt ervoor dat resources alleen worden gebruikt wanneer ze echt nodig zijn. Dit leidt tot een efficiënter gebruik van hardware en software, wat minder verspilling van CPU-tijd, geheugen en opslag betekent.

- Het verminderen van idle time betekent minder energieverbruik, wat leidt tot minder vraag naar elektriciteit, en in veel gevallen wordt deze elektriciteit nog steeds opgewekt door fossiele brandstoffen.

- In bepaalde resources is er de mogelijkheid om een ingebouwde functie genaamd auto-shutdown te configureren. Deze zorgt ervoor dat deze resources automatisch worden uitgeschakeld buiten werkuren of wanneer ze inactief zijn, wat verspilling voorkomt.

## Hoe staan we ervoor?
Wigo4it is best lekker bezig als het gaat om het voorkomen van idle time:

- We maken gebruik van Azure Kubernetes - Autoscaling, hierdoor worden inactieve pods automatisch uitgeschakeld. Ook maken we gebruik van Virtual Machine ScaleSets voor onze pipelines. Hiervan staan er slecht 1 of 2 stand-by. 

- Onderzoeken of we onze idle time in de nacht waar we niet onderuit komen in kunnen zetten voor iets nuttigs. (Dit moeten we nog verder uitwerken)

- We hebben nog een klein beetje legacy draaien. Deze staat dus vaak in de nacht niets te doen. Door deze legacy om te bouwen naar meer cloud-native oplossingen kunnen we nog een slag maken. 

## Waar kan ik hier meer over lezen?
- <a href="https://www.computerweekly.com/feature/A-waste-of-energy-Dealing-with-idle-servers-in-the-datacentre">Waste of Energy</a>