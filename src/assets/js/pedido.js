const pedido = (function () {
    let _ped_Arr;

    let _ofertas_Arr;

    function inicio() {


        console.log("Hola!!!")

        if (!localStorage.getItem("ofertas")) {

            console.log("No existen las ofertas")

            _ofertas_Arr = [{
                    name: "Triple de Telepizza: 3 familiares a domicilio por 12 € cada una",
                    steps: 3,
                    substeps: [
                        {
                            unds: 6,
                            categ: "pizza",
                            select:[
                                {
                                    name:"Pizza Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                }
                            ]
                        },
                        {
                            unds: 3,
                            categ: "entrante",
                            select:[
                                {
                                    name:"Entrante Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                }
                            ]
                        },
                        {
                            unds: 1,
                            categ: "bebida",
                            select:[
                                {
                                    name:"Bebida Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                            ]
                        },
                    ]

                },
                {
                    name: "Ciberchollo L",
                    steps: 2,
                    substeps: [
                        {
                            unds: 3,
                            categ: "pizza",
                            select:[
                                {
                                    name:"Pizza Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                }
                            ]
                        },
                        {
                            unds: 1,
                            categ: "entrante",
                            select:[
                                {
                                    name:"Entrante Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Entrante Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                }
                            ]
                        }
                    ]

                },
                {
                    name: "Ciberchollo XL",
                    steps: 1,
                    substeps: [
                        {
                        unds: 1,
                        categ: "pizza",
                        select:[
                            {
                                name:"Pizza Tipo 1",
                                image:"./assets/imgs/image_dummy.png"
                            },
                            {
                                name:"Pizza Tipo 2",
                                image:"./assets/imgs/image_dummy.png"
                            },
                            {
                                name:"Pizza Tipo 3",
                                image:"./assets/imgs/image_dummy.png"
                            },
                            {
                                name:"Pizza Tipo 4",
                                image:"./assets/imgs/image_dummy.png"
                            }
                        ]
                    }
                ]


                },
                {
                    name: "2X1 en tus pizzas medianas y familiares",
                    steps: 2,
                    substeps: [
                        {
                            unds: 1,
                            categ: "pizza",
                            select:[
                                {
                                    name:"Pizza Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Pizza Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                }
                            ]
                        },
                        {
                            unds: 1,
                            categ: "bebida",
                            select:[
                                {
                                    name:"Bebida Tipo 1",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 2",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 3",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                                {
                                    name:"Bebida Tipo 4",
                                    image:"./assets/imgs/image_dummy.png"
                                },
                            ]
                        }
                    ]

                }
            ]

            console.log(_ofertas_Arr)

            localStorage.setItem("ofertas", JSON.stringify(_ofertas_Arr))
        } else {

            _ofertas_Arr = JSON.parse(localStorage.getItem("ofertas"))

        }



    }

    inicio();

    if (!localStorage.getItem("pedido")) {
        console.log("No hay pedido!!!");
        _ped_Arr = [];

    } else {

        _ped_Arr = JSON.parse(localStorage.getItem("pedido"))


    }



    function getPedido() {
        return JSON.parse(localStorage.getItem("pedido"));
    }

    function setPedido(data) {

        // _ped_Arr.push(data)
        _ped_Arr.splice(0, 1, data);

        localStorage.setItem("pedido", JSON.stringify(_ped_Arr))

    }

    function getOfertas(ind) {
        console.log("indice: ", ind)
        return _ofertas_Arr[ind]
    }

    return {

        getPedido: getPedido,
        setPedido: setPedido,
        getOfertas: getOfertas
    }
}());

export {
    pedido
}