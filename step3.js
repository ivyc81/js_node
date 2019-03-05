const fs = require('fs');
const axios=require('axios');

function cat(path, toFile){
    fs.readFile(path, 'utf8', function(error, data){
        if(error){
            console.error(error);
            process.exit(1);
        }
        else{
            if(toFile){
                writeToFile(toFile, data);
            }
            else{
                console.log(`file content: ${data}`);
            }
        }
    });
}

function webCat(url, toFile){ 

    return axios.get(url)
     .then(function(response){
        if (toFile) {
            writeToFile(toFile, response.data)
        } else {
            console.log(response.data);}
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

function writeToFile(toFile, data){        
fs.writeFile(toFile, data, 'utf8', function(err){
    if(err){
        console.error(err);
        process.exit(1);
    }
    else{
        console.log("no output, but new.txt contains google's HTML");
    }
});
}

if(process.argv[2] === '--out'){
    if (process.argv[4].startsWith("http")) {
        webCat(process.argv[4], process.argv[3]);
    } else {
        cat(process.argv[4], process.argv[3]);
    }
}
else {
    if (process.argv[2].startsWith("http")) {
        webCat(process.argv[2]);
    }
    else {
    cat(process.argv[2]);
    }
}
