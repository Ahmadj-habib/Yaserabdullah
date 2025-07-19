// Demo data
let tasks = [
  { text: "Review patient files", done: false },
  { text: "Update medical records", done: false },
  { text: "Prepare for tomorrow's surgery", done: false }
];
let appointments = [
  { name: "Sarah Johnson", type: "Knee Consultation", time: "2:30 PM" },
  { name: "Michael Chen", type: "Follow-up", time: "3:45 PM" }
];
let patients = [
  { name: "Sarah Johnson", age: 32, condition: "Knee Pain" },
  { name: "Michael Chen", age: 41, condition: "Post-op Follow-up" }
];
let reports = [
  { title: "MRI Results", status: "Pending" },
  { title: "Blood Test", status: "Reviewed" }
];
let notifications = [
  { message: "New appointment scheduled", time: "Today" },
  { message: "Patient report uploaded", time: "Yesterday" }
];
let profile = {
  name: "Dr. Yasir Abdullah",
  title: "Orthopedic Resident",
  email: "yasseralsaaidy274@gmail.com",
  location: "Dubai, UAE",
  phone: "+971 50 123 4567"
};

// Render functions
function renderTasks() {
  const ul = document.getElementById('tasksList');
  ul.innerHTML = '';
  tasks.forEach((task, idx) => {
    ul.innerHTML += `
      <li class="flex items-center gap-3">
        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${idx})">
        <span class="${task.done ? 'line-through text-gray-400' : ''}">${task.text}</span>
        <button class="edit-btn" onclick="editTask(${idx})"><i class="ri-edit-line"></i></button>
        <button class="edit-btn" onclick="deleteTask(${idx})"><i class="ri-delete-bin-line"></i></button>
      </li>
    `;
  });
}
function renderAppointments() {
  const ul = document.getElementById('appointmentsList');
  ul.innerHTML = '';
  appointments.forEach((a, idx) => {
    ul.innerHTML += `
      <li class="flex items-center justify-between gap-3">
        <div>
          <span class="font-medium">${a.name}</span>
          <span class="text-sm text-gray-500 ml-2">${a.type}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">${a.time}</span>
          <button class="edit-btn" onclick="editAppointment(${idx})"><i class="ri-edit-line"></i></button>
          <button class="edit-btn" onclick="deleteAppointment(${idx})"><i class="ri-delete-bin-line"></i></button>
        </div>
      </li>
    `;
  });
}
function renderPatients() {
  const ul = document.getElementById('patientsList');
  ul.innerHTML = '';
  patients.forEach((p, idx) => {
    ul.innerHTML += `
      <li class="flex items-center justify-between gap-3">
        <div>
          <span class="font-medium">${p.name}</span>
          <span class="text-sm text-gray-500 ml-2">Age: ${p.age}</span>
          <span class="text-sm text-gray-500 ml-2">${p.condition}</span>
        </div>
        <div>
          <button class="edit-btn" onclick="editPatient(${idx})"><i class="ri-edit-line"></i></button>
          <button class="edit-btn" onclick="deletePatient(${idx})"><i class="ri-delete-bin-line"></i></button>
        </div>
      </li>
    `;
  });
}
function renderReports() {
  const ul = document.getElementById('reportsList');
  ul.innerHTML = '';
  reports.forEach((r, idx) => {
    ul.innerHTML += `
      <li class="flex items-center justify-between gap-3">
        <div>
          <span class="font-medium">${r.title}</span>
          <span class="text-sm text-gray-500 ml-2">${r.status}</span>
        </div>
        <div>
          <button class="edit-btn" onclick="editReport(${idx})"><i class="ri-edit-line"></i></button>
          <button class="edit-btn" onclick="deleteReport(${idx})"><i class="ri-delete-bin-line"></i></button>
        </div>
      </li>
    `;
  });
}
function renderNotifications() {
  const ul = document.getElementById('notificationsList');
  ul.innerHTML = '';
  notifications.forEach((n, idx) => {
    ul.innerHTML += `
      <li class="flex items-center justify-between gap-3">
        <div>
          <span>${n.message}</span>
          <span class="text-sm text-gray-500 ml-2">${n.time}</span>
        </div>
        <div>
          <button class="edit-btn" onclick="editNotif(${idx})"><i class="ri-edit-line"></i></button>
          <button class="edit-btn" onclick="deleteNotif(${idx})"><i class="ri-delete-bin-line"></i></button>
        </div>
      </li>
    `;
  });
}
function renderProfile() {
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileTitle').textContent = profile.title;
  document.getElementById('profileEmail').innerHTML = `<i class="ri-mail-line"></i> ${profile.email}`;
  document.getElementById('profileLocation').innerHTML = `<i class="ri-map-pin-line"></i> ${profile.location}`;
  document.getElementById('profilePhone').innerHTML = `<i class="ri-phone-line"></i> ${profile.phone}`;
}

