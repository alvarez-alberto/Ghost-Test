const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

const { options } = config;

let resultInfo = {}
let datetime = new Date().toISOString().replace(/:/g,".");



async function compareResultTest(scenario, step){

    if (!fs.existsSync(`./results/kraken/${datetime}`)){
        fs.mkdirSync(`./results/kraken/${datetime}`, { recursive: true });
    }
    
    const data = await compareImages(
        fs.readFileSync(`../Ghost-test-kraken/Ghost-5.18/screenshot/${scenario}/${step}`),
        fs.readFileSync(`../Ghost-test-kraken/Ghost-3.42/screenshot/${scenario}/${step}`),
        options
    );
    resultInfo[scenario] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
    }
    fs.writeFileSync(`./results/kraken/${datetime}/compare-${scenario}-${step}`, data.getBuffer());
    
    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")

}

function scanDirs(directoryPath, root){
    console.log("Buscando...")
    try{
        var ls=fs.readdirSync(directoryPath);
        for (let index = 0; index < ls.length; index++) {
            const file = path.join(directoryPath, ls[index]);
            var dataFile =null;
            try{
                dataFile =fs.lstatSync(file);
            }catch(e){}

            if(dataFile){
                if(dataFile.isDirectory()){
                    scanDirs(file, ls[index])
                }else{
                    compareResultTest(root, ls[index])
                }
            }
        }
    }catch(e){}
}


scanDirs('../Ghost-test-kraken/Ghost-3.42/screenshot');

