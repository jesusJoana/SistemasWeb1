const fs = require('fs/promises');

async function main() {
    try {
        let contenido = await fs.readFile('datos.json', 'utf8');
        contenido = contenido.replace(/^\uFEFF/, '');
        const peliculas = JSON.parse(contenido);

        if (!Array.isArray(peliculas)) {
            console.error('Se esperaba un array en el JSON.');
            return;
        }

        peliculas.forEach((p, idx) => {
            console.log('--- Película #' + (idx + 1) + ' ---');
            console.log('Título:', p.pelicula || '<sin título>');
            console.log('Director:', p.dirigida || '<sin director>');

            // Manejar ambas claves posibles para actores
            const actores = p.actores || p.actores_principales || [];
            console.log('Actores:', Array.isArray(actores) ? actores.join(', ') : actores);

            if (Array.isArray(p.cine)) {
                console.log('Cines / salas:');
                p.cine.forEach(c => {
                    const horarios = Array.isArray(c.horarios) ? c.horarios.join(', ') : c.horarios;
                    console.log(`  Sala ${c.sala} -> Horarios: ${horarios}`);
                });
            } else {
                console.log('Cine: <no hay información>');
            }
        });

    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
