const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

// Diccionario base (puedes ampliarlo)
const DICC = [
    'cielo','motor','nube','faro','roble','laser','tigre','luna','eco','roca',
    'mar','sable','pixel','brisa','nexo','delta','rayo','vapor','llama','norte'
];

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Leer X desde la query (?x=), por defecto 4. Límite mínimo 1, máximo 20.
    const { searchParams } = new URL(req.url, 'http://localhost');
    const x = Math.max(1, parseInt(searchParams.get('x') ?? '4', 10) || 4);


    // Elegir X palabras aleatorias del diccionario (con reposición)
    const palabras = [];
    for (let i = 0; i < x; i++) {
        const idx = crypto.randomInt(DICC.length); // mejor que Math.random() para aleatoriedad
        palabras.push(DICC[idx]);
    }

    const contrasena = palabras.join('-');

    res.end(`Contraseña creada: ${contrasena}\n`);
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
