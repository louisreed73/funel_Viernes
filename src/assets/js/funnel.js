

// import 'bootstrap/js/dist/collapse.js';



import '../scss/main_index.scss';

import {pedido} from './pedido';


let _pasoActPage=0;

// console.log("Hola!!!!",pedido.getPedido());
//elemento Nombre de la Oferta
let ofertaName=document.querySelector(".c_funnel__Head :nth-child(2)"),
// let ofertaNameAdded=document.querySelector("c_funnel__icLinkText"),
//Elemento span con el texto del step Actual
    stepAct=document.querySelector(".c_funnel__progress--Steps .c_funnel__progressText :nth-child(1)"),
//Elemento span con el texto del parrafo completo para compra Finalizada
    stepFinal=document.querySelector(".c_funnel__progress--Steps .c_funnel__progressText"),
//Elemento button Next
    btnNext=document.querySelector(".btn_Next"),
//Elemento span con el texto del step Final
    stepCount=document.querySelector(".c_funnel__progress--Steps .c_funnel__progressText :nth-child(2)"),
    subStepAct=document.querySelector(".c_funnel__progressText--Substeps :nth-child(1)"),
    subStepCount=document.querySelector(".c_funnel__progressText--Substeps :nth-child(2)"),
    subStepCateg=document.querySelector(".c_funnel__progressText--Substeps :nth-child(3)"),
    subStepCategPlur=document.querySelector(".c_funnel__progressText--Substeps :nth-child(4)"),
// Elemento con la clase que realiza el cambio de color de progreso %
    stepProgress=document.querySelector(".c_funnel__progress--Steps .c_funnel__progressValue"),
    // Elemento con la clase que realiza el cambio de color de progreso % de los subssteps
    subStepsProgress=document.querySelector(".c_funnel__progress .c_funnel__progressValue"),
    indicadorPasoCateg=document.querySelector("[data-stepID]"),
    indPasoCategName=document.querySelector("[data-stepID] span"),
    indPasoCategCont=document.querySelector(".c_funnel__Info"),
    botones=document.querySelector(".c_funnel__buttons"),
    padreContainerSelect=document.querySelector(".c_funnelSelect"),
   

    // Elemento con la clase que realiza el cambio de color de progreso % de los subssteps, padre Container
    subStepsElem=document.querySelector(".c_funnel__progress"),
    //Elemento padre donde se insertan los iconos para seleccionar
        iconosPaso=document.querySelector(".c_funnel__Icons"),
    //Elemento padre donde se insertan los items para añadir
        containerSelect=document.querySelector(".c_funnelSelect"),

        //Recuperación del indice de la oferta seleccionada
        pedidoActIndice=pedido.getPedido()[0],
        //Recuperación del objeto con la oferta seleccionada
        ofertaAct=pedido.getOfertas(pedidoActIndice);

        // console.log(ofertaAct.name,ofertaAct.steps,ofertaAct.substeps)



//Renderizar el nombre de la Oferta - textContent
ofertaName.textContent=ofertaAct.name;
//Renderizar el número de Pasos - textContent
stepCount.textContent=ofertaAct.steps;
//Renderizar el número de Pasos - textContent

function inicioCargaPaso(paso,categ) {
    stepAct.textContent=paso+1;
    subStepAct.textContent=0;
    //Renderizar el número de Pasos - textContent
    subStepCount.textContent=ofertaAct.substeps[paso].unds;
    indPasoCategName.innerHTML="&nbsp;" +ofertaAct.substeps[paso].categ;
    subStepCateg.textContent=ofertaAct.substeps[paso].categ+"s";
    subStepCategPlur.textContent="añadidas";
    if(categ==="entrante") {
        subStepCategPlur.textContent="añadidos"
    }
    //Renderizar la clase actual, estado del progreso


}

function dibujaProgreso(pasoAct,pasos,elementoClase) {
    // console.log(pasoAct);
    let nuevaClass=elementoClase.classList.value.replace(/\bprog\w+/g,`prog_${pasoAct}_of_${pasos}`);
    elementoClase.classList=nuevaClass;

}

function dibujaIconsPaso(cantidad,padre,categ) {
    let inner="";
    for(let i=0;i<cantidad;i++) {
        inner+=`
        <li class="c_funnel__icLink disabled">
        <span class="c_funnel__icLinkText">${categ} ${i+1}</span>
        <span class="c_funnel__icLinkIcon--${categ}">

        </span>
    </li>
        `
    }

    // console.log(inner,padre);

    padre.innerHTML=inner;
}

function dibujaSelectPaso(datosSelect,padre) {
    let inner="";
   for (let i=0;i<datosSelect.length;i++)  {
       inner+=`
       <div class="c_oferta" data-oferta="${i}">
       <div class="c_oferta__Content">
           <div class="c_oferta__ContentText">
               ${datosSelect[i].name}
           </div>
           
               <button class="c_oferta__ContentBtn" data-codeItem="${i}" data-codeName="${datosSelect[i].name}">añadir</button>
           
       </div>
       <div class="c_oferta__Img">
           <img src="${datosSelect[i].image}" alt="${datosSelect[i].name}" srcset="">
       </div>
   </div>

       `
   }

    // console.log(inner,padre);

    padre.innerHTML=inner;
}




