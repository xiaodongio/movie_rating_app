# movie_rating_app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

```
 npm install bootstrap bootstrap-vue vuetify --save --registry=https://registry.npm.taobao.org
 
  npm install morgan body-parser cors mongoose --save --registry=https://registry.npm.taobao.org
  
  
  npm install nodemon --save-dev --registry=https://registry.npm.taobao.org

npm install jsonwebtoken passport-jwt passport --save --registry=https://registry.npm.taobao.org
```

#### jwt 
> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNjhhNDMzMDJkMWNlZDU5YjExND
  g3MCIsImlhdCI6MTUxNzI0MjM1M30.5xY59iTIjpt9ukDmxseNAGbOdz6weWL1drJkeQzoO3M
  
If you look at the preceding token carefully, you will see that the token has three parts
separated by a period (.); each part has its own meaning:
- The first part represents the header
- The second part represents the payload
- The third part represents the signature
