import { Meteor } from "meteor/meteor";
import { PacientesCollection } from "../imports/api/PacientesCollection";

const insertPaciente = (paciente) =>
  PacientesCollection.insert({
    nombre: paciente.nombre,
    apellidoP: paciente.apellidoP,
    apellidoM: paciente.apellidoM,
    rut: paciente.rut,
    region: paciente.region,
    comuna: paciente.comuna,
    codigoP: paciente.codigoP,
  });

Meteor.methods({
  'pacientes.delete': function ({ _id }) {
    return PacientesCollection.remove({ _id })
  }
})
