const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const buffer = require('buffer')


const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  
  
  // Change this to reflect reading data from the students.json
  else if (page == '/api') {
    if('student' in params){
      if(params['student'] == 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          "students": [
            {
              "name": "leon",
              "status": "Boss Man and technically not student",
              "currentOccupation": "Baller"
            },
            {
              "name": "calvin",
              "status": "buffering",
              "currentOccupation": "100Dev"
            },
            {
              "name": "hector",
              "status": "100Deving",
              "currentOccupation": "100Dev"
            },
            {
              "name": "jose",
              "status": "kid music jams",
              "currentOccupation": "100Dev"
            },
            {
              "name": "sean",
              "status": "learning",
              "currentOccupation": "100Dev"
            }
          ]
        }
        res.end(JSON.stringify(objToJson));
      }
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
