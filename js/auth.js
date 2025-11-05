// Credenciales válidas
const VALID_CREDENTIALS = {
    'admin': 'admin2608'
};

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.querySelector('.login-btn');
const btnText = document.querySelector('.btn-text');
const spinner = document.querySelector('.spinner');

// Verificar si ya hay una sesión activa
function checkExistingSession() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (loggedIn === 'true' && username) {
        window.location.href = 'dashboard.html';
    }
}

// Manejar el envío del formulario de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Mostrar loading
    showLoading(true);
    errorMessage.style.display = 'none';
    
    // Simular verificación
    setTimeout(() => {
        if (VALID_CREDENTIALS[username] === password) {
            // Login exitoso
            loginSuccess(username);
        } else {
            // Login fallido
            loginFailed();
        }
    }, 1500);
});

// Login exitoso
function loginSuccess(username) {
    const timestamp = new Date().toLocaleString();
    
    // Guardar en localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('loginTimestamp', timestamp);
    localStorage.setItem('sessionStart', Date.now().toString());
    
    // Redirigir al dashboard
    window.location.href = 'dashboard.html';
}

// Login fallido
function loginFailed() {
    showLoading(false);
    errorMessage.style.display = 'block';
    
    // Limpiar contraseña y enfocar
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
    
    // Agregar efecto de shake al formulario
    loginForm.classList.add('shake');
    setTimeout(() => {
        loginForm.classList.remove('shake');
    }, 500);
}

// Mostrar/ocultar loading
function showLoading(show) {
    if (show) {
        btnText.style.display = 'none';
        spinner.style.display = 'block';
        loginBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        loginBtn.disabled = false;
    }
}

// Manejar la tecla Enter
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Verificar sesión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    checkExistingSession();
    
    // Enfocar el campo de usuario
    document.getElementById('username').focus();
    
    // Agregar estilo para shake animation
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
