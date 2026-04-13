const API_URL = '/api/members'; // URL base para las solicitudes

const form = document.getElementById('member-form');
const membersTable = document.getElementById('members-table');

// Obtener socios
async function fetchMembers() {
    const res = await fetch(API_URL);
    const members = await res.json();
    renderMembers(members);
}

// Renderizar tabla
function renderMembers(members) {
    membersTable.innerHTML = members.map(member => `
        <tr>
            <td>${member.number}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.status}</td>
            <td>
                <button class="delete-btn" onclick="deleteMember('${member.id}')">Eliminar</button>
                <button class="edit-btn" onclick="populateForm('${member.id}')">Editar</button>
            </td>
        </tr>
    `).join('');
}

// Crear socio
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const number = document.getElementById('number').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const status = document.getElementById('status').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // ✔ CORREGIDO
        },
        body: JSON.stringify({
            number,
            name,
            email,
            status
        })
    });

    form.reset();
    fetchMembers();
});

// Eliminar socio
async function deleteMember(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    fetchMembers();
}

// Inicializar
fetchMembers();