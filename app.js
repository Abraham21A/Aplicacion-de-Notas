// Evento para crear un nuevo Item
document.getElementById("Note-form").addEventListener("submit",crear)

// Funcion crear
function crear(e){
  nota = document.getElementById("firstNote").value
  fecha = document.getElementById("firstDate").value

  let miNota = {
    nota,
    fecha
  }

  if(localStorage.getItem("Notas") === null) {
    let notas = []
    notas.push(miNota)
    localStorage.setItem("Notas", JSON.stringify(notas))
  }else {
    let notas = JSON.parse(localStorage.getItem("Notas"))
    notas.push(miNota)
    localStorage.setItem("Notas", JSON.stringify(notas))
  }
  leer();
  document.getElementById("Note-form").reset();
  console.log("nota guardada correctamente")
  e.preventDefault()
}

// Funcion leer
function leer() {
  let notas = JSON.parse(localStorage.getItem("Notas"));
  document.getElementById("tbody").innerHTML = ""
  for(let i = 0; i < notas.length; i++){
    let nota = notas[i].nota
    let fecha = notas[i].fecha

    document.getElementById("tbody").innerHTML +=
    ` <tr>
        <td>${nota}</td>
        <td>${fecha}</td>
        <td>
          <button onclick="editar('${nota}')" class="btn btn-warning btn-sm mb-2 edit">Edit</button>
          <button onclick="eliminar('${nota}')" class="btn btn-danger btn-sm mb-2">Delete</button>
        </td>
      </tr>
    ` 
  }
}

// funcion editar
function editar(nota) {
  let notas = JSON.parse(localStorage.getItem("Notas"));
  for(let i = 0; i < notas.length; i++) {
    if(notas[i].nota === nota){
      document.getElementById("body").innerHTML = 
      ` <div class="main row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h2>Editar Nota</h2>
              </div>
              <div class="card-body">

                <form>

                  <div class="form-group mb-3">
                    <label for="firstNote">Note</label>
                    <input class="form-control" id="newfirstNote" placeholder="${notas[i].nota}" type="text">
                  </div>

                  <div class="form-group mb-3">
                    <label for="firstDate">Date</label>
                    <input class="form-control" id="newfirstDate" type="date">
                  </div>

                </form>

                <button class="btn btn-outline-success " onclick="actualizar('${i}')">Update</button>
                <button class="btn btn-outline-primary " onclick="vistaPrincipal()">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      `
    }
  }
}

// funcion actualizar
function actualizar(i) {
  let notas = JSON.parse(localStorage.getItem("Notas"));
  notas[i].nota = document.getElementById("newfirstNote").value;
  notas[i].fecha = document.getElementById("newfirstDate").value;
  if(notas[i].nota == ""){
    alert("No ha ingresado nuevo contenido a Nota")
  }else{
    if(notas[i].fecha == ""){
      alert("No ha ingresado una nueva fecha")
    }else{
      localStorage.setItem("Notas", JSON.stringify(notas));
      vistaPrincipal()
    }
  }
}

// funcion eliminar
function eliminar(nota) {
  let notas = JSON.parse(localStorage.getItem("Notas"));
  for(let i = 0; i < notas.length; i++) {
    if(notas[i].nota === nota) {
      notas.splice(i, 1);
    }
  }
  localStorage.setItem("Notas", JSON.stringify(notas));
  leer();
}

// funcion mostrar interfaz principal despues de actualizar
function vistaPrincipal() {
  document.getElementById("body").innerHTML = ` <div class="main row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">

            <form action="" id="Note-form">

              <div class="form-group mb-3">
                <label for="firstNote">Note</label>
                <input class="form-control" id="firstNote" placeholder="Write your Note" type="text">
              </div>

              <div class="form-group mb-3">
                <label for="firstDate">Date</label>
                <input class="form-control" id="firstDate" type="date">
              </div>

              <div class="col-8">
                <button type="submit" class="btn btn-outline-primary">Add +</button>
              </div>

            </form>

          </div>
        </div>
      </div>

      <div class="col-12 col-md-8 mt-4 mb-3">
        <table class="table table-striped table-bordered table-light">
          <thead>
            <tr>
              <th scope="col">Note</th>
              <th scope="col">Date</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody class="note-list" id="tbody">
            <tr>
              <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos.</td>
              <td>20/10/22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
  leer();
}

leer();