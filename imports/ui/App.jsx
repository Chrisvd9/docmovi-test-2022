import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Paciente from "./components/Paciente";

export const App = () => (
  <div className="container mx-auto mt-10">
    <Header />
    <div className="mt-12 flex-col text-center">
      <Form />
      <Paciente />
    </div>
  </div>
);
