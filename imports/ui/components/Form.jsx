import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validateRut, formatRut } from "rutlib/lib";
import { PacientesCollection } from "../../api/PacientesCollection";
import axios from "axios";
import Inputs from "../helpers/Inputs";

const Form = () => {
  const [regiones, setRegiones] = useState([]);
  const [region, setRegion] = useState("");

  const { register, handleSubmit, reset, resetField, formState: { errors } } = useForm();

  useEffect(() => {
    axios
      .get("https://api.npoint.io/28e6514a89185a6229bb")
      .then((res) => {
        setRegiones(res.data.regiones);
        console.log(res.data);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    resetField("comuna");
  }, [region]);

  const formSubmit = (data) => {
    const paciente = data;
    paciente["region"] = region;

    if (!validateRut(paciente.rut)) {
      alert("Por favor ingresar un RUT válido");
    } else {
      paciente["rut"] = formatRut(paciente.rut);
      PacientesCollection.insert(paciente);
      reset();
    }
  };

  console.log(errors);

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <div>
      <h2 className="font-thin text-3xl text-center">
        Registro de los pacientes
      </h2>
      <p className="text-md mt-3 text-center mb-10">
        Registrate como {""}{" "}
        <span className="text-pink-500 font-bold text-md">Paciente</span>
      </p>

      <form onSubmit={handleSubmit(formSubmit)}>
        <Inputs label="Nombre" id="nombre" register={register}/>
        {errors.nombre && <span className=" text-red-500 text-center p-3 mb-3">El nombre es obligatorio</span>}
        <Inputs label="Apellido Paterno" id="apellidoP" register={register} />
        {errors.apellidoP && <span className=" text-red-500 text-center p-3 mb-3">Los apellidos son obligatorio</span>}
        <Inputs label="Apellido Materno" id="apellidoM" register={register} />
        {errors.apellidoM && <span className=" text-red-500 text-center p-3 mb-3">Los apellidos son obligatorio</span>}
        <Inputs label="RUT" id="rut" register={register} />
        {errors.rut && <span className=" text-red-500 text-center p-3 mb-3">El RUT es obligatorio</span>}

        <div>
          <label className="block uppercase font-thin-bold text-black">
            Región
          </label>
          <select
            className="mb-2 mt-2 text-white w-2/5 bg-blue-400 hover:bg-blue-500 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            {...register("region", { required: true })}
            onChange={handleChange}
            defaultValue={""}
          >
            <option value="" disabled>
              Seleccione una región
            </option>
            {regiones.map((localidad) => (
              <option key={localidad.region} value={localidad.region}>
                {localidad.region}
              </option>
            ))}
          </select>
          <div>
            {errors.region && <span className=" text-red-500 text-center p-3 mb-3 ">La region es obligatoria</span>}
          </div>
        </div>
        <div>
          <label className="block uppercase font-thin-bold text-black">
            Comuna
          </label>
          <select
            className="mb-2 mt-2 text-white w-2/5 bg-blue-400 hover:bg-blue-500 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            {...register("comuna", { required: true })}
            defaultValue={""}
            disabled={region === ""}
          >
            <option value="" disabled>
              Seleccione una comuna
            </option>
            {regiones.map((localidad) => {
              if (localidad.region === region)
                return localidad.comunas.map((comuna) => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ));
            })}
          </select>
          <div>
            {errors.comuna && <span className=" text-red-500 text-center p-3 mb-3 ">La comuna es obligatoria</span>}
          </div>

        </div>

        <Inputs label="Código postal" id="codigoP" register={register} />
        <div>
          {errors.codigoP && <span className=" text-red-500 text-center p-3 mb-3 ">El código postal es obligatorio</span>}
        </div>
        

        <input
          type="submit"
          className="bg-blue-500 rounded-md mt-12 text-white font-bold w-2/5 p-3 border-none hover:bg-blue-600 cursor-pointer hover:text-white transition ease-out"
          value="Registrarse"
        />
      </form>
    </div>
  );
};

export default Form;