// Modal functions
function openModal(html) {
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.innerHTML = `
    <div class="modal relative">
      ${html}
      <button class="close-modal" onclick="closeModal()"><i class="ri-close-line"></i></button>
    </div>`;
  document.getElementById('modalContainer').appendChild(modalBg);
}
function closeModal() {
  document.getElementById('modalContainer').innerHTML = '';
}

// Task functions
function openTaskModal(idx = null) {
  let value = idx !== null ? tasks[idx].text : '';
  let done = idx !== null ? tasks[idx].done : false;
  openModal(`
    <h3 class="text-xl font-bold mb-4">${idx !== null ? 'Edit' : 'Add'} Task</h3>
    <form onsubmit="event.preventDefault(); saveTask(${idx});">
      <label>Task</label>
      <input type="text" id="taskInput" value="${value}" required>
      <label class="flex items-center gap-2 mt-2">
        <input type="checkbox" id="taskDone" ${done ? 'checked' : ''}> Done
      </label>
      <button type="submit" class="add-btn mt-4">${idx !== null ? 'Save' : 'Add'}</button>
    </form>
  `);
}
function saveTask(idx) {
  const text = document.getElementById('taskInput').value;
  const done = document.getElementById('taskDone').checked;
  if (idx !== null && idx >= 0) {
    tasks[idx] = { text, done };
  } else {
    tasks.push({ text, done });
  }
  closeModal();
  renderTasks();
}
function editTask(idx) { openTaskModal(idx); }
function deleteTask(idx) { tasks.splice(idx, 1); renderTasks(); }
function toggleTask(idx) { tasks[idx].done = !tasks[idx].done; renderTasks(); }

// Similar open/save/edit/delete for Appointments, Patients, Reports, Notifications
function openAppointmentModal(idx = null) {
  let a = idx !== null ? appointments[idx] : { name: '', type: '', time: '' };
  openModal(`
    <h3 class="text-xl font-bold mb-4">${idx !== null ? 'Edit' : 'Add'} Appointment</h3>
    <form onsubmit="event.preventDefault(); saveAppointment(${idx});">
      <label>Name</label>
      <input type="text" id="appointmentName" value="${a.name}" required>
      <label>Type</label>
      <input type="text" id="appointmentType" value="${a.type}" required>
      <label>Time</label>
      <input type="text" id="appointmentTime" value="${a.time}" required>
      <button type="submit" class="add-btn mt-4">${idx !== null ? 'Save' : 'Add'}</button>
    </form>
  `);
}
function saveAppointment(idx) {
  const name = document.getElementById('appointmentName').value;
  const type = document.getElementById('appointmentType').value;
  const time = document.getElementById('appointmentTime').value;
  if (idx !== null && idx >= 0) {
    appointments[idx] = { name, type, time };
  } else {
    appointments.push({ name, type, time });
  }
  closeModal();
  renderAppointments();
}
function editAppointment(idx) { openAppointmentModal(idx); }
function deleteAppointment(idx) { appointments.splice(idx, 1); renderAppointments(); }

function openPatientModal(idx = null) {
  let p = idx !== null ? patients[idx] : { name: '', age: '', condition: '' };
  openModal(`
    <h3 class="text-xl font-bold mb-4">${idx !== null ? 'Edit' : 'Add'} Patient</h3>
    <form onsubmit="event.preventDefault(); savePatient(${idx});">
      <label>Name</label>
      <input type="text" id="patientName" value="${p.name}" required>
      <label>Age</label>
      <input type="number" id="patientAge" value="${p.age}" required>
      <label>Condition</label>
      <input type="text" id="patientCondition" value="${p.condition}" required>
      <button type="submit" class="add-btn mt-4">${idx !== null ? 'Save' : 'Add'}</button>
    </form>
  `);
}
function savePatient(idx) {
  const name = document.getElementById('patientName').value;
  const age = document.getElementById('patientAge').value;
  const condition = document.getElementById('patientCondition').value;
  if (idx !== null && idx >= 0) {
    patients[idx] = { name, age, condition };
  } else {
    patients.push({ name, age, condition });
  }
  closeModal();
  renderPatients();
}
function editPatient(idx) { openPatientModal(idx); }
function deletePatient(idx) { patients.splice(idx, 1); renderPatients(); }

function openReportModal(idx = null) {
  let r = idx !== null ? reports[idx] : { title: '', status: '' };
  openModal(`
    <h3 class="text-xl font-bold mb-4">${idx !== null ? 'Edit' : 'Add'} Report</h3>
    <form onsubmit="event.preventDefault(); saveReport(${idx});">
      <label>Title</label>
      <input type="text" id="reportTitle" value="${r.title}" required>
      <label>Status</label>
      <input type="text" id="reportStatus" value="${r.status}" required>
      <button type="submit" class="add-btn mt-4">${idx !== null ? 'Save' : 'Add'}</button>
    </form>
  `);
}
function saveReport(idx) {
  const title = document.getElementById('reportTitle').value;
  const status = document.getElementById('reportStatus').value;
  if (idx !== null && idx >= 0) {
    reports[idx] = { title, status };
  } else {
    reports.push({ title, status });
  }
  closeModal();
  renderReports();
}
function editReport(idx) { openReportModal(idx); }
function deleteReport(idx) { reports.splice(idx, 1); renderReports(); }

