import { useState } from "react";
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
function modalAlertFactDetail() {
  return (
    <div className="modal-alert-body">
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
            <Form.Control type="text" placeholder="" readOnly value="FACT001" />
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
              value="30/04/2024"
            />
          </Form.Group>
        </div>
        <p className="text-dark">
          El formulario para registrar un nuevo factor de soborno será
          visualizado por todos los gestores de riesgos asociados al sistema.
          Este presentará relevancia en el cálculo de los niveles de riesgo de
          sobornos organizacional. Bajo esto, se establece el compromiso del
          llenado adecuado de los nuevos riesgos generados.
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
                className="col-md-3"
                controlId="formGridCodArea"
              >
                <Form.Label>Código del Área</Form.Label>
                <Form.Select value="1">
                  <option value="1">LIN001</option>
                  <option value="2">LIN002</option>
                  <option value="3">LIN003</option>
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
                  value="Gerencia Regional de Desarrollo Social"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodUnidad"
              >
                <Form.Label>Código de la Unidad</Form.Label>
                <Form.Select value="3">
                  <option value="1">DRS001</option>
                  <option value="2">DRS002</option>
                  <option value="3">DRS003</option>
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
                  value="Dirección Regional de Trabajo y Promoción del Empleo"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodProceso"
              >
                <Form.Label>Código del Proceso</Form.Label>
                <Form.Select value="1">
                  <option value="1">PRO001</option>
                  <option value="2">PRO002</option>
                  <option value="3">PRO003</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridNombProceso"
              >
                <Form.Label>Nombre del Proceso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="Proceso de Gestionamiento de Contrataciones"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodProceso"
              >
                <Form.Label>Código de Riesgo</Form.Label>
                <Form.Select value="1">
                  <option value="1">PRTR001</option>
                  <option value="2">PRTR002</option>
                  <option value="3">PRTR003</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridNombProceso"
              >
                <Form.Label>Nombre del Proceso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="Servidor de Producción - Degradación en desempeño del sistema"
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
                  value="Caída del servidor el día 18 de febrero"
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
                  value="Recientemente, durante el proceso de selección para el puesto, observé ciertas prácticas que podrían ser contrarias a nuestras políticas internas y a las leyes laborales vigentes. Entre las irregularidades detectadas se encuentran:

1. Falta de transparencia en la publicación de la convocatoria para el puesto, ya que no se difundió adecuadamente en los canales internos y externos establecidos.
2. Indicios de favoritismo en la selección de candidatos, evidenciados por la inclusión de criterios subjetivos que no están alineados con los requisitos del puesto.
3. Ausencia de documentación adecuada que respalde la elección del candidato seleccionado, así como la falta de registros de las entrevistas y evaluaciones realizadas."
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
                  value="Considero que estas irregularidades podrían afectar negativamente la equidad y la transparencia en nuestros procesos de contratación, así como la percepción de justicia por parte de los empleados y candidatos"
                />
              </Form.Group>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
}
function modalNewAlertFact() {
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
      <Form style={{ width: "100%" }}>
        <div className="alert-details">
          <h5 className="text-secondary">
            <b>Información Relacionada al Riesgo Presenciado</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodArea"
              >
                <Form.Label>Código del Área</Form.Label>
                <Form.Select value="1">
                  <option value="1">LIN001</option>
                  <option value="2">LIN002</option>
                  <option value="3">LIN003</option>
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
                  value="Gerencia Regional de Desarrollo Social"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodUnidad"
              >
                <Form.Label>Código de la Unidad</Form.Label>
                <Form.Select value="3">
                  <option value="1">DRS001</option>
                  <option value="2">DRS002</option>
                  <option value="3">DRS003</option>
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
                  value="Dirección Regional de Trabajo y Promoción del Empleo"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodProceso"
              >
                <Form.Label>Código del Proceso</Form.Label>
                <Form.Select value="1">
                  <option value="1">PRO001</option>
                  <option value="2">PRO002</option>
                  <option value="3">PRO003</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridNombProceso"
              >
                <Form.Label>Nombre del Proceso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="Proceso de Gestionamiento de Contrataciones"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodProceso"
              >
                <Form.Label>Código de Riesgo</Form.Label>
                <Form.Select value="1">
                  <option value="1">PRTR001</option>
                  <option value="2">PRTR002</option>
                  <option value="3">PRTR003</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridNombProceso"
              >
                <Form.Label>Nombre del Proceso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="Servidor de Producción - Degradación en desempeño del sistema"
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
                <Form.Control type="text" placeholder="" value="" />
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
                  value=""
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
                  value=""
                />
              </Form.Group>
            </Row>
          </div>
        </div>
      </Form>
    </div>
  );
}

function Risk_Alertas() {
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
              onClick={() => setOpenNewAlertFact(true)}
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
                    style={{ width: "300px" }}
                  >
                    <b>Riesgo y Unidad</b>
                  </h6>
                  <h6
                    className="text-primary header-text"
                    style={{ width: "280px" }}
                  >
                    <b>Detalle del Rerporte</b>
                  </h6>
                  <div style={{ width: "84px" }}></div>
                </div>
              }
              listItems={[
                {
                  key: "1",
                  content: (
                    <div className="lista-alerts">
                      <div className="lista-alerts-item1">
                        <p className="text-primary header-text">
                          <b>1</b>
                        </p>
                      </div>
                      <div className="lista-alerts-item2 header-text">
                        <p className="text-primary itemlist-text">
                          Jane Smith Bench
                        </p>
                        <p className="text-secondary itemlist-text">
                          Gestor de Proyectos
                        </p>
                      </div>
                      <div className="lista-alerts-item3 header-text">
                        <p className="text-primary">Fecha: {"30/04/2024"}</p>
                        <p className="text-primary">Codigo: {"FACT001"}</p>
                      </div>
                      <div className="lista-alerts-item5 header-text">
                        <p className="text-primary itemlist-text">
                          {"LIN001-"}Gerencia Regional de Desarrollo Humano
                        </p>
                        <p
                          className="text-secondary itemlist-text"
                          style={{ maxHeight: "3rem" }}
                        >
                          {"PRTR001-"}Servidor de Producción Inactivo
                        </p>
                      </div>
                      <div className="lista-alerts-item4 header-text">
                        <p className="text-primary">
                          Caída del servidor el día 18 de febrero del 2024
                        </p>
                      </div>
                      <div className="lista-alerts-item1">
                        <Button
                          onClick={() => setOpenRemoveAlertFact(true)}
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
                          onClick={() => setOpenAlertFactDetail(true)}
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
          openModal={openNewAlertFact}
          setOpenModal={setOpenNewAlertFact}
          title="Formulario de Registro de Inquietudes"
          size="lg"
          footer={["Guardar", "Cerrar"]}
          body={modalNewAlertFact()}
        />
        <Modals
          openModal={openAlertFactDetail}
          setOpenModal={setOpenAlertFactDetail}
          title="Detalle del Formulario de Registro de Inquietudes"
          footer={["Guardar", "Cerrar"]}
          size="lg"
          body={modalAlertFactDetail()}
        />
        <Modals
          openModal={openRemoveAlertFact}
          setOpenModal={setOpenRemoveAlertFact}
          title="Eliminación - Registro IRR021"
          footer={["Guardar", "Cancelar"]}
          size="lg"
          body={modalRemoveAlertFact()}
        />
      </div>
    </>
  );
}

export default Risk_Alertas;
