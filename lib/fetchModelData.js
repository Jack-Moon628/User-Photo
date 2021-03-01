var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  *
*/


function fetchModel(url) {
  return new Promise(function(resolve, reject) {
      // console.log(url);
      // On Success return:
      // resolve({data: getResponseObject});
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var getResponseObject = JSON.parse(xhttp.responseText);
          resolve({data: getResponseObject});
        }
        if (xhttp.status === 400 || xhttp.status === 500) {
          reject({status: 501, statusText: "Not Implemented"});
        }
      }
      xhttp.open("GET", url);
      xhttp.send();
  });
}

export default fetchModel;
