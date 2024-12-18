require('dotenv').config();
const app = require('./app');
require('./database');

async function main(){
    try {
        await app.listen(app.get('port'));
        console.log("Server on port", app.get('port'));
    }
    catch (error) {
        console.log("Error starting the server:", error.message);
        process.exit(1);
    }
}

main();