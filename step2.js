const fs = require('fs');
const axios=require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(error, data){
        if(error){
            console.error(error);
            process.exit(1);
        }
        else{
            console.log(`file content: ${data}`);
        }
    });
}

function webCat(url){ 
    
    return axios.get(url)
     .then(function(response){
         console.log(response.data);
     })
     .catch(function (error){
         if (error.response) {
             console.log(
             `Error fetching ${url}: 
             Error: Request failed with status code ${error.response.status}`);
         } else {
             console.log(`Error fetching ${url}: 
             Error: Request failed `)
         }
     });
 }

const address=process.argv[2];

if (address.startsWith("http")) {
    webCat(address);
} else {
    cat(address);
}

