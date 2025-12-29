# Slutpack

Scaffold production-ready Expo apps with Expo Router, React Query, authentication, theming, and deployment configuration.

## Installation

```bash
npm install -g slutpack
```

Or use directly with npx:

```bash
npx slutpack PROJECT_NAME
```

## Usage

```bash
npx slutpack my-awesome-app
```

The CLI will prompt you for:
- App name and configuration
- iOS bundle identifier and Apple Developer details
- Android package name
- EAS project configuration
- Primary color for theming
- Required permissions

## What Gets Generated

- **Expo Router** file-based routing structure in `src/app/`
- **Bottom tab navigation** with Home, Profile, and Settings screens
- **Authentication screens**: Login, Signup, Change Password
- **React Query** setup with custom `useTimeoutQuery` hook
- **Theming** with auto-generated color palette from primary color
- **EAS configuration** ready for TestFlight and Google Play deployment
- **TypeScript** setup with type definitions
- **Deployment documentation** with step-by-step guides

## Features

- ✅ Expo Router (file-based routing)
- ✅ @tanstack/react-query with timeout hooks
- ✅ Bottom tab navigation
- ✅ Authentication screens
- ✅ Auto-generated color palette
- ✅ EAS build configuration
- ✅ TestFlight deployment ready
- ✅ Google Play deployment ready
- ✅ TypeScript support
- ✅ Native builds (no Expo Go)

## Project Structure

```
your-app/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   └── change-password.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── profile.tsx
│   │   │   └── settings.tsx
│   │   └── _layout.tsx
│   ├── components/
│   ├── hooks/
│   │   └── useTimeoutQuery.ts
│   ├── lib/
│   │   └── queryClient.ts
│   ├── constants/
│   │   └── colors.ts
│   └── types/
├── app.json
├── eas.json
├── package.json
└── DEPLOYMENT.md
```

## Next Steps

After generation:

1. Install dependencies:
   ```bash
   cd your-app
   npm install
   ```

2. Run on iOS:
   ```bash
   npm run ios
   ```

3. Run on Android:
   ```bash
   npm run android
   ```

4. Deploy to TestFlight:
   - Follow instructions in `DEPLOYMENT.md`
   - Run `eas build --platform ios --profile production`
   - Run `eas submit --platform ios --profile production`

## Development

### Running Locally

You have several options to test locally:

**Option 1: Direct execution**
```bash
node bin/slutpack.js my-test-app
```

**Option 2: Use npm link (creates global symlink)**
```bash
# In the slutpack directory
npm link

# Now you can run from anywhere
slutpack my-test-app

# To unlink when done
npm unlink -g slutpack
```

**Option 3: Use npx with local path**
```bash
npx . my-test-app
```

### Publishing to npm

1. Make sure you have an npm account and are logged in:
   ```bash
   npm login
   ```

2. Update the `author` and `repository` fields in `package.json` with your info.

3. Publish:
   ```bash
   npm publish
   ```

4. For updates, bump the version first:
   ```bash
   npm version patch  # or minor/major
   npm publish
   ```

After publishing, anyone can use:
```bash
npx slutpack my-app
```

## License

MIT

