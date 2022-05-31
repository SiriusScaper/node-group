const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const buffer = require('buffer')



// Read the students.json and pass in the data
// TODO: Parse the obj and pass it to the api route

let data = fs.readFileSync('students.json');
let student = JSON.parse(data);
student.forEach((name) => {console.log(name.name)});


const server = http.createServer((req, res) => {
const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
}


  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  switch (page) {
    case '/':   
      readWrite('index.html', 'text/html');
      break;
    case '/otherpage':
      readWrite('otherpage.html', 'text/html');
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html');
      break;
    case '/api':
      readWrite('otherotherpage.html', 'text/html');
      break;
  }
  
  
  // Change this to reflect reading data from the students.json
  else if (page == '/api') {
    if('student' in params){
      if(params['student'] == 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = 
            {
              "name": "leon",
              "status": "Boss Man and technically not student",
              "currentOccupation": "Baller"
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
