# Twin Datacenters

## Wat wordt hiermee bedoeld?
Een twin datacenter is een concept waarbij twee datacenters in nauwe samenwerking opereren en elkaar (in geval van nood) ondersteunen. Deze datacenters zijn geografisch van elkaar gescheiden, maar verbonden via een snelle en betrouwbare netwerkverbinding. Ze werken samen om gegevens en diensten redundant en veiliger te beheren. Dit betekent dat als één datacenter uitvalt door een storing, natuurramp, of onderhoud, het andere datacenter onmiddellijk kan overnemen zonder dat dit merkbare impact heeft op de beschikbaarheid van de diensten of gegevens.

Hoewel een twin datacenter veel voordelen biedt op het gebied van betrouwbaarheid en gegevensbescherming, is het geen duurzaam concept:

-  Omdat beide datacenters vrijwel identieke systemen en gegevens onderhouden, betekent dit dat er dubbele hoeveelheden stroom nodig zijn om beide locaties operationeel te houden. Dit verhoogt het totale energieverbruik aanzienlijk, zelfs als maar één datacenter op een bepaald moment actief wordt gebruikt (active/passive).

-  Twee datacenters vereisen elk hun eigen koelsystemen, wat extra energie kost. Datacenters genereren veel warmte door de constante werking van servers, waardoor koeling essentieel is. In een twin datacenter-scenario is deze behoefte uiteraard twee keer zoveel.

-  Het beheren van twee gelijke datacenters vereist extra hardware, netwerkverbindingen en onderhoud. Deze extra infrastructuur leidt tot een grotere vraag naar energie en materiaalgebruik, wat op zijn beurt bijdraagt aan de ecologische voetafdruk van de organisatie.

<video width="640" height="480" controls>
  <source src="wiki/datacenteruit.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Hoe staan we ervoor?
Wigo4it heeft geen eigen datacenters meer sinds 2024. Alles draait nu in de cloud en wordt zo efficient als mogelijk is ingezet. We bouwen conform onze SLA en hebben dus niets te veel draaien vanuit de gedachte beschikbaarheid of veiligheid. Hoe garanderen we nu nog steeds dezelfde dienstverlening zonder twin datacenter concept:

- Alle infrastructuur staat in Terraform code en kunnen we met een paar drukken op de knop opnieuw uitrollen. Ieder jaar testen we dit tijdens onze Workation. We bouwen dan alles van scratch af aan opnieuw op in een andere region.

- Pay as you Go: Omdat we nu veel beter inzicht hebben in wat er staat de draaien en wat dat kost, kunnen we er ook veel beter op sturen. Er staat dus nooit meer hardware te zoomen dat niet gebruikt wordt, want dat kost ook direct geld. (vroeger was het toch al betaald)

- De kosten zijn meer dan gehalveerd in de cloud ten opzichte van eigen datacenters. Dit komt doordat we geen eigen hardware meer hebben, langdurige contracten en momenteel echt alleen betalen voor dat wat we gebruiken. 

## Waar kan ik hier meer over lezen?
- <a href="https://www.compact.nl/articles/strategische-keuzen-rondom-datacenters-2/">Twin datacenter concept</a>