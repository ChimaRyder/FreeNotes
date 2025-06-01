
# 📝 FreeNotes: An Anonymous Confession Board

![Cover Image](/FreeNotes_Cover.png)

**FreeNotes** is an anonymous confession board where you can share your deepest thoughts without fear.

This project is inspired from UnsentProject, an anonymous confession board aimed at confessing unconveyed feelings for first loves and crushes. While FreeNotes is similar, it also provides user authentication to review or delete any specific notes published as well.
## Authors

- [@ChimaRyder](https://www.github.com/ChimaRyder)


## 💻 Tech Stack

**Client:** ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Server:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## ✨ Features

- Search and View confessions by name
- Create an account
- Create/Customize confessions
- View previously-made confessions


## 🔨 Run Locally

Clone the project

```bash
  git clone https://github.com/ChimaRyder/FreeNotes
```

Go to the project directory

```bash
  cd FreeNotes
```

Install dependencies

```bash
  npm install
```

Start the Express server

```bash
  cd server && npm run start
```

Start the server

```bash
  cd .. && npm run dev
```


## ⚙ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_LINK`

`ORIGIN`

`ACCESS_TOKEN_SECRET`

`URI`
