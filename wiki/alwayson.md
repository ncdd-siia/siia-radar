# Always On

## Wat wordt hiermee bedoeld?
Het "always-on" principe, waarbij IT-systemen en hardware continu draaien, lijkt op het eerste gezicht een handige manier om constante toegang en beschikbaarheid te garanderen. Echter, dit model heeft aanzienlijke nadelen op het gebied van duurzaamheid binnen de IT-sector. Het voortdurende gebruik van servers, datacenters en hardware die altijd operationeel is, leidt tot inefficiënties en verhoogde ecologische impact. De kosten en milieu-effecten van deze benadering zijn aanzienlijk en worden vaak over het hoofd gezien. Door te begrijpen waarom een altijd ingeschakelde infrastructuur niet duurzaam is, kunnen bedrijven en organisaties beter geïnformeerde beslissingen nemen over hoe ze hun IT-omgevingen kunnen optimaliseren om energieverbruik te verminderen en de ecologische voetafdruk te verkleinen. Hier zijn de belangrijkste redenen (met een sneeuwbal effect) waarom dit always-on concept niet duurzaam is:

- Hoge Energieconsumptie:

Altijd ingeschakelde apparatuur en datacenters verbruiken continu energie, zelfs wanneer de systemen niet actief worden gebruikt. Dit zorgt voor een constant hoog energieverbruik en daarmee inefficiëntie. Veel hardware is niet geoptimaliseerd voor continu gebruik, wat leidt tot onnodig energieverbruik en een grotere ecologische voetafdruk.

- Overmatige Koeling 

Altijd ingeschakelde hardware genereert constante warmte, wat betekent dat datacenters continu gekoeld moeten worden. Dit verhoogt het energieverbruik verder, aangezien koelsystemen ook continu moeten draaien. De extra energie die nodig is voor koeling en het onderhoud van de hardware belast de infrastructuur en verhoogt de totale milieu-impact.

- Slijtage van hardware

Hardware die constant in gebruik is, veroudert sneller en heeft een kortere levensduur. Dit leidt tot frequenter vervanging en meer elektronisch afval. Het sneller vervangen van hardware zorgt voor meer e-waste die vaak moeilijk te recyclen is en schadelijke effecten op het milieu hebben.

## Hoe staan we ervoor?
80% van alle workloads draaien volgens het [OnDemand](wiki.html?page=onDemand) principe. We kiezen er bewust voor om zo veel als mogelijk écht alleen te gebruiken als we dat op dat moment nodig hebben. We hebben uiteraard wel wat reservations voor bepaalde workloads, omdat we weten dat die 24/7 gebruikt worden. 
We hebben dus ook nog 20% always-on. Deze 20% draait bij ons in Azure VMware Solution (AVS). AVS hebben wij ingezet voor de laatste 20% van de workloads die we niet op tijd cloud-ready of cloud-native konden maken. Dit stelde ons in staat stelt om onze oude VMware-omgeving te lift en shiften naar Azure. Vanuit daar gaan we deze workloads afvoeren of cloud native maken. Kortom, wat is de status mbt always-on bij Wigo4it:

- 20% draait nog in AVS. AVS zien wij als een hypotheek. Deze AVS hypotheek willen we de komende twee jaar aflossen. Zie onze (- <a href="https://techradar.wigo4it.nl">TechRadar</a>)

- 80% is cloud-ready of cloud-native en gebaseerd op on-demand en pay-per-use. 

- We zetten Optimization tools in die ons scherp houden of we toch niet te veel 24/7 hebben draaien.

- Met de Wegwijzer zorgen we ervoor dat zelfs onze klanten indirect duurzame keuzes maken gebaseerd op het on-demand principe. 

## Waar kan ik hier meer over lezen?

- [OnDemand](wiki.html?page=onDemand)
- [Wegwijzer](wiki.html?page=wegwijzer)
- <a href="https://techradar.wigo4it.nl">TechRadar</a>
- <a href="https://azure.microsoft.com/en-us/products/azure-vmware">Azure VMware Solution</a>
