import React from "react";
import MainContainer from "../../../components/Main/MainContainer";
import Button from "react-bootstrap/Button";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { URL_ORGANIZACION_RIESGOS } from "../../../config";

import "./Org_Riesgos.scss";
import NavBar from "../../../components/NavBar/NavBar";

function Org_Riesgos() {
  const navigate = useNavigate();

  const handleUnitAreaDetail = (unidad = null) => {
    const datatoPass = unidad;
    navigate(`${URL_ORGANIZACION_RIESGOS}/detalle`, { state: datatoPass });
  };
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Estructura de la Organizacion">
          <div className="accordion-group">
            <div className="accordion-body">
              <div className="grouped-areas">
                <h4 className="text-primary">
                  <b>Órganos de línea - GER 0001</b>
                </h4>
              </div>
              {/* Lista de Areas */}
              <div className="accordion-areas">
                <div className="accordion-areas-header">
                  <h6
                    className="text-primary header-text"
                    style={{ width: "42px", alignSelf: "center" }}
                  >
                    <b>#</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "136px" }}
                  >
                    <b>Código</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "574px" }}
                  >
                    <b>Nombre</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "225px" }}
                  >
                    <b>Mediciones</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "122px" }}
                  >
                    <b>Nivel Riesgo</b>
                  </h6>
                </div>
                <AccordionBox
                  noPadding={true}
                  accordionItems={[
                    {
                      header: (
                        <div className="lista-areas">
                          <div className="lista-areas-item1">
                            <p className="text-primary header-text">
                              <b>1</b>
                            </p>
                          </div>
                          <div className="lista-areas-item2">
                            <p className="text-primary header-text">LIN001</p>
                          </div>
                          <div className="lista-areas-item3 header-text">
                            <p className="text-primary">
                              Gerencia Regional de Desarrollo Social
                            </p>
                          </div>
                          <div className="lista-areas-item4 header-text">
                            <p className="text-primary">Total: 7 riesgos</p>
                            <p className="text-danger ">
                              3 exceden el nivel de tolerancia
                            </p>
                          </div>
                          <div
                            className={`lista-areas-item5 header-text ${"bg-danger"}`}
                          >
                            <h5 className="text-white text-center">75.85</h5>
                          </div>
                          <Button
                            onClick={() =>
                              handleUnitAreaDetail({
                                id: 1,
                                codigo: "DRSO001",
                                nombre:
                                  "Dirección Regional de Trabajo y Promoción del Empleo",
                              })
                            }
                            variant="outline-secondary"
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "center",
                              }}
                            >
                              Ver Detalle
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                style={{
                                  fontSize: "1.25rem",
                                }}
                              />
                            </div>
                          </Button>
                        </div>
                      ),
                      hasBody: true,
                      body: (
                        <div className="accordion-lista-unidades">
                          <ListTableBox
                            noPadding={true}
                            listItems={[
                              {
                                key: "1",
                                content: (
                                  <div className="lista-unidades">
                                    <div className="lista-unidades-item1"></div>
                                    <div className="lista-unidades-item2">
                                      <p className="text-primary header-text">
                                        DRS001
                                      </p>
                                    </div>
                                    <div className="lista-unidades-item3 header-text">
                                      <p className="text-primary">
                                        Dirección Regional de Trabajo y
                                        Promoción del Empleo
                                      </p>
                                    </div>
                                    <div className="lista-unidades-item4 header-text">
                                      <p className="text-primary">
                                        Total: 3 riesgos
                                      </p>
                                      <p className="text-danger">
                                        1 exceden el nivel de tolerancia
                                      </p>
                                    </div>
                                    <div
                                      className={`lista-unidades-item5 header-text ${"bg-warning"}`}
                                    >
                                      <h5 className="text-white text-center">
                                        35.45
                                      </h5>
                                    </div>
                                    <Button
                                      onClick={() => handleUnitAreaDetail()}
                                      variant="outline-secondary"
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "0.5rem",
                                          alignItems: "center",
                                        }}
                                      >
                                        Ver Detalle
                                        <FontAwesomeIcon
                                          icon={faArrowRight}
                                          style={{
                                            fontSize: "1.25rem",
                                          }}
                                        />
                                      </div>
                                    </Button>
                                  </div>
                                ),
                              },
                            ]}
                            overrideColor="override-gray"
                          />
                        </div>
                      ),
                    },
                  ]}
                  overrideBorders={true}
                  overrideColor="override-white"
                ></AccordionBox>
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Org_Riesgos;
