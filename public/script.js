const API_URL = '/api/members'; //URL base para las solicitiudes

const form = document.getElementById('member-form');
// es el id del form en el archivo html --> //formulario para agregar contactos

const membersTable = document.getElementById('members-table');

//Función para obtener los socios desde el back
async function fetchMembers() {
    const res = await fetch(API_URL);
    const members = await res.json(); //convierte la rta en un array
    renderMembers(members);
};

// Función que renderiza a todos los socios (en una tabla)
function renderMembers(members) {
    membersTable.innerHTML = members.map(member => `
        <tr>
            <td>${member.number}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.status}</td>
            <td>
                <button class="delete-btn" onclick="deleteMember('${member.id}')">Eliminar</button>
                <button class="edit-btn" onclick="populateForm(${member.id})">Editar</button>
            </td>
        </tr>
        `).join('');
};


//Manejar el evento de enviar el formulario para agregar un socio
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //evita que la página se recargue automáticamente
    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value; 
    const status = document.getElementById('status').value;

    //Enviar esta solicitud al backend
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: Date.now(), number, name, email, status }),
    });

    form.reset();

    fetchMembers();

});


async function deleteMember(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchMembers();
};


fetchMembers();