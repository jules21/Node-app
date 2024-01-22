const http  = require('http');
const color = require('colors')
const path = require("path");
const fs = require('fs')
const { log, error } = require('console');

require('dotenv').config()

const port = process.env.PORT || 7000;

const server = http.createServer((req,res)=>{
 
    // set content type
    let filepath = path.join(__dirname,'/pages',req.url ==="/" ? "home.html":req.url);

    const extname = path.extname(filepath)
    console.log(extname);

    let contentType = "text/html";

    switch (extname) {
        case ".css":
            contentType = "text/css";
            break;

            case ".js":
                contentType = "text/javascript";
                break;

            case ".png":
                contentType = "image/png";
                break;
    
        default:
            break;
    }


        fs.readFile(filepath, (err, content)=>{
            if (err) {
                if(err.code == "ENOENT"){
                    //page not found
                    fs.readFile(path.join(__dirname,"/pages","404.html"), function(err, content){
                        if(err) throw err
                        res.writeHead(200, {"Content-Type":"text/html"})
                        res.end(content)
                    })
    
                }else{
                        res.writeHead(500);
                        res.end(`Server error ${err.code}`)
                    }
            }else{
                res.writeHead(200,{
                    "Content-Type":contentType
                })
                res.end(content)
            }
        
        })


    if (req.url == '/api/users') {
        const users = [{
            name:"bob Proctor",age:21
        },{
            name:"bob Marley",age:25
        }]

        res.writeHead(200,{
            "Content-Type":"application/json"
        });

        res.end(JSON.stringify(users))//stringfy converts a JavaScript value to a JSON string
    }

})
console.log();
server.listen(port, ()=>console.log(`This app is running on port ${port}`.underline.blue))

