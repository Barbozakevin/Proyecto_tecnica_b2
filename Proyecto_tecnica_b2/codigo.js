let rowNum = 0;

// Obtener el campo de entrada
const inputField = document.getElementById("action");

// Función para agregar una nueva tarea a la tabla cuando se presiona "Enter"
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar que se agregue un salto de línea en el campo
        save(); // Llamar a la función "save" para agregar la tarea
    }
});

function save() {
    // Obtener la descripción de la actividad ingresada por el usuario.
    const activity = inputField.value;
    const table = document.getElementById("tabla");

    // Verificar si el campo está vacío
    if (activity.trim() === "") {
        return; // Evitar agregar una tarea vacía
    }

    // Obtener la fecha y hora actual
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Agregar una nueva fila a la tabla
    const row = table.insertRow();
    row.className = "fade-in";

    // Celda "No" con número de fila
    const cellNo = row.insertCell(0);
    cellNo.innerHTML = rowNum;
    rowNum++;

    // Celda de descripción
    const cellDesc = row.insertCell(1);
    cellDesc.innerHTML = activity;

    // Celda de fecha y hora
    const cellDateTime = row.insertCell(2);
    cellDateTime.innerHTML = formattedDate;

    // Cambiar el tamaño de fuente de la descripción (puedes ajustar el tamaño)
    cellDesc.style.fontSize = "26px"; // Tamaño de fuente deseado
    cellNo.style.fontSize = "26px";
    cellDateTime.style.fontSize = "26px";
    

    // Celda de estado (checkbox con icono)
    const cellState = row.insertCell(3);
    cellState.className = "cell-state-container";

    // Crear el ícono de checkmark-circle
    const checkmarkIcon = document.createElement("ion-icon");
    checkmarkIcon.setAttribute("name", "checkmark-circle");
    checkmarkIcon.style.fontSize = "50px"; // Tamaño del ícono

    // Crear el input tipo checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.display = "none";

    // Agregar el ícono y el checkbox a la celda de estado
    cellState.appendChild(checkbox);
    cellState.appendChild(checkmarkIcon);

    //  Icono para marcar/desmarcar la tarea
    checkmarkIcon.addEventListener("click", function () {
        checkbox.checked = !checkbox.checked;
        checkmarkIcon.style.color = checkbox.checked ? "green" : "inherit";
        // Puedes personalizar los colores según tus preferencias
    });

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.className = "eliminar-button";

    // Crear el ícono de la papelera
    const trashIcon = document.createElement("ion-icon");
    trashIcon.setAttribute("name", "trash");

    deleteButton.appendChild(trashIcon);
    deleteButton.onclick = function () {
        // Eliminar la tarea y actualizar los números de fila
        let rowIndex = row.rowIndex;
        table.deleteRow(rowIndex -1);
        actualizarNumeros();
    };

    cellState.appendChild(deleteButton);
    actualizarNumeros();
    deleteButton.addEventListener("click", function () {
        trashIcon.style.color = "black"; // Cambiar el color a negro al hacer clic
    });

    // Animación de fade-in
    setTimeout(function () {
        row.style.opacity = 1;
    }, 100);
    inputField.value = "";
    inputField.focus();
}


//Función para eliminar todas las filas de la tabla y restablecer el contador de fila.
function eliminarTodasLasFilas() {
    const table = document.getElementById("tabla");
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    rowNum = 1; // Restablecer el número a 1
    actualizarNumeros();
}

//Función para actualizar los números de fila en la tabla después de eliminar una tarea.
function actualizarNumeros() {
    const table = document.getElementById("tabla");
    const filas = table.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        filas[i].cells[0].innerHTML = i + 1;
    }
}

// Funciones de filtrado
function filtrarMarcadas() {
    const table = document.getElementById("tabla");
    const filas = table.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const checkbox = filas[i].cells[3].getElementsByTagName("input")[0];
        if (checkbox.checked) {
            filas[i].style.display = "table-row";
        } else {
            filas[i].style.display = "none";
        }
    }
}

function filtrarNoMarcadas() {
    const table = document.getElementById("tabla");
    const filas = table.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        const checkbox = filas[i].cells[3].getElementsByTagName("input")[0];
        if (!checkbox.checked) {
            filas[i].style.display = "table-row";
        } else {
            filas[i].style.display = "none";
        }
    }
}

function mostrarTodas() {
    const table = document.getElementById("tabla");
    const filas = table.getElementsByTagName("tr");
    for (let i = 0; i < filas.length; i++) {
        filas[i].style.display = "table-row";
    }
}

function updateClock() {
    const now = new Date();
    
    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
      .formatToParts(now)
      .map(part => part.value.replace(/^\w/, char => char.toUpperCase()))
      .join(' ');
  
    const dateTimeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
    document.getElementById('date').innerHTML = formattedDate;
    document.getElementById('clock').innerHTML = dateTimeString;
  
    setTimeout(updateClock, 1000);
  }
  window.onload = () => { updateClock(), updateTaskTable() };



