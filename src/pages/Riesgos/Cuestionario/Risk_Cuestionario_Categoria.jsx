import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Cuestionario.scss";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { URL_RIESGOS_CUESTIONARIOS } from "../../../config";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import NavBar from "../../../components/NavBar/NavBar";

function Risk_Cuestionario_Categoria() {
  const navigate = useNavigate();

  const handleFinishSurvey = () => {
    navigate(`${URL_RIESGOS_CUESTIONARIOS}/resultado`, { state: null });
  };

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Resolución del Cuestionario de Evaluación de Riesgos">
          <div className="survey-escalas-header">
            <h4 className="text-primary">
              <b>
                Índicadores de riesgo de soborno relacionados a la escala de
                evaluación del empleado
              </b>
            </h4>
          </div>
          <ListTableBox
            noPadding={true}
            overFlowHeight={true}
            header={
              <div className="list-escalas-header">
                <h6
                  className="text-primary header-text"
                  style={{ width: "371px" }}
                >
                  <b>Factores de Riesgo de Soborno</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "924px" }}
                >
                  <b>Escala de Medición</b>
                </h6>
                <hr style={{ margin: "0", width: "100%" }} />
                <h6
                  className="text-primary header-text"
                  style={{ width: "85px" }}
                >
                  <b>Codigo</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "286px" }}
                >
                  <b>Nombre</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>1</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>2</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>3</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>4</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>5</b>
                </h6>
                <h6
                  className="text-primary header-text"
                  style={{ width: "154px" }}
                >
                  <b>6</b>
                </h6>
              </div>
            }
            listItems={[
              {
                key: "1",
                content: (
                  <div className="lista-escalas">
                    <div className="lista-escalas-item1">
                      <p className="text-primary header-text">DD01</p>
                    </div>
                    <div className="lista-escalas-item2">
                      <p className="text-primary header-text">
                        Intensidad del contacto del empleado con personas fuera
                        de la organización durante el desempeño de tareas
                        laborales
                      </p>
                    </div>
                    <div
                      key={`escala-${"categoria-1"}`}
                      className="lista-escalas-item3"
                    >
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-1`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-2`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-3`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-4`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-5`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                      <div style={{ padding: "0.75rem" }}>
                        <Form.Check
                          type="radio"
                          id={`escala-${"categoria-1"}-6`}
                          name={`escala-${"categoria-1"}`}
                          label="The minimum, most work tasks are performed in the
                            team or in cooperation with the supervisor"
                        />
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
            overrideColor="override-white"
          />
          <div className="survey-escalas-footer">
            {true && (
              <Button size="md" variant="primary">
                Paso Anterior
              </Button>
            )}
            {true && (
              <Button size="md" variant="primary">
                Paso Siguiente
              </Button>
            )}
            {false && (
              <Button
                onClick={() => handleFinishSurvey()}
                size="md"
                variant="primary"
              >
                Finalizar Cuestionario
              </Button>
            )}
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Risk_Cuestionario_Categoria;
