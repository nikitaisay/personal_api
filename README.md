## README
This is a repository with a source code from the article about how to integrate GramJs library into simple 
Node.js application and use it with Contentful webhooks (https://www.nikitaisay.com/articles/5MDH6of8y2l6qAP8BdV4n4).

To get started with it you need to create a .env file in the root of repository and provide
all required variables to it. The list of required variables and how you can get values for them
you can find in the article.

After you will have all required variables, you can run it simply by run this commands:
```
npm install
npm start
```
Also, if you would like to check Contentful webhooks functional localy, you will need to download
and install ngrok client and use, simply by run:
```
ngrok http {{YOUR_SERVER_PORT}}
```
