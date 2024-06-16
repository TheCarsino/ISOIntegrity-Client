import {
  faArrowLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";
import "./Org_Riesgos_Area.scss";

import Spinner from "react-bootstrap/esm/Spinner";
import MetricBox from "../../../components/Metrics/MetricBox";
import Modals from "../../../components/Modals/Modals";
import NavBar from "../../../components/NavBar/NavBar";
import Helper from "../../../components/PopOvers/Helper";
import { URL_ORGANIZACION_RIESGOS } from "../../../config";
import {
  colorBackgroundPercentage,
  colorRiskText,
  convertToPercentage,
  statusImpact,
  statusPercentage,
} from "../../../hooks/ColorCases";
import { getProcessRisksbyUnitAreaId } from "../../../services/unitarea.services";

function modalRiskDetail(selectedRisk) {
  return (
    <div className="modal-newgrouped-body">
      {selectedRisk != null && (
        <>
          <div className="risk-metrics">
            <MetricBox
              topText="Casos de Riesgo"
              middleText={selectedRisk.total_whistlecases}
              bottomText="Divulgación de irregularidades"
              status="secondary"
              width="224px"
              gap="0rem"
            />
            <MetricBox
              topText="Casos de Riesgo"
              middleText={selectedRisk.total_factorcases}
              bottomText="Factores de evaluación riesgos"
              status="secondary"
              width="224px"
              gap="0rem"
            />
            <MetricBox
              topText="Nivel de Riesgo"
              middleText={convertToPercentage(selectedRisk.nivel_riesgo)}
              bottomText="Relaciona casos reportados y severidad"
              status={statusPercentage(selectedRisk.nivel_riesgo)}
              width="274px"
              gap="0rem"
            />
          </div>
          <Form style={{ width: "100%" }}>
            <div className="risk-details">
              <h5 className="text-secondary">
                <b>Información del Riesgo</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-6"
                    controlId="formGridTratamiento"
                  >
                    <Form.Label>Tratamiento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={
                        selectedRisk.RiskTreatment != null
                          ? selectedRisk.RiskTreatment.nombre
                          : "Sin evaluar"
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-md-6"
                    controlId="formGridindicador"
                  >
                    <Form.Label>Indicador de Riesgo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedRisk.RiskIndicator.codigo} - ${selectedRisk.escala_indicador}% del total`}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group
                    as={Col}
                    className="col-md-4"
                    controlId="formGridProbabilidad"
                  >
                    <Form.Label>Probabilidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      readOnly
                      value={`${selectedRisk.probabilidad} de 10`}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-md-4"
                    controlId="formGridImpacto"
                  >
                    <Form.Label>Impacto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      readOnly
                      value={`${selectedRisk.impacto} de 10`}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-4"
                    controlId="formGridSeveridad"
                  >
                    <Form.Label>Severidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      readOnly
                      value={`${selectedRisk.severidad_riesgo} de 10`}
                    />
                    <Form.Text>Cálculo de Probabilidad x Impacto</Form.Text>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridNombre"
                  >
                    <Form.Label>Nombre del Riesgo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={selectedRisk.nombre}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridDescripcion"
                  >
                    <Form.Label>Descripcion del Riesgo</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese descripción del riesgo"
                      readOnly
                      value={selectedRisk.descripcion}
                    />
                  </Form.Group>
                </Row>
              </div>
              <div className="risk-details">
                <h5 className="text-secondary">
                  <b>Justificación y Detalles del Riesgo</b>
                </h5>
                <div className="container-form-controls">
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridSintomas"
                    >
                      <Form.Label>Síntomas del Riesgo</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese sintomas del riesgo"
                        readOnly
                        value={selectedRisk.sintomas}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridCausas"
                    >
                      <Form.Label>Causas del Riesgo</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese causas del riesgo"
                        readOnly
                        value={selectedRisk.causas}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridPlan"
                    >
                      <Form.Label>Plan de Acción</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese plan de acción del riesgo"
                        readOnly
                        value={selectedRisk.plan_accion}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridResponsables"
                    >
                      <Form.Label>Responsables Encargados</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese lista de responsables encargados del control del riesgo"
                        readOnly
                        value={selectedRisk.responsables_encargados}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridEspecificaciones"
                    >
                      <Form.Label>Especificaciones de Controles</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Ingrese las especificaciones relacionadas a los controles aplicados"
                        readOnly
                        value={selectedRisk.especificacion}
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}

function Org_Riesgos_Area() {
  async function retrieveDetailedProcessforUnit(id) {
    const data = await getProcessRisksbyUnitAreaId(id);

    return data;
  }

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
                <b>Irregularidades:</b> {risk.total_whistlecases}
              </p>
              <p className="text-primary">
                <b>Factores:</b> {risk.total_factorcases}
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
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => {
                  setOpenRiskDetail(true);
                  setSelectedRisk(risk);
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
    }

    return listRisk;
  };

  const fillProcesos = (listProcesos) => {
    let renderProcesos = [];

    listProcesos.forEach((proceso) => {
      renderProcesos.push({
        header: (
          <div className="lista-procesos">
            <div className="lista-procesos-item1">
              <p className="text-primary header-text">
                <b>{proceso.id}</b>
              </p>
            </div>
            <div className="lista-procesos-item2">
              <p className="text-primary header-text">{proceso.codigo}</p>
            </div>
            <div className="lista-procesos-item3 header-text">
              <p className="text-primary">{proceso.nombre}</p>
              <p className="text-success ">Tiene controles antisoborno</p>
            </div>
            <div className="lista-procesos-item4 header-text">
              <p className="text-primary">{`Total: ${proceso.totalRisk} riesgos`}</p>
              <p
                className={colorRiskText(
                  proceso.totalExceedRisk,
                  proceso.totalRisk
                )}
              >{`${proceso.totalExceedRisk} exceden el nivel de riesgo bajo`}</p>
            </div>
            <div
              className={`lista-procesos-item5 header-text ${colorBackgroundPercentage(
                proceso.nivel_riesgo
              )}`}
            >
              <h5 className="text-white text-center">
                {convertToPercentage(proceso.nivel_riesgo)}
              </h5>
            </div>
          </div>
        ),
        hasBody: proceso.Risks.length > 0,
        body: (
          <div className="accordion-lista-body">
            <div className="procesos-riesgos-header">
              <h5 className="text-secondary">
                <b>Lista de Riesgos</b>
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
                  <div style={{ width: "42px" }}></div>
                </div>
              }
              listItems={fillRiskList(proceso.Risks)}
              overrideColor="override-gray"
            />
          </div>
        ),
      });
    });

    return renderProcesos;
  };

  const navigate = useNavigate();
  const receivedData = useLocation().state;

  const [openRiskDetail, setOpenRiskDetail] = useState(false);
  const [process, setProcess] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const handleUnitAreaRisk = () => {
    navigate(`${URL_ORGANIZACION_RIESGOS}`);
  };

  useEffect(() => {
    if (receivedData == null) navigate(`${URL_ORGANIZACION_RIESGOS}`);
    else {
      retrieveDetailedProcessforUnit(receivedData.id).then(
        (retrieveProcess) => {
          setProcess(retrieveProcess);
        }
      );
    }
  }, []);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer
          title={`Riesgos por ${
            receivedData != null && receivedData?.esArea ? "Área" : "Unidad"
          } Organizacional`}
        >
          <div className="unidad-desc">
            <div className="header-display">
              <Button
                onClick={() => handleUnitAreaRisk()}
                variant="outline-primary"
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{
                      fontSize: "1.25rem",
                    }}
                  />
                  Regresar
                </div>
              </Button>
              <h4 className="text-primary">
                <b>{`${receivedData != null && receivedData?.nombre} - ${
                  receivedData != null && receivedData?.codigo
                }`}</b>
              </h4>
            </div>
            <div className="descripcion-medicion">
              <p className="text-dark" style={{ width: "562px" }}>
                {receivedData?.descripcion}
              </p>
              <MetricBox
                topText="Total de Riesgos"
                middleText={receivedData != null ? receivedData.totalRisk : 0}
                bottomText={"Cantidad total de riesgos \n\0"}
                order="top-bottom-middle"
                status="secondary"
                width="224px"
                gap="0.5rem"
              />
              <MetricBox
                topText="Riesgos Excedidos"
                middleText={
                  receivedData != null ? receivedData.totalExceedRisk : 0
                }
                bottomText="Total de riesgos que presentan un nivel de riesgo mayor al bajo"
                order="top-bottom-middle"
                status={
                  receivedData != null
                    ? receivedData?.totalExceedRisk > 0
                      ? "danger"
                      : "success"
                    : "dark"
                }
                width="224px"
                gap="0.5rem"
              />
              <MetricBox
                topText="Nivel de Riesgo"
                middleText={convertToPercentage(
                  receivedData != null ? receivedData.nivel_riesgo : 0
                )}
                bottomText="Evaluación promedio del nivel de riesgo de los procesos"
                order="top-bottom-middle"
                status={statusPercentage(
                  receivedData != null ? receivedData.nivel_riesgo : 0
                )}
                width="224px"
                gap="0.5rem"
              />
            </div>
          </div>
          <div className="accordion-procesos">
            <div className="unidad-procesos-header">
              <h5 className="text-primary">
                <b>Lista de Procesos</b>
              </h5>
            </div>
            {process != null ? (
              <>
                <div className="accordion-procesos-header">
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
                    style={{ width: "677px" }}
                  >
                    <b>Nombre</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "225px" }}
                  >
                    <b>Mediciones</b>
                  </h6>
                  <div
                    style={{ width: "156px", gap: "10px" }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Helper body="proceso"></Helper>
                    <h6 className="text-primary">
                      <b>Nivel Riesgo</b>
                    </h6>
                  </div>
                </div>
                <AccordionBox
                  noPadding={true}
                  accordionItems={fillProcesos(process)}
                  overrideBorders={true}
                  overrideColor="override-white"
                ></AccordionBox>
              </>
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
          openModal={openRiskDetail}
          setOpenModal={setOpenRiskDetail}
          title="Detalle del Riesgo - PRTR001"
          size="lg"
          body={modalRiskDetail(selectedRisk)}
        />
      </div>
    </>
  );
}

export default Org_Riesgos_Area;
