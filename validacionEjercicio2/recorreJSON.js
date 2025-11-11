const fs = require('fs/promises');

async function main() {
    try {
        let contenido = await fs.readFile('datos.json', 'utf8');
        contenido = contenido.replace(/^\uFEFF/, '');

        const datos = JSON.parse(contenido);

        function printValue(v, indent = 0) {
            const pad = '  '.repeat(indent);
            if (Array.isArray(v)) {
                console.log(pad + '[Array] length =', v.length);
                v.forEach((el, i) => {
                    console.log(pad + `  [${i}]`);
                    printValue(el, indent + 2);
                });
            } else if (v && typeof v === 'object') {
                console.log(pad + '{Object}');
                for (const k of Object.keys(v)) {
                    console.log(pad + `  ${k}:`);
                    printValue(v[k], indent + 2);
                }
            } else {
                console.log(pad + String(v));
            }
        }

        printValue(datos);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();