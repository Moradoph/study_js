# SELF-STUDY

- using cross-env dependency for do crossing environment between { dev, prod, test }
```bash
npm install --save-dev cross-env
```

```bash
# add this code into package.json
"scripts": {
  "dev": "cross-env NODE_ENV=develop nodemon server.js"
}
```