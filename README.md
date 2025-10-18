# React Contact Management Frontend

## Frontend Project

In this class, we will practice building the Frontend Project using React.

We will focus on creating the Frontend Project application in the form of a SPA (Single Page Application).

And because the data is handled by the Backend, we don't need to use a Global State Management system like Redux.

We only need to use React and React Router for the project.

## Token Management

Pada aplikasi Backend Project, session user direpresentasikan dalam Token

Dan Token tersebut perlu dikirim di tiap http request

Oleh karena itu, di Frontend Project, kita akan menyimpan data token tersebut di Browser Local Storage, agar bisa digunakan di http request selanjutnya

[https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Setup Project

- ### Create React By Vite

```bash
npm create vite@latest react-contact-management-frontend -- --template react

npm install react-router
```

- ### React Use

  One of the popular hooks libraries in React is react-use, which contains Hooks that we can use easily.

  In this material, we will also use this library to help simplify the project creation.

  [https://github.com/streamich/react-use](https://github.com/streamich/react-use)

  ```bash
  npm install react-use
  ```

- ### Sweet Alert

  Another library we will use in this project is Sweet Alert; this is a library we can use to display better alerts compared to the default alerts from the Web Browser.

  [https://sweetalert2.github.io/](https://sweetalert2.github.io/)

  ```bash
  npm install sweetalert2
  ```

## Project Structure

- ### main

  main.jsx

- ### components

  - ### Layout

    Layout.jsx

  - ### User

    UserRegister.jsx

  - ### Contact

- ### lib

  - ### api

    UserApi.js

  - ### alert

    alert.js
