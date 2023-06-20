const url = 'http://localhost:8082/api/usuario' //url de la api. Al desplegarla en el servidor local colocar la api del servi
const listarDatosUsu = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
    .then(function(data){
        let listaUsuarios = data.usuarios
        listaUsuarios.map(function(usuario){
            respuesta += `<tr><td>${usuario.nombre}</td>`+
                        `<td>${usuario.rol}</td>`+
                        `<td>${usuario.estado}</td>`+
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})'>Editar</a>
                        <a class="waves-effect waves-light btn modal-denger red" href="#" onclick='eliminar(${JSON.stringify(usuario)})'>Eliminar</a></td></tr>`  
                        body.innerHTML = respuesta

        })
    })
    //alert('En desarrollo...')
}

const registrar = async () => {
    let _nombre = document.getElementById('nombre').value;
    let _pass = document.getElementById('password').value;
    let _confirmaPass = document.getElementById('confirmarPassword').value;
    let _rol = document.getElementById('rol').value;
    let _estado = document.getElementById('estado').value;
  
    if (
      _nombre.length > 0 &&
      _pass.length > 0 &&
      _confirmaPass.length > 0 &&
      _rol.length > 0 &&
      _estado.length > 0 &&
      _pass === _confirmaPass
    ) {
      let _usuario = {
        nombre: _nombre,
        password: _pass,
        rol: _rol,
        estado: _estado
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(_usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.msg === 'Error: El dato ya existe en la base de datos') {
            Swal.fire(data.msg, '', 'error');
          } else {
            Swal.fire(data.msg, '', 'success');
            setTimeout(() => {
              window.location.href = "listarDatosUsu.html";
            }, 2000);
          }
        } else {
          throw new Error('Error al enviar la solicitud');
        }
      } catch (error) {
        Swal.fire('Error al registrar el usuario', '', 'error');
      }
    } else {
      mostrarMensajesValidacion(_nombre, _pass, _confirmaPass, _rol, _estado);
    }
  };
  
  const mostrarMensajesValidacion = (_nombre, _password, _confirmaPass, _rol, _estado) => {
    let mensajesValidacion = [];
  
    if (_nombre.length === 0) {
      mensajesValidacion.push('Ingrese un nombre');
    }
    if (_password.length === 0) {
      mensajesValidacion.push('Ingrese una contraseña');
    }
    if (_confirmaPass.length === 0) {
      mensajesValidacion.push('Ingrese una confirmación de contraseña');
    } else if (_password !== _confirmaPass) {
      mensajesValidacion.push('La contraseña y la confirmación no coinciden');
    }
    if (_rol.length === 0) {
      mensajesValidacion.push('Seleccione un rol');
    }
    if (_estado.length === 0) {
      mensajesValidacion.push('Seleccione un estado');
    }
  
    if (mensajesValidacion.length > 0) {
      Swal.fire({
        title: 'Por favor verificar los datos ingresados en los campos',
        html: mensajesValidacion.join('<br>'),
        icon: 'error'
      });
    }
  };
  
  
        /* })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a JSON
        .then(json   =>{
           // alert(json.msg)
           Swal.fire(
            json.msg,
            '',
            'success'
          )

        })


    } else {
     //alert('El Password y la Confirmar de Password no coinciden. Por favor corregir')
     Swal.fire(
        'El Password y la Confirmar de Password no coinciden. Por favor corregir',
        '',
        'error'
      )
}
} */

const editar = (usuario) => {
    document.getElementById('nombre').value = '';
    document.getElementById('password').value = '';
    document.getElementById('rol').value = '';
    document.getElementById('estado').value = '';
  
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('password').value = usuario.password;
    document.getElementById('rol').value = usuario.rol;
    document.getElementById('estado').value = usuario.estado;
  };
  
  const actualizar = async () => {
    let _nombre = document.getElementById('nombre').value;
    let _pass = document.getElementById('password').value;
    let _confirmaPass = document.getElementById('confirmarPassword').value;
    let _rol = document.getElementById('rol').value;
    let _estado = document.getElementById('estado').value;
  
    if (
      _nombre.length > 0 &&
      _pass.length > 0 &&
      _confirmaPass.length > 0 &&
      _rol.length > 0 &&
      _estado.length > 0 &&
      _pass === _confirmaPass
    ) {
      let _usuario = {
        nombre: _nombre,
        password: _pass,
        rol: _rol,
        estado: _estado
      };
  
      try {
        const response = await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(_usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.msg === 'Error: El dato ya existe en la base de datos') {
            Swal.fire(data.msg, '', 'error');
          } else {
            Swal.fire(data.msg, '', 'success');
            setTimeout(() => {
              window.location.href = "listarDatosUsu.html";
            }, 2000);
          }
        } else {
          throw new Error('Error al enviar la solicitud');
        }
      } catch (error) {
        Swal.fire('Error al actualizar los datos', '', 'error');
      }
    } else {
      mostrarMensajesValidacion2(_nombre, _pass, _confirmaPass, _rol, _estado);
    }
  };
  
  const mostrarMensajesValidacion2 = (_nombre, _password, _confirmaPass, _rol, _estado) => {
    let mensajesValidacion = [];
  
    if (_nombre.length === 0) {
      mensajesValidacion.push('Ingrese un nombre');
    }
    if (_password.length === 0) {
      mensajesValidacion.push('Ingrese una contraseña');
    }
    if (_confirmaPass.length === 0) {
      mensajesValidacion.push('Ingrese una confirmación de contraseña');
    } else if (_password !== _confirmaPass) {
      mensajesValidacion.push('La contraseña y la confirmación no coinciden');
    }
    if (_rol.length === 0) {
      mensajesValidacion.push('Seleccione un rol');
    }
    if (_estado.length === 0) {
      mensajesValidacion.push('Seleccione un estado');
    }
  
    if (mensajesValidacion.length > 0) {
      Swal.fire({
        title: 'Por favor verificar los datos ingresados en los campos',
        html: mensajesValidacion.join('<br>'),
        icon: 'error'
      });
    }
  };
  
//Eliminar
const eliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas realizar la eliminación del usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        let usuario = { _id: id };
        fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
          .then((resp) => resp.json())
          .then((json) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa de usuario',
              text: json.msg
            });
            setTimeout(() => {
              window.location.href = 'listarDatosUsu.html';
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
        window.location.href = "home.html";
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
  