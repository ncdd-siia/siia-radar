# Infrastructure as Code

## Wat wordt hiermee bedoeld?
Infrastructure as Code (IaC), Everything as Code of x as Code bevorderen duurzaamheid omdat ze automatisering, schaalbaarheid en efficiëntie in infrastructuur mogelijk maken. In plaats van dat je handmatig server voor server aan het beheren bent, automatiseer je alles. De belangrijkste duurzame voordelen zijn:

- IaC elimineert handmatige fouten en overprovisioning (mits goed geconfigureerd), waardoor infrastructuur nauwkeuriger wordt beheerd en resources efficiënter worden gebruikt, wat leidt tot minder energieverspilling.

- In plaats van constante overcapaciteit, kan infrastructuur dynamisch worden opgeschaald wanneer nodig en afgebouwd wanneer het niet meer vereist is. Dit resulteert in een lager energieverbruik en geoptimaliseerd gebruik van hardware.

- IaC maakt veelal gebruik van cloudinfrastructuren, waar gedeelde resources en energiezuinige datacenters, vaak aangedreven door hernieuwbare energie, worden benut. Dit vermindert de ecologische voetafdruk en verhoogt de duurzaamheid.

Kortom, IaC zorgt voor een efficiënter gebruik van IT-resources, optimaliseert energieverbruik en vermindert de afhankelijkheid van fysieke hardware, wat bijdraagt aan een duurzamer IT-beheer.

## Hoe staan we ervoor?
Wigo4it automatiseert alles, maar dan ook écht alles. Het enige dat nog niet is geautomatiseerd is de provisioning van onze accounts van het HR systeem in Entra. Dit staat nog op de planning ;-). Maar nogmaals, we automatiseren écht alles:

- De gehele infrastructuur wordt minimaal eens per week via Terraform plan opnieuw uitgerold. Eens per jaar testen we dit ook écht in een andere region van scratch af aan.

- Via onze Self-Service Wegwijzer rollen steden volledige omgevingen zelf uit, alles onder water is volledige geautomatiseerd. 

- Honderden end-2-end tests zodra er een nieuwe versie is van onze software.

- Security en compliancy worden automatisch meegenomen in de pipelines (shift-left security en compliancy)

## Waar kan ik hier meer over lezen?
- <a href="https://en.wikipedia.org/wiki/Infrastructure_as_code">Infrastructure as Code</a>