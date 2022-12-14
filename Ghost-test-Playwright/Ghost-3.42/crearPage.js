
const playwright = require('playwright');
const url = 'http://localhost:3001/ghost';
const user = 'a.alvarezh2@uniandes.edu.co';
const password = '12345abcde';


(async () => {

  for (const browserType of ['chromium']){
   
    console.log(browserType+'-------------------------------------------')

    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    console.log('1. Incio');
	await page.screenshot({path: './resultado/crearPage/1. Inicio.png'});
    
	await page.type('#ember8', user);
    await page.type('#ember10', password);
	
	console.log('2.Ingresar datos para autenticarse')
	await page.screenshot({path:'./resultado/crearPage/2.Datos_autenticarse.png'});
    await page.click('#ember12');
	
	await new Promise(r => setTimeout(r, 7000));
	console.log('3. Autenticado con Exito');
    await page.screenshot({path:'./resultado/crearPage/3.Autenticacion_exitosa.png'});
	
	await page.click('text=Pages');
	console.log('4. Ingresar a opción de menú pages');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/crearPage/4.Ingreso_pages.png'});
	
	await page.click('text=New page');
	console.log('5. Nueva pagina');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/crearPage/5.Nueva_pagina.png'});
	
    const tittle =  'New page test'
	await page.type("[placeholder='Page Title']", tittle);
	console.log('6. Ingresar titulo');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/crearPage/6.Titulo.png'});

    await page.click(".post-settings");
    await new Promise(r => setTimeout(r, 1000));

    await page.click(".gh-publishmenu-trigger");
    await new Promise(r => setTimeout(r, 1000));

    await page.click('.gh-publishmenu-button');
    console.log('7. Publicar Nueva pagina');
	await new Promise(r => setTimeout(r, 3000));
	await page.screenshot({path:'./resultado/crearPage/7.Publicar_Page.png'});
	
    await page.click(".blue.link.fw4.flex.items-center.ember-view");
	console.log('8. Ingresar a la lista de pages');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/crearPage/8.Ingreso_page.png'});
	
    await page.click("div.gh-contentfilter-menu.gh-contentfilter-type > div.ember-view.ember-basic-dropdown-trigger.ember-power-select-trigger.gh-contentfilter-menu-trigger");
    await page.click(".ember-power-select-options > li:nth-child(3)");
    console.log('9. Ingresar a la lista de paginas publicadas');
	await new Promise(r => setTimeout(r, 2000));
	await page.screenshot({path:'./resultado/crearPage/9.lista_pages.png'});

    const textTitle = await page.innerText(".gh-list > li:nth-child(2) > a:nth-child(2) > h3");
    console.log(textTitle == tittle);
	
    await browser.close();
  }
  return;
})();