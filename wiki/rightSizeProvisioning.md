# Right Size Provisioning

## Wat wordt hiermee bedoeld?
Right size provisioning is een manier om IT-infrastructuur precies af te stemmen bij de hoeveelheid toegewezen resources (zoals CPU, geheugen, opslag en netwerkcapaciteit) op de werkelijke behoeften van een applicatie of workload. Het doel is om te voorkomen dat je teveel (overprovisioning) of te weinig (underprovisioning) resources toewijst, waardoor je zowel kosten bespaart als de efficiëntie verhoogt.

- Overprovisioning betekent dat je meer hardware of virtuele machines hebt draaien dan strikt noodzakelijk is, wat leidt tot onnodig energieverbruik. Door alleen de benodigde capaciteit in te zetten, verminder je het energieverbruik van servers, of ze nu in eigen beheer of in de cloud worden gehost. Dit vermindert tenslotte de CO2-uitstoot die wordt gegenereerd door datacenters.

- Underprovisioning kan de prestaties van je applicaties negatief beïnvloeden, omdat ze niet voldoende rekenkracht of geheugen hebben om optimaal te functioneren. Right size provisioning zorgt ervoor dat applicaties de juiste hoeveelheid resources krijgen om consistent goed te presteren zonder onnodige overhead.

- In cloud-omgevingen is het belangrijk om snel te kunnen schalen op basis van veranderende behoeften. Right size provisioning zorgt ervoor dat je flexibel blijft door resources op elk moment aan te passen zonder verspilling. Dit bevordert efficiëntie en zorgt ervoor dat IT-infrastructuur schaalbaar is zonder overbodige kosten of capaciteitsproblemen.

- Cloudproviders zoals AWS, Azure en Google Cloud bieden mogelijkheden om automatisch te ['schalen'](wiki.html?page=scaling) en resources aan te passen op basis van werkelijke vraag. Het toepassen van right size provisioning in cloudomgevingen betekent dat je de schaalvoordelen van de cloud optimaal benut en verspilling van energie en resources minimaliseert. Dit maakt het mogelijk om duurzamere keuzes te maken en de energie-efficiëntie te verhogen.

## Hoe staan we ervoor?
Wigo4it heeft o.a. tijdens het ['CleanupFest'](wiki.html?page=cleanupFest) meerdere acties uitgevoerd die te maken hebben met right size provisioning:

- Azure Advisor gaf aan dat meerdere VM's te groot geschaald waren, SKU's downscalen is de oplossing en een voorbeeld van right size provisioning. 

- Agent Pools (ScaleSet agents) zo configureren dat er slechts een paar idle staan te draaien.

- SQL managed instances van 8 cores naar 4 cores (scheelt zo 800euro peer maand)

- Images alleen configureren met de tools en software die je nodig hebt.

## Waar kan ik hier meer over lezen?
- <a href="https://azure.microsoft.com/en-us/blog/rightsize-to-maximize-your-cloud-investment-with-microsoft-azure/">Rightsize workloads</a>
- <a href="https://docs.aws.amazon.com/whitepapers/latest/cost-optimization-right-sizing/cost-optimization-right-sizing.html">Right Sizing Provisioning</a>

