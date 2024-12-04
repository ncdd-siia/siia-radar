# Pets

## Wat wordt hiermee bedoeld?

In de context duurzaamheid verwijst pets naar servers die individueel geconfigureerd zijn en persoonlijke aandacht vereisen voor onderhoud en vervanging.

- Door servers individueel te configureren en te beheren, kunnen ze niet gemakkelijk afgeschaald worden wanneer de vraag afneemt, wat resulteert in onnodig energieverbruik.

- Omdat 'pets'-servers uniek zijn, is het noodzakelijk om individuele back-ups te maken en te beheren, wat extra middelen en opslagruimte vergt.

- Dit model (pets) is minder geschikt voor self-service omgevingen waarbij resources op aanvraag worden opgebouwd en afgebroken (Pay-As-You-Go, PAYG). Hierdoor draaien omgevingen vaak door, zelfs wanneer ze niet daadwerkelijk gebruikt worden, wat leidt tot verspilling van resources en energie.

## Hoe staan we ervoor?

Alle statische componenten die cloud native draaien zijn gebaseerd op het ['cattle'](wiki.html?page=cattle)-model. Dit betekent dat ze identiek zijn geconfigureerd en eenvoudig vervangen kunnen worden zonder individuele aandacht. Samenvattend kunnen we zeggen dat alleen onze productie databases nog als pets worden behandeld, terwijl de onderliggende infrastructuur, zoals de database-server zelf, ook volgens het 'cattle' model functioneert.

- Wij hebben ongeveer 30% van onze workloads verhuisd naar Azure VMware Solutions (AVS), zodat wij onze beide fysieke datacenters kunnen afbouwen. Zie AVS als een dierenpension vol met pets. De komende twee jaar worden de pets of uitgefaseerd of omgebouwd tot cattle.

## Waar kan ik hier meer over lezen?
- <a href="https://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/">The History of Pets vs Cattle and How to Use the Analogy Properly</a>







