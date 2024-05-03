import { useState } from "react";
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
function modalAlertIrrDetail() {
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
            <Form.Control type="text" placeholder="" readOnly value="IRR001" />
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
          El formulario para registrar una nueva irregularidad estará disponible
          únicamente para los usuarios designados como encargados de gestionar
          el sistema web de evaluación de casos de soborno. Este acceso
          exclusivo garantiza la confidencialidad y la adecuada gestión de las
          denuncias presentadas.
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
                  value="Will Smith Table"
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
                  value="+51 948168849"
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
                  value="willsmith@example.com"
                />
              </Form.Group>
            </Row>
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
                className="col-md-12"
                controlId="formGridPosicion"
              >
                <Form.Label>Posicion o Cargo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su posición o cargo"
                  value="Oficinista de RR.HH."
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
                  value="Responsable de mantener actualizados los expedientes de los empleados, incluyendo información personal, contratos, evaluaciones de desempeño y capacitaciones"
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
                  placeholder="Información adicional que crea conveniente para la divulgación del caso."
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
function modalNewAlertIrr() {
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
                  value=""
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
                <Form.Control type="text" placeholder="+51" value="" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridCorreo"
              >
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="text" placeholder="" value="" />
              </Form.Group>
            </Row>
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
                className="col-md-12"
                controlId="formGridPosicion"
              >
                <Form.Label>Posicion o Cargo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su posición o cargo"
                  value=""
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
                  value=""
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
                  placeholder="Información adicional que crea conveniente para la divulgación del caso."
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
  const { userData } = useAuth();

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
              onClick={() => setOpenNewAlertIrr(true)}
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
                          Will Smith Table
                        </p>
                        <p className="text-secondary itemlist-text">
                          Oficinista de RR.HH.
                        </p>
                      </div>
                      <div className="lista-alerts-item3 header-text">
                        <p className="text-primary">Fecha: {"30/04/2024"}</p>
                        <p className="text-primary">Codigo: {"IRR001"}</p>
                      </div>
                      <div className="lista-alerts-item4 header-text">
                        <p className="text-primary">
                          <b>Teléfono:</b> +51 948168849
                        </p>
                        <p className="text-primary">
                          <b>Correo:</b> willsmith@example.com
                        </p>
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
                      <div className="lista-alerts-item1">
                        <Button
                          onClick={() => setOpenRemoveAlertIrr(true)}
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
                          onClick={() => setOpenAlertIrrDetail(true)}
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
          openModal={openNewAlertIrr}
          setOpenModal={setOpenNewAlertIrr}
          title="Formulario de Registro de Inquietudes"
          size="lg"
          footer={["Guardar", "Cerrar"]}
          body={modalNewAlertIrr()}
        />
        <Modals
          openModal={openAlertIrrDetail}
          setOpenModal={setOpenAlertIrrDetail}
          title="Detalle del Formulario de Registro de Inquietudes"
          footer={["Guardar", "Cerrar"]}
          size="lg"
          body={modalAlertIrrDetail()}
        />
        <Modals
          openModal={openRemoveAlertIrr}
          setOpenModal={setOpenRemoveAlertIrr}
          title="Eliminación - Registro IRR021"
          footer={["Guardar", "Cancelar"]}
          size="lg"
          body={modalRemoveAlertIrr()}
        />
      </div>
    </>
  );
}

export default Risk_Alertas;
