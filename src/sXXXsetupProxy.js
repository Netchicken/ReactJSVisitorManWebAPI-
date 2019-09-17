const proxy = require("http-proxy-middleware");
//https://stackoverflow.com/questions/54248089/api-call-getting-cors-error-in-reactjs-but-getting-response-in-node-and-postman
// module.exports = function(app) {
//   console.log("Proxy has started");
//   app.use(
//     "/api",
//     proxy({ target: "http://localhost:8088", changeOrigin: true })
//   );
//   app.listen(3000);
// };

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar

//https://www.npmjs.com/package/http-proxy-middleware READ THIS

// You have to create a local proxy for API calls.
// Here, proxy uses url pattern to match to the api calls and redirecting them to the corresponding server.

// Then run your local Dev server
//The above code creates a local proxy to forward API calls from one port(localhost:3000) to another port(localhost:8088).
