var config = {
  apiKey: "AIzaSyCJOns2ymZ1L5VGUV2xB4HusC23ZtDO6qM",
  authDomain: "examplefirebase-a860f.firebaseapp.com",
  databaseURL: "https://examplefirebase-a860f.firebaseio.com",
  projectId: "examplefirebase-a860f",
  storageBucket: "examplefirebase-a860f.appspot.com",
  messagingSenderId: "517689273054"
};
firebase.initializeApp(config);


var db = firebase.firestore();

const d = document,
      c = console.log,
      age = d.getElementById('age'),
      ageIgv = d.getElementById('ageIgv'),
      updateAge = d.getElementById('updateAge'),
      name = d.getElementById('name'),
      updateName = d.getElementById('updateName'),
      last = d.getElementById('last'),
      updateLast = d.getElementById('updateLast'),
      loadTask = d.getElementById('loadTask'),
      btn = d.getElementById('btn'),
      guardar = d.getElementById('guardar'),
      notificationAdd = d.getElementById('notificationAdd'),
      modalDelete = d.getElementById('modal-delete'),
      btnDelete = d.getElementById('btn-delete'),
      notificationUpdate = d.getElementById('notification-update'),
      val = d.querySelector('input')










// agregar un nuevo documento
function agregar(){
  // if(Number(age.value)){
  //   ageIgv.value = (Number(age.value /100)*18) + Number(age.value)
  //   ageIgv.innerHTML = ageIgv.value
  // }
  if(name.value == '' || name.value == '' || age.value == ''){
    notificationAdd.innerHTML = `
    <div class="alert alert-danger" role="alert">
    Completa los espacios en blanco
    </div>`
    setTimeout(function(){
      notificationAdd.innerHTML = ''
    },1000)
  }else{
    console.log('agregado');
    db.collection("clients").add({
        name: name.value,
        last: last.value,
        age:age.value
    })
    .then(function(docRef){
        console.log("documento escrito con ID: ", docRef.id);
        name.value = ''
        last.value=''
        age.value =''
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}



// db.collection("clients").onSnapshot((query) => {
//   loadTask.innerHTML = ''
//   query.forEach((doc) => {
//       const data = doc.data()
//       loadTask.innerHTML += `<tr>
//       <td>${doc.id}</td>
//       <td>${data.name}</td>
//       <td>${data.last}</td>
//       <td>${data.age}</td>
//       <td><button onclick="editUser('${doc.id}','${data.name}','${data.last}','${data.age}')" data-toggle="modal" data-target=".modal-update"><i class="fas fa-edit"></i></button>
//       <button onclick="deleteUser('${doc.id}','${data.name}')" data-toggle="modal" data-target=".modal-delete"><i class="fas fa-trash-alt"></i></button></td>
//       </tr>`
//       // console.log(`${doc.id} => ${doc.data().name}`);
//   });
// });


// eliminar users
const deleteUser = (id,nombre) => {
  modalDelete.innerHTML = `
  <p>¿usted desea eliminar a <b>${nombre}</b> ?</p>
  `
  btnDelete.addEventListener('click', e=> {
    db.collection("clients").doc(id).delete().then(function() {
      console.log(`tu id eliminado es ${id} y ${nombre} `);
      modalDelete.innerHTML = `
        <div class="alert alert-danger" role="alert">
        se elimiando a <b>${nombre}</b>
        </div>
      `
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  })
}


//actualizar 

const editUser = (id,nombre,apellido,edad) => {
  c(`este es el id ${id} de ${nombre}`)
  updateName.value = nombre,
  updateLast.value = apellido,
  updateAge.value = edad

  guardar.addEventListener('click', e=> {
    var userRef = db.collection("clients").doc(id);
    const nombre = updateName.value,
          apellido = updateLast.value,
          edad = updateAge.value
  
    return userRef.update({
    name:nombre,
    last:apellido,
    age:edad   
    })
    .then(function() {
        notificationUpdate.innerHTML = `
        <div class="alert alert-success" role="alert">
        se actualizo correctamente a <b>${nombre}</b>
        </div>
        `
        setTimeout(()=> {notificationUpdate.innerHTML = ``},3000)
        name.value = ''
        last.value=''
        age.value =''
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  })
}
