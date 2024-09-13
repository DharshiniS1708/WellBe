// login.js
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  // API call to authenticate user
  fetch('/api/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then((data) => {
    if (data.authenticated) {
      // redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username or password');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});

// register.js
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  // API call to create new user
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  })
  .then(response => response.json())
  .then((data) => {
    if (data.created) {
      // redirect to login
      window.location.href = '/login';
    } else {
      alert('Failed to create new user');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});
// dashboard.js
fetch('/api/appointments')
  .then(response => response.json())
  .then((data) => {
    const appointmentList = document.getElementById('appointment-list');
    data.appointments.forEach((appointment) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${appointment.date} - ${appointment.time} with ${appointment.doctor}`;
      appointmentList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

fetch('/api/medications')
  .then(response => response.json())
  .then((data) => {
    const medicationList = document.getElementById('medication-list');
    data.medications.forEach((medication) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${medication.name} - ${medication.dosage} - ${medication.frequency} - ${medication.nextReminder}`;
      medicationList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

fetch('/api/health-info')
  .then(response => response.json())
  .then((data) => {
    const healthInfoText = document.getElementById('health-info-text');
    healthInfoText.textContent = data.healthInfo;
  })
  .catch((error) => {
    console.error(error);
  });
// schedule-appointment.js
document.getElementById('schedule-appointment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  // API call to schedule appointment
  fetch('/api/schedule-appointment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ doctor, date, time })
  })
  .then(response => response.json())
  .then((data) => {
    if (data.scheduled) {
      // redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Failed to schedule appointment');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});
// medication-reminders.js
fetch('/api/medications')
  .then(response => response.json())
  .then((data) => {
    const medicationList = document.getElementById('medication-list');
    data.medications.forEach((medication) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${medication.name}</span>
        <span>${medication.dosage}</span>
        <span>${medication.frequency}</span>
        <span>${medication.nextReminder}</span>
      `;
      medicationList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });