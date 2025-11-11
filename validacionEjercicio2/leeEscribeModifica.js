const fs = require('fs/promises');

// 1) Leer el contenido del script
async function main() {
    const contenido = await fs.readFile('datos.json', 'utf8');
    console.log("Contenido leido con exito");
    console.log(contenido);

    // 2) Parsear a objeto
    const datos = JSON.parse(contenido);
    console.log(datos);

    // 3) Modificamos el objeto en memoria
    datos[0].pelicula = "Transformers";
    console.log(datos);

    // 4) Serializamos a texto
    const nuevoTexto = JSON.stringify(datos, null, 2) + '\n';

    // 5) Escribir a disco
    await fs.writeFile('datos.json', nuevoTexto, 'utf8');
    console.log('Guardado correcto.');

}

main().catch(console.error);