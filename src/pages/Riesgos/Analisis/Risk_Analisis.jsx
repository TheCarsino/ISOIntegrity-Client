import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Placeholder from "react-bootstrap/Placeholder";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/esm/Button";
import BarStackedGraph from "../../../components/Graphs/BarStackedGraph";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";
import MetricBox from "../../../components/Metrics/MetricBox";
import Modals from "../../../components/Modals/Modals";
import NavBar from "../../../components/NavBar/NavBar";
import Helper from "../../../components/PopOvers/Helper";
import {
  colorBackgroundPercentage,
  colorTextPercentage,
  convertToPercentage,
  statusImpact,
  statusPercentage,
} from "../../../hooks/ColorCases";
import {
  getGeneralRiskinOrg,
  getRiskIndicatorDetail,
  getRiskIndicatorDetailbyId,
} from "../../../services/riskindicator.services";
import "./Risk_Analisis.scss";

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
                <b>Indicador de Riesgo:</b> {risk.RiskIndicator?.codigo} -{" "}
                {risk.impacto}% del total
              </p>
            </div>
            <div className="lista-riesgos-item4-2 header-text">
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
                <b>Probabilidad:</b> {risk.probabilidad} de 10
              </p>
              <p className="text-primary">
                <b>Impacto:</b> {risk.impacto} de 10
              </p>
              <hr style={{ margin: "0" }} />
              <p className={statusImpact(risk.probabilidad, risk.impacto)}>
                <b>Severidad: </b>
                {risk.severidad_riesgo * 10} de 100
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

  const fillEscalas = (escalas, resultado, fechaResultado) => {
    return (
      <div className="text-primary form-text-alike">
        {escalas.descripcion_e1 != "" && (
          <p>
            {`1. ${escalas.descripcion_e1}`}
            {resultado == 1 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
        {escalas.descripcion_e2 != "" && (
          <p>
            {`2. ${escalas.descripcion_e2}`}
            {resultado == 2 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
        {escalas.descripcion_e3 != "" && (
          <p>
            {`3. ${escalas.descripcion_e3}`}
            {resultado == 3 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
        {escalas.descripcion_e4 != "" && (
          <p>
            {`4. ${escalas.descripcion_e4}`}
            {resultado == 4 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
        {escalas.descripcion_e5 != "" && (
          <p>
            {`5. ${escalas.descripcion_e5}`}
            {resultado == 5 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
        {escalas.descripcion_e6 != "" && (
          <p>
            {`6. ${escalas.descripcion_e6}`}
            {resultado == 6 && (
              <small className="text-secondary">
                {" ("}Resultado del último cuestionario. Fecha:{" "}
                {format(fechaResultado, "dd/MM/yyyy")}
                {")"}
              </small>
            )}
          </p>
        )}
      </div>
    );
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
                topText="Casos Reportados"
                middleText={riskIndicator.casos_reportados_irreg.toString()}
                bottomText="Por irregularidades"
                status="secondary"
                width="172px"
                gap="0rem"
              />
              <MetricBox
                topText="Casos Reportados"
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
                bottomText={`Resultado: ${
                  riskIndicator.Escalas.SurveyResult != null
                    ? riskIndicator.Escalas.SurveyResult.escala_seleccion
                    : 0
                } de ${riskIndicator.escala} escalas`}
                status={statusPercentage(riskIndicator.resultado_cuestionario)}
                width="262px"
                gap="0rem"
              />
              <MetricBox
                topText="Nivel de Riesgo Organizacional"
                middleText={convertToPercentage(riskIndicator.nivel_riesgo)}
                bottomText="Relacionado con los riesgos actuales"
                status={statusPercentage(riskIndicator.nivel_riesgo)}
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

                  {fillEscalas(
                    riskIndicator.Escalas.SurveyScale,
                    riskIndicator.Escalas.SurveyResult.escala_seleccion,
                    riskIndicator.Escalas.SurveyResult.fecha_creacion
                  )}
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
                  riskIndicator.Riesgos.length > 0 ? (
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
                            style={{ width: "110px" }}
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
                            style={{ width: "361px" }}
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
                            <b>Evaluación Riesgo</b>
                          </h6>
                          <h6
                            className="text-primary header-text"
                            style={{ width: "232px" }}
                          >
                            <b>Casos</b>
                          </h6>
                          <div
                            style={{ width: "156px", gap: "10px" }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Helper body="riesgo"></Helper>
                            <h6 className="text-primary">
                              <b>Nivel Riesgo</b>
                            </h6>
                          </div>
                        </div>
                      }
                      listItems={fillRiskList(riskIndicator.Riesgos)}
                      overrideColor="override-gray"
                    />
                  ) : (
                    riskIndicator.Riesgos.length <= 0 && (
                      <div className="no-risk">
                        <p className="text-primary text-center">
                          El indicador de riesgo seleccionado no presenta
                          riesgos que hayan sido previamente relacionados. Para
                          modificar los niveles de riesgo organizacional se
                          recomienda asociar nuevos riesgos con los distintos
                          factores presentados por el índice Bribery Risk Index
                          (BRI).
                        </p>
                      </div>
                    )
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
          label: "Nivel bajo %[1° tercio]",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#28a745",
        },
        {
          label: "Nivel medio % [2° tercio]",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: "#ffc107",
        },
        {
          label: "Nivel alto % [3° tercio]",
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
              <p className="text-primary">{`Resultado: ${
                ind.Escalas.SurveyResult
                  ? ind.Escalas.SurveyResult.escala_seleccion
                  : 0
              } de ${ind.escala} escalas`}</p>
            </div>
            <div className="lista-indicadores-item6 header-text">
              <p className="text-primary">
                <b>Riesgos asociados:</b> {ind.total_riesgos}
              </p>
              <p className="text-primary">
                <b>Total casos reportados:</b>{" "}
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
                <b>Análisis del Nivel de Riesgo de la Organización</b>
              </h4>
            </div>
            <div className="analisis-content">
              {orgAnalisis != null ? (
                <div className="analisis-dashboard">
                  <BarStackedGraph
                    data={riskGraphic}
                    graphTitle="Análisis de Nivel de Riesgo Según el Tratamiento de los Riesgos"
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
                    bottomText={"Cantidad total de riesgos \n\0"}
                    order="top-bottom-middle"
                    status="secondary"
                    width="222px"
                    height="144px"
                    gap="0.5rem"
                  />
                  <MetricBox
                    topText="Nivel de Riesgo del Índice BRI"
                    middleText={convertToPercentage(orgAnalisis.evaluacion_org)}
                    bottomText="Evaluación resultante de de los últimos resultados del cuestionario asociados a los indicadores "
                    order="top-bottom-middle"
                    status={statusPercentage(orgAnalisis.evaluacion_org)}
                    width="320px"
                    height="144px"
                    gap="0.5rem"
                  />
                  <MetricBox
                    topText="Riesgos Excedidos"
                    middleText={orgAnalisis.inventario_excedido.toString()}
                    bottomText="Total de riesgos que presentan un nivel de riesgo mayor al bajo"
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
                    bottomText="Evaluación que considera los resultados y riesgos asociados de los indicadores"
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
              <h4 className="text-primary">
                <b>Lista de Indicadores de Riesgos</b>
              </h4>
            </div>
            <p>
              Los indicadores de riesgo permiten cuantificar y evaluar el riesgo
              de soborno en la organización. El <b>Bribery Risk Index (BRI)</b>{" "}
              incluye una serie de 44 indicadores diseñados para evaluar
              aspectos clave en relación a la <b>norma ISO 37001:2016</b> como
              la naturaleza de la organización, la debida diligencia y la
              relación con las partes interesadas. Junto con la gestión de
              riesgos, que se evalúa conforme a la metodología establecida de la{" "}
              <b>norma ISO 31000:2018</b>, se manejarán de manera eficiente los{" "}
              <b>
                <u>niveles de riesgo</u>
              </b>{" "}
              dentro de la organización.
            </p>
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
                      style={{ width: "224px" }}
                    >
                      <b>Resultados Cuestionario</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "252px" }}
                    >
                      <b>Resumen de Riesgos</b>
                    </h6>
                    <div
                      style={{ width: "156px", gap: "10px" }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Helper body="indicador"></Helper>
                      <h6 className="text-primary">
                        <b>Nivel Riesgo</b>
                      </h6>
                    </div>
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
