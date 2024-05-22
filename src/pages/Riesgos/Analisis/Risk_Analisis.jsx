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
import Placeholder from "react-bootstrap/Placeholder";
import Spinner from "react-bootstrap/Spinner";
import {
  getGeneralRiskinOrg,
  getRiskIndicatorDetail,
  getRiskIndicatorDetailbyId,
} from "../../../services/riskindicator.services";
import {
  colorTextPercentage,
  colorBackgroundPercentage,
  convertToPercentage,
  statusPercentage,
  statusImpactText,
  statusImpact,
} from "../../../hooks/ColorCases";
import BarStackedGraph from "../../../components/Graphs/BarStackedGraph";

function modalIndDetail(riskIndicator) {
  const fillRiskList = (risks) => {
    let listRisk = [];
    for (const risk of risks) {
      listRisk.push({
        key: risk.id.toString(),
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>{risk.id}</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">{risk.codigo}</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">{risk.nombre}</p>
            </div>
            <div className="lista-riesgos-item4 header-text">
              <p className="text-primary">
                <b>Tratamiento:</b>{" "}
                {risk.RiskTreatment != null
                  ? risk.RiskTreatment.nombre
                  : "Sin evaluar"}
              </p>
              <p className="text-primary">
                <b>Indicador de Riesgo:</b> {risk.RiskIndicator?.codigo}
              </p>
            </div>
            <div className="lista-riesgos-item4 header-text">
              <p className="text-primary">
                {risk.Process?.UnitArea.es_area ? "Área " : "Unidad "}
                {risk.Process?.UnitArea.codigo}
              </p>
              <p className="text-primary">
                <b>Proceso {risk.Process?.codigo}</b>
              </p>
            </div>
            <div className="lista-riesgos-item5 header-text">
              <p className="text-primary">
                <b>Probabilidad:</b> {statusImpactText(risk.probabilidad)}
              </p>
              <p className="text-primary">
                <b>Impacto:</b> {statusImpactText(risk.impacto)}
              </p>
              <hr style={{ margin: "0" }} />
              <p className={statusImpact(risk.severidad_riesgo)}>
                <b>{statusImpactText(risk.severidad_riesgo)}</b>
              </p>
            </div>
            <div className="lista-riesgos-item6 header-text">
              <p className="text-primary">
                <b>Irregularidades:</b> {" " + risk.total_whistlecases}
              </p>
              <p className="text-primary">
                <b>Factores:</b> {" " + risk.total_factorcases}
              </p>
            </div>
            <div
              className={`lista-riesgos-item7 header-text ${colorBackgroundPercentage(
                risk.nivel_riesgo
              )}`}
            >
              <h5 className="text-white text-center">
                {convertToPercentage(risk.nivel_riesgo)}
              </h5>
            </div>
          </div>
        ),
      });
    }
    return listRisk;
  };

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
                middleText={riskIndicator.total_riesgos.toString()}
                bottomText="Del indicador"
                status="secondary"
                width="172px"
                gap="0rem"
              />
              <MetricBox
                topText="Casos reportados"
                middleText={riskIndicator.casos_reportados_irreg.toString()}
                bottomText="Por irregularidades"
                status="secondary"
                width="172px"
                gap="0rem"
              />
              <MetricBox
                topText="Casos reportados"
                middleText={riskIndicator.casos_reportados_riesgo.toString()}
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
                    readOnly
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
                    readOnly
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
                  {riskIndicator.Riesgos != null &&
                    riskIndicator.Riesgos.length > 0 && (
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
                        listItems={fillRiskList(riskIndicator.Riesgos)}
                        overrideColor="override-gray"
                      />
                    )}
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
  async function retrieveOrgMetrics() {
    const data = await getGeneralRiskinOrg();
    //fill Data part one
    let dataGraph = {
      labels: [
        "Tratamiento",
        "Explotación",
        "Mitigación",
        "Transferencia",
        "Evasión",
        "Sin evaluar",
      ],
      datasets: [
        {
          label: "Low level",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#28a745",
        },
        {
          label: "Medium level",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#ffc107",
        },
        {
          label: "High level",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#dc3545",
        },
      ],
    };
    //fill Data for graph
    for (const riskTreatment of data.risks_category) {
      let sumRisks = [0, 0, 0];
      for (const risk of riskTreatment.Risks) {
        if (risk.nivel_riesgo > 0 && risk.nivel_riesgo <= 33.33) sumRisks[0]++;
        if (risk.nivel_riesgo > 33.33 && risk.nivel_riesgo <= 66.66)
          sumRisks[1]++;
        if (risk.nivel_riesgo > 66.66 && risk.nivel_riesgo <= 100)
          sumRisks[2]++;
      }
      dataGraph.datasets[0].data[riskTreatment.id - 1] = sumRisks[0];
      dataGraph.datasets[1].data[riskTreatment.id - 1] = sumRisks[1];
      dataGraph.datasets[2].data[riskTreatment.id - 1] = sumRisks[2];
    }

    let sumRisks = [0, 0, 0];
    for (const risk of data.risks_no_category) {
      if (risk.nivel_riesgo > 0 && risk.nivel_riesgo <= 33.33) sumRisks[0]++;
      if (risk.nivel_riesgo > 33.33 && risk.nivel_riesgo <= 66.66)
        sumRisks[1]++;
      if (risk.nivel_riesgo > 66.66 && risk.nivel_riesgo <= 100) sumRisks[2]++;
    }
    dataGraph.datasets[0].data[5] = sumRisks[0];
    dataGraph.datasets[1].data[5] = sumRisks[1];
    dataGraph.datasets[2].data[5] = sumRisks[2];

    return [data.metrics, dataGraph];
  }
  async function retrieveRiskDetails() {
    const data = await getRiskIndicatorDetail();

    return data;
  }
  async function retrieveRiskDetailsbyId(id) {
    const data = await getRiskIndicatorDetailbyId(id);

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
                  retrieveRiskDetailsbyId(ind.id).then((riskInd) => {
                    setIndicatorDetail(riskInd);
                  });
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
  const [riskGraphic, setRiskGraphic] = useState(null);
  const [openIndDetail, setOpenIndDetail] = useState(false);
  const [indicatorDetail, setIndicatorDetail] = useState(null);

  useEffect(() => {
    retrieveRiskDetails().then((data) => {
      setListIndicators(data);
      retrieveOrgMetrics().then((data) => {
        setOrgAnalisis(data[0]);
        setRiskGraphic(data[1]);
      });
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
              {orgAnalisis != null ? (
                <div className="analisis-dashboard">
                  <BarStackedGraph
                    data={riskGraphic}
                    graphTitle="Categoría de Riesgos"
                  />
                </div>
              ) : (
                <Placeholder
                  as="p"
                  animation="glow"
                  style={{ width: "703px", height: "304px" }}
                >
                  <Placeholder style={{ width: "703px", height: "304px" }} />
                </Placeholder>
              )}
              {orgAnalisis != null ? (
                <div className="analisis-medicion">
                  <MetricBox
                    topText="Evaluacion de Riesgos"
                    middleText={orgAnalisis.inventario_riesgo.toString()}
                    bottomText="Inventario Total"
                    order="top-bottom-middle"
                    status="secondary"
                    width="222px"
                    height="144px"
                    gap="0.5rem"
                  />
                  <MetricBox
                    topText="Nivel de Riesgo de la Organización"
                    middleText={convertToPercentage(orgAnalisis.evaluacion_org)}
                    bottomText="En la evaluación original"
                    order="top-bottom-middle"
                    status={statusPercentage(orgAnalisis.evaluacion_org)}
                    width="320px"
                    height="144px"
                    gap="0.5rem"
                  />
                  <MetricBox
                    topText="Tolerancia de Riesgo"
                    middleText={orgAnalisis.inventario_excedido.toString()}
                    bottomText="Riesgos Excedidos"
                    order="top-bottom-middle"
                    status={
                      orgAnalisis.inventario_excedido > 0 ? "danger" : "success"
                    }
                    width="222px"
                    height="144px"
                    gap="0.5rem"
                  />
                  <MetricBox
                    topText="Nivel de Riesgo de la Organización"
                    middleText={convertToPercentage(
                      orgAnalisis.nivel_riesgo_org
                    )}
                    bottomText="En la actualidad"
                    order="top-bottom-middle"
                    status={statusPercentage(orgAnalisis.nivel_riesgo_org)}
                    width="320px"
                    height="144px"
                    gap="0.5rem"
                  />
                </div>
              ) : (
                <div className="analisis-medicion">
                  <Placeholder
                    as="p"
                    animation="glow"
                    style={{ width: "222px", height: "144px" }}
                  >
                    <Placeholder style={{ width: "222px", height: "144px" }} />
                  </Placeholder>
                  <Placeholder
                    as="p"
                    animation="glow"
                    style={{ width: "320px", height: "144px" }}
                  >
                    <Placeholder style={{ width: "320px", height: "144px" }} />
                  </Placeholder>
                  <Placeholder
                    as="p"
                    animation="glow"
                    style={{ width: "222px", height: "144px" }}
                  >
                    <Placeholder style={{ width: "222px", height: "144px" }} />
                  </Placeholder>
                  <Placeholder
                    as="p"
                    animation="glow"
                    style={{ width: "320px", height: "144px" }}
                  >
                    <Placeholder style={{ width: "320px", height: "144px" }} />
                  </Placeholder>
                </div>
              )}
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
            {listIndicators != null ? (
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
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" variant="primary" size="lg" />
              </div>
            )}
          </div>
        </MainContainer>
        <Modals
          openModal={openIndDetail}
          setOpenModal={setOpenIndDetail}
          title={`Detalle del Indicador de Riesgo ${indicatorDetail?.codigo}`}
          size="xl"
          body={modalIndDetail(indicatorDetail)}
        />
      </div>
    </>
  );
}

export default Risk_Analisis;
