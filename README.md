# Application Articles

 Application mobile React Native/Expo permettant de consulter et gérer une liste d'articles avec système de favoris.

Utilisation de l'api : https://jsonplaceholder.typicode.com/posts

## Fonctionnalités

- Liste des articles avec titre et description
- Système de favoris
- Barre de recherche
- Navigation entre les onglets
- Persistence des données avec AsyncStorage
- Dark mode

## Prérequis

- Node.js (version 23.5.0 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- XCode (pour iOS, Mac uniquement)
- Android Studio (pour Android)

## Installation

1. Cloner le projet
```bash
git clone 
cd 
```

2. Installer les dépendances
```bash
npm install

```

## Lancement de l'application

### Sur Android

1. Assurez-vous d'avoir Android Studio installé avec un émulateur configuré
2. Lancez l'émulateur Android
3. Démarrez l'application à la racine du projet :
```bash
npx expo start
```
3. Appuyez sur 'a' dans le terminal pour lancer sur Android


### Sur un appareil physique

1. Téléchargez l'application Expo Go sur votre appareil (App Store ou Google Play)
2. Lancez le projet :
```bash
npx expo start
```
3. Scannez le QR code avec :
   - iOS : l'appareil photo
   - Android : l'application Expo Go

## Structure du projet

```
app/
  ├── components/     # Composants réutilisables
  ├── screens/        # Écrans de l'application
  └── state/          # Configuration Redux
      ├── features/   # Slices Redux
      └── index.ts    # Store configuration
```

## État du projet avec Redux

Le store Redux est configuré pour gérer :
- Les articles favoris
- L'état du dark mode

## Persistence des données

AsyncStorage est utilisé pour sauvegarder :
- Les articles favoris

