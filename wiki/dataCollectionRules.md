# Data Collection Rules

## Wat wordt hiermee bedoeld?
Data Collection Rules (in bijv Azure) helpen bij het bepalen welke gegevens überhaupt worden verzameld en hoe deze gegevens moeten worden verwerkt. In Azure Monitor en andere services kun je met Data Collection Rules specificeren welke gegevens moeten worden verzameld, gefilterd en naar waar deze gegevens moeten worden verzonden. DCR's maken het mogelijk om alleen de meest relevante gegevens op te slaan en onnodige gegevensuitwisseling of verwerking te vermijden. Dit helpt bij het optimaliseren van opslagruimte en rekenkracht, wat op zijn beurt bijdraagt aan duurzaamheid:

- Met DCR's kun je specifieke filters instellen om alleen de relevante en nuttige gegevens vast te leggen, in plaats van onnodige logbestanden, telemetrie of systeemgegevens te verzamelen die nooit worden gebruikt. Je gebruikt hierdoor minder opslag en dus minder stroom.

- Het versturen van grote hoeveelheden gegevens over netwerken verbruikt energie en verhoogt de belasting van netwerkapparatuur. Met DCR's kun je regelen welke gegevens naar centrale opslaglocaties, zoals Azure Monitor of Log Analytics, moeten worden verzonden. Door minder data te versturen, verminder je het dataverkeer en de bijbehorende energiebehoeften.

- In combinatie met retention policies kun je ervoor zorgen dat de data die is verzameld door DCR vervolgens ook niet langer bewaard wordt dan nodig is. 

## Hoe staan we ervoor?
Wigo4it maakt gebruik van Data Collection Rules in combinatie met retention policies. Deze vallen in principe onder de toekomstige ['Verwijder strategie'](wiki.html?page=verwijderStrategie). Hoe hebben wij dit ingericht: 

- We maken gebruik van DCR policies waardoor nieuw uitgerolde resources automatisch de juist DCR instellingen krijgen met de benodigde Diagnostic settings en dit niet vergeten kan worden.

- Dankzij DCR met diagnostics (Terraform code) slaan we alleen de data op die we écht nodig hebben.

- Met retention policies zoals operationale nonprod logging wordt automatisch verwijderd na 31 dagen blijven we niet zitten met een bak aan data waar we nooit meer iets mee doen. 

## Waar kan ik hier meer over lezen?
- <a href="https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview">Data Collection Rules</a>
- <a href="https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure?tabs=portal-3%2Cportal-1%2Cportal-2">Data retention policies</a>