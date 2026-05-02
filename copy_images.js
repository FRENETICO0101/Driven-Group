const fs = require('fs');
const path = require('path');

const images = {
    "C:\\Users\\TheFuckingMachine\\.gemini\\antigravity\\brain\\3a817a19-d461-4d53-9d68-91daf611dde1\\liderazgo_chess_1773547240308.png": "c:\\Users\\TheFuckingMachine\\Desktop\\Takashi - Babel Solutions\\source\\public\\images\\liderazgo.png",
    "C:\\Users\\TheFuckingMachine\\.gemini\\antigravity\\brain\\3a817a19-d461-4d53-9d68-91daf611dde1\\finanzas_dashboard_1773547276996.png": "c:\\Users\\TheFuckingMachine\\Desktop\\Takashi - Babel Solutions\\source\\public\\images\\finanzas.png",
    "C:\\Users\\TheFuckingMachine\\.gemini\\antigravity\\brain\\3a817a19-d461-4d53-9d68-91daf611dde1\\estrategico_compass_1773547320339.png": "c:\\Users\\TheFuckingMachine\\Desktop\\Takashi - Babel Solutions\\source\\public\\images\\estrategico.png"
};

const dir = "c:\\Users\\TheFuckingMachine\\Desktop\\Takashi - Babel Solutions\\source\\public\\images";
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

for (const [src, dst] of Object.entries(images)) {
    try {
        fs.copyFileSync(src, dst);
        console.log(`Copied ${src} to ${dst}`);
    } catch (e) {
        console.error(`Failed to copy ${src}: ${e}`);
    }
}
