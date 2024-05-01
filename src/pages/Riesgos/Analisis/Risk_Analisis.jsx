import { useState, useEffect } from "react";
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
import {
  getRiskIndicatorDetail,
  getRiskIndicatorDetailbyId,
} from "../../../services/riskindicator.services";
import {
  colorTextPercentage,
  colorBackgroundPercentage,
  convertToPercentage,
  statusPercentage,
} from "../../../hooks/ColorCases";

function modalIndDetail(riskIndicator) {
  const fillEscalas = (escalas) => {
    let escalaText = "";
    if (escalas.descripcion_e1 != "")
      escalaText += "1. " + escalas.descripcion_e1 + "\n";
    if (escalas.descripcion_e2 != "")
      escalaText += "2. " + escalas.descripcion_e2 + "\n";
    if (escalas.descripcion_e3 != "")
      escalaText += "3. " + escalas.descripcion_e3 + "\n";
    if (escalas.descripcion_e4 != "")
      escalaText += "4. " + escalas.descripcion_e4 + "\n";
    if (escalas.descripcion_e5 != "")
      escalaText += "5. " + escalas.descripcion_e5 + "\n";
    if (escalas.descripcion_e6 != "")
      escalaText += "6. " + escalas.descripcion_e6 + "\n";
    return escalaText;
  };
  return (
    <div className="modal-detailind-body">
      {riskIndicator && (
        <>
          <div className="ind-metrics">
            <div className="sub-detail">
              <MetricBox
                topText="Total de Riesgos"
                middleText="3"
                bottomText="Del indicador"
                status="secondary"
                width="172px"
                gap="0rem"
              />
              <MetricBox
                topText="Casos reportados"
                middleText={riskIndicator.total_riesgos}
                bottomText="Por irregularidades"
                status="secondary"
                width="172px"
                gap="0rem"
              />
              <MetricBox
                topText="Casos reportados"
                middleText={
                  riskIndicator.casos_reportados_irreg +
                  riskIndicator.casos_reportados_riesgo
                }
                bottomText="Por factores de riesgo"
                status="secondary"
                width="172px"
                gap="0rem"
              />
            </div>
            <div className="sub-detail">
              <MetricBox
                topText="Nivel de Riesgo Cuestionario"
                middleText={convertToPercentage(
                  riskIndicator.resultado_cuestionario
                )}
                bottomText="Escala: 2 de 4"
                status={statusPercentage(riskIndicator.resultado_cuestionario)}
                width="262px"
                gap="0rem"
              />
              <MetricBox
                topText="Nivel de Riesgo Organizacional"
                middleText={convertToPercentage(riskIndicator.nivel_riesgo)}
                bottomText="Relacionado con los riesgos actuales"
                status={statusPercentage(riskIndicator.resultado_cuestionario)}
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
                    value={riskIndicator.nombre}
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
                    {riskIndicator.Requisitos.map((req) => (
                      <>
                        <p key={req.id} className="text-primary">
                          {req.nombre}
                        </p>
                        <div className="lista-subrequisitos">
                          {req.subrequisitos &&
                            req.subrequisitos.map((sub) => (
                              <p key={sub.id} className="text-secondary">
                                {sub.nombre}
                              </p>
                            ))}
                        </div>
                      </>
                    ))}
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
                    value={fillEscalas(riskIndicator.Escalas.SurveyScale)}
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
                              <p className="text-primary header-text">
                                PRTR001
                              </p>
                            </div>
                            <div className="lista-riesgos-item3 header-text">
                              <p className="text-primary">
                                Servidor de Producción - Degradación en
                                desempeño del sistema
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
                                <b>Irregularidades:</b> 0
                              </p>
                              <p className="text-primary">
                                <b>Factores:</b> 0
                              </p>
                            </div>
                            <div
                              className={`lista-riesgos-item7 header-text ${"bg-warning"}`}
                            >
                              <h5 className="text-white text-center">50.00</h5>
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "2",
                        content: (
                          <div className="lista-riesgos">
                            <div className="lista-riesgos-item1">
                              <p className="text-primary header-text">
                                <b>2</b>
                              </p>
                            </div>
                            <div className="lista-riesgos-item2">
                              <p className="text-primary header-text">
                                PRTR002
                              </p>
                            </div>
                            <div className="lista-riesgos-item3 header-text">
                              <p className="text-primary">
                                Servidor de Producción - Mal funcionamiento del
                                equipamiento
                              </p>
                            </div>
                            <div className="lista-riesgos-item4 header-text">
                              <p className="text-primary">
                                <b>Tratamiento:</b> Aceptación
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
                                <b>Probabilidad:</b> Bajo
                              </p>
                              <p className="text-primary">
                                <b>Impacto:</b> Medio
                              </p>
                              <hr style={{ margin: "0" }} />
                              <p className="text-warning">
                                <b>Medio</b>
                              </p>
                            </div>
                            <div className="lista-riesgos-item6 header-text">
                              <p className="text-primary">
                                <b>Irregularidades:</b> 0
                              </p>
                              <p className="text-primary">
                                <b>Factores:</b> 0
                              </p>
                            </div>
                            <div
                              className={`lista-riesgos-item7 header-text ${"bg-success"}`}
                            >
                              <h5 className="text-white text-center">25.00</h5>
                            </div>
                          </div>
                        ),
                      },
                      {
                        key: "3",
                        content: (
                          <div className="lista-riesgos">
                            <div className="lista-riesgos-item1">
                              <p className="text-primary header-text">
                                <b>3</b>
                              </p>
                            </div>
                            <div className="lista-riesgos-item2">
                              <p className="text-primary header-text">
                                PRTR003
                              </p>
                            </div>
                            <div className="lista-riesgos-item3 header-text">
                              <p className="text-primary">
                                Datos de contratistas - Disponibilidad de
                                backups
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
                                <b>Irregularidades:</b> 0
                              </p>
                              <p className="text-primary">
                                <b>Factores:</b> 0
                              </p>
                            </div>
                            <div
                              className={`lista-riesgos-item7 header-text ${"bg-warning"}`}
                            >
                              <h5 className="text-white text-center">50.00</h5>
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
        </>
      )}
    </div>
  );
}

function Risk_Analisis() {
  async function retrieveRiskDetails() {
    const data = await getRiskIndicatorDetail();

    return data;
  }

  const itemsListIndicator = (listIndicators) => {
    let mappedList = [];

    listIndicators.forEach((ind) => {
      let listReqs = "";

      for (let req of ind.Requisitos) {
        if (!req.subrequisitos) {
          const spaceIndex = req.nombre.indexOf(" ");
          const firstPart = req.nombre.slice(0, spaceIndex);
          listReqs = listReqs + (listReqs.length > 0 ? ", " : "") + firstPart;
        } else {
          for (let sub of req.subrequisitos) {
            if (sub) {
              const spaceIndexSub = sub.nombre.indexOf(" ");
              const firstPartSub = sub.nombre.slice(0, spaceIndexSub);
              listReqs =
                listReqs + (listReqs.length > 0 ? ", " : "") + firstPartSub;
            }
          }
        }
      }
      mappedList.push({
        key: ind.id.toString(),
        content: (
          <div className="lista-indicadores">
            <div className="lista-indicadores-item1">
              <p className="text-primary header-text">
                <b>{ind.id}</b>
              </p>
            </div>
            <div className="lista-indicadores-item2">
              <p className="text-primary header-text">{ind.codigo}</p>
            </div>
            <div className="lista-indicadores-item3 header-text">
              <p className="text-primary">{ind.nombre}</p>
            </div>
            <div className="lista-indicadores-item4 header-text">
              <p className="text-primary">{listReqs}</p>
            </div>
            <div className="lista-indicadores-item5 header-text">
              <p className="text-primary">Nivel de Riesgo</p>
              <h5 className={colorTextPercentage(ind.resultado_cuestionario)}>
                <b>{convertToPercentage(ind.resultado_cuestionario)}</b>
              </h5>
              <p className="text-primary">{`Escala: ${
                ind.Escalas.SurveyResult
                  ? ind.Escalas.SurveyResult.escala_seleccion
                  : 0
              } de ${ind.escala}`}</p>
            </div>
            <div className="lista-indicadores-item6 header-text">
              <p className="text-primary">
                <b>Riesgos asociados:</b> {ind.total_riesgos}
              </p>
              <p className="text-primary">
                <b>Casos reportados:</b>{" "}
                {ind.casos_reportados_irreg + ind.casos_reportados_riesgo}
              </p>
            </div>
            <div
              className={`lista-indicadores-item7 header-text ${colorBackgroundPercentage(
                ind.nivel_riesgo
              )}`}
            >
              <h5 className="text-white text-center">
                {convertToPercentage(ind.nivel_riesgo)}
              </h5>
            </div>
            <div className="lista-indicadores-item1">
              <Button
                onClick={() => {
                  setOpenIndDetail(true);
                  setCurrentIndicator(ind);
                }}
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
      });
    });

    return mappedList;
  };

  const [listIndicators, setListIndicators] = useState(null);
  const [orgAnalisis, setOrgAnalisis] = useState(null);
  const [openIndDetail, setOpenIndDetail] = useState(false);
  const [currentIndicator, setCurrentIndicator] = useState(null);

  useEffect(() => {
    retrieveRiskDetails().then((data) => {
      setListIndicators(data);
    });
  }, []);

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
            {listIndicators && (
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
                listItems={itemsListIndicator(listIndicators)}
                overrideColor="override-white"
                maxHeight="576px"
              />
            )}
          </div>
        </MainContainer>
        <Modals
          openModal={openIndDetail}
          setOpenModal={setOpenIndDetail}
          title={`Detalle del Indicador de Riesgo ${currentIndicator?.codigo}`}
          size="xl"
          body={modalIndDetail(currentIndicator)}
        />
      </div>
    </>
  );
}

export default Risk_Analisis;
