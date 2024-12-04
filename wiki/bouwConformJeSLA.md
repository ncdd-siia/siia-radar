# Bouw conform je SLA

## Wat wordt hiermee bedoeld?

Het bouwen volgens je Service Level Agreement (SLA) voorkomt overengineering en onnodig gebruik van resources. Bij een SLA van 99,5% is het niet noodzakelijk om een extreem hoge beschikbaarheid (Fault Tolerance) te garanderen, zoals bij vliegtuigen, waarbij alles dubbel uitgevoerd moet worden. Een oplossing met hoge beschikbaarheid (High Availability) is vergelijkbaar met een auto; je kunt downtime hebben. Als je een lekke band hebt, stop je even op de vluchtstrook, verwissel je de band en ga je weer op weg.

Het is belangrijk om te begrijpen dat een SLA van 99,5% betekent dat er een acceptabele downtime van ongeveer 3,65 uur per maand is. Dit is voldoende voor veel toepassingen. Door te bouwen volgens je SLA, kun je ervoor zorgen dat je systeem betrouwbaar is zonder onnodige gebruik van hardware en energie.

- Automatiseer alles. Zo voorkom je ([pets](wiki.html?page=pets)), oftewel systemen die handmatig beheerd moeten worden en daardoor kwetsbaar zijn voor fouten en dubbel moeten worden uitgevoerd.

- Indien je schaling gebruikt, zorg er dan voor dat deze schaalt over meerdere availability zones. Dit verhoogt de betrouwbaarheid en beschikbaarheid van je diensten, omdat het systeem bestand is tegen uitval in één enkele zone.

## Hoe staan we ervoor?

Wij bouwen auto's geen vliegtuigen.

- Omdat wij alles hebben geautomatiseerd en binnen minuten resources ([cattle](wiki.html?page=cattle)) in de cloud opnieuw kunnen creëren, hebben wij geen twin datacenter (FT) concept meer nodig. Hiermee halveren wij het aantal gebruikte resources. Hierdoor kunnen we de betrouwbaarheid en beschikbaarheid van onze diensten garanderen en tegelijkertijd onze CO2-voetafdruk halveren.

- Bedrijfskritieke componenten worden over meerdere availability zones geschaald. Dit is niet hetzelfde als een twin datacenter, omdat we niet meer resources gebruiken, maar deze slim verdelen. 

## Waar kan ik hier meer over lezen?
- <a href="https://www.ibm.com/docs/en/powerha-aix/7.2?topic=aix-high-availability-versus-fault-tolerance">High availability versus fault tolerance</a>
