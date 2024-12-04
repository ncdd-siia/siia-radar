# Backups

## Wat wordt hiermee bedoeld?
Backups spelen een cruciale rol in het beschermen van data, maar ze hebben ook impact op duurzaamheid. Backups vereisen namelijk extra opslagruimte, wat direct leidt tot meer energieverbruik. Dit geldt zowel voor on-premises opslag als voor cloudopslag. Elke keer dat een volledige backup wordt gemaakt, neemt de hoeveelheid opgeslagen data toe, wat meer servercapaciteit en koeling vereist. Dit resulteert in een hogere ecologische voetafdruk, vooral als backups onnodig groot zijn of te vaak worden gemaakt.
Duurzaamheid kan worden bevorderd door gebruik te maken van slimme backuptechnieken zoals:

- Incrementele backups: Hierbij worden alleen de gewijzigde of nieuwe gegevens sinds de laatste backup opgeslagen, wat veel minder ruimte en energie verbruikt dan volledige backups.

- Deduplicatie: Dit proces voorkomt dat dezelfde gegevens meerdere keren worden opgeslagen, waardoor de benodigde opslagcapaciteit drastisch wordt verminderd.

- Slim retentiebeleid: Door oude en onnodige backups regelmatig te verwijderen of te archiveren, kunnen bedrijven opslag optimaliseren en energie besparen.

- En misschien wel de belangrijkste: Backup alleen de data die je écht nodig hebt. Zorg bijvoorbeeld dat je infrastructuur in code staat, zodat je daar geen backups van hoeft te maken.

## Hoe staan we ervoor?
Wigo4it maakt alleen nog maar backups van productie data. Vroeger on-premises maakte we backups van gehele servers (vmdks) die we dan weer redundant opsloegen. Deduplicatie hadden we wel aan staan. Nu is het echter veel beter geregeld:

- Alle infrastructuur staat in code. We maken alleen nog backups van productie data.

- De backup van de productie data wordt volgens de BIO norm óók ergens anders weggeschreven (data exit strategie)

- De afgelopen vier jaar zijn we van 140TB aan backups naar 10TB aan backups gegaan. Een daling van ruim 90%!

## Waar kan ik hier meer over lezen?
- <a href="https://www.wigo4it.nl/?utm=duurzaamheidsradar">Wigo4it website</a>







