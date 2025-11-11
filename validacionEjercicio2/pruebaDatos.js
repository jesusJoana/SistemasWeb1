const fs = require('fs/promises');

async function main() {
    // 1) Lectura
    const contenido = await fs.readFile('datos2.json', 'utf8');
    console.log('Contenido leído (texto):');
    console.log(contenido);

    // 2) Parsear a texto
    const datos = JSON.parse(contenido);

    // 3) Modificar el objeto en memoria
    datos.categorias[1] = "ingenieria"
    console.log(datos);

    // 4) Serializar a texto
    const nuevoTexto = JSON.stringify(datos, null, 2)+'\n';

    // 5) Escribir a disco
    await fs.writeFile('datos2.json', nuevoTexto, 'utf8');
    console.log('Guardado correcto.');

}

main().catch(console.error);
