// src/components/VideojuegoForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useVideojuego } from '../context/VideojuegoContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const VideojuegoForm = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();// para manejar el formulario, validaciones y errores
  const { crearVideojuego, actualizarVideojuego, videojuegos } = useVideojuego();// para acceder a las funciones de crear y actualizar videojuegos
  const navigate = useNavigate();
  const { id } = useParams();// para obtener el ID del videojuego desde la URL
  const location = useLocation();// para acceder a la ubicación actual
  const perfil = location.state?.profile;// para obtener el perfil del estado de navegación

  const [isEditing, setIsEditing] = useState(false);// para determinar si estamos editando un videojuego o creando uno nuevo

  useEffect(() => {
    if (id && videojuegos.length > 0) {// si hay un ID y la lista de videojuegos no está vacía
      setIsEditing(true);
      const videojuego = videojuegos.find((vj) => vj._id === id);// busca el videojuego por ID
      if (videojuego) {// si se encuentra el videojuego entonces setea los valores en el formulario
        setValue('titulo', videojuego.titulo);
        setValue('genero', videojuego.genero.join(', '));
        setValue('plataforma', videojuego.plataforma.join(', '));
        setValue('edadMinima', videojuego.edadMinima);
        setValue('fechaLanzamiento', videojuego.fechaLanzamiento.split('T')[0]);
        setValue('imgUrl', videojuego.imgUrl);
      }
    }
  }, [id, videojuegos, setValue]);// se ejecuta cuando cambia el ID, la lista de videojuegos o la función setValue

  const onSubmit = async (data) => {// función que se ejecuta al enviar el formulario

    if (!perfil) {
      Swal.fire('Error', 'Perfil no definido', 'error');
      return;
    }

    const datos = {// crea un objeto con los datos del formulario
      ...data,
      genero: data.genero.split(',').map(g => g.trim()),// convierte la cadena de géneros en un array
      plataforma: data.plataforma.split(',').map(p => p.trim()),// convierte la cadena de plataformas en un array
    };

    try {
      if (isEditing) {// si estamos editando un videojuego
        await actualizarVideojuego(id, datos);
        Swal.fire('Actualizado', 'El videojuego fue actualizado correctamente.', 'success');
      } else {
        await crearVideojuego(datos);
        Swal.fire('Creado', 'El videojuego fue creado correctamente.', 'success');
      }

      navigate(`/catalogo/${perfil._id}`, { state: { profile: perfil } });// redirige al catálogo de videojuegos
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al guardar los datos.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">{isEditing ? 'Editar' : 'Crear'} Videojuego</h2>



      {[// mapea los campos del formulario
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'genero', label: 'Género (separado por comas)', type: 'text' },
        { name: 'plataforma', label: 'Plataforma (separado por comas)', type: 'text' },
        { name: 'edadMinima', label: 'Edad Mínima', type: 'number' },
        { name: 'fechaLanzamiento', label: 'Fecha de Lanzamiento', type: 'date' },
        { name: 'imgUrl', label: 'URL de Imagen', type: 'text', required: false },
      ].map(({ name, label, type, required = true }) => (
        // cada campo del formulario es un objeto con nombre, etiqueta, tipo y si es requerido o no
        <div key={name} className="mb-5">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            id={name}
            type={type}
            {...register(name, { required })}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors[name] ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
          />
          {errors[name] && (
            <span className="text-xs text-red-600 mt-1 block">Este campo es obligatorio</span>
          )}
        </div>
      ))}

      {/* // Botón de enviar */}
      <button
        type="submit"
        disabled={isSubmitting}// deshabilita el botón si está enviando
        className={`w-full py-2 px-4 font-semibold rounded-lg transition ${
          isSubmitting
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
        }`}// aplica estilos al botón dependiendo del estado de envío
      >
        {isEditing ? 'Actualizar' : 'Crear'} Videojuego
      </button>
    </form>
  );
};

export default VideojuegoForm;
