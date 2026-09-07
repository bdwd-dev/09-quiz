# Quiz Gamifié

Diagnostic J1 + entraînement + tournois

## Structure

```
09-quiz/
├── backend/          # Express.js API (Port 3009)
│   ├── server.js
│   ├── package.json
│   └── db.json
├── web/              # React frontend (HTML + Babel standalone)
│   └── index.html
└── mobile/           # Flutter app
    └── lib/main.dart
```

## Démarrage

```bash
# Backend
cd 09-quiz/backend
npm install
npm start

# Web — Ouvrir 09-quiz/web/index.html dans un navigateur
# ou servir avec: npx serve 09-quiz/web

# Mobile
cd 09-quiz/mobile
flutter pub get
flutter run
```

## API

| Endpoint | Description |
|----------|-------------|
| GET /api/health | Health check |
| GET /api/stats | Statistiques |
