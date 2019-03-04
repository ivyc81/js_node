const fs = require('fs');

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

// console.log(process.argv[2]);
cat(process.argv[2]);

