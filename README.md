# JS Pacman
A javascript Pacman game.

![Image of game](https://res.cloudinary.com/dpctylyfk/image/upload/v1603282950/samples/game_overview_zydfot.jpg)

:joystick: Play the game here:
https://timmy-bergkvist.github.io/js-pacman/


## Technologies Used

- <a href="https://code.visualstudio.com/" target="_blank"> VS Code </a> or a code editor that have a debug tool.

- <a href="https://parceljs.org/" target="_blank"> Parcel </a>

- <a href="https://en.wikipedia.org/wiki/HTML" target="_blank"> Html </a>

- <a href="https://en.wikipedia.org/wiki/Cascading_Style_Sheets" target="_blank"> Css </a>

- <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank"> JavaScript </a>


## Deployment

To run this project you need the following tools installed:
  
  - <a href="https://www.npmjs.com/package/npm" target="_blank"> Npm </a>
  
  - <a href="https://git-scm.com/" target="_blank"> Git </a>
  
## Local deployment
<details>

<summary>Click to see local deployment instructions</summary>

The following instructions are based on Windows 10 and VS Code editor.

> Instructions:

  I.    Clone the repository in Github.
 ```shell
  git clone <repository name>.git
 ```

  II.   Get a package.json in to your project.
```shell
npm init 
```

  III.   Install all the packages that are required.
```shell
 npm install parcel-bundler --save-dev
```

  IV.   Set up the package.json
```shell
{
  "name": "<yourProjectName>",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html --no-source-maps --no-minify --public-url .",
    "test": "echo \"Error: no test specified\" && exit 1",
  },
  "author": "",
  "license": "ISC"
  "devDependencies": {
    "parcel-bundler": "^1.12.4"
  },
}

```

  V.   Start the project
```shell
npm start

Server running at http://localhost:1234
```

</details>

## Github deployment

<details>

<summary>Click to see deployment to Github instructions</summary>


> Instructions:

  I.   Install all the packages that are required.
```shell
npm install gh-pages --save-dev
```

  II.   Set up the package.json deploy and homepage
```shell
{
  "name": "<yourProjectName>",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html --no-source-maps --no-minify --public-url .",
    "test": "echo \"Error: no test specified\" && exit 1",
    "deploy": "rm -rf dist/ && npm run build && gh-pages -d dist"
  },
  "homepage": "https://<yourGithubName>.github.io/<yourRepoName>/",
  "author": "",
  "license": "ISC"
  "devDependencies": {
    "gh-pages": "^3.1.0",
    "parcel-bundler": "^1.12.4"
  },
}

```

  III.   Deploy to Github
```shell
npm run deploy
```

</details>

## Credits

  #### Media
  - The photos used in this site were obtained from:

    - https://artworkdoctor.com/index.php?main_page=product_info&cPath=30_33&products_id=83

  #### Acknowledgements

  - Inspiration for this project was obtained from:

    - https://www.youtube.com/watch?v=DblzpCoPakw

    - https://www.youtube.com/watch?v=NJcX7leVjD0

    - https://www.youtube.com/watch?v=YBtzzVwrTeE&list=PLZMWJltr6TmCekz4-mY0_fec19HVS8G6W&index=38&t=1s

    - https://github.com/weibenfalk/vanilla-js-pacman

