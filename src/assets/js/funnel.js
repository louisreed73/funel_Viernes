

// import 'bootstrap/js/dist/collapse.js';



import '../scss/main_index.scss';

import {pedido} from './pedido';


let _pasoActPage=0;

// console.log("Hola!!!!",pedido.getPedido());
//elemento Nombre de la Oferta
let ofertaName=document.querySelector(".c_funnel__Head :nth-child(2)"),
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
// Elemento con la clase que realiza el cambio de color de progreso %
    stepProgress=document.querySelector(".c_funnel__progress--Steps .c_funnel__progressValue"),
    // Elemento con la clase que realiza el cambio de color de progreso % de los subssteps
    subStepsProgress=document.querySelector(".c_funnel__progress .c_funnel__progressValue"),

    // Elemento con la clase que realiza el cambio de color de progreso % de los subssteps, padre Container
    subStepsElem=document.querySelector(".c_funnel__progress"),
    //Elemento padre donde se insertan los iconos para seleccionar
        iconosPaso=document.querySelector(".c_funnel__Icons"),
        //Recuperación del indice de la oferta seleccionada
        pedidoActIndice=pedido.getPedido()[0],
        //Recuperación del objeto con la oferta seleccionada
        ofertaAct=pedido.getOfertas(pedidoActIndice);

        console.log(ofertaAct.name,ofertaAct.steps,ofertaAct.substeps)



//Renderizar el nombre de la Oferta - textContent
ofertaName.textContent=ofertaAct.name;
//Renderizar el número de Pasos - textContent
stepCount.textContent=ofertaAct.steps;
//Renderizar el número de Pasos - textContent

function inicioCargaPaso(paso) {
    stepAct.textContent=paso+1;
    subStepAct.textContent=0;
    //Renderizar el número de Pasos - textContent
    subStepCount.textContent=ofertaAct.substeps[paso];
    //Renderizar la clase actual, estado del progreso


}

function dibujaProgreso(pasoAct,pasos,elementoClase) {
    let nuevaClass=elementoClase.classList.value.replace(/\bprog\w+/g,`prog_${pasoAct}_of_${pasos}`);
    elementoClase.classList=nuevaClass;

}

function dibujaIconsPaso(cantidad,padre) {
    let inner="";
    for(let i=0;i<cantidad;i++) {
        inner+=`
        <li class="c_funnel__icLink disabled">
        <span class="c_funnel__icLinkText">Pizza 1</span>
        <span class="c_funnel__icLinkIcon--bebida">

        </span>
    </li>
        `
    }

    // console.log(inner,padre);

    padre.innerHTML=inner;
}

function inicioPagina() {
    inicioCargaPaso(_pasoActPage);
    dibujaProgreso(_pasoActPage+1,ofertaAct.steps,stepProgress)
    dibujaProgreso(0,ofertaAct.substeps[_pasoActPage],subStepsProgress)
    dibujaIconsPaso(ofertaAct.substeps[_pasoActPage],iconosPaso);
    
}



inicioPagina();




//Funcion helper para pintar el número de iconos, cantidad substeps - y dentro de que contenedor padre



console.log(subStepsProgress);


iconosPaso.addEventListener("click",(e)=>{
    if(e.target!==e.currentTarget) {
        e.target.closest(".c_funnel__icLink").classList.add("active");
        let numeroIconos=document.querySelectorAll(".c_funnel__icLink.active").length;
        subStepAct.textContent=numeroIconos;

        if(numeroIconos===ofertaAct.substeps[_pasoActPage]) {
            dibujaProgreso(numeroIconos,ofertaAct.substeps[_pasoActPage],subStepsProgress);
            btnNext.classList.toggle("disabled");
            console.log("Has finalizado!!!");
           
            _pasoActPage++;
            
            console.log(_pasoActPage);

            document.querySelector(".btn_Next").addEventListener("click",(e)=>{

                setTimeout(()=>{
                    console.log("Ahora si puedes pasar a la otra página!!!!!");

                    btnNext.classList.add("disabled");
                    inicioPagina(); 
                },250)
                // _pasoActPage++;
            
            
            
            // inicioPagina(); 

            })
         
            
/*             document.querySelector(".btn_Next").addEventListener("click",(e)=>{
                console.log("Ahora si puedes pasar a la otra página!!!!!");
                _pasoActPage++;
            
            console.log(_pasoActPage);
            
            inicioPagina(); 

            })*/

            console.log("Substeps length: ",ofertaAct.substeps.length, "Paso Page: ",_pasoActPage)


        }

        else{

            dibujaProgreso(numeroIconos,ofertaAct.substeps[_pasoActPage],subStepsProgress);
            console.log(numeroIconos)
            console.log("Substeps length: ",ofertaAct.substeps.length, "Paso Page: ",_pasoActPage)

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

            subStepsElem.classList.add("op-0")
        }




// console.log("Iconos Activos: ",numeroIconos)

    }
})












