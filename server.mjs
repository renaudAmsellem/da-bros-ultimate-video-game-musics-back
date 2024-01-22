import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
import fs from 'fs'

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRandomFileFromDir = () => {
    const files = fs.readdirSync(path.resolve(__dirname + "/uploads")).filter(file => path.extname(file) === '.mp3')
    console.log(files)
    
    let max = files.length - 1;
    let min = 0;
    
    let index = Math.round(Math.random() * (max - min) + min);
    let file = files[index];

    console.log(file)
    
    return file
}
    
app.get("/music", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const music = getRandomFileFromDir()
    res.sendFile(path.resolve(__dirname + "/uploads/" + music));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});