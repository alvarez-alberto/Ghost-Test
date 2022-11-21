const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');
const { Console } = require("console");


const modulo="tag";
const nombrejs='TagCrearNegativo.js'
const nombreEscenario='CrearTagNegativo';


const { options ,versionsCompare} = config;

let resultInfo = []




async function executeTest(){

  let datetime = new Date().toISOString().replace(/:/g,".");

  if (!fs.existsSync(`./results/playwright/${datetime}`)){
        fs.mkdirSync(`./results/playwright/${datetime}`, { recursive: true });
    }

    if (!fs.existsSync(`./results/playwright/${datetime}/report`)){
        fs.mkdirSync(`./results/playwright/${datetime}/report`, { recursive: true });
    }

    exec('cd '+versionsCompare.before+'  & npm install');
    exec('cd '+versionsCompare.after+' & npm install');
    //exec('cd ../Ghost-test-Playwright/Ghost-5.18/ & node TagCrearNegativo.js');
    //exec('cd ../Ghost-test-Playwright/Ghost-3.42/ & node TagCrearNegativo.js');

    exec('cd '+versionsCompare.before+' & node '+nombrejs);
    exec('cd '+versionsCompare.after+' & node '+nombrejs);


    var ls=fs.readdirSync(versionsCompare.before+'resultado\\'+modulo+'\\'+nombreEscenario);


    for (let i=0;i<ls.length;i++){

        const data = await compareImages(
            fs.readFileSync(versionsCompare.before+'resultado\\'+modulo+'\\'+nombreEscenario+'\\'+ls[i]),
            fs.readFileSync(versionsCompare.after+'resultado\\'+modulo+'\\'+nombreEscenario+'\\'+ls[i]),
            options
        );

            
        resultInfo.push({
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime,
            modulo:{modulo},
            escenario:{nombreEscenario},
            nombreImagen:ls[i],
            pathBefore:'..\\..\\..\\..\\'+versionsCompare.before+'resultado\\'+modulo+'\\'+nombreEscenario+'\\'+ls[i],
            pathAfter:'..\\..\\..\\..\\'+versionsCompare.after+'resultado\\'+modulo+'\\'+nombreEscenario+'\\'+ls[i],
            pathCompare: '..\\compare-'+nombreEscenario+'-'+ls[i]

        }
        
        )
        fs.writeFileSync(`./results/playwright/${datetime}/compare-${nombreEscenario}-${ls[i]}`, data.getBuffer());
    }

        fs.writeFileSync(`./results/playwright/${datetime}/report/report.html`, createReport(datetime, resultInfo));
        fs.copyFileSync('./index.css', `./results/playwright/${datetime}/report/index.css`);


    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")



}



function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${info.pathBefore}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${info.pathAfter}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${info.pathCompare}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
              
            ${resInfo.map(compareInfo=>browser('Chrome', compareInfo))}

         
            
            </div>
        </body>
    </html>`
}




function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}


(async ()=>console.log(await executeTest()))();

//exec('echo INICIO');
//exec('cd ../ & dir & cd ../ & dir');

//exec('cd ../ & cd Ghost-test-kraken & cd Ghost-5.18 & "C:\\Program Files\\Git\\bin\\bash.exe" & ./node_modules/kraken-node/bin/kraken-node run');
//exec('cd ../ & cd Ghost-test-kraken & cd Ghost-5.18 & npm install');
/*exec('npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"');
setTimeout(() => {
    console.log("3 Segundo esperado");
  }, 6000);



*/






