import { useEffect, useState } from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Alertas.scss";
import NavBar from "../../../components/NavBar/NavBar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL_RIESGOS_ALERTAS_IRREGULARIDADES } from "../../../config";
import {
  faArrowRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Modals from "../../../components/Modals/Modals";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import { format } from "date-fns";
import {
  createReportFactorAlert,
  deleteReportFactorAlert,
  getReportFactorAlertbyUserId,
} from "../../../services/alert.services";
import { getArea, getUnitAreabyAreaId } from "../../../services/area.services";
import Spinner from "react-bootstrap/esm/Spinner";
import { getRiskbyProcessId } from "../../../services/process.services";
import { getProcessbyUnitAreaId } from "../../../services/unitarea.services";
import { useAuth } from "../../../hooks/AuthProvider";

function modalRemoveAlertFact() {
  return (
    <div className="modal-alert-body">
      <h5 className="text-primary">
        <b>
          ¿Seguro de eliminar el registro del factor de riesgo de soborno
          seleccionado?
        </b>
      </h5>
      <h6 className="text-dark">
        Ten en cuenta que al eliminar este registro de riesgo de soborno, la
        información asociada será permanentemente eliminada del sistema. Esto
        significa que no estará disponible para futuros análisis relacionados a
        la aplicación de controles que prevengan futuras situaciones de riesgos.
      </h6>
      <p className="text-secondary text-end">
        Esta acción es definitiva y no se puede deshacer.
      </p>
    </div>
  );
}
function modalAlertFactDetail(selectedAlert) {
  return (
    <div className="modal-alert-body">
      {selectedAlert != null && (
        <>
          <div className="alert-header">
            <img
              src="/assets/company-logo.png"
              className="d-inline-block align-text-top"
              style={{ height: "100%", width: "196px" }}
              alt="Company Logo"
            />
            <div className="alert-code-register">
              <Form.Group
                as={Col}
                className="col-md-4"
                controlId="formGridRegCodigo"
              >
                <Form.Label>Código de Registro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value={selectedAlert.ReportRiskFactor.codigo}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-4"
                controlId="formGridRegFecha"
              >
                <Form.Label>Fecha de Registro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value={format(
                    selectedAlert.ReportRiskFactor.fecha_registro,
                    "dd/MM/yyyy"
                  )}
                />
              </Form.Group>
            </div>
            <p className="text-dark">
              El formulario para registrar un nuevo factor de soborno será
              visualizado por todos los gestores de riesgos asociados al
              sistema. Este presentará relevancia en el cálculo de los niveles
              de riesgo de sobornos organizacional. Bajo esto, se establece el
              compromiso del llenado adecuado de los nuevos riesgos generados.
            </p>
          </div>
          <Form style={{ width: "100%" }}>
            <div className="alert-details">
              <h5 className="text-secondary">
                <b>Información Relacionada al Riesgo Presenciado</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridCodArea"
                  >
                    <Form.Label>Nombre del Área</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedAlert.Risk.Process.UnitArea.Area.codigo} - ${selectedAlert.Risk.Process.UnitArea.Area.nombre}`}
                    />
                  </Form.Group>
                </Row>
                {!selectedAlert.Risk.Process.UnitArea.es_area && (
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-12"
                      controlId="formGridCodUnidad"
                    >
                      <Form.Label>Nombre de la Unidad</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        readOnly
                        value={`${selectedAlert.Risk.Process.UnitArea.codigo} - ${selectedAlert.Risk.Process.UnitArea.nombre}`}
                      />
                    </Form.Group>
                  </Row>
                )}
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridCodProces"
                  >
                    <Form.Label>Nombre del Proceso</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedAlert.Risk.Process.codigo} - ${selectedAlert.Risk.Process.nombre}`}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridCodRisk"
                  >
                    <Form.Label>Nombre del Riesgo Asociado</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={`${selectedAlert.Risk.codigo} - ${selectedAlert.Risk.nombre}`}
                    />
                  </Form.Group>
                </Row>
              </div>
              <h5 className="text-secondary">
                <b>Información de la Divulgación</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridDescripcion"
                  >
                    <Form.Label>Descripción Corta</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={selectedAlert.ReportRiskFactor.descripcion_corta}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridDivulgacion"
                  >
                    <Form.Label>Divulgación</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "10rem" }}
                      placeholder="Incluya detalles de la persona involucrada, naturaleza de la alegación, dónde y cuándo se ha ocasionado la conducta."
                      readOnly
                      value={selectedAlert.ReportRiskFactor.detalle}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridAdicional"
                  >
                    <Form.Label>Información Adicional</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ height: "10rem" }}
                      placeholder="Información adicional que crea conveniente para la divulgación del reporte."
                      readOnly
                      value={
                        selectedAlert.ReportRiskFactor.informacion_adicional
                      }
                    />
                  </Form.Group>
                </Row>
              </div>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
