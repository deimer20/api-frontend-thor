const url = 'http://localhost:8082/api/empleados' //url de la api. Al desplegarla en el servidor local colocar la api del servi
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function(data){
        let listaEmpleados = data.empleados
        listaEmpleados.map(function(empleado){
            respuesta += `<tr><td>${empleado.cedula}</td>`+
                        `<td>${empleado.nombre_Empleado}</td>`+
                        `<td>${empleado.correo}</td>`+
                        `<td>${empleado.direccion}</td>`+
                        `<td>${empleado.telefono}</td>`+
                        `<td>${empleado.estado_Empleado}</td>`+
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(empleado)})'>Editar</a>
                        <a class="waves-effect waves-light btn modal-denger red" href="#" onclick='eliminar(${JSON.stringify(empleado)})'>Eliminar</a></td></tr>`  
                        body.innerHTML = respuesta

        })
    })
    //alert('En desarrollo...')
}
let flag = false;

const validaciones = (_cedula, _telefono, _correo) => {
  const regxNumeros = /^[0-9]+$/;
  const regxCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (regxNumeros.test(_cedula) && regxNumeros.test(_telefono) && regxCorreo.test(_correo)) {
    flag = true;
  }
};

const registrar = async () => {
  let _cedula = document.getElementById('cedula').value;
  let _nombre_Empleado = document.getElementById('nombre_Empleado').value;
  let _correo = document.getElementById('correo').value;
  let _direccion = document.getElementById('direccion').value;
  let _telefono = document.getElementById('telefono').value;
  let _estado_Empleado = document.getElementById('estado_Empleado').value;

  validaciones(_cedula, _telefono, _correo);

  if (_cedula.length >= 5 && _nombre_Empleado.length >= 3 && _direccion.length > 0 && _correo.length > 0 && _telefono.length > 0 && flag === true) {
    let _empleado = {
      cedula: _cedula,
      nombre_Empleado: _nombre_Empleado,
      correo: _correo,
      direccion: _direccion,
      telefono: _telefono,
      estado_Empleado: _estado_Empleado
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(_empleado),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.msg === 'Error: El dato ya existe en la base de datos') {
          Swal.fire(data.msg, '', 'error');
        } else {
          Swal.fire(data.msg, '', 'success');
          setTimeout(() => {
            window.location.href = "listarDatos.html";
          }, 2000);
        }
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      Swal.fire('Error al registrar el empleado', '', 'error');
    }
  } else {
    mostrarMensajesValidacion(_cedula, _nombre_Empleado, _correo, _direccion, _telefono);
  }
};

const mostrarMensajesValidacion = (_cedula, _nombre_Empleado, _correo, _direccion, _telefono) => {
  let mensajesValidacion = [];

  if (_cedula.length < 5) {
    mensajesValidacion.push('Ingrese una cédula válida con más de 5 caracteres y solo números');
  }
  if (_nombre_Empleado.length < 3) {
    mensajesValidacion.push('Ingrese un nombre de empleado válido con mas de 3 caracteres');
  }
  if (_correo.length === 0) {
    mensajesValidacion.push('Ingrese un correo electrónico');
  }
  if (_direccion.length === 0) {
    mensajesValidacion.push('Ingrese una dirección');
  }
  if (_telefono.length === 0) {
    mensajesValidacion.push('Ingrese un número de teléfono');
  }
  if (flag === false) {
    mensajesValidacion.push('Por favor verificar los datos ingresados');
  }

  if (mensajesValidacion.length > 0) {
    Swal.fire({
      title: 'Por favor verificar los datos ingresados en los campos',
      html: mensajesValidacion.join('<br>'),
      icon: 'error'
    });
  }
};


const editar= (empleado) =>{

    document.getElementById('cedula').value = ''
    document.getElementById('nombre_Empleado').value = ''
    document.getElementById('correo').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('estado_Empleado').value = ''


    document.getElementById('cedula').value = empleado.cedula
    document.getElementById('nombre_Empleado').value = empleado.nombre_Empleado
    document.getElementById('correo').value = empleado.correo
    document.getElementById('direccion').value = empleado.direccion
    document.getElementById('telefono').value = empleado.telefono
    document.getElementById('estado_Empleado').value =empleado.estado_Empleado


}

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _cedula = document.getElementById('cedula').value;
  let _nombre_Empleado = document.getElementById('nombre_Empleado').value;
  let _correo = document.getElementById('correo').value;
  let _direccion = document.getElementById('direccion').value;
  let _telefono = document.getElementById('telefono').value;
  let _estado_Empleado = document.getElementById('estado_Empleado').value;

  validaciones(_cedula, _telefono, _correo)

  if (_cedula.length >= 5 && _nombre_Empleado.length >= 3 && _direccion.length > 0 &&_correo.length > 0 && _telefono.length > 0 && flag === true) {
    let _empleado = {
      cedula: _cedula,
      nombre_Empleado: _nombre_Empleado,
      correo: _correo,
      direccion: _direccion,
      telefono: _telefono,
      estado_Empleado: _estado_Empleado
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(_empleado),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire(data.msg, '', 'success');
        setTimeout(() => {
          window.location.href = "listarDatos.html";
        }, 2000);
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      Swal.fire('Error al registrar el empleado', '', 'error');
    }
  } else {
    mostrarMensajesValidacion2(_cedula, _nombre_Empleado, _correo, _direccion, _telefono); // Llamar a la función para mostrar los mensajes de validación
  }
};

const mostrarMensajesValidacion2 = (_cedula, _nombre_Empleado, _correo, _direccion, _telefono) => {
  let mensajesValidacion = [];

  if (_cedula.length < 5) {
    mensajesValidacion.push('Ingrese una cédula válida con mas de 5 caracteres y solo números');
  }
  if (_nombre_Empleado.length < 3) {
    mensajesValidacion.push('Ingrese un nombre de empleado válido con mas de 3 caracteres');
  }
  if (_correo.length === 10) {
    mensajesValidacion.push('Ingrese un correo electrónico');
  }
  if (_direccion.length === 0) {
    mensajesValidacion.push('Ingrese una dirección');
  }
  if (_telefono.length === 0) {
    mensajesValidacion.push('Ingrese un número de teléfono');
  }
  if (flag === false) {
    mensajesValidacion.push('Por favor verificar los datos ingresados');
  }

  if (mensajesValidacion.length > 0) {
    Swal.fire({
      title: 'Por favor verificar los datos ingresados en los campos',
      html: mensajesValidacion.join('<br>'),
      icon: 'error'
    });
  }
};

const eliminar = (id) => {
  Swal.fire({
    title: '¿Estás seguro de que deseas realizar la eliminación?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar!'
  }).then((result) => {
    if (result.isConfirmed) {
      let empleado = { _id: id };
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(empleado),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((resp) => resp.json())
        .then((json) => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminación Exitosa',
            text: json.msg
          });
          setTimeout(() => {
            window.location.href = 'listarDatos.html';
          }, 2000);
        });
    } else {
      return false;
    }
  });
};

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizar)
}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email === "deimer" && password === "2020") {
  
    Swal.fire({
      icon: 'success',
      title: "¡Inicio Exitoso!",
      showConfirmButton: false,
      timer: 2000
    })
    
    setTimeout(() => {
      window.location.href = "/consumirAPI/home.html";
    }, 2000);
    
  } else {
    swal.fire("Usuario o contraseña incorrectos", "Por favor verificar los datos ingresados en los campos","error");
  }
}

function cerrar() {
  Swal.fire({
    title: '¿Estás seguro de que deseas cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: "¡Cerrado Exitoso!",
        showConfirmButton: false,
        timer: 2000}
      );
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }
  });
}

const boton = document.querySelector('#botoncerrar');
boton.addEventListener('click', cerrar);
