import { useEffect, useState } from "react";
import {
  faArrowRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import MainContainer from "../../../components/Main/MainContainer";
import NavBar from "../../../components/NavBar/NavBar";
import { URL_RIESGOS_ALERTAS_FACTORES } from "../../../config";
import "./Risk_Alertas.scss";
import { useAuth } from "../../../hooks/AuthProvider";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import Modals from "../../../components/Modals/Modals";
import { format } from "date-fns";
import {
  createReportWhistleAlert,
  deleteReportWhistleAlert,
  getReportWhistleAlertbyUserId,
} from "../../../services/alert.services";
import { getArea, getUnitAreabyAreaId } from "../../../services/area.services";
import Spinner from "react-bootstrap/esm/Spinner";
import { getRiskbyProcessId } from "../../../services/process.services";
import { getProcessbyUnitAreaId } from "../../../services/unitarea.services";

function modalRemoveAlertIrr() {
  return (
    <div className="modal-alert-body">
      <h5 className="text-primary">
        <b>¿Seguro de eliminar el registro de irregularidad seleccionado?</b>
      </h5>
      <h6 className="text-dark">
        Ten en cuenta que al eliminar este registro de irregularidad, la
        información asociada será permanentemente eliminada del sistema. Esto
        significa que no estará disponible para futuros análisis o
        investigaciones en la organización.
      </h6>
      <p className="text-secondary text-end">
        Esta acción es definitiva y no se puede deshacer.
      </p>
    </div>
  );
}
function modalAlertIrrDetail(selectedAlert) {
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
                  value={selectedAlert.Report_WhistleAlert.codigo}
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
                    selectedAlert.Report_WhistleAlert.fecha_registro,
                    "dd/MM/yyyy"
                  )}
                />
              </Form.Group>
            </div>
            <p className="text-dark">
              El formulario para registrar una nueva irregularidad estará
              disponible únicamente para los usuarios designados como encargados
              de gestionar el sistema web de evaluación de casos de soborno.
              Este acceso exclusivo garantiza la confidencialidad y la adecuada
              gestión de las denuncias presentadas.
            </p>
          </div>
          <Form style={{ width: "100%" }}>
            <div className="alert-details">
              <h5 className="text-secondary">
                <b>Información de Contacto</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridNombre"
                  >
                    <Form.Label>Nombre de Contacto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre"
                      value={selectedAlert.Report_WhistleAlert.nombre_contacto}
                      readOnly
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-3"
                    controlId="formGridTelefono"
                  >
                    <Form.Label>Número de Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="+51"
                      value={selectedAlert.Report_WhistleAlert.numero_contacto}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-9"
                    controlId="formGridCorreo"
                  >
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={selectedAlert.Report_WhistleAlert.correo_contacto}
                      readOnly
                    />
                  </Form.Group>
                </Row>
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
                    controlId="formGridPosicion"
                  >
                    <Form.Label>Posicion o Cargo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su posición o cargo"
                      readOnly
                      value={
                        selectedAlert.Report_WhistleAlert.posicion_contacto
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-12"
                    controlId="formGridDetPos"
                  >
                    <Form.Label>Detalles Adicionales del Cargo</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese detalles adicionales de su cargo"
                      readOnly
                      value={selectedAlert.Report_WhistleAlert.detalles_cargo}
                    />
                    <Form.Text>
                      Departamento, División, Sector, Localización dentro de la
                      Organización
                    </Form.Text>
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
                      value={selectedAlert.Report_WhistleAlert.divulgacion}
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
                      placeholder="Información adicional que crea conveniente para la divulgación del caso."
                      readOnly
                      value={
                        selectedAlert.Report_WhistleAlert.informacion_adicional
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
function modalNewAlertIrr(
  newWhistle,
  setNewWhistle,
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
          El formulario para registrar una nueva irregularidad estará disponible
          únicamente para los usuarios designados como encargados de gestionar
          el sistema web de evaluación de casos de soborno. Este acceso
          exclusivo garantiza la confidencialidad y la adecuada gestión de las
          denuncias presentadas.
        </p>
      </div>
      {newWhistle != null && (
        <Form style={{ width: "100%" }}>
          <div className="alert-details">
            <h5 className="text-secondary">
              <b>Información de Contacto</b>
            </h5>
            <div className="container-form-controls">
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridNombre"
                >
                  <Form.Label>Nombre de Contacto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={newWhistle.nombre_contacto}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        nombre_contacto: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-3"
                  controlId="formGridTelefono"
                >
                  <Form.Label>Número de Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="+51"
                    value={newWhistle.numero_contacto}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        numero_contacto: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  className="col-md-9"
                  controlId="formGridCorreo"
                >
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={newWhistle.correo_contacto}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        correo_contacto: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
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
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridPosicion"
                >
                  <Form.Label>Posicion o Cargo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su posición o cargo"
                    value={newWhistle.posicion_contacto}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        posicion_contacto: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="col-md-12"
                  controlId="formGridDetPos"
                >
                  <Form.Label>Detalles Adicionales del Cargo</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingrese detalles adicionales de su cargo"
                    value={newWhistle.detalles_cargo}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        detalles_cargo: e.target.value,
                      });
                    }}
                  />
                  <Form.Text>
                    Departamento, División, Sector, Localización dentro de la
                    Organización
                  </Form.Text>
                </Form.Group>
              </Row>
            </div>
            <h5 className="text-secondary">
              <b>Información de la Divulgación</b>
            </h5>
            <div className="container-form-controls">
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
                      value={
                        newWhistle.risk_id != null ? newWhistle.risk_id : -1
                      }
                      onChange={(e) =>
                        setNewWhistle({
                          ...newWhistle,
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
                        newWhistle.risk_id != null &&
                        newWhistle.risk_id != -1
                          ? alertRisk[
                              alertRisk.findIndex(
                                (risk) => risk.id === newWhistle.risk_id
                              )
                            ] != null
                            ? alertRisk[
                                alertRisk.findIndex(
                                  (risk) => risk.id === newWhistle.risk_id
                                )
                              ].nombre
                            : ""
                          : ""
                      }
                    />
                  </Form.Group>
                </Row>
              )}
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
                    value={newWhistle.divulgacion}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
                        divulgacion: e.target.value,
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
                    placeholder="Información adicional que crea conveniente para la divulgación del caso."
                    value={newWhistle.informacion_adicional}
                    onChange={(e) => {
                      setNewWhistle({
                        ...newWhistle,
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
  async function retrieveGetWhistleAlert(id) {
    const data = await getReportWhistleAlertbyUserId(id);

    return data;
  }
  async function retrieveCreateWhistleAlert(body) {
    const data = await createReportWhistleAlert(body);

    return data;
  }
  async function retrieveDeleteWhistleAlert(id) {
    const data = await deleteReportWhistleAlert(id);

    return data;
  }

  const { userData } = useAuth();
  const [alertList, setAlertList] = useState(null);
  const [selectedWhistle, setSelectedWhistle] = useState(null);
  const [newWhistle, setNewWhistle] = useState(null);

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
        key: alert.Report_WhistleAlert.id.toString(),
        content: (
          <div className="lista-alerts">
            <div className="lista-alerts-item1">
              <p className="text-primary header-text">
                <b>{alert.Report_WhistleAlert.id}</b>
              </p>
            </div>
            <div className="lista-alerts-item2 header-text">
              <p className="text-primary itemlist-text">
                {alert.Report_WhistleAlert.nombre_contacto}
              </p>
              <p className="text-secondary itemlist-text">
                {alert.Report_WhistleAlert.posicion_contacto}
              </p>
            </div>
            <div className="lista-alerts-item3 header-text">
              <p className="text-primary">
                Fecha:{" "}
                {format(alert.Report_WhistleAlert.fecha_registro, "dd/MM/yyyy")}
              </p>
              <p className="text-primary">
                Codigo: {alert.Report_WhistleAlert.codigo}
              </p>
            </div>
            <div className="lista-alerts-item4 header-text">
              <p className="text-primary">
                <b>Teléfono:</b>
                {` ${alert.Report_WhistleAlert.numero_contacto}`}
              </p>
              <p className="text-primary">
                <b>Correo:</b> {` ${alert.Report_WhistleAlert.correo_contacto}`}
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
            <div className="lista-alerts-item1">
              <Button
                onClick={() => {
                  setSelectedWhistle(alert);
                  setOpenRemoveAlertIrr(true);
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
                  setSelectedWhistle(alert);
                  setOpenAlertIrrDetail(true);
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

  const handleCreateWhistle = (
    newWhistle,
    setNewWhistle,
    alertList,
    setAlertList
  ) => {
    if (
      newWhistle.user_id == null ||
      newWhistle.user_id == -1 ||
      newWhistle.risk_id == null ||
      newWhistle.risk_id == -1
    )
      return;
    retrieveCreateWhistleAlert(newWhistle).then(() => {
      setNewWhistle(null);
      retrieveGetWhistleAlert(userData.user_id).then((alerts) => {
        setAlertList(alerts);
      });
    });
  };
  const handleRemoveWhistle = (
    selectedWhistle,
    setSelectedWhistle,
    alertList,
    setAlertList
  ) => {
    retrieveDeleteWhistleAlert(selectedWhistle.Report_WhistleAlert.id).then(
      () => {
        setSelectedWhistle(null);
        retrieveGetWhistleAlert(userData.user_id).then((alerts) => {
          setAlertList(alerts);
        });
      }
    );
  };

  useEffect(() => {
    if (userData != null)
      retrieveGetWhistleAlert(userData.user_id).then((alerts) => {
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

  const [openNewAlertIrr, setOpenNewAlertIrr] = useState(false);
  const [openRemoveAlertIrr, setOpenRemoveAlertIrr] = useState(false);
  const [openAlertIrrDetail, setOpenAlertIrrDetail] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Alertas y Reportes para Evaluación de Riesgos">
          <Nav variant="tabs" defaultActiveKey="irregularidades">
            <Nav.Item>
              <Nav.Link key="irregularidades" active>
                Divulgación de Irregularidades
              </Nav.Link>
            </Nav.Item>
            {userData != null && userData.Role.nombre !== "Colaborador" && (
              <Nav.Item>
                <Nav.Link key="factores" href={URL_RIESGOS_ALERTAS_FACTORES}>
                  Factores de Riesgo de Soborno
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <div className="alertas-container">
            <h4 className="text-primary">
              <b>Reportes de Divulgación de Irregularidades</b>
            </h4>
            <p className="text-dark text-start">
              Esta sección permite a los usuarios registrar cualquier percance o
              inquietud encontrada en la organización. Si se identifica algún
              problema o situación preocupante, se puede informar mediante el
              siguiente formulario para que se tomen las medidas necesarias
            </p>
            <Button
              onClick={() => {
                setNewWhistle({
                  risk_id: null,
                  user_id: userData?.user_id,
                  nombre_contacto: "",
                  numero_contacto: "",
                  correo_contacto: "",
                  posicion_contacto: "",
                  detalles_cargo: "",
                  divulgacion: "",
                  informacion_adicional: "",
                });
                setOpenNewAlertIrr(true);
              }}
              size="md"
              variant="primary"
            >
              Registrar Nueva Irregularidad
            </Button>
          </div>
          <div className="lista-body-alert">
            <h4 className="text-primary">
              <b>Lista de Registros de Irregularidades</b>
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
                      <b>Nombre Cargo</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "178px" }}
                    >
                      <b>Registro</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "280px" }}
                    >
                      <b>Datos de Contacto</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "300px" }}
                    >
                      <b>Riesgo y Unidad</b>
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
          openModal={openNewAlertIrr}
          setOpenModal={setOpenNewAlertIrr}
          title="Formulario de Registro de Inquietudes"
          size="lg"
          footer={["Guardar", "Cerrar"]}
          body={modalNewAlertIrr(
            newWhistle,
            setNewWhistle,
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
            setOpenRemoveAlertIrr(false);
            setAlertUnitAreas(null);
            setAlertProcess(null);
            setAlertRisk(null);
            setSelectedProcess(-1);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            //MISSING THE REST OF THE LIST AND SELECTS
            handleCreateWhistle(
              newWhistle,
              setNewWhistle,
              alertList,
              setAlertList
            );
          }}
        />
        <Modals
          openModal={openAlertIrrDetail}
          setOpenModal={setOpenAlertIrrDetail}
          title="Detalle del Formulario de Registro de Inquietudes"
          size="lg"
          body={modalAlertIrrDetail(selectedWhistle)}
        />
        <Modals
          openModal={openRemoveAlertIrr}
          setOpenModal={setOpenRemoveAlertIrr}
          title={`Eliminación del Registro ${selectedWhistle?.Report_WhistleAlert.codigo}`}
          footer={["Confirmar", "Cancelar"]}
          size="lg"
          body={modalRemoveAlertIrr(selectedWhistle)}
          handleConfirm={() => {
            setOpenRemoveAlertIrr(false);
            handleRemoveWhistle(
              selectedWhistle,
              setSelectedWhistle,
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
