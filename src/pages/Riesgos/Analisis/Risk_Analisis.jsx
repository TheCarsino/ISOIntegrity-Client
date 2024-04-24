import { useState } from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Analisis.scss";
import MetricBox from "../../../components/Metrics/MetricBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import Button from "react-bootstrap/esm/Button";
import Modals from "../../../components/Modals/Modals";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import NavBar from "../../../components/NavBar/NavBar";

function modalIndDetail() {
  return (
    <div className="modal-detailind-body">
      <div className="ind-metrics">
        <div className="sub-detail">
          <MetricBox
            topText="Total de Riesgos"
            middleText="4"
            bottomText="Del indicador"
            status="secondary"
            width="172px"
            gap="0rem"
          />
          <MetricBox
            topText="Casos reportados"
            middleText="4"
            bottomText="Por irregularidades"
            status="secondary"
            width="172px"
            gap="0rem"
          />
          <MetricBox
            topText="Casos reportados"
            middleText="8"
            bottomText="Por factores de riesgo"
            status="secondary"
            width="172px"
            gap="0rem"
          />
        </div>
        <div className="sub-detail">
          <MetricBox
            topText="Nivel de Riesgo Cuestionario"
            middleText="50.00"
            bottomText="Escala: 2 de 4"
            status="warning"
            width="262px"
            gap="0rem"
          />
          <MetricBox
            topText="Nivel de Riesgo Organizacional"
            middleText="65.50"
            bottomText="Relacionado con los riesgos actuales"
            status="danger"
            width="262px"
            gap="0rem"
          />
        </div>
      </div>
      <Form style={{ width: "100%" }}>
        <div className="ind-details">
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="col-md-12"
              controlId="formGridNombre"
            >
              <Form.Label>Nombre del Indicador de Riesgo</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value="Posición del empleado en la estructura organizacional (nivel jerárquico)"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="col-md-12"
              controlId="formGridRequisitos"
            >
              <Form.Label>Requisitos de la ISO 37001 asociados</Form.Label>
              <div className="lista-requisitos">
                <p className="text-primary">8.2 - Debida Diligencia</p>
                <div className="lista-subrequisitos">
                  <p className="text-secondary">
                    8.2c - Categorías específicas del personal en determinadas
                    posiciones
                  </p>
                </div>
                <p className="text-primary">
                  4.1 - Comprensión de la organización y su contexto
                </p>
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="col-md-12"
              controlId="formGridEscalas"
            >
              <Form.Label>Especificación de Escalas de Medición</Form.Label>
              <Form.Control
                style={{ height: "162px" }}
                as="textarea"
                placeholder=""
                value="1. Menos de 1 año
2. 1 - 3 años
3. 4 - 10 años
4. 11 años a más"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <div className="lista-body-riesgos-ind">
              <div className="procesos-riesgos-header">
                <h5 className="text-primary">
                  <b>Lista de Riesgos Asociados</b>
                </h5>
              </div>
              <ListTableBox
                noPadding={true}
                header={
                  <div className="accordion-riesgos-header">
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
                      style={{ width: "709px" }}
                    >
                      <b>Nombre</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "232px" }}
                    >
                      <b>Categoría</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "232px" }}
                    >
                      <b>Relación Unidad</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "232px" }}
                    >
                      <b>Severidad</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "232px" }}
                    >
                      <b>Casos</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "122px" }}
                    >
                      <b>Nivel Riesgo</b>
                    </h6>
                  </div>
                }
                listItems={[
                  {
                    key: "1",
                    content: (
                      <div className="lista-riesgos">
                        <div className="lista-riesgos-item1">
                          <p className="text-primary header-text">
                            <b>1</b>
                          </p>
                        </div>
                        <div className="lista-riesgos-item2">
                          <p className="text-primary header-text">PRTR001</p>
                        </div>
                        <div className="lista-riesgos-item3 header-text">
                          <p className="text-primary">
                            Servidor de Producción - Degradación en desempeño
                            del sistema
                          </p>
                        </div>
                        <div className="lista-riesgos-item4 header-text">
                          <p className="text-primary">
                            <b>Tratamiento:</b> Transferencia
                          </p>
                          <p className="text-primary">
                            <b>Indicador de Riesgo:</b> SH16
                          </p>
                        </div>
                        <div className="lista-riesgos-item4 header-text">
                          <p className="text-primary">{"Área"} LIN001</p>
                          <p className="text-primary">
                            <b>Proceso DRS001</b>
                          </p>
                        </div>
                        <div className="lista-riesgos-item5 header-text">
                          <p className="text-primary">
                            <b>Probabilidad:</b> Medio
                          </p>
                          <p className="text-primary">
                            <b>Impacto:</b> Alto
                          </p>
                          <hr style={{ margin: "0" }} />
                          <p className="text-danger">
                            <b>Severo</b>
                          </p>
                        </div>
                        <div className="lista-riesgos-item6 header-text">
                          <p className="text-primary">
                            <b>Irregularidades:</b> 1
                          </p>
                          <p className="text-primary">
                            <b>Factores:</b> 0
                          </p>
                        </div>
                        <div
                          className={`lista-riesgos-item7 header-text ${"bg-danger"}`}
                        >
                          <h5 className="text-white text-center">57.50</h5>
                        </div>
                      </div>
                    ),
                  },
                ]}
                overrideColor="override-gray"
              />
            </div>
          </Row>
        </div>
      </Form>
    </div>
  );
}

