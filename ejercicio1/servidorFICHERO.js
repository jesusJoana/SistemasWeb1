const fs = require('fs');   // <-- añadir
const http = require("http");
const os = require('os');
require('dotenv').config();
const PORT = 3000;
const frecuencia = process.env.FRECUENCIA;

const server = http.createServer((req, res) => {
    console.log('Nueva conexión');

});

server.listen(PORT, () => {
    console.log("Todo OKAY");
    console.log(process.arch);
    console.log(process.cwd);
});

function miLoop() {
    const entry = {
        timestamp: new Date().toISOString(),
        cpu0: os.cpus()[0],
        freeMem: os.freemem(),
        hostname: os.hostname()
    };

    const line = JSON.stringify(entry) + '\n';

    // appendFile asíncrono (no bloqueante)
    fs.appendFile('stats.log', line, (err) => {
        if (err) console.error('Error escribiendo stats.log:', err);
    });

    // seguir con el loop
    setTimeout(miLoop, frecuencia);
}

miLoop();
