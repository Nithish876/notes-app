# Notes App – Professional React Native + Expo

> **Offline-First • Type-Safe • Secure • Production-Ready**

A **fully offline**, **privacy-first**, **type-safe** notes application built with **React Native + Expo**, designed to teach **professional-grade app development**.

---

## Features

| Feature | Status |
|-------|--------|
| **Offline-First** | 100% `AsyncStorage` + `FileSystem` |
| **Folders & Notes** | Nested CRUD with cascade delete |
| **Backup / Restore** | JSON export/import via `expo-sharing` |
| **Secure UUIDs** | `react-native-get-random-values` polyfill |
| **Type Safety** | `Zod` validation on every write |
| **Modern File API** | `File(dir, name).write()` / `.text()` |
| **Expo Router** | File-based navigation |
| **Obfuscation** | Hermes + `javascript-obfuscator` |

---

## Tech Stack
- React Native + Expo (SDK 51+)
- TypeScript
- Zod
 AsyncStorage
- Expo FileSystem (Modern API)
- Expo Router
- Hermes Engine
- JavaScript Obfuscation

---

## Project Structure

```bash
src/
├── app/                  # Expo Router screens
├── components/           # Reusable UI
├── features/
│   ├── folders/          # Domain: CRUD, hooks, types
│   └── notes/
├── services/
│   └── backup/           # exportBackup(), importBackup(uri)
├── utils/
│   ├── storage.ts        # AsyncStorage + Zod wrapper
│   └── uuid.ts           # Secure v4
├── constants/
│   └── keys.ts           # Storage keys
└── styles/
    └── global.ts         # Shared styles
```

---

## Getting Started
1. Clone & Install
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
npm install
```
2. Run
```bash
npx expo start --clear
```

## Build for Production
```
bash eas build --profile production --platform all
```
Includes Hermes + code obfuscation.

## Testing
```
npm test
```
Example: `folderApi.test.ts`
```ts
test('creates and lists folders', async () => {
  const f = await folderApi.create('Work');
  const list = await folderApi.list();
  expect(list).toContainEqual(expect.objectContaining({ name: 'Work' }));
});
```

## Architecture
Clean Architecture:
- Domain → features/*/api
- Presentation → components/, app/
- Data → utils/storage, services/backup

## Security & Privacy
- No network
- No permissions (except user-initiated file access)
- Obfuscated JS bundle
- No analytics

## Troubleshooting
- **crypto.getRandomValues() error** → Add `import 'react-native-get-random-values';` in `app/_layout.tsx`
- **URI is not absolute** → Use `Paths.document` + `new File(dir, name)`
- **Backup not working** → Ensure `copyToCacheDirectory: true` in DocumentPicker

## Roadmap
- Dark Mode
- Search (Fuse.js)
- Encrypted Backup (expo-crypto)
- Auto-Backup on Exit
- iCloud / Google Drive Sync

## Contributing
- Fork & clone
- Create branch: `git checkout -b feat/search`
- Commit: `feat: add fuzzy search`
- Open PR

## License
MIT License

Built with clean code, type safety, and love.
— 2025