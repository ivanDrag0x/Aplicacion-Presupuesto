const ingresos = [
    new Ingreso('Venta Inmueble', 3000000),
    new Ingreso('Venta Coche',1500)
];

const egresos = [
    new Egreso('Compra Terreno' , -500000),
    new Egreso('Ropa', -400)

];


let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;

}

let totalEgresos = () => {
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() + totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
     
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-ES', {style:'currency', currency: 'MXN', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
        console.log(`Descripción: ${ingreso.descripcion} Id: ${ingreso.id}`);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                  <button class="elemento_eliminar--btn">
                      <ion-icon name='trash-outline' onclick='eliminarIngreso(${ingreso.id})' ></ion-icon>
                  </button>
              </div>
            </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML ='';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                  <div class="elemento_descripcion">${egreso.descripcion}</div>
                  <div class="derecha limpiarEstilos">
                      <div class="elemento_valor"> ${formatoMoneda(egreso.valor)}</div>
                      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                      <div class="elemento_eliminar">
                          <button class="elemento_eliminar--btn">
                            <ion-icon name='trash-outline' onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                          </button>
                      </div>
                      
                  </div>
                  
              </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarEgresos();
    cargarCabecero();

}

const agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if( descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();

        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +(-valor.value)));
            cargarCabecero();
            cargarEgresos();
        }

    }else{
    console.log('VALORES NO INGGRESADOS')
    }
    }