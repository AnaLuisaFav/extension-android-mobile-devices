# 🐞 QA Tracker App

Este projeto foi desenvolvido para o Trabalho de Extensão da disciplina Programação Para Dispositivos Móveis em Android do curso de Análise e Desenvolvimento de Sistemas (ADS).

## 🎯 Objetivo

O **QA Tracker App** é uma aplicação simples em [React Native](https://reactnative.dev/) que permite gerenciar e acompanhar o status de testes. O app permite adicionar novos testes, alterar seu status (Passou, Falhou ou Bloqueado) e resetar a lista de testes.

## 📱 Funcionalidades

- **Adicionar Testes:** Os usuários podem adicionar novos testes, fornecendo um nome para cada teste.
- **Executar Testes:** Cada teste adicionado pode ter um status associado (Passou, Falhou ou Bloqueado).
- **Salvar e Recuperar Testes:** Os testes são salvos localmente usando `AsyncStorage`, permitindo que os dados persistam entre reinicializações do aplicativo.
- **Resetar Testes:** Há uma funcionalidade para limpar todos os testes salvos, retornando o app ao estado inicial.

## ⏯️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) instalado
- [React Native CLI](https://reactnative.dev/docs/environment-setup) ou [Expo](https://expo.dev/) instalado
- Emulador de dispositivo Android/iOS ou um dispositivo físico

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/AnaLuisaFav/extension-android-mobile-devices.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd extension-android-mobile-devices
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:

   Para iOS:

   ```bash
   npx react-native run-ios
   ```

   Para Android:

   ```bash
   npx react-native run-android
   ```
