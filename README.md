#FAQ

##How to run it?
- Prerequisite: You need Node and NPM installed.
- Go to folder server-side `npm install`. Upon completion, you will see a new folder created called /node_modules
- Run `node app.js` and you will see it listening to localhost:3000
- Go to folder client-side, open index.html

## There are 2 folders: client-side and server-side. Why?
client-side is code running on the web browser. The code in client-side folder is a simple html and pure vanilla javascript. No web framework.

server-side is code running on the server. We are using express.js
Both client-side and server-side are using Axios to make HTTP.

So in 2019 / 2020, it is common to have client-side (web) and client-side (mobile) that read & write data to a common server-side.

You can read more about client-side and server-side from https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction

##Where did you get your dummy rest api?
Any site that host a dummy rest api will do. I am using http://dummy.restapiexample.com/ for illustration.