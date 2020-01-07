

// import 'bootstrap/js/dist/collapse.js';



import '../scss/main_index.scss';

import {pedido} from './pedido';

const container=document.querySelector(".c_containerP");

container.addEventListener("click",(e)=>{
    if(e.target!==e.currentTarget) {
        // console.log(e.target.dataset.oferta);
        // console.log("clickeado!!!",e.target.closest(".c_oferta"))

        let elem=e.target.closest(".c_oferta"),
        pedidoAct=+elem.closest(".c_oferta").dataset.oferta;
        pedido.setPedido(pedidoAct);
        // console.log(pedido.getPedido()) 
       
         e.preventDefault();
            setTimeout(()=>{
                
                        location.href="./funnel.html";
                    },100) 
                }
})