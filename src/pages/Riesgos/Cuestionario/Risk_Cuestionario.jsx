import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Cuestionario.scss";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { URL_RIESGOS_CUESTIONARIOS } from "../../../config";
import NavBar from "../../../components/NavBar/NavBar";

function Risk_Cuestionario() {
  const navigate = useNavigate();

  const handleContinueSurvey = () => {};
  const handleNewSurvey = () => {
    navigate(`${URL_RIESGOS_CUESTIONARIOS}/categorias`, { state: null });
  };
  const handleModifySurvey = () => {};

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Cuestionarios de Evaluación de Riesgos">
          <div className="cuestionario-main">
            <h4 className="text-primary">
              <b>
                Cuestionario de Evaluación - Índice de Riesgo de Soborno (BRI)
              </b>
            </h4>
            <p className="text-dark text-start">
              Al completar el cuestionario de evaluación de riesgos de soborno
              en la organización, utilizando indicadores de medición que
              permiten abarcar todos los aspectos del contexto organizacional,
              se podrán identificar las debilidades y necesidades de control
              para abordar los riesgos. De esta manera, se establecerán
              mediciones adecuadas que reflejen la realidad diaria de la
              organización en cuanto a los riesgos de soborno
            </p>
            {true ? (
              <Button
                onClick={() => handleNewSurvey()}
                size="md"
                variant="primary"
              >
                Iniciar el Cuestionario
              </Button>
            ) : false ? (
              <Button
                onClick={() => handleContinueSurvey()}
                size="md"
                variant="primary"
              >
                Continuar con el Cuestionario
              </Button>
            ) : (
              <Button
                onClick={() => handleModifySurvey()}
                size="md"
                variant="primary"
              >
                Volver a Realizar el Cuestionario
              </Button>
            )}
            {/* <Button
            onClick={() => setOpenNewRisks(true)}
            size="md"
            variant="primary"
          >
            Cargar Archivo con la Evaluación
          </Button> */}
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Risk_Cuestionario;
