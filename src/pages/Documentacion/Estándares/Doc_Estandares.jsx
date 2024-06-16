import { useState, useEffect } from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Doc_Estandares.scss";
import NavBar from "../../../components/NavBar/NavBar";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import Placeholder from "react-bootstrap/Placeholder";
import {
  getStandardRequirement,
  getRisksStandardRequirementId,
  linkRisktoStandardRequirement,
  unlinkRisktoStandardRequirement,
} from "../../../services/standardrequirement.services";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faArrowRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import MetricBox from "../../../components/Metrics/MetricBox";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  colorBackgroundPercentage,
  convertToPercentage,
  statusImpact,
  statusImpactText,
  statusPercentage,
} from "../../../hooks/ColorCases";
import Modals from "../../../components/Modals/Modals";
import { getArea, getUnitAreabyAreaId } from "../../../services/area.services";
import { getProcessbyUnitAreaId } from "../../../services/unitarea.services";
import { getRiskbyProcessId } from "../../../services/process.services";
import Helper from "../../../components/PopOvers/Helper";

function modalLinkDetail(selectedRisk) {
  return (
    <div className="modal-detailrisk-body">
      {selectedRisk != null && (
        <>
          <div className="risk-metrics">
            <MetricBox
              topText="Casos de Riesgo"
              middleText={selectedRisk.total_whistlecases.toString()}
              bottomText="Divulgación de irregularidades"
              status="secondary"
              width="224px"
              gap="0rem"
            />
            <MetricBox
              topText="Casos de Riesgo"
              middleText={selectedRisk.total_factorcases.toString()}
              bottomText="Factores de evaluación riesgos"
              status="secondary"
              width="224px"
              gap="0rem"
            />
            <MetricBox
              topText="Nivel de Riesgo"
              middleText={convertToPercentage(
                selectedRisk.nivel_riesgo
              ).toString()}
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
                    controlId="formGridNombArea"
                  >
                    <Form.Label>Nombre del Área</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedRisk.Process.UnitArea.Area.codigo} - ${selectedRisk.Process.UnitArea.Area.nombre}`}
                    />
                  </Form.Group>
                </Row>
                {!selectedRisk.Process.UnitArea.es_area && (
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridNombUnidad"
                    >
                      <Form.Label>Nombre de la Unidad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        readOnly
                        value={`${selectedRisk.Process.UnitArea.codigo} - ${selectedRisk.Process.UnitArea.nombre}`}
                      />
                    </Form.Group>
                  </Row>
                )}
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridNombProceso"
                  >
                    <Form.Label>
                      Nombre del Proceso
                      {selectedRisk.Process.UnitArea.es_area
                        ? " asociado al Área"
                        : " asociado a la Unidad"}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedRisk.Process.codigo} - ${selectedRisk.Process.nombre}`}
                    />
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
function modalNewLink(
  newLink,
  setNewLink,
  alertAreas,
  alertUnitAreas,
  alertProcess,
  alertRisk,
  selectedArea,
  setSelectedArea,
  selectedUnitArea,
  setSelectedUnitArea,
  selectedProcess,
  setSelectedProcess
) {
  return (
    <div className="modal-alert-body">
      {newLink != null && (
        <Form style={{ width: "100%" }}>
          <div className="container-form-controls">
            {alertAreas != null && (
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-3"
                  controlId="formGridCodArea"
                >
                  <Form.Label>Código del Área</Form.Label>
                  <Form.Select
                    value={selectedArea != null ? selectedArea : -1}
                    onChange={(e) => setSelectedArea(parseInt(e.target.value))}
                  >
                    <option key={`default`} value={-1}>
                      -
                    </option>
                    {alertAreas.map((area) => (
                      <option key={`area-${area.id}`} value={area.id}>
                        {area.codigo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-md-9"
                  controlId="formGridNombArea"
                >
                  <Form.Label>Nombre del Área</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    readOnly
                    value={
                      selectedArea != -1
                        ? alertAreas[
                            alertAreas.findIndex(
                              (area) => area.id === selectedArea
                            )
                          ].nombre
                        : ""
                    }
                  />
                </Form.Group>
              </Row>
            )}
            {alertUnitAreas != null && alertUnitAreas.length > 0 && (
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-3"
                  controlId="formGridCodUnidad"
                >
                  <Form.Label>Código de la Unidad</Form.Label>
                  <Form.Select
                    value={selectedUnitArea != null ? selectedUnitArea : -1}
                    onChange={(e) =>
                      setSelectedUnitArea(parseInt(e.target.value))
                    }
                  >
                    <option key={`default`} value={-1}>
                      -
                    </option>
                    {alertUnitAreas.map((unit) => (
                      <option key={`unit-${unit.id}`} value={unit.id}>
                        {unit.codigo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-md-9"
                  controlId="formGridNombUnidad"
                >
                  <Form.Label>Nombre de la Unidad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    readOnly
                    value={
                      selectedUnitArea != -1
                        ? alertUnitAreas[
                            alertUnitAreas.findIndex(
                              (unit) => unit.id === selectedUnitArea
                            )
                          ].nombre
                        : ""
                    }
                  />
                </Form.Group>
                <Form.Text>
                  En caso el código de la unidad coincida con el del área, se
                  mostrarán la lista de procesos asociados al área.
                </Form.Text>
              </Row>
            )}
            {alertProcess != null && alertProcess.length > 0 && (
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-3"
                  controlId="formGridCodProcess"
                >
                  <Form.Label>Código del Proceso</Form.Label>
                  <Form.Select
                    value={selectedProcess != null ? selectedProcess : -1}
                    onChange={(e) =>
                      setSelectedProcess(parseInt(e.target.value))
                    }
                  >
                    <option key={`default`} value={-1}>
                      -
                    </option>
                    {alertProcess.map((process) => (
                      <option key={`process-${process.id}`} value={process.id}>
                        {process.codigo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-md-9"
                  controlId="formGridNombUnidad"
                >
                  <Form.Label>
                    Nombre del Proceso
                    {alertProcess != null &&
                      selectedProcess != -1 &&
                      (alertProcess[
                        alertProcess.findIndex(
                          (process) => process.id === selectedProcess
                        )
                      ].es_area
                        ? " asociado al Área"
                        : " asociado a la Unidad")}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    readOnly
                    value={
                      selectedProcess != -1
                        ? alertProcess[
                            alertProcess.findIndex(
                              (process) => process.id === selectedProcess
                            )
                          ].nombre
                        : ""
                    }
                  />
                </Form.Group>
              </Row>
            )}
            {alertRisk != null && alertRisk.length > 0 && (
              <div>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-3"
                    controlId="formGridCodRisk"
                  >
                    <Form.Label>Código del Riesgo</Form.Label>
                    <Form.Select
                      value={newLink.risk_id != null ? newLink.risk_id : -1}
                      onChange={(e) =>
                        setNewLink({
                          ...newLink,
                          risk_id: parseInt(e.target.value),
                        })
                      }
                    >
                      <option key={`default`} value={-1}>
                        -
                      </option>
                      {alertRisk.map((risk) => (
                        <option key={`risk-${risk.id}`} value={risk.id}>
                          {risk.codigo}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-9"
                    controlId="formGridNombRisk"
                  >
                    <Form.Label>Nombre del Riesgo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={
                        alertRisk != null &&
                        alertRisk.length > 0 &&
                        newLink.risk_id != null &&
                        newLink.risk_id != -1
                          ? alertRisk[
                              alertRisk.findIndex(
                                (risk) => risk.id === newLink.risk_id
                              )
                            ] != null
                            ? alertRisk[
                                alertRisk.findIndex(
                                  (risk) => risk.id === newLink.risk_id
                                )
                              ].nombre
                            : ""
                          : ""
                      }
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridNombRisk"
                  >
                    <Form.Label>Descripción del Riesgo</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder=""
                      readOnly
                      value={
                        alertRisk != null &&
                        alertRisk.length > 0 &&
                        newLink.risk_id != null &&
                        newLink.risk_id != -1
                          ? alertRisk[
                              alertRisk.findIndex(
                                (risk) => risk.id === newLink.risk_id
                              )
                            ] != null
                            ? alertRisk[
                                alertRisk.findIndex(
                                  (risk) => risk.id === newLink.risk_id
                                )
                              ].descripcion
                            : ""
                          : ""
                      }
                    />
                  </Form.Group>
                </Row>
              </div>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}
function modalRemoveLink() {
  return (
    <div className="modal-alert-body">
      <h5 className="text-primary">
        <b>
          ¿Seguro de eliminar la asociación entre el riesgo y el requisito del
          estándar?
        </b>
      </h5>
      <h6 className="text-dark">
        Este registro puede ser asociado de nuevo para futuras evaluaciones. Sin
        embargo, este riesgo no se mantiene en el historial de riesgos asociados
        en el requisito del estándar.
      </h6>
    </div>
  );
}

function Doc_Estandares() {
  async function retrieveAreaList(id) {
    const data = await getArea(id);

    return data;
  }
  async function retrieveUnitbyAreaList(id) {
    const data = await getUnitAreabyAreaId(id);

    return data;
  }
  async function retrieveProcessbyUnitList(id) {
    const data = await getProcessbyUnitAreaId(id);

    return data;
  }
  async function retrieveRiskbyProcessList(id) {
    const data = await getRiskbyProcessId(id);

    return data;
  }
  async function retrieveStdReqs() {
    const data = await getStandardRequirement();

    return data;
  }
  async function retrieveRiskbyStdReq(id) {
    const data = await getRisksStandardRequirementId(id);

    return data;
  }
  async function retrieveLinkRisktoReq(body) {
    const data = await linkRisktoStandardRequirement(body);

    return data;
  }
  async function retrieveUnLinkRisktoReq(id) {
    const data = await unlinkRisktoStandardRequirement(id);

    return data;
  }

  const [listStandardsReqs, setListStandardsReqs] = useState(null);
  const [selectedReq, setSelectedReq] = useState(null);
  const [listRiskperReq, setListRiskperReq] = useState(null);
  const [analisisMetrics, setAnalisisMetrics] = useState(null);
  const [newLink, setNewLink] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);

  const [alertAreas, setAlertAreas] = useState(null);
  const [alertUnitAreas, setAlertUnitAreas] = useState(null);
  const [alertProcess, setAlertProcess] = useState(null);
  const [alertRisk, setAlertRisk] = useState(null);
  const [selectedArea, setSelectedArea] = useState(-1);
  const [selectedUnitArea, setSelectedUnitArea] = useState(-1);
  const [selectedProcess, setSelectedProcess] = useState(-1);

  const fillStdReqs = (listStandardsReqs, selectedReq, setSelectedReq) => {
    let mappedList = [];

    listStandardsReqs.forEach((req) => {
      mappedList.push({
        key: req.id.toString(),
        content: (
          <div className="lista-requirements">
            <div className="lista-requirements-item1">
              <p
                className={`${
                  selectedReq?.id == req.id ? "text-secondary" : "text-primary"
                } header-text`}
              >
                {req.nombre}
              </p>
            </div>
            <div className="lista-requirements-item2">
              <Button
                onClick={() => {
                  setSelectedReq(req);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={selectedReq?.id == req.id ? faArrowLeft : faArrowRight}
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

  const fillListaRisk = (risks) => {
    let listRisks = [];

    for (const risk of risks) {
      listRisks.push({
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
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => {
                  setSelectedLink(risk);
                  setOpenRemoveLink(true);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => {
                  setSelectedLink(risk);
                  setOpenLinkDetail(true);
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

    return listRisks;
  };

  const handleLinkRisktoReq = (
    newLink,
    setNewLink,
    listRiskperReq,
    setListRiskperReq,
    analisisMetrics,
    setAnalisisMetrics
  ) => {
    if (
      newLink.std_req_id == null ||
      newLink.std_req_id == -1 ||
      newLink.risk_id == null ||
      newLink.risk_id == -1
    )
      return;
    if (listRiskperReq.some((risk) => risk.id == newLink.risk_id)) return;
    retrieveLinkRisktoReq(newLink).then(() => {
      setNewLink(null);
      retrieveRiskbyStdReq(newLink.std_req_id).then((risks) => {
        setListRiskperReq(risks[0]);
        setAnalisisMetrics(risks[1]);
      });
    });
  };
  const handleUnLinkRisktoReq = (
    selectedLink,
    setSelectedLink,
    listRiskperReq,
    setListRiskperReq,
    analisisMetrics,
    setAnalisisMetrics
  ) => {
    retrieveUnLinkRisktoReq(selectedLink.risk_stdreq_id).then(() => {
      setSelectedLink(null);
      retrieveRiskbyStdReq(selectedLink.std_req_id).then((risks) => {
        setListRiskperReq(risks[0]);
        setAnalisisMetrics(risks[1]);
      });
    });
  };

  useEffect(() => {
    retrieveStdReqs().then((reqs) => {
      setListStandardsReqs(reqs);
      retrieveAreaList().then((areas) => {
        setAlertAreas(areas);
      });
    });
  }, []);

  useEffect(() => {
    if (selectedReq != null)
      retrieveRiskbyStdReq(selectedReq.id).then((risks) => {
        setListRiskperReq(risks[0]);
        setAnalisisMetrics(risks[1]);
      });
  }, [selectedReq]);

  useEffect(() => {
    if (selectedArea != -1) {
      retrieveUnitbyAreaList(selectedArea).then((units) => {
        setAlertUnitAreas(units);
      });
    } else {
      setAlertUnitAreas(null);
    }
    setSelectedProcess(-1);
    setSelectedUnitArea(-1);
    setAlertProcess(null);
    setAlertRisk(null);
  }, [selectedArea]);

  useEffect(() => {
    if (selectedUnitArea != -1) {
      retrieveProcessbyUnitList(selectedUnitArea).then((process) => {
        setAlertProcess(process);
      });
    } else {
      setAlertProcess(null);
    }
    setSelectedProcess(-1);
    setAlertRisk(null);
  }, [selectedUnitArea]);

  useEffect(() => {
    if (selectedProcess != -1) {
      retrieveRiskbyProcessList(selectedProcess).then((risk) => {
        setAlertRisk(risk);
      });
    } else {
      setAlertRisk(null);
    }
  }, [selectedProcess]);

  const [openLinkDetail, setOpenLinkDetail] = useState(null);
  const [openLinkRisk, setOpenLinkRisk] = useState(null);
  const [openRemoveLink, setOpenRemoveLink] = useState(null);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Gestión de Estándares y Normativas">
          <div className="std-main">
            <div className="std-header">
              <div className="header-display">
                <h4 className="text-primary">
                  <b>Lista de Requisitos por Estándar</b>
                </h4>
              </div>
              {/* Puede cambiar en el futuro --> por AccordionBox */}
              <div className="accordion-std">
                {listStandardsReqs != null ? (
                  <ListTableBox
                    noPadding={true}
                    header={
                      <div className="accordion-std-header">
                        <h5 className="text-primary">
                          <b>ISO 37001 - Sistema de Gestión Antisoborno</b>
                        </h5>
                      </div>
                    }
                    listItems={fillStdReqs(
                      listStandardsReqs,
                      selectedReq,
                      setSelectedReq
                    )}
                    overrideColor="override-white"
                    maxHeight="576px"
                  />
                ) : (
                  <Placeholder
                    as="p"
                    animation="glow"
                    style={{ width: "100%", height: "640px" }}
                  >
                    <Placeholder style={{ width: "100%", height: "640px" }} />
                  </Placeholder>
                )}
              </div>
            </div>
            <div className="std-body">
              <div className="header-display">
                <h4 className="text-primary">
                  <b>Lista de Riesgos Asociados</b>
                </h4>
              </div>
              {listRiskperReq != null &&
              listRiskperReq.length > 0 &&
              analisisMetrics != null ? (
                <div className="req-risk-body">
                  <div className="analisis-medicion">
                    <MetricBox
                      topText="Total de Riesgos"
                      middleText={analisisMetrics.reqInventory.toString()}
                      bottomText={"Cantidad total de riesgos\n\0"}
                      order="top-bottom-middle"
                      status="secondary"
                      width="224px"
                      height="144px"
                      gap="0.5rem"
                    />
                    <MetricBox
                      topText="Riesgos Excedidos"
                      middleText={analisisMetrics.reqInventoryExc.toString()}
                      bottomText="Total de riesgos que presentan un nivel de riesgo mayor al bajo"
                      order="top-bottom-middle"
                      status={
                        analisisMetrics.reqInventoryExc > 0
                          ? "danger"
                          : "success"
                      }
                      width="224px"
                      height="144px"
                      gap="0.5rem"
                    />
                    <MetricBox
                      topText="Nivel de Riesgo Requisito"
                      middleText={convertToPercentage(
                        analisisMetrics.reqTotalRiskLevel
                      ).toString()}
                      bottomText="Evaluación promedio del nivel de riesgos para el requisito"
                      order="top-bottom-middle"
                      status={statusPercentage(
                        analisisMetrics.reqTotalRiskLevel
                      )}
                      width="224px"
                      height="144px"
                      gap="0.5rem"
                    />
                    <div className="button-group">
                      <Button
                        onClick={() => {
                          setNewLink({
                            risk_id: null,
                            std_req_id: selectedReq.id,
                          });
                          setOpenLinkRisk(true);
                        }}
                        style={{ width: "240px" }}
                        size="md"
                        variant="primary"
                      >
                        Asociar Nuevo Riesgo
                      </Button>
                    </div>
                  </div>
                  <div className="lista-body-links">
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
                          <div style={{ width: "84px" }}></div>
                        </div>
                      }
                      listItems={fillListaRisk(listRiskperReq)}
                      overrideColor="override-white"
                      maxHeight="632px"
                    />
                  </div>
                </div>
              ) : listRiskperReq?.length <= 0 ? (
                <div className="no-risk-allowed">
                  <p className="text-primary text-center">
                    Este requisito del estándar ISO 37001:2016 no presenta
                    riesgos asociados.
                  </p>
                  <Button
                    onClick={() => {
                      setNewLink({ risk_id: null, std_req_id: selectedReq.id });
                      setOpenLinkRisk(true);
                    }}
                    style={{ width: "240px" }}
                    size="md"
                    variant="primary"
                  >
                    Asociar Nuevo Riesgo
                  </Button>
                </div>
              ) : (
                <div className="no-req-selected">
                  <p className="text-primary text-center">
                    Debe elegir un requisito del estándar ISO 37001:2016 para
                    poder revisar los resultados de su respectivo análisis de
                    riesgo
                  </p>
                </div>
              )}
            </div>
          </div>
        </MainContainer>
        <Modals
          openModal={openLinkRisk}
          setOpenModal={setOpenLinkRisk}
          title={`Asociar Nuevo Riesgo al Requisito`}
          size="lg"
          footer={["Guardar", "Cerrar"]}
          body={modalNewLink(
            newLink,
            setNewLink,
            alertAreas,
            alertUnitAreas,
            alertProcess,
            alertRisk,
            selectedArea,
            setSelectedArea,
            selectedUnitArea,
            setSelectedUnitArea,
            selectedProcess,
            setSelectedProcess
          )}
          handleConfirm={() => {
            setOpenLinkRisk(false);
            setAlertUnitAreas(null);
            setAlertProcess(null);
            setAlertRisk(null);
            setSelectedProcess(-1);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            handleLinkRisktoReq(
              newLink,
              setNewLink,
              listRiskperReq,
              setListRiskperReq,
              analisisMetrics,
              setAnalisisMetrics
            );
          }}
          handleCancel={() => {
            setOpenLinkRisk(false);
            setAlertUnitAreas(null);
            setAlertProcess(null);
            setAlertRisk(null);
            setSelectedProcess(-1);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            setNewLink(false);
          }}
          handleClose={() => {
            setOpenLinkRisk(false);
            setAlertUnitAreas(null);
            setAlertProcess(null);
            setAlertRisk(null);
            setSelectedProcess(-1);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            setNewLink(false);
          }}
        />
        <Modals
          openModal={openLinkDetail}
          setOpenModal={setOpenLinkDetail}
          title={`Detalle del Riesgo - ${selectedLink?.codigo}`}
          size="lg"
          body={modalLinkDetail(selectedLink)}
        />
        <Modals
          openModal={openRemoveLink}
          setOpenModal={setOpenRemoveLink}
          title={`Eliminación de la Asociación del Riesgo ${selectedLink?.codigo}`}
          footer={["Confirmar", "Cancelar"]}
          size="lg"
          body={modalRemoveLink(selectedLink)}
          handleConfirm={() => {
            setOpenRemoveLink(false);
            handleUnLinkRisktoReq(
              selectedLink,
              setSelectedLink,
              listRiskperReq,
              setListRiskperReq,
              analisisMetrics,
              setAnalisisMetrics
            );
          }}
        />
      </div>
    </>
  );
}

export default Doc_Estandares;
