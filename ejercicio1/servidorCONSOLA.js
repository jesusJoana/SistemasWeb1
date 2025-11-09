const http = require('http');
const os = require("os");
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Nueva conexión');

});

server.listen(PORT, () => {
    console.log("Todo OKAY");
    console.log(process.arch);
    console.log(process.cwd);
});


// 2) Se ejecuta, espera X ms, y se vuelve a llamar a sí misma
function miLoop() {
    console.log("Nº de CPUs: ", os.cpus()[0]);
    console.log("N de bytes: ", os.freemem());
    console.log("Sistema oeprativo: ", os.hostname());

    setTimeout(miLoop, 8000);
}

miLoop();
