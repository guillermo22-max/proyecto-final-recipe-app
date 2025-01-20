import api from './api';

//  Solicitar recuperación de contraseña
export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post('/password/request-reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error al solicitar la recuperación de contraseña:', error);
    throw error;
  }
};

//  Restablecer contraseña (Enviando ambos campos)
export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await api.put('/password/reset-password',{password: newPassword,confirm_password: confirmPassword},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error.response?.data || error.message);
    throw error;
  }
};