$(document).ready(function() {
    // Elementos del DOM
    const loginForm = $('#loginForm');
    const username = $('#username');
    const password = $('#password');
    const togglePassword = $('.toggle-password');
    const loginBtn = $('#loginBtn');
    const btnText = $('#btnText');
    const btnSpinner = $('#btnSpinner');
    const errorModal = $('#errorModal');
    
    // Usuarios permitidos
    const allowedUsers = ['profesor', 'estudiante', 'admin', 'director'];
    
    // Mostrar/ocultar contraseña
    togglePassword.on('click', function() {
        const icon = $(this).find('i');
        const isVisible = icon.hasClass('fa-eye');
        
        if (isVisible) {
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
            password.attr('type', 'password');
        } else {
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
            password.attr('type', 'text');
        }
    });
    
    // Validación del formulario
    loginForm.on('submit', function(e) {
        e.preventDefault();
        
        // Ocultar mensaje de error previo
        errorModal.modal('hide');
        
        // Mostrar spinner y cambiar texto
        btnText.text('Verificando...');
        btnSpinner.removeClass('d-none');
        loginBtn.prop('disabled', true);
        
        // Simular tiempo de validación
        setTimeout(() => {
            const user = username.val();
            const pass = password.val();
            
            if (allowedUsers.includes(user) && pass === '1234') {
                // Login exitoso
                btnText.html('<i class="fas fa-check-circle mr-2"></i> Acceso concedido');
                loginBtn.removeClass('btn-login').addClass('btn-success');
                
                // Redirigir después de 1 segundo
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                // Credenciales incorrectas - mostrar modal
                errorModal.modal('show');
                loginForm.addClass('shake');
                
                // Restablecer botón
                btnText.text('Ingresar');
                btnSpinner.addClass('d-none');
                loginBtn.prop('disabled', false);
                
                // Quitar animación después de 0.5 segundos
                setTimeout(() => {
                    loginForm.removeClass('shake');
                }, 500);
            }
        }, 1500);
    });
    
    // Enfocar el campo de contraseña al cerrar el modal
    errorModal.on('hidden.bs.modal', function() {
        password.focus();
    });
});