function openNotifModal(idx = null) {
  let n = idx !== null ? notifications[idx] : { message: '', time: '' };
  openModal(`
    <h3 class="text-xl font-bold mb-4">${idx !== null ? 'Edit' : 'Add'} Notification</h3>
    <form onsubmit="event.preventDefault(); saveNotif(${idx});">
      <label>Message</label>
      <input type="text" id="notifMessage" value="${n.message}" required>
      <label>Time</label>
      <input type="text" id="notifTime" value="${n.time}" required>
      <button type="submit" class="add-btn mt-4">${idx !== null ? 'Save' : 'Add'}</button>
    </form>
  `);
}
function saveNotif(idx) {
  const message = document.getElementById('notifMessage').value;
  const time = document.getElementById('notifTime').value;
  if (idx !== null && idx >= 0) {
    notifications[idx] = { message, time };
  } else {
    notifications.push({ message, time });
  }
  closeModal();
  renderNotifications();
}
function editNotif(idx) { openNotifModal(idx); }
function deleteNotif(idx) { notifications.splice(idx, 1); renderNotifications(); }

function openProfileModal() {
  openModal(`
    <h3 class="text-xl font-bold mb-4">Edit Profile</h3>
    <form onsubmit="event.preventDefault(); saveProfile();">
      <label>Name</label>
      <input type="text" id="profileNameInput" value="${profile.name}" required>
      <label>Title</label>
      <input type="text" id="profileTitleInput" value="${profile.title}" required>
      <label>Email</label>
      <input type="email" id="profileEmailInput" value="${profile.email}" required>
      <label>Location</label>
      <input type="text" id="profileLocationInput" value="${profile.location}" required>
      <label>Phone</label>
      <input type="text" id="profilePhoneInput" value="${profile.phone}" required>
      <button type="submit" class="add-btn mt-4">Save</button>
    </form>
  `);
}
function saveProfile() {
  profile.name = document.getElementById('profileNameInput').value;
  profile.title = document.getElementById('profileTitleInput').value;
  profile.email = document.getElementById('profileEmailInput').value;
  profile.location = document.getElementById('profileLocationInput').value;
  profile.phone = document.getElementById('profilePhoneInput').value;
  closeModal();
  renderProfile();
}

// Initial render
renderTasks();
renderAppointments();
renderPatients();
renderReports();
renderNotifications();
renderProfile();

// Quick Add Menu
document.getElementById('quickAddBtn').onclick = function () {
  openModal(`
    <h3 class="text-xl font-bold mb-4">Quick Add</h3>
    <div class="flex flex-col gap-3">
      <button class="add-btn" onclick="closeModal();openTaskModal()">Task</button>
      <button class="add-btn" onclick="closeModal();openAppointmentModal()">Appointment</button>
      <button class="add-btn" onclick="closeModal();openPatientModal()">Patient</button>
      <button class="add-btn" onclick="closeModal();openReportModal()">Report</button>
      <button class="add-btn" onclick="closeModal();openNotifModal()">Notification</button>
    </div>
  `);
};

// Theme Switcher
document.querySelector('.theme-switch').onclick = function () {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    document.body.style.background = '#18181b';
    document.body.style.color = '#e5e7eb';
  } else {
    document.body.style.background = '#f6f8fa';
    document.body.style.color = '#334155';
  }
};

// Navigation (demo scroll)
document.getElementById('profileBtn').onclick = () => document.getElementById('profileInfo').scrollIntoView({ behavior: 'smooth' });
document.getElementById('appointmentsBtn').onclick = () => document.getElementById('appointmentsList').scrollIntoView({ behavior: 'smooth' });
document.getElementById('patientsBtn').onclick = () => document.getElementById('patientsList').scrollIntoView({ behavior: 'smooth' });
document.getElementById('reportsBtn').onclick = () => document.getElementById('reportsList').scrollIntoView({ behavior: 'smooth' });
document.getElementById('tasksBtn').onclick = () => document.getElementById('tasksList').scrollIntoView({ behavior: 'smooth' });
document.getElementById('analyticsBtn').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.getElementById('notificationsBtn').onclick = () => document.getElementById('notificationsList').scrollIntoView({ behavior: 'smooth' });
document.getElementById('settingsBtn').onclick = () => openProfileModal();
document.getElementById('logoutBtn').onclick = () => window.location.reload();
