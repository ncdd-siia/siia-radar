# Cattle

## Wat wordt hiermee bedoeld?
In de context duurzaamheid verwijst cattle naar servers die identiek zijn geconfigureerd en eenvoudig vervangen kunnen worden zonder persoonlijke aandacht d.m.v. automatiseren.

- Door servers identiek te configureren en eenvoudig te vervangen, kunnen ze gemakkelijk afgeschaald worden als de vraag af neemt.

- Omdat cattle-servers identiek zijn geconfigureerd en eenvoudig vervangen kunnen worden, is het niet nodig om individuele back-ups te maken.

- Dit model (cattle) is ideaal voor self-service omgevingen waarbij resources op aanvraag worden opgebouwd en afgebroken (Pay-As-You-Go, PAYG). Hierdoor draaien omgevingen alleen wanneer ze daadwerkelijk gebruikt worden.

## Hoe staan we ervoor?

Alle statische componenten die cloud native draaien zijn gebaseerd op het 'cattle' -model. Dit betekent dat ze identiek zijn geconfigureerd en eenvoudig vervangen kunnen worden zonder individuele aandacht. Samenvattend kunnen we zeggen dat alleen onze database nog als ['pets'](wiki.html?page=pets) wordt behandeld, terwijl de onderliggende infrastructuur, zoals de database-server zelf, ook volgens het 'cattle' model functioneert.

- Alle infrastructurele componenten zijn gebaseerd op het cattle model en schalen op vraag. Dit zorgt voor een efficiënter gebruik van resources.

- Niet-productieomgevingen worden via self-service aangevraagd en verwijderd wanneer ze niet worden gebruikt. Dit minimaliseert onnodige resourcegebruik.

- Er wordt geen back-up meer gemaakt van infrastructurele componenten, omdat ze eenvoudig opnieuw gecreëerd kunnen worden bij een storing. Dit vermindert de opslagbehoefte.

## Waar kan ik hier meer over lezen?
- <a href="https://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/">The History of Pets vs Cattle and How to Use the Analogy Properly</a>







