# Buy-t

Buy-t est une Dapp de tokenisation de biens immobiliers.

## Structure du Projet

Le projet se compose de deux principales parties : le frontend et le backend.
Le frontend est une applicaiton Next JS, utilisant Chakra UI

Le Backend permet de compiler et de déployer un smartcontract via Hardhat

### Frontend

Pour lancer le frontend, suivez les étapes suivantes :

1.  `npm install` ou `yarn install`.
2.  `npm run dev` ou `yarn dev`.
3. `http://localhost:3000`.

### Backend

Pour lancer le backend, suivez les étapes suivantes :

1.  `npm install` ou `yarn install`.
2.  `npx hardhat compile`.
3. Lancez les tests avec `npx hardhat test`.
4.  `npx hardhat run scripts/deploy.js --network <network_name>`.

**Note** : N'oubliez pas de configurer votre fichier `.env` avec les variables d'environnement appropriées pour les opérations de déploiement.
