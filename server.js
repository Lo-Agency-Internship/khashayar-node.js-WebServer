const http = require("http");
const fs = require("fs");
const port = 3000;  
const path = require("path");



const server = http.createServer((req,res)=>{
    let route = "." + req.url;
    if(route === "./"){
        fs.readFile("index.html", (err,content)=>{
            if(err){
                res.writeHead(404 ,{"Content-Type": "text/html"});
                res.end("Error 404 Page not found!");
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(content);
            res.end();
        })
    }
    else{
        fs.readFile(`${route}`,(err,content)=>{
            if(err){
            console.log(err)
            res.writeHead(404 ,{"Content-Type": "text/html"})
            res.end("Error 404 Page not found!");
            }
            else{
                switch (path.extname(route)) {
                    case ".html":
                        res.writeHead(200, {"Content-Type": "text/html"})
                        break;
                    case ".css":
                        res.writeHead(200, {"Content-Type": "text/css"})
                        break;
                    case ".png":
                        res.writeHead(200, {"Content-Type": "image/png"})
                        break;
                    case ".jpg":
                        res.writeHead(200, {"Content-Type": "image/jpg"})
                        break;
                    case ".ico":
                        res.writeHead(200, {"Content-Type": "image/x-icon"})
                        break;
                    case ".ttf":
                        res.writeHead(200, {"Content-Type": "font/ttf"})
                        break;
                
                    default:
                        res.writeHead(404 ,{"Content-Type": "text/html"})
                        res.write("Error 404 Not Found!")
                        res.end();
                        break;
                }
                res.write(content)
                res.end();
            }
        })
    }
    
})
console.log(`Server is running on port ${port}`)
server.listen(port);