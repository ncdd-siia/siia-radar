# Energy Proportionality

## Wat wordt hiermee bedoeld?
Energy proportionality is het concept waarbij het energieverbruik van een apparaat, zoals een server of CPU, in verhouding moet staan tot de werkelijke belasting die het apparaat uitvoert. Ideaal gezien zou een processor alleen energie gebruiken in verhouding tot de rekenkracht die daadwerkelijk wordt gevraagd, maar in de praktijk werken veel systemen minder efficiënt bij gedeeltelijke belasting.

Voorbeelden van energy proportionality:

- **Hoge belasting, hoge efficiëntie**: Wanneer een CPU op 100% van zijn capaciteit draait, is deze over het algemeen het meest energie-efficiënt, omdat de volledige energie wordt omgezet in prestaties.
- **Lage belasting, lagere efficiëntie**: Bij 50% belasting verbruikt een CPU nog steeds een relatief groot deel van zijn maximale energie, maar levert slechts de helft van de prestaties, wat leidt tot een lagere energie-efficiëntie.
- **Het verschil met auto's**: Terwijl een auto het meest efficiënt rijdt bij lagere snelheden (zoals 90 km/u), en inefficiënt wordt bij hoge snelheden (zoals 200 km/u), werkt een CPU precies omgekeerd. Bij een CPU neemt de energie-efficiëntie juist toe naarmate de belasting stijgt richting 100%, omdat het energieverbruik in verhouding staat tot de geleverde prestaties.
- **Moderne CPU's verbeteren proportionaliteit**: Nieuwere CPU's hebben technologieën zoals "dynamic voltage and frequency scaling" (DVFS), waarmee ze hun energieverbruik kunnen aanpassen op basis van de werklast. Dit maakt ze efficiënter dan oudere generaties. Hoewel er vooruitgang is geboekt, blijft het energieverbruik bij gedeeltelijke belasting nog steeds een uitdaging. Zelfs wanneer een processor slechts voor 20-30% wordt belast, kan hij tot 50-70% van zijn maximale energie verbruiken.

## Hoe staan we ervoor?
De zoektocht naar betere energy proportionality is een belangrijk onderwerp bij ons, omdat het verbeteren van de energie-efficiëntie bij lagere belasting kan leiden tot aanzienlijke energiebesparingen, vooral in onze cloud. Daarom kiezen we er liever voor om in het begin kleiner te schalen en vervolgens op te schalen naarmate de vraag groeit, in plaats van direct te overdimensioneren.

## Plaatje
![alt text](wiki/energyProportionality.png) 