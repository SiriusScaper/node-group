const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');





// Read the students.json and pass in the data
// TODO: Parse the obj and pass it to the api route
// const studentsData = fs.readFileSync('students.json');

const server = http.createServer((req, res) => {
  
  const studentsObj = JSON.parse(fs.readFileSync('students.json'));
  // Function routes to html pages
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
      let personName = 'unknown';
      let personOccupation = 'unknown'; 
      let personStatus = 'unknown';
      // var studentMatch = studentsObj.filter(
   
      // )
      if(params['student']== studentsObj.name){
        personName = studentMatch.name;
        personOccupation = studentMatch.currentOccupation;
        personStatus = studentMatch.status;
      } 
      res.writeHead(200, {'Content-Type': 'application/json'});
          let  objToJson = {
            name: personName,
            status: personStatus,
            currentOccupation: personOccupation
        }
        res.end(JSON.stringify(objToJson));
      break;
    case '/css/style.css':
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
      default: 
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
 });

server.listen(8000);
