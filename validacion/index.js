const fs = require('fs/promises');
const Ajv = require('ajv');
const ajv = new Ajv();
async function main() {

    // 1) Leer el fichero
    const contenido = await fs.readFile('datos.json', 'utf8');
    const esquema = await fs.readFile('schema.json', 'utf8');
    console.log('Contenido del fichero:');
    console.log(contenido);
    console.log(esquema);

    // 2) Parseamos el objeto (crear un objeto de tipo js para poder navegar por él)
    const datos = JSON.parse(contenido);
    const esquema_datos = JSON.parse(esquema);
    console.log(datos.nombre);
    console.log(datos.direccion.calle);

    // Configuro el validador de acuerdo con el esquema
    const validate = ajv.compile(esquema_datos);

    // Ya puedo validar el json que me han dado
    const ok = validate(datos);
    if (ok) console.log('✅ JSON válido');
    else console.log('❌ Errores:', validate.errors);

    // 3) Modificamos el objeto en memoria
    datos.nombre = "Jesus"
    datos.direccion.numero = 20;
    console.log(datos.nombre);
    console.log(datos);

    // 4) Serializar a texto
    const nuevoTexto = JSON.stringify(datos, null, 2) + '\n';

    // 5) Escribir en texto
    await fs.writeFile('datos.json', nuevoTexto, 'utf8');
    console.log('Cambiado los datos del fichero');

}
main().catch(console.error);