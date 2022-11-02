import {
    onGetEstudiantes,
    saveEstudiante,
    deleteEstudiante,
    getEstudiante,
    updateEstudiante,
    onGetClases,
    saveClase,
    deleteClase,
    getClase,
    updateClase,
    saveMatricula,
    onGetMatriculas,
    deleteMatricula,
    getMatricula,
    updateMatricula
  } from "./firebase.js";

  const estudiantesForm = document.getElementById("estudiantes-form");
  const estudiantesContainer = document.getElementById("estudiantes-container");

  const clasesForm = document.getElementById("clases-form");
  const clasesContainer = document.getElementById("clases-container");

  const matriculasForm = document.getElementById("matriculas-form");
  const matriculasContainer = document.getElementById("matriculas-container");

  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
//--------------------------------------------CLASE------------------------------------------------------------------------

    onGetClases((querySnapshot) => {
        clasesContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const clase = doc.data();

            clasesContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${"Título: " + clase.titulo}</h3>
        <p>${"Descripción: " + clase.descripcion}</p>
        <p>${"Id: " + doc.id}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = clasesContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteClase(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = clasesContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getClase(e.target.dataset.id);
                    const clase = doc.data();
                    clasesForm["clases-title"].value = clase.titulo;
                    clasesForm["clases-description"].value = clase.descripcion;

                    editStatus = true;
                    id = doc.id;
                    clasesForm["btn-clases-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
//--------------------------------------------ESTUDIANTE------------------------------------------------------------------------

onGetEstudiantes((querySnapshot) => {
        estudiantesContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const estudiante = doc.data();
            console.log(estudiante);

            estudiantesContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${estudiante.nombre + ' ' + estudiante.apellido}</h3>
        <p>${"Id: " + doc.id}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            ✏️ Edit
          </button>
        </div>
      </div>`;
        });

        const btnsDelete = estudiantesContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
                try {
                    await deleteEstudiante(dataset.id);
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = estudiantesContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getEstudiante(e.target.dataset.id);
                    const estudiante = doc.data();
                    estudiantesForm["student-name"].value = estudiante.nombre;
                    estudiantesForm["student-last-name"].value = estudiante.apellido;

                    editStatus = true;
                    id = doc.id;
                    estudiantesForm["btn-students-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });

});
//--------------------------------------------MATRICULA------------------------------------------------------------------------

onGetMatriculas((querySnapshot) => {
    matriculasContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const matricula = doc.data();

        matriculasContainer.innerHTML += `
  <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${"Matricula: " + doc.id}</h3>
    <p>${"Estudiante con ID: " + matricula.Id_estudiante}</p>
    <p>${"Clase ID: " + matricula.Id_clase}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        ✏️ Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = matriculasContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({target: {dataset}}) => {
            try {
                await deleteMatricula(dataset.id);
            } catch (error) {
                console.log(error);
            }
        })
    );

    const btnsEdit = matriculasContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            try {
                const doc = await getMatricula(e.target.dataset.id);
                const matricula = doc.data();
                matriculasForm["id-estudiante"].value = matricula.Id_estudiante;
                matriculasForm["id-clase"].value = matricula.Id_clase;
                editStatus = true;
                id = doc.id;
                matriculasForm["btn-matricula-form"].innerText = "Actualizar";
            } catch (error) {
                console.log(error);
            }
        });
    });
});
//--------------------------------------------CLASE------------------------------------------------------------------------

clasesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = clasesForm["clases-title"];
    const descripcion = clasesForm["clases-description"];

    try {
        if (!editStatus) {
            await saveClase(titulo.value,descripcion.value);
        } else {
            await updateClase(id, {
                titulo: titulo.value,
                descripcion: descripcion.value,
            });

            editStatus = false;
            id = "";
            clasesForm["btn-clases-form"].innerText = "Guardar";
        }

        clasesForm.reset();
        titulo.focus();
    } catch (error) {
        console.log(error);
    }
});
//--------------------------------------------ESTUDIANTE------------------------------------------------------------------------

estudiantesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = estudiantesForm["student-name"];
    const apellido = estudiantesForm["student-last-name"];

    try {
        if (!editStatus) {
            await saveEstudiante(nombre.value, apellido.value);
        } else {
            await updateEstudiante(id, {
                nombre: nombre.value,
                apellido: apellido.value,
            });

            editStatus = false;
            id = "";
            estudiantesForm["btn-students-form"].innerText = "Guardar";
        }

        estudiantesForm.reset();
        nombre.focus();
    } catch (error) {
        console.log(error);
    }});

//--------------------------------------------MATRICULA------------------------------------------------------------------------

matriculasForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const Id_estudiante = matriculasForm["id-estudiante"];
        const Id_clase = matriculasForm["id-clase"];
        try {
            if (!editStatus) {
                await saveMatricula(Id_estudiante.value, Id_clase.value);
                alert("Matricula realizada con éxito");
            } else {
                await updateMatricula(id, {
                    Id_estudiante: Id_estudiante.value,
                    Id_clase: Id_clase.value,
                });
    
                editStatus = false;
                id = "";
                matriculasForm["btn-matricula-form"].innerText = "Matricular";
            }
    
            matriculasForm.reset();
            Id_estudiante.focus();
        } catch (error) {
            console.log(error);
        }
    });
