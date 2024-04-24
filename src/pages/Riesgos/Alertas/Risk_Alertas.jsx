import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Alertas.scss";
import NavBar from "../../../components/NavBar/NavBar";

function Risk_Alertas() {
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Alertas y Reportes para Evaluación de Riesgos">
          <p>Body</p>
        </MainContainer>
      </div>
    </>
  );
}

export default Risk_Alertas;
