# Image Resizing API

An API that resizes & sends images back. It uses **Sharp** as well as the native node modules **fs** and **path**. The project is built with **Typescript** and tested using the **Jasmine** testing framework

---

## Installation

- Installing dependances <br />
`npm i

---

## Scripts

- Running tests <br />
 `npm run test`

- Booting up the server <br />
`npm run server`

- Running Eslint <br />
`npm run lint`

---

## Endpoints

- Visit *localhost:3000/image/jpg?name=tree&width=100&height=100*

---

The API takes an existing JPEG image in the full folder, tests its dimensions to see if they match the query parameters if they do it will serve the image. If not it will modify the image, save it to the processed folder then send it back to the browser.

---
*This project was made as a part of EgyFwd Advanced Web Track*