function modalNewAlertFact(
  newFactor,
  setNewFactor,
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
      <div className="alert-header">
        <img
          src="/assets/company-logo.png"
          className="d-inline-block align-text-top"
          style={{ height: "100%", width: "196px" }}
          alt="Company Logo"
        />
        <div className="alert-code-register"></div>
        <p className="text-dark">
          El formulario para registrar un nuevo factor de soborno será
          visualizado por todos los gestores de riesgos asociados al sistema.
          Este presentará relevancia en el cálculo de los niveles de riesgo de
          sobornos organizacional. Bajo esto, se establece el compromiso del
          llenado adecuado de los nuevos riesgos generados.
        </p>
      </div>
      {newFactor != null && (
        <Form style={{ width: "100%" }}>
          <div className="alert-details">
            <h5 className="text-secondary">
              <b>Información Relacionada al Riesgo Presenciado</b>
            </h5>
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
                      onChange={(e) =>
                        setSelectedArea(parseInt(e.target.value))
                      }
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
                        <option
                          key={`process-${process.id}`}
                          value={process.id}
                        >
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
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-3"
                    controlId="formGridCodRisk"
                  >
                    <Form.Label>Código del Riesgo</Form.Label>
                    <Form.Select
                      value={newFactor.risk_id != null ? newFactor.risk_id : -1}
                      onChange={(e) =>
                        setNewFactor({
                          ...newFactor,
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
                        newFactor.risk_id != null &&
                        newFactor.risk_id != -1
                          ? alertRisk[
                              alertRisk.findIndex(
                                (risk) => risk.id === newFactor.risk_id
                              )
                            ] != null
                            ? alertRisk[
                                alertRisk.findIndex(
                                  (risk) => risk.id === newFactor.risk_id
                                )
                              ].nombre
                            : ""
                          : ""
                      }
                    />
                  </Form.Group>
                </Row>
              )}
            </div>
            <h5 className="text-secondary">
              <b>Información de la Divulgación</b>
            </h5>
            <div className="container-form-controls">
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridDescripcion"
                >
                  <Form.Label>Descripción Corta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={newFactor.descripcion_corta}
                    onChange={(e) => {
                      setNewFactor({
                        ...newFactor,
                        descripcion_corta: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridDivulgacion"
                >
                  <Form.Label>Detalle del reporte del caso</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "10rem" }}
                    placeholder="Incluya detalles de las personas involucradas, naturaleza de la alegación, dónde y cuándo se ha ocasionado la conducta."
                    value={newFactor.detalle}
                    onChange={(e) => {
                      setNewFactor({
                        ...newFactor,
                        detalle: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridAdicional"
                >
                  <Form.Label>Información Adicional</Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "10rem" }}
                    placeholder="Información adicional que crea conveniente para la divulgación del reporte."
                    value={newFactor.informacion_adicional}
                    onChange={(e) => {
                      setNewFactor({
                        ...newFactor,
                        informacion_adicional: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
}

function Risk_Alertas() {
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
  async function retrieveGetFactorAlert(id) {
    const data = await getReportFactorAlertbyUserId(id);

    return data;
  }
  async function retrieveCreateFactorAlert(body) {
    const data = await createReportFactorAlert(body);

    return data;
  }
  async function retrieveDeleteFactorAlert(id) {
    const data = await deleteReportFactorAlert(id);

    return data;
  }

  const { userData } = useAuth();
  const [alertList, setAlertList] = useState(null);
  const [selectedFactor, setSelectedFactor] = useState(null);
  const [newFactor, setNewFactor] = useState(null);

  const [alertAreas, setAlertAreas] = useState(null);
  const [alertUnitAreas, setAlertUnitAreas] = useState(null);
  const [alertProcess, setAlertProcess] = useState(null);
  const [alertRisk, setAlertRisk] = useState(null);
  const [selectedArea, setSelectedArea] = useState(-1);
  const [selectedUnitArea, setSelectedUnitArea] = useState(-1);
  const [selectedProcess, setSelectedProcess] = useState(-1);

  const fillAlertList = (alerts) => {
    let listAlerts = [];

    for (const alert of alerts) {
      listAlerts.push({
        key: alert.ReportRiskFactor.id.toString(),
        content: (
          <div className="lista-alerts">
            <div className="lista-alerts-item1">
              <p className="text-primary header-text">
                <b>{alert.ReportRiskFactor.id}</b>
              </p>
            </div>
            <div className="lista-alerts-item2 header-text">
              <p className="text-primary itemlist-text">
                {`${alert.ReportRiskFactor.User.nombres} ${
                  alert.ReportRiskFactor.User.apellidos != null &&
                  alert.ReportRiskFactor.User.apellidos
                }`}
              </p>
            </div>
            <div className="lista-alerts-item3 header-text">
              <p className="text-primary">
                Fecha:{" "}
                {format(alert.ReportRiskFactor.fecha_registro, "dd/MM/yyyy")}
              </p>
              <p className="text-primary">
                Codigo: {alert.ReportRiskFactor.codigo}
              </p>
            </div>
            <div className="lista-alerts-item5 header-text">
              <p className="text-primary itemlist-text">
                {`${alert.Risk.Process.UnitArea.codigo} - ${alert.Risk.Process.UnitArea.nombre}`}
              </p>
              <p
                className="text-secondary itemlist-text"
                style={{ maxHeight: "3rem" }}
              >
                {`${alert.Risk.codigo} - ${alert.Risk.nombre}`}
              </p>
            </div>
            <div className="lista-alerts-item4 header-text">
              <p className="text-primary">{alert.ReportRiskFactor.detalle}</p>
            </div>
            <div className="lista-alerts-item1">
              <Button
                onClick={() => {
                  setSelectedFactor(alert);
                  setOpenRemoveAlertFact(true);
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
            <div className="lista-alerts-item1">
              <Button
                onClick={() => {
                  setSelectedFactor(alert);
                  setOpenAlertFactDetail(true);
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

    return listAlerts;
  };

  const handleCreateFactor = (
    newFactor,
    setNewFactor,
    alertList,
    setAlertList
  ) => {
    if (
      newFactor.user_id == null ||
      newFactor.user_id == -1 ||
      newFactor.risk_id == null ||
      newFactor.risk_id == -1
    )
      return;
    retrieveCreateFactorAlert(newFactor).then(() => {
      setNewFactor(null);
      retrieveGetFactorAlert(userData.user_id).then((alerts) => {
        setAlertList(alerts);
      });
    });
  };
  const handleRemoveFactor = (
    selectedFactor,
    setSelectedFactor,
    alertList,
    setAlertList
  ) => {
    retrieveDeleteFactorAlert(selectedFactor.Report_FactorAlert.id).then(() => {
      setSelectedFactor(null);
      retrieveGetFactorAlert(userData.user_id).then((alerts) => {
        setAlertList(alerts);
      });
    });
  };

  useEffect(() => {
    if (userData != null)
      retrieveGetFactorAlert(userData.user_id).then((alerts) => {
        setAlertList(alerts);
        retrieveAreaList().then((areas) => {
          setAlertAreas(areas);
        });
      });
  }, [userData]);

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

  const [openNewAlertFact, setOpenNewAlertFact] = useState(false);
  const [openRemoveAlertFact, setOpenRemoveAlertFact] = useState(false);
  const [openAlertFactDetail, setOpenAlertFactDetail] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Alertas y Reportes para Evaluación de Riesgos">
          <Nav variant="tabs" defaultActiveKey="irregularidades">
            <Nav.Item>
              <Nav.Link
                key="irregularidades"
                href={URL_RIESGOS_ALERTAS_IRREGULARIDADES}
              >
                Divulgación de Irregularidades
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link active key="factores">
                Factores de Riesgo de Soborno
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="alertas-container">
            <h4 className="text-primary">
              <b>Reportes de Factores de Riesgos de Soborno</b>
            </h4>
            <p className="text-dark text-start">
              Esta sección permite a los gestores de la evaluación de riesgos de
              soborno en la organización (mediante la aplicación de la ISO 37001
              u otros estándares similares) el registro adecuado de factores
              críticos que pueden corresponder en situaciones de sobornos a
              nivel estructural. Si se identifica algún problema o situación
              preocupante, se puede informar mediante el siguiente formulario
              para que se tomen las medidas necesarias
            </p>
            <Button
              onClick={() => {
                setNewFactor({
                  risk_id: null,
                  user_id: userData?.user_id,
                  descripcion_corta: "",
                  detalle: "",
                  informacion_adicional: "",
                });
                setOpenNewAlertFact(true);
              }}
              size="md"
              variant="primary"
            >
              Registrar Nuevo Factor de Riesgo
            </Button>
          </div>
          <div className="lista-body-alert">
            <h4 className="text-primary">
              <b>Lista de Registros de Factores de Riesgos</b>
            </h4>
            {alertList != null ? (
              <ListTableBox
                noPadding={true}
                header={
                  <div className="lista-alerts-header">
                    <h6
                      className="text-primary header-text"
                      style={{ width: "42px", alignSelf: "center" }}
                    >
                      <b>#</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "404px" }}
                    >
                      <b>Nombre Completo</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "178px" }}
                    >
                      <b>Registro</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "300px" }}
                    >
                      <b>Riesgo y Unidad</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "280px" }}
                    >
                      <b>Detalle del Reporte</b>
                    </h6>
                    <div style={{ width: "84px" }}></div>
                  </div>
                }
                listItems={fillAlertList(alertList)}
                overrideColor="override-white"
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
          openModal={openNewAlertFact}
          setOpenModal={setOpenNewAlertFact}
          title="Formulario de Registro de Inquietudes"
          size="lg"
          footer={["Guardar", "Cerrar"]}
          body={modalNewAlertFact(
            newFactor,
            setNewFactor,
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
            setOpenRemoveAlertFact(false);
            setAlertUnitAreas(null);
            setAlertProcess(null);
            setAlertRisk(null);
            setSelectedProcess(-1);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            //MISSING THE REST OF THE LIST AND SELECTS
            handleCreateFactor(
              newFactor,
              setNewFactor,
              alertList,
              setAlertList
            );
          }}
        />
        <Modals
          openModal={openAlertFactDetail}
          setOpenModal={setOpenAlertFactDetail}
          title="Detalle del Formulario de Registro de Inquietudes"
          size="lg"
          body={modalAlertFactDetail(selectedFactor)}
        />
        <Modals
          openModal={openRemoveAlertFact}
          setOpenModal={setOpenRemoveAlertFact}
          title={`Eliminación del Registro ${selectedFactor?.ReportRiskFactor.codigo}`}
          footer={["Confirmar", "Cancelar"]}
          size="lg"
          body={modalRemoveAlertFact(selectedFactor)}
          handleConfirm={() => {
            setOpenRemoveAlertFact(false);
            handleRemoveFactor(
              selectedFactor,
              setSelectedFactor,
              alertList,
              setAlertList
            );
          }}
        />
      </div>
    </>
  );
}

export default Risk_Alertas;