function Risk_Analisis() {
  const [openIndDetail, setOpenIndDetail] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Análisis de Indicadores de Riesgos de la Organización">
          <div className="analisis-header">
            <div className="header-display">
              <h4 className="text-primary">
                <b>Análisis de la Organización</b>
              </h4>
            </div>
            <div className="analisis-content">
              <div className="analisis-dashboard">
                <p className="text-dark">
                  ISOIntegrity 37001 es una herramienta de software diseñada
                  para simplificar y fortalecer la gestión antisoborno en
                  organizaciones públicas y privadas. Basado en la norma ISO
                  37001, este sistema permite evaluar, controlar y mitigar los
                  riesgos de soborno, ofreciendo funciones como evaluación de
                  riesgos con indicadores cuantificables, gestión de casos de
                  soborno y divulgación de irregularidades, generación de
                  informes y documentación conforme a estándares ISO.
                  <br />
                  Con una interfaz intuitiva y seguridad avanzada, ISOIntegrity
                  37001 facilita el cumplimiento de los más altos estándares de
                  integridad y ética empresarial, promoviendo un entorno
                  transparente y responsable.
                </p>
              </div>
              <div className="analisis-medicion">
                <MetricBox
                  topText="Evaluacion de Riesgos"
                  middleText="43"
                  bottomText="Inventario Total"
                  order="top-bottom-middle"
                  status="secondary"
                  width="222px"
                  height="144px"
                  gap="0.5rem"
                />
                <MetricBox
                  topText="Nivel de Riesgo de la Organización"
                  middleText="45.80"
                  bottomText="En la evaluación original"
                  order="top-bottom-middle"
                  status="warning"
                  width="320px"
                  height="144px"
                  gap="0.5rem"
                />
                <MetricBox
                  topText="Tolerancia de Riesgo"
                  middleText="3"
                  bottomText="Riesgos Excedidos"
                  order="top-bottom-middle"
                  status="danger"
                  width="222px"
                  height="144px"
                  gap="0.5rem"
                />
                <MetricBox
                  topText="Nivel de Riesgo de la Organización"
                  middleText="75.85"
                  bottomText="En la actualidad"
                  order="top-bottom-middle"
                  status="danger"
                  width="320px"
                  height="144px"
                  gap="0.5rem"
                />
              </div>
            </div>
          </div>
          <div className="lista-body-indicadores">
            <div className="procesos-indicadores-header">
              <h5 className="text-primary">
                <b>
                  Lista de Indicadores de Riesgos Generales de la Organización
                </b>
              </h5>
            </div>
            <ListTableBox
              noPadding={true}
              header={
                <div className="accordion-indicadores-header">
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
                    style={{ width: "709px" }}
                  >
                    <b>Nombre</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "260px" }}
                  >
                    <b>Requisitos ISO 37001</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "212px" }}
                  >
                    <b>Resultados Cuestionario</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "252px" }}
                  >
                    <b>Resumen de Riesgos</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "122px" }}
                  >
                    <b>Nivel Riesgo</b>
                  </h6>
                  <div style={{ width: "42px" }}></div>
                </div>
              }
              listItems={[
                {
                  key: "1",
                  content: (
                    <div className="lista-indicadores">
                      <div className="lista-indicadores-item1">
                        <p className="text-primary header-text">
                          <b>1</b>
                        </p>
                      </div>
                      <div className="lista-indicadores-item2">
                        <p className="text-primary header-text">DD01</p>
                      </div>
                      <div className="lista-indicadores-item3 header-text">
                        <p className="text-primary">
                          Posición del empleado en la estructura organizacional
                          (nivel jerárquico)
                        </p>
                      </div>
                      <div className="lista-indicadores-item4 header-text">
                        <p className="text-primary">
                          8.2b, 4.1b,c,d,e,f,g,h, 4.2, 6.1a,b
                        </p>
                      </div>
                      <div className="lista-indicadores-item5 header-text">
                        <p className="text-primary">Nivel de Riesgo</p>
                        <h5 className="text-warning">
                          <b>50.00</b>
                        </h5>
                        <p className="text-primary">Escala: 2 de 4</p>
                      </div>
                      <div className="lista-indicadores-item6 header-text">
                        <p className="text-primary">
                          <b>Riesgos asociados:</b> 4
                        </p>
                        <p className="text-primary">
                          <b>Casos reportados:</b> 12
                        </p>
                      </div>
                      <div
                        className={`lista-indicadores-item7 header-text ${"bg-danger"}`}
                      >
                        <h5 className="text-white text-center">65.50</h5>
                      </div>
                      <div className="lista-indicadores-item1">
                        <Button
                          onClick={() => setOpenIndDetail(true)}
                          variant="outline-secondary"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            style={{
                              fontSize: "1rem",
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  ),
                },
              ]}
              overrideColor="override-white"
            />
          </div>
        </MainContainer>
        <Modals
          openModal={openIndDetail}
          setOpenModal={setOpenIndDetail}
          title="Detalle del Indicador de Riesgo DD01"
          size="xl"
          body={modalIndDetail()}
        />
      </div>
    </>
  );
}

export default Risk_Analisis;
