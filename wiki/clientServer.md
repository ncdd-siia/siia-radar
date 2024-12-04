# Client server

## Wat wordt hiermee bedoeld?
Client-server modellen zijn gebaseerd op een centraal servermodel, waar clients (gebruikers of applicaties) verbinding maken met een specifieke server om toegang te krijgen tot data of applicaties. Dit leidt vaak tot onderbenutting van resources, omdat servers constant actief moeten blijven om verzoeken af te handelen, zelfs als er weinig gebruik wordt gemaakt van de capaciteit. Dit inefficiënt gebruik van servercapaciteit verhoogt het energieverbruik, wat resulteert in een grotere ecologische voetafdruk. Een client-server model wordt dan ook als ouderwets gezien. 

- Client-server architecturen zijn vaak moeilijk op te schalen. Het toevoegen van meer gebruikers of het vergroten van de vraag naar rekenkracht vereist vaak het aanschaffen van nieuwe hardware of het aanpassen van de infrastructuur, wat kosten en energieverspilling met zich meebrengt. Dit maakt het systeem minder flexibel dan cloud-gebaseerde oplossingen, die automatisch kunnen opschalen of afschalen afhankelijk van de vraag, waardoor energie-efficiëntie wordt verbeterd.

- Omdat client-server modellen vaak op locatie worden beheerd (on-premises), verbruiken ze doorgaans meer energie en vereisen ze meer hardware dan cloud-gebaseerde alternatieven. 

- De technologie die gebruikt wordt in client-server architecturen is vaak verouderd en niet ontworpen met moderne duurzaamheidseisen in gedachten. Nieuwe technologieën zoals cloud computing (IaaS, PaaS, SaaS) en serverless computing optimaliseren het gebruik van rekenkracht en energie, waardoor het totale energieverbruik afneemt. 

Kortom, een client-server applicatie is minder duurzaam omdat het inefficiënt omgaat met resources, moeilijker schaalbaar is en lokaal beheer vereist, wat leidt tot meer energieverbruik. Moderne cloud-gebaseerde architecturen bieden flexibele, schaalbare en energie-efficiënte oplossingen, vaak aangedreven door hernieuwbare energie, en zijn daarom veel duurzamer.

## Hoe staan we ervoor?
Wigo4it had vroeger ook zo'n ouderwetse applicatie met een client-server model. Tijdens onze cloudreis hebben we dit allemaal omgebouwd met als resultaat:

- De gehele applicatie is nu web-based en draait op .NET 7 en 8.

- We hebben geen Citrix meer nodig, kostenbesparing van bijna een miljoen (hardware en software).

- De backend draait in AKS en alles is 100% geautomatiseerd met Terraform en pipelines. Geen losse VM's meer die we moeten beheren.

## Waar kan ik hier meer over lezen?
- <a href="https://www.wigo4it.nl/?utm=duurzaamheidsradar">Wigo4it website</a>