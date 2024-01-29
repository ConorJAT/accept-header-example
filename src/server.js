const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/cats': responseHandler.getCats,
  index: responseHandler.getIndex
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]){
    urlStruct[parsedURL.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response);
  }
  // const handler = urlStruct[parsedURL.pathname];
  // handler(request, response);

  // Too Slow!
  // switch(parsedURL.pathname) {
  //   case '/':

  //     break;

  //   case '/cats':

  //     break;

  //   default:

  //     break;
  // }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
