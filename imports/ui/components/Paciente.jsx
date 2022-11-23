import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PacientesCollection } from "../../api/PacientesCollection";
import { Meteor } from "meteor/meteor";

const Paciente = () => {
  const pacientes = useTracker(() =>
    PacientesCollection.find({}, { sort: { apellidoP: 1 } }).fetch()
  );

  const remove = _id => {
    Meteor.call('pacientes.delete', { _id })
  }

  return (
    <div className="md:h-screen mt-16">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-thin text-3xl text-center">
            Listado de pacientes
          </h2>
          <p className="text-md mt-3 text-center mb-10">
            Revisa los {""}{" "}
            <span className="text-pink-500 font-bold text-md">Pacientes</span>
          </p>
          <div className="m-5 bg-white border shadow-xl rounded-md py-10 px-5 mb-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-900">
              <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-white dark:text-gray-900">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Nombre
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Apellido paterno
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Apellido Materno
                  </th>
                  <th scope="col" className="py-3 px-6">
                    RUT
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Región
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Comuna
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Códgio postal
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pacientes?.map((paciente) => (
                  <tr
                    className="bg-black border-b dark:bg-white dark:border-gray-400"
                    key={paciente._id}
                  >
                    <td
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {paciente.nombre}
                    </td>
                    <td className="py-4 px-6">{paciente.apellidoP}</td>
                    <td className="py-4 px-6">{paciente.apellidoM}</td>
                    <td className="py-4 px-6">{paciente.rut}</td>
                    <td className="py-4 px-6">{paciente.region}</td>
                    <td className="py-4 px-6">{paciente.comuna}</td>
                    <td className="py-4 px-6">{paciente.codigoP}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => remove(paciente._id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2 mt-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-thin text-3xl text-center">
            No hay personas registradas
          </h2>
          <p className="text-md mt-3 text-center mb-10">
            Regístra algún paciente {""}{" "}
            <span className="text-pink-500 font-bold text-md">
              Y podrás ver la tabla
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default Paciente;
