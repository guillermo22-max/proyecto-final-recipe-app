import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UserContext from '../context/UserContext';
import '../styles/Profile.css';
import Footer from '../components/layout/Footer';
import logo from '/logo-solo.png';

function Profile() {
  const { user, logout } = useContext(UserContext); // Consumir el contexto
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nombre: '',
    apellidos: '',
    nombre_usuario: '',
    email: '',
    foto_url: '',
    fondo_url: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    nombre: '',
    apellidos: '',
    nombre_usuario: '',
    email: '',
    foto_url: '',
    fondo_url: ''
  });

  // Cargar datos de usuario desde el contexto o localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        setTempData(parsedData);
      } else if (user) {
        setUserData(user);
        setTempData(user);
      }
    } catch (error) {
      console.error('Error al parsear los datos de usuario:', error);
      localStorage.removeItem('userData');
    }
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setUserData(tempData);
    localStorage.setItem('userData', JSON.stringify(tempData));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if ((name === 'foto_url' || name === 'fondo_url') && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setTempData({ ...tempData, [name]: event.target.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  // Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Eliminar datos de localStorage
    localStorage.removeItem('token'); // Eliminar token
    logout(); // Limpiar el estado global en el contexto
    navigate('/'); // Redirigir al inicio
  };

  if (!userData.nombre && !userData.email) {
    return <p className="text-center">Cargando perfil...</p>;
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-grow-1">
        <Sidebar onSidebarClick={() => { }} />
        <div className="w-100 content">
          {/* Fondo del perfil */}
          <div
            className="profile-background"
            style={{
              backgroundImage: `url(${userData.fondo_url || '/emplatado-1-1030x577.webp'})`,
              height: "50vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative"
            }}
          >
            {/* Imagen de perfil */}
            <img
              src={userData.foto_url || '/logo-solo.png'}
              alt="Perfil"
              className="profile-img"
              style={{
                position: "absolute",
                bottom: "-50px",
                right: "20px",
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                border: "4px solid white",
                boxShadow: "0 4px 8px rgba(246, 120, 2, 0.5)"
              }}
            />
          </div>


          {/* Inputs para editar imágenes */}
          {isEditing && (
            <div className="edit-images mx-auto text-center mt-4" style={{ maxWidth: "600px" }}>
               <label htmlFor="fondo_url" className="form-label">
                  Foto de portada
               </label>
              <input
                type="file"
                name="fondo_url"
                accept="image/*"
                className="form-control mb-3"
                onChange={handleChange}
              />
              <label htmlFor="foto_url" className="form-label">
                Foto de perfil
              </label>
              <input
                type="file"
                name="foto_url"
                accept="image/*"
                className="form-control mb-3"
                onChange={handleChange}

              />

              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={tempData.nombre}
                className="form-control mb-3"
                onChange={handleChange}
              />

              {/* Input para editar los apellidos */}
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={tempData.apellidos}
                className="form-control mb-3"
                onChange={handleChange}
              />

              {/* Input para editar el nombre de usuario */}
              <input
                type="text"
                name="nombre_usuario"
                placeholder="Nombre de Usuario"
                value={tempData.nombre_usuario}
                className="form-control mb-3"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="profile-content px-4 py-3 text-center">
            {/* Información del usuario */}
            <div style={{ textAlign: "left", marginRight: "20px" }}>
              <h3>
                {userData.nombre} {userData.apellidos}
              </h3>
              <p className="text-muted">@{userData.nombre_usuario}</p>
              <p className="text-muted"> <samp><i className="fa-regular fa-envelope me-2"></i></samp>{userData.email}</p>
            </div>
          </div>

          {/* Botones */}
          <div className="profile-actions mt-3 text-center ">
            {isEditing ? (
              <button className="btn btn-success me-2" onClick={handleSave}>
                Guardar
              </button>
            ) : (
              <button className="btn btn-outline-primary me-2" onClick={handleEdit}>
                Editar Perfil
              </button>
            )}
            <button className="btn btn-danger" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;






