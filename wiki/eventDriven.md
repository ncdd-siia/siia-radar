# Event-Driven Architectuur

## Wat wordt hiermee bedoeld?
Een event-driven architectuur is een systeemontwerp waarbij processen en acties alleen worden geactiveerd door specifieke gebeurtenissen (events). Dit zorgt voor efficiënter gebruik van systeemresources en vermindert energieverbruik, omdat het systeem niet constant hoeft te controleren op veranderingen (zoals bij API polling). In plaats daarvan blijft het systeem inactief totdat een event optreedt, zoals het voltooien van een transactie of het uploaden van een bestand. Dit leidt tot een aanzienlijke vermindering van energieverspilling en een lagere CO₂-uitstoot.

Voorbeelden van event-driven architecturen:

- **Event-driven cloud services**: Applicaties die gebruikmaken van diensten zoals AWS Lambda, Google Cloud Functions, of Azure Event Grid activeren resources alleen wanneer er een specifiek event plaatsvindt. Bijvoorbeeld, als een bestand wordt geüpload naar een cloudopslag, wordt de verwerking pas gestart zodra dat event zich voordoet, terwijl de resources tussen events in inactief blijven.
  
- **Asynchrone verwerking**: Bij event-driven architecturen kunnen processen asynchroon plaatsvinden, waardoor de systeembelasting beter verdeeld wordt en piekbelastingen worden vermeden. Dit zorgt voor een efficiëntere benutting van de beschikbare infrastructuur.

## Hoe staan we ervoor?  
We zijn actief bezig met het transformeren van onze BizTalk-oplossingen naar cloud-native, event-driven architecturen. Deze transitie stelt ons in staat om de flexibiliteit en schaalbaarheid van moderne cloudinfrastructuren volledig te benutten. Door deze verschuiving verbeteren we niet alleen de prestaties en efficiëntie van onze systemen, maar realiseren we ook aanzienlijke kosten- en energiebesparingen.

- **Energiebesparing en duurzaamheid**: Door het elimineren van altijd-actieve processen en over te stappen naar event-driven processen, verminderen we ons energieverbruik en verlagen we onze CO₂-uitstoot. Dit draagt bij aan onze doelstelling om een duurzamere IT-omgeving te creëren.
- **Verbeterde veerkracht**: Cloud-native oplossingen bieden ons niet alleen flexibiliteit, maar verhogen ook de veerkracht en beschikbaarheid van onze systemen. Event-driven architecturen helpen ons bij het minimaliseren van downtime en zorgen voor een snellere reactie op veranderingen in vraag en aanbod.

## Waar kan ik hier meer over lezen?
- <a href="https://solace.com/blog/evolution-of-apis-restful-event-driven-apis/">From RESTful to Event-Driven</a>