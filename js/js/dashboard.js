// Variables globales
let performanceChart, distributionChart, trendsChart;

// Verificar autenticación
function checkAuth() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (loggedIn !== 'true' || !username) {
        window.location.href = 'login.html';
        return;
    }
    
    // Mostrar información del usuario
    document.getElementById('userDisplay').textContent = username;
    document.getElementById('loginTime').textContent = localStorage.getItem('loginTimestamp');
}

// Inicializar gráficos
function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Rendimiento',
                data: [65, 59, 80, 81, 56, 75],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#4facfe'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Trends Chart
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    trendsChart = new Chart(trendsCtx, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Actividad',
                data: [12, 19, 15, 17, 14, 22, 8],
                backgroundColor: 'rgba(102, 126, 234, 0.7)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Funciones del dashboard
function refreshData() {
    // Simular actualización de datos
    const newData = Array(6).fill().map(() => Math.floor(Math.random() * 100));
    performanceChart.data.datasets[0].data = newData;
    performanceChart.update();
    
    // Actualizar estadísticas
    document.getElementById('totalUsers').textContent = 
        Math.floor(1000 + Math.random() * 500).toLocaleString();
    document.getElementById('activeSessions').textContent = 
        Math.floor(50 + Math.random() * 50);
    document.getElementById('conversionRate').textContent = 
        Math.floor(50 + Math.random() * 30) + '%';
    document.getElementById('avgTime').textContent = 
        (3 + Math.random() * 3).toFixed(1) + 'm';
    
    // Agregar actividad
    addActivity('Datos actualizados manualmente');
    
    showNotification('✅ Datos actualizados correctamente', 'success');
}

function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        exportedBy: localStorage.getItem('username'),
        metrics: {
            totalUsers: document.getElementById('totalUsers').textContent,
            activeSessions: document.getElementById('activeSessions').textContent,
            conversionRate: document.getElementById('conversionRate').textContent,
            avgTime: document.getElementById('avgTime').textContent
        },
        sessionInfo: {
            loginTime: localStorage.getItem('loginTimestamp'),
            sessionDuration: getSessionDuration()
        }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `reporte_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    addActivity('Reporte exportado exitosamente');
    showNotification('📥 Reporte exportado correctamente', 'success');
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    addActivity(`Tema cambiado a ${newTheme}`);
    showNotification(`🌙 Tema ${newTheme} activado`, 'info');
}

function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('loginTimestamp');
        localStorage.removeItem('sessionStart');
        
        // Redirigir al login
        window.location.href = 'login.html';
    }
}

// Funciones auxiliares
function addActivity(message) {
    const activityLog = document.getElementById('activityLog');
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <div class="activity-content">
            <strong>${message}</strong>
            <span class="activity-time">${new Date().toLocaleString()}</span>
        </div>
    `;
    activityLog.insertBefore(activityItem, activityLog.firstChild);
    
    // Limitar a 10 actividades
    if (activityLog.children.length > 10) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

function clearActivityLog() {
    if (confirm('¿Estás seguro de que quieres limpiar el historial de actividades?')) {
        const activityLog = document.getElementById('activityLog');
        activityLog.innerHTML = `
            <div class="activity-item">
                <div class="activity-content">
                    <strong>Historial de actividades limpiado</strong>
                    <span class="activity-time">${new Date().toLocaleString()}</span>
                </div>
            </div>
        `;
        showNotification('🗑️ Historial de actividades limpiado', 'info');
    }
}

function showSettings() {
    alert('⚙️ Panel de configuración - En desarrollo');
}

function toggleChart(chartId) {
    alert(`Configuración del gráfico: ${chartId}`);
}

function getSessionDuration() {
    const sessionStart = localStorage.getItem('sessionStart');
    if (sessionStart) {
        const duration = Date.now() - parseInt(sessionStart);
        const minutes = Math.floor(duration / 60000);
        return `${minutes} minutos`;
    }
    return 'Desconocido';
}

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeCharts();
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Agregar estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Agregar actividad de inicio
    addActivity('Dashboard inicializado correctamente');
});