function inicioPagina() {
    inicioCargaPaso(_pasoActPage,ofertaAct.substeps[_pasoActPage].categ);
    dibujaProgreso(_pasoActPage+1,ofertaAct.steps,stepProgress)
    dibujaProgreso(0,ofertaAct.substeps[_pasoActPage].unds ,subStepsProgress)
    dibujaIconsPaso(ofertaAct.substeps[_pasoActPage].unds,iconosPaso,ofertaAct.substeps[_pasoActPage].categ);
    dibujaSelectPaso(ofertaAct.substeps[_pasoActPage].select,padreContainerSelect)
    
}



inicioPagina();




//Funcion helper para pintar el número de iconos, cantidad substeps - y dentro de que contenedor padre



// console.log(subStepsProgress);


//Funciones helpers de los add Items listener

function stepComplete(e) {

    setTimeout(()=>{
        // console.log("Ahora si puedes pasar a la otra página!!!!!");
        indicadorPasoCateg.dataset.stepid="1"

        btnNext.classList.add("disabled");
        inicioPagina(); 
    },250)

}


/* function addItem0(e) {
    if(e.target!==e.currentTarget) {
        e.target.closest(".c_funnel__icLink").classList.add("active");
        let numeroIconos=document.querySelectorAll(".c_funnel__icLink.active").length;
        subStepAct.textContent=numeroIconos;

        if(numeroIconos===ofertaAct.substeps[_pasoActPage].unds) {
            dibujaProgreso(numeroIconos,ofertaAct.substeps[_pasoActPage].unds,subStepsProgress);
            btnNext.classList.toggle("disabled");
            // console.log("Has finalizado!!!");
           
            _pasoActPage++;
            
            
            // console.log(_pasoActPage);

            document.querySelector(".btn_Next").addEventListener("click",stepComplete)
         
            



        }

        else{

            dibujaProgreso(numeroIconos,ofertaAct.substeps[_pasoActPage].unds,subStepsProgress);
            //Aumenta el contador de la categoria de Items seleccionados
            indicadorPasoCateg.dataset.stepid++;
            // console.log(numeroIconos)
            // console.log("Substeps length: ",ofertaAct.substeps.length, "Paso Page: ",_pasoActPage)

        }


        if(ofertaAct.substeps.length===_pasoActPage) {
            console.log("Has completado la compra!!!!",btnNext);
            btnNext.classList.add("disabled");
            iconosPaso.innerHTML=`
            <h1>Has finalizado la compra!!!!</h1>
            `
            stepFinal.innerHTML=`
            <p>Pedido Finalizado</p>
            `

            subStepsElem.style.display="none";
            indPasoCategCont.style.display="none";
            botones.style.paddingTop="1.5rem";
        }






    }

} */


// iconosPaso.addEventListener("click",addItem0)

function addItem(e){

    if( e.target!==e.currentTarget&&e.target.classList.contains("c_oferta__ContentBtn") ) {

        e.preventDefault();

        let codeItemAdded=e.target.dataset.codeitem,
        itemAddedName=e.target.dataset.codename,
        elemsIconos=document.querySelectorAll(".c_funnel__icLink"),
        elemsActivated=[...elemsIconos].filter(elem=>{
            return elem.classList.contains("active")
        }),
        elemstoActivate=[...elemsIconos].filter(elem=>{
            return !elem.classList.contains("active")
        });

        console.log("Item Code Added nº: ",codeItemAdded,itemAddedName)

        // subStepAct.textContent=elemsActivated.length;

        // elemstoActivate[0].classList.add("active");
        // let copia
        
/*         ----------------------------------------------------------------
        PROCESO of CHECKING
        ---------------------------------------------------------------- */



            elemstoActivate[0].classList.add("active");
            console.log(elemstoActivate[0], elemstoActivate[0].firstElementChild,itemAddedName)
            elemstoActivate[0].firstElementChild.textContent=itemAddedName;
            elemsActivated=[...elemsIconos].filter(elem=>{
                return elem.classList.contains("active")
            });

            
            // console.log(elemsActivated.length)
            subStepAct.textContent=elemsActivated.length;

            dibujaProgreso(elemsActivated.length,ofertaAct.substeps[_pasoActPage].unds,subStepsProgress);

            //Aumenta el contador de la categoria de Items seleccionados
            indicadorPasoCateg.dataset.stepid++;
            // console.log(numeroIconos)
            // console.log("Substeps length: ",ofertaAct.substeps.length, "Paso Page: ",_pasoActPage)

            // console.log( "Desde paso de pagina: ",elemsActivated.length)



        if(elemsActivated.length===ofertaAct.substeps[_pasoActPage].unds) {

        // elemstoActivate[0].classList.add("active");

            dibujaProgreso(elemsActivated.length,ofertaAct.substeps[_pasoActPage].unds,subStepsProgress);
            btnNext.classList.toggle("disabled");
            // console.log("Has finalizado!!!");
           
            _pasoActPage++;
            
            
            // console.log(_pasoActPage);

            document.querySelector(".btn_Next").addEventListener("click",stepComplete)
         
            



        }




        if(ofertaAct.substeps.length===_pasoActPage) {
            console.log("Has completado la compra!!!!",btnNext);
            btnNext.classList.add("disabled");
            iconosPaso.innerHTML=`
            <h1>Has finalizado la compra!!!!</h1>
            `
            stepFinal.innerHTML=`
            <p>Pedido Finalizado</p>
            `

            subStepsElem.style.display="none";
            indPasoCategCont.style.display="none";
            botones.style.paddingTop="1.5rem";
        }
        

    }
    
}



containerSelect.addEventListener("click",addItem)












