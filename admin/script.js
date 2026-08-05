// ============================================
// ADMIN PANEL - Om Auto Consultant
// ============================================

let data = JSON.parse(localStorage.getItem('omAutoData')) || {
    services: [
        { id: 1, icon: '🔧', title: 'Car Repair & Service', description: 'Expert repair and maintenance.' },
        { id: 2, icon: '🛡️', title: 'Insurance Consultancy', description: 'Best insurance policies.' },
        { id: 3, icon: '🚘', title: 'Car Resale & Purchase', description: 'Buy and sell used cars.' },
        { id: 4, icon: '📋', title: 'RTO & Documentation', description: 'Hassle-free RTO registration.' },
        { id: 5, icon: '🛠️', title: 'Car Modification', description: 'Custom modification and tuning.' }
    ]
};

let nextId = data.services.length + 1;

// ===== SAVE DATA =====
function saveData() {
    localStorage.setItem('omAutoData', JSON.stringify(data));
}

// ===== LOAD DASHBOARD =====
function loadDashboard() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <h2>📊 Dashboard</h2>
        <div class="stats">
            <div class="stat-card"><h3>${data.services.length}</h3><p>Total Services</p></div>
            <div class="stat-card"><h3>500+</h3><p>Happy Clients</p></div>
            <div class="stat-card"><h3>10+</h3><p>Years Experience</p></div>
        </div>
        <div id="servicesList"></div>
    `;
    loadServices();
}

// ===== LOAD SERVICES =====
function loadServices() {
    const list = document.getElementById('servicesList');
    if (!list) return;

    list.innerHTML = data.services.map(s => `
        <div class="service-card">
            <div class="icon">${s.icon}</div>
            <h4>${s.title}</h4>
            <p>${s.description}</p>
            <div class="actions">
                <button class="edit-btn" onclick="editService(${s.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteService(${s.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');

    list.innerHTML += `
        <div class="service-card" style="border:2px dashed #ff6b3544;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;min-height:150px;" onclick="showAddModal()">
            <div style="font-size:40px;">➕</div>
            <h4 style="color:#aaa;">Add New Service</h4>
        </div>
    `;
}

// ===== SHOW ADD MODAL =====
function showAddModal() {
    showModal(null, 'Add New Service');
}

// ===== EDIT SERVICE =====
function editService(id) {
    const service = data.services.find(s => s.id === id);
    if (service) showModal(service, 'Edit Service');
}

// ===== SHOW MODAL =====
function showModal(service, title) {
    const isEdit = service !== null;
    const icon = isEdit ? service.icon : '🔧';
    const titleText = isEdit ? service.title : '';
    const desc = isEdit ? service.description : '';

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'serviceModal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <input id="modalIcon" value="${icon}" placeholder="Icon (e.g. 🔧)" />
            <input id="modalTitle" value="${titleText}" placeholder="Service Title" />
            <textarea id="modalDesc" placeholder="Description" rows="3">${desc}</textarea>
            <button class="save-btn" onclick="saveService(${isEdit ? service.id : 'null'})">💾 Save</button>
            <button class="cancel-btn" onclick="closeModal()">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ===== SAVE SERVICE =====
function saveService(id) {
    const icon = document.getElementById('modalIcon').value || '🔧';
    const title = document.getElementById('modalTitle').value || 'New Service';
    const description = document.getElementById('modalDesc').value || '';

    if (id === null) {
        data.services.push({ id: nextId++, icon, title, description });
    } else {
        const service = data.services.find(s => s.id === id);
        if (service) {
            service.icon = icon;
            service.title = title;
            service.description = description;
        }
    }

    saveData();
    closeModal();
    loadDashboard();
}

// ===== DELETE SERVICE =====
function deleteService(id) {
    if (confirm('Delete this service?')) {
        data.services = data.services.filter(s => s.id !== id);
        saveData();
        loadDashboard();
    }
}

// ===== LOAD CONTACTS =====
function loadContacts() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
        <h2>📞 Contact Settings</h2>
        <div style="background:#1a1f3a;padding:30px;border-radius:16px;max-width:500px;">
            <p><strong>📞 Phone:</strong> <input id="editPhone" value="+91 98765 43210" style="width:100%;padding:10px;background:#11152a;border:1px solid #ff6b3544;color:#fff;border-radius:8px;margin:5px 0;" /></p>
            <p><strong>📧 Email:</strong> <input id="editEmail" value="info@omautoconsultant.com" style="width:100%;padding:10px;background:#11152a;border:1px solid #ff6b3544;color:#fff;border-radius:8px;margin:5px 0;" /></p>
            <p><strong>📍 Address:</strong> <input id="editAddress" value="123, Auto Nagar, City, India" style="width:100%;padding:10px;background:#11152a;border:1px solid #ff6b3544;color:#fff;border-radius:8px;margin:5px 0;" /></p>
            <button onclick="saveContacts()" style="padding:10px 30px;background:#ff6b35;color:#fff;border:none;border-radius:8px;cursor:pointer;margin-top:10px;">💾 Save</button>
        </div>
    `;
}

// ===== SAVE CONTACTS =====
function saveContacts() {
    const phone = document.getElementById('editPhone').value;
    const email = document.getElementById('editEmail').value;
    const address = document.getElementById('editAddress').value;

    data.phone = phone;
    data.email = email;
    data.address = address;

    saveData();
    alert('✅ Contacts saved!');
    loadDashboard();
}

// ===== CLOSE MODAL =====
function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) modal.remove();
}

// ===== LOAD ON START =====
loadDashboard();