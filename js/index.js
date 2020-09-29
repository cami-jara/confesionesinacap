window.confesiones = [];
window.mostrarConfesiones = (errores)=>{
  let erroresDiv = document.querySelector("#errores-div");
  let ul = document.createElement("ul");
  ul.classList.add("alert","alert-warning");
  errores.forEach((e)=>{
    let li = document.createElement("li");
    li.innerText = e;
    ul.appendChild(li);
});
    erroresDiv.appendChild(ul);
},
window.cargarConfesiones = ()=>{
let tbody = document.querySelector("#tabla-confesiones > tbody");
tbody.innerHTML = "";
let nro = 1;

window.confesiones.forEach((p)=>{

  let tr = document.createElement("tr");
  let tdNumero = document.createElement("td");
  tdNumero.innerText = nro;

  let tdNombre = document.createElement("td");
  tdNombre.innerText = p.nombre;
  let tdDescripcion = document.createElement("td");
  tdDescripcion.innerText = p.descripcion;
  let tdCarrera = document.createElement("td");
  tdCarrera.innerText = p.carrera;
  let tdDestacado = document.createElement("td");
  tdDestacado.innerHTML = p.descatado? "Sí" : "No";
  if(p.destacado !=""){
    tdDestacado.style="width: 80px";
    let img = document.createElement("img");
    img.src = "img/star.svg";
    img.classList.add("img-fluid");
    tdDestacado.appendChild(img);
    imagen = "star.svg";
  }
   let tdAcciones = document.createElement("td");
   let boton = document.createElement("button");
   boton.innerText = "Eliminar";
   boton.classList.add("btn","btn-danger");
   boton.nro = nro;
   boton.addEventListener('click', ()=>{
     window.eliminarConfesion(this.nro);
   });
   tdAcciones.appendChild(boton);
    
   tr.appendChild(tdNumero);
   tr.appendChild(tdNombre);
   tr.appendChild(tdDescripcion);
   tr.appendChild(tdCarrera);
   tr.appendChild(tdDestacado);
   tr.appendChild(tdAcciones);

   tbody.appendChild(tr);
   nro = nro + 1;
});
};

  window.eliminarConfesion = (nro)=>{
  window.confesiones.splice(nro-1,1);
  window.cargarConfesiones();
};
  window.guardarConfesion = (confesion)=>{
  window.confesiones.push(confesion);
  window.cargarConfesiones();
}; 

tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const botonAgrego = document.querySelector("#agregar-btn");

botonAgrego.addEventListener('click', ()=>{
  let erroresDiv = document.querySelector("#errores-div");
  erroresDiv.innerHTML= "";

  let nombre = document.querySelector("#nombre-txt").value.trim();
  let descripcion = tinymce.get('descripcion-txt').getContent();
  let carrera = document.querySelector("#carrera-select").value;
  let destacado = document.querySelector("#destacado-chx").checked;

  let errores = [];
  if (nombre === ''){
    errores.push("Debe ingresar Nombre");
  }
  if(descripcion === ''){
    errores.push("Debe ingresar una Descripcion");
  }
  if(errores.length === 0 ){
    let confesion = {};
    confesion.nombre = nombre;
    confesion.descripcion = descripcion;
    confesion.carrera = carrera;
    confesion.destacado = destacado;

    window.guardarConfesion(confesion);
  }else {
    window.mostrarErrores(errores);
  }

});