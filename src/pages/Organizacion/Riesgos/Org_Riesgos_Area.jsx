import { useState, useEffect } from "react";
import MainContainer from "../../../components/Main/MainContainer";
import Button from "react-bootstrap/Button";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import {
  faArrowLeft,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Org_Riesgos_Area.scss";

import { URL_ORGANIZACION_RIESGOS } from "../../../config";
import MetricBox from "../../../components/Metrics/MetricBox";
import Modals from "../../../components/Modals/Modals";

function modalRiskDetail() {
  return (
    <div className="modal-newgrouped-body">
      <div className="risk-metrics">
        <MetricBox
          topText="Casos de Riesgo"
          middleText="1"
          bottomText="Divulgación de irregularidades"
          status="secondary"
          width="224px"
          gap="0rem"
        />
        <MetricBox
          topText="Casos de Riesgo"
          middleText="0"
          bottomText="Factores de evaluación riesgos"
          status="danger"
          width="224px"
          gap="0rem"
        />
        <MetricBox
          topText="Nivel de Riesgo"
          middleText="57.50"
          bottomText="Relaciona casos reportados y severidad"
          status="danger"
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
                  value="Transferencia"
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
                  value="SH16 - 10% del total"
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
                <Form.Control type="text" placeholder="de 10" value="6 de 10" />
              </Form.Group>

              <Form.Group
                as={Col}
                className="col-md-4"
                controlId="formGridImpacto"
              >
                <Form.Label>Impacto</Form.Label>
                <Form.Control type="text" placeholder="de 10" value="8 de 10" />
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
                  value="5.8 de 10"
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
                  value="Servidor de Producción - Degradación en desempeño del sistema"
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
                  value="Órganos destinados al seguimiento del desarrollo social, económico y de infraestructura en las áreas seleccionadas."
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
                    value="La inactividad de los sistemas web impide llevar a cabo las actividades diarias de manera efectiva, lo que resulta en pérdida de tiempo y costos adicionales para la organización. Esta situación conlleva a la insatisfacción de los clientes debido a la falta de respuesta oportuna."
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
                    placeholder="Ingrese sintomas del riesgo"
                    value="La falta de mantenimiento adecuado de los sistemas web ocasiona su inactividad, generando interrupciones en las operaciones diarias y provocando pérdida de tiempo y recursos."
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
                    value="1. Diagnóstico: Realizar un análisis exhaustivo de los sistemas web afectados para identificar las causas subyacentes de su inactividad.
2. Priorización: Clasificar las causas identificadas según su impacto"
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
                    value="Equipo de Tecnología de la Información (TI): Encargado de realizar el diagnóstico de los sistemas web afectados, implementar soluciones técnicas y llevar a cabo el mantenimiento preventivo."
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
                    value="Solicitar al área de sistemas para poder realizar el mantenimiento del equipo en el traslado del servicio.."
                  />
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

function Org_Riesgos_Area() {
  const receivedData = useLocation().state;

  const [openRiskDetail, setOpenRiskDetail] = useState(false);

  useEffect(() => {
    if (receivedData == null) navigate(`${URL_ORGANIZACION_RIESGOS}`);
  }, []);

  const navigate = useNavigate();

  const handleUnitAreaRisk = () => {
    navigate(`${URL_ORGANIZACION_RIESGOS}`);
  };

  return (
    <>
      <MainContainer title="Riesgos por Área Organizacional">
        <div className="unidad-desc">
          <div className="header-display">
            <Button
              onClick={() => handleUnitAreaRisk()}
              variant="outline-secondary"
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
                Ver Detalle
              </div>
            </Button>
            <h4 className="text-primary">
              <b>{`${receivedData != null && receivedData.nombre} - ${
                receivedData != null && receivedData.codigo
              }`}</b>
            </h4>
          </div>
          <div className="descripcion-medicion">
            <p className="text-dark" style={{ width: "562px" }}>
              Órgano de línea técnico, normativo y ejecutivo responsable del
              diseño, conducción, coordinación, supervisión y evaluación de las
              políticas públicas regionales de desarrollo social y humano, en
              las materias específicas de educación, cultura, ciencia y
              tecnología, recreación, deportes, salud, vivienda, trabajo,
              población saneamiento, desarrollo social e igualdad de
              oportunidades.
            </p>
            <MetricBox
              topText="Evaluacion de Riesgos"
              middleText="45.80"
              bottomText="Inventario Total"
              order="top-bottom-middle"
              status="secondary"
              width="224px"
              gap="0.5rem"
            />
            <MetricBox
              topText="Tolerancia de Riesgo"
              middleText="3"
              bottomText="Riesgos Excedidos"
              order="top-bottom-middle"
              status="danger"
              width="224px"
              gap="0.5rem"
            />
            <MetricBox
              topText="Nivel de Riesgo"
              middleText="75.85"
              bottomText="Crítico"
              order="top-bottom-middle"
              status="danger"
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
          <div className="accordion-procesos-header">
            <h6
              className="text-primary header-text"
              style={{ width: "42px", alignSelf: "center" }}
            >
              <b>#</b>
            </h6>
            <h6 className="text-primary header-text" style={{ width: "136px" }}>
              <b>Código</b>
            </h6>
            <h6 className="text-primary header-text" style={{ width: "709px" }}>
              <b>Nombre</b>
            </h6>
            <h6 className="text-primary header-text" style={{ width: "225px" }}>
              <b>Mediciones</b>
            </h6>
            <h6 className="text-primary header-text" style={{ width: "122px" }}>
              <b>Nivel Riesgo</b>
            </h6>
          </div>
          <AccordionBox
            noPadding={true}
            accordionItems={[
              {
                header: (
                  <div className="lista-procesos">
                    <div className="lista-procesos-item1">
                      <p className="text-primary header-text">
                        <b>1</b>
                      </p>
                    </div>
                    <div className="lista-procesos-item2">
                      <p className="text-primary header-text">PRO001</p>
                    </div>
                    <div className="lista-procesos-item3 header-text">
                      <p className="text-primary">
                        Proceso de Gestionamiento de Contrataciones
                      </p>
                      <p className="text-success ">
                        Tiene controles antisoborno
                      </p>
                    </div>
                    <div className="lista-procesos-item4 header-text">
                      <p className="text-primary">Total: 3 riesgos</p>
                      <p className="text-danger ">
                        2 exceden el nivel de tolerancia
                      </p>
                    </div>
                    <div
                      className={`lista-procesos-item5 header-text ${"bg-warning"}`}
                    >
                      <h5 className="text-white text-center">54.46</h5>
                    </div>
                  </div>
                ),
                hasBody: true,
                body: (
                  <div className="accordion-lista-body">
                    <div className="procesos-riesgos-header">
                      <h5 className="text-secondary">
                        <b>Lista de Procesos</b>
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
                          <div style={{ width: "42px" }}></div>
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
                                <h5 className="text-white text-center">
                                  57.50
                                </h5>
                              </div>
                              <div className="lista-riesgos-item1">
                                <Button
                                  onClick={() => setOpenRiskDetail(true)}
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
                      overrideColor="override-gray"
                    />
                  </div>
                ),
              },
            ]}
            overrideBorders={true}
            overrideColor="override-white"
          ></AccordionBox>
        </div>
      </MainContainer>
      <Modals
        openModal={openRiskDetail}
        setOpenModal={setOpenRiskDetail}
        title="Detalle del Riesgo - PRTR001"
        size="lg"
        body={modalRiskDetail()}
      />
    </>
  );
}

export default Org_Riesgos_Area;
