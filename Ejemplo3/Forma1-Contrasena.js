const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Generar uina contraseña aleatoria
    const contrasena = crypto.randomBytes(8).toString('hex');

    res.end(`Contraseña creada: ${contrasena}\n`);
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});