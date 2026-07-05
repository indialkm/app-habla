# HablaComigo - Guia de Instalação

## Estrutura

``` text
HablaComigo/
├── api/
└── app/
```

## API

``` bash
cd api
npm install
```

Dependências:

``` bash
npm install express cors
```

Executar:

``` bash
npm start
```

Se não existir o script:

``` bash
node index.js
```

API:

    http://localhost:3000

------------------------------------------------------------------------

## Aplicativo

``` bash
cd app
npm install
```

### React Navigation

``` bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/drawer
```

### Dependências Expo

``` bash
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler
npx expo install react-native-svg
npx expo install @react-native-async-storage/async-storage
npx expo install @expo/vector-icons
```

## Executar

``` bash
npx expo start
```

Web:

``` bash
npx expo start --web
```

Limpar cache:

``` bash
npx expo start -c
```

ou

``` bash
npx expo start -c --web
```

## Ordem

1.  Iniciar a API:

``` bash
cd api
npm install
npm start
```

2.  Iniciar o App:

``` bash
cd app
npm install
npx expo start --web
```

## Tecnologias

-   React Native
-   Expo
-   TypeScript
-   React Navigation
-   AsyncStorage
-   React Native SVG
-   Node.js
-   Express
-   CORS
-   JSON

## Observações

-   A API deve estar rodando antes do aplicativo.
-   A API utiliza arquivos JSON como persistência.
-   O aplicativo utiliza AsyncStorage para manter a sessão do usuário.
