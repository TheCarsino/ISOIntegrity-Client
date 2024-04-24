import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Doc_Reportes.scss";
import NavBar from "../../../components/NavBar/NavBar";

function Doc_Reportes() {
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Reportes del Sistema">
          <p>Body</p>
        </MainContainer>
      </div>
    </>
  );
}

export default Doc_Reportes;
