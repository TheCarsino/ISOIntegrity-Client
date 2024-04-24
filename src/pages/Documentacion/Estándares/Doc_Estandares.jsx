import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Doc_Estandares.scss";
import NavBar from "../../../components/NavBar/NavBar";

function Doc_Estandares() {
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Gestión de Estándares y Normativas">
          <p>Body</p>
        </MainContainer>
      </div>
    </>
  );
}

export default Doc_Estandares;
