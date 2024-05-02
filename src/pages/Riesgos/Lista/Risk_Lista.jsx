import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";
import MetricBox from "../../../components/Metrics/MetricBox";
import Modals from "../../../components/Modals/Modals";
import "./Risk_Lista.scss";
import NavBar from "../../../components/NavBar/NavBar";

function modalRiskDetail() {
  return (
    <div className="modal-detailrisk-body">
      <div className="risk-metrics">
        <MetricBox
          topText="Casos de Riesgo"
          middleText="0"
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
                    placeholder="Ingrese causas del riesgo"
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
function modalNewRisks() {
  return (
    <div className="modal-detailrisk-body">
      <Form style={{ width: "100%" }}>
        <div className="risk-details">
          <h5 className="text-secondary">
            <b>Relación con Indicador de Riesgo</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridCodIndicador"
              >
                <Form.Label>Código</Form.Label>
                <Form.Select value="3">
                  <option value="1">SH12</option>
                  <option value="2">SH13</option>
                  <option value="3">SH16</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-8"
                controlId="formGridNombIndicador"
              >
                <Form.Label>Nombre del Indicador de Riesgo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="La experiencia de la organización con los socios comerciales"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridEscala"
              >
                <Form.Label>Escala</Form.Label>
                <Form.Control type="text" placeholder="0.00" value="" />

                <Form.Text>Porcentaje</Form.Text>
              </Form.Group>
            </Row>
          </div>
          <h5 className="text-secondary">
            <b>Relación con Procesos de la Organización</b>
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
          </div>
          <h5 className="text-secondary">
            <b>Información del Riesgo</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodRiesgo"
              >
                <Form.Label>Código del Riesgo</Form.Label>
                <Form.Control type="text" placeholder="" value="" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridTratamiento"
              >
                <Form.Label>Tratamiento</Form.Label>
                <Form.Select value="1">
                  <option value="1">Transferencia</option>
                  <option value="2">Evasión</option>
                  <option value="3">Aceptación</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridProbabilidad"
              >
                <Form.Label>Probabilidad</Form.Label>
                <Form.Control type="text" placeholder="de 10" value="" />
                <Form.Text>Valor Total=10</Form.Text>
              </Form.Group>

              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridImpacto"
              >
                <Form.Label>Impacto</Form.Label>
                <Form.Control type="text" placeholder="de 10" value="" />
                <Form.Text>Valor Total=10</Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridSeveridad"
              >
                <Form.Label>Severidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="de 10"
                  readOnly
                  value=""
                />
                <Form.Text>Valor Total=10</Form.Text>
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
                  placeholder="Ingrese nombre del riesgo"
                  value=""
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
                  value=""
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
                    value=""
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
                    value=""
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
                    value=""
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
                    value=""
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
                    value=""
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
function modalEditRisks() {
  return (
    <div className="modal-detailrisk-body">
      <Form style={{ width: "100%" }}>
        <div className="risk-details">
          <h5 className="text-secondary">
            <b>Relación con Indicador de Riesgo</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridCodIndicador"
              >
                <Form.Label>Código</Form.Label>
                <Form.Select value="3">
                  <option value="1">SH12</option>
                  <option value="2">SH13</option>
                  <option value="3">SH16</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-8"
                controlId="formGridNombIndicador"
              >
                <Form.Label>Nombre del Indicador de Riesgo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  readOnly
                  value="La experiencia de la organización con los socios comerciales"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridEscala"
              >
                <Form.Label>Escala</Form.Label>
                <Form.Control type="text" placeholder="0.00" value="10.00" />
                <Form.Text>Porcentaje</Form.Text>
              </Form.Group>
            </Row>
          </div>
          <h5 className="text-secondary">
            <b>Relación con Procesos de la Organización</b>
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
          </div>
          <h5 className="text-secondary">
            <b>Información del Riesgo</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridCodRiesgo"
              >
                <Form.Label>Código del Riesgo</Form.Label>
                <Form.Control type="text" placeholder="" value="PRTR001" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridTratamiento"
              >
                <Form.Label>Tratamiento</Form.Label>
                <Form.Select value="1">
                  <option value="1">Transferencia</option>
                  <option value="2">Evasión</option>
                  <option value="3">Aceptación</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridProbabilidad"
              >
                <Form.Label>Probabilidad</Form.Label>
                <Form.Control type="text" placeholder="de 10" value="6" />
                <Form.Text>Valor Total=10</Form.Text>
              </Form.Group>

              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridImpacto"
              >
                <Form.Label>Impacto</Form.Label>
                <Form.Control type="text" placeholder="de 10" value="8" />
                <Form.Text>Valor Total=10</Form.Text>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-2"
                controlId="formGridSeveridad"
              >
                <Form.Label>Severidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="de 10"
                  readOnly
                  value="5.8"
                />
                <Form.Text>Valor Total=10</Form.Text>
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
                  placeholder="Ingrese nombre del riesgo"
                  value=""
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
                    placeholder="Ingrese causas del riesgo"
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
2. Priorización: Clasificar las causas identificadas según su impacto."
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
                    value="Solicitar al área de sistemas para poder realizar el mantenimiento del equipo en el traslado del servicio."
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

function Risk_Lista() {
  const retrieveListaContent = () => {
    return [
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
              <p className="text-primary header-text">PRTR001</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Degradación en desempeño del sistema
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
              <p className="text-primary">{"Unidad"} DRSO001</p>
              <p className="text-primary">
                <b>Proceso PRO001</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
              <p className="text-primary header-text">PRTR002</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Mal funcionamiento del equipamiento
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
              <p className="text-primary">{"Unidad"} DRSO001</p>
              <p className="text-primary">
                <b>Proceso PRO001</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-success"}`}>
              <h5 className="text-white text-center">25.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "3",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>1</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR003</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Datos de contratistas - Disponibilidad de backups
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
              <p className="text-primary">{"Unidad"} DRSO001</p>
              <p className="text-primary">
                <b>Proceso PRO001</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "4",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>4</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR004</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Degradación en desempeño del sistema
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
              <p className="text-primary">{"Unidad"} DRS002</p>
              <p className="text-primary">
                <b>Proceso PRO004</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "5",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>5</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR005</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Mal funcionamiento del equipamiento
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
              <p className="text-primary">{"Unidad"} DRS002</p>
              <p className="text-primary">
                <b>Proceso PRO004</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-success"}`}>
              <h5 className="text-white text-center">25.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "6",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>6</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR006</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Datos de contratistas - Disponibilidad de backups
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
              <p className="text-primary">{"Unidad"} DRS002</p>
              <p className="text-primary">
                <b>Proceso PRO004</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "7",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>7</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR007</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Mal funcionamiento del equipamiento
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
              <p className="text-primary">{"Unidad"} DRS003</p>
              <p className="text-primary">
                <b>Proceso PRO005</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-success"}`}>
              <h5 className="text-white text-center">25.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "8",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>8</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR008</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Degradación en desempeño del sistema
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
                <b>Proceso PRO006</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "9",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>9</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR009</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Mal funcionamiento del equipamiento
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
                <b>Proceso PRO006</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-success"}`}>
              <h5 className="text-white text-center">25.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "10",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>10</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR010</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Datos de contratistas - Disponibilidad de backups
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
                <b>Proceso PRO006</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "11",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>11</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR011</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Degradación en desempeño del sistema
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
              <p className="text-primary">{"Área"} LIN002</p>
              <p className="text-primary">
                <b>Proceso PRO007</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-warning"}`}>
              <h5 className="text-white text-center">50.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
      {
        key: "12",
        content: (
          <div className="lista-riesgos">
            <div className="lista-riesgos-item1">
              <p className="text-primary header-text">
                <b>12</b>
              </p>
            </div>
            <div className="lista-riesgos-item2">
              <p className="text-primary header-text">PRTR012</p>
            </div>
            <div className="lista-riesgos-item3 header-text">
              <p className="text-primary">
                Servidor de Producción - Mal funcionamiento del equipamiento
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
              <p className="text-primary">{"Área"} LIN003</p>
              <p className="text-primary">
                <b>Proceso PRO008</b>
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
            <div className={`lista-riesgos-item7 header-text ${"bg-success"}`}>
              <h5 className="text-white text-center">25.00</h5>
            </div>
            <div className="lista-riesgos-item1">
              <Button
                onClick={() => setOpenEditRisks(true)}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
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
    ];
  };

  const [openRiskDetail, setOpenRiskDetail] = useState(false);
  const [openNewRisks, setOpenNewRisks] = useState(false);
  const [openEditRisks, setOpenEditRisks] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Lista de Riesgos">
          <div className="header-risk">
            <div className="button-group">
              {/* <Button
              onClick={() => setOpenNewRisks(true)}
              size="md"
              variant="primary"
            >
              Cargar Lista de Riesgos
            </Button> */}
              <Button
                onClick={() => setOpenNewRisks(true)}
                size="md"
                variant="primary"
              >
                Nuevo Riesgo de Soborno
              </Button>
            </div>
          </div>
          <div className="lista-body-riesgos">
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
                  <div style={{ width: "84px" }}></div>
                </div>
              }
              listItems={retrieveListaContent()}
              overrideColor="override-white"
              maxHeight="632px"
            />
          </div>
        </MainContainer>
        <Modals
          openModal={openRiskDetail}
          setOpenModal={setOpenRiskDetail}
          title="Detalle del Riesgo - PRTR001"
          size="lg"
          body={modalRiskDetail()}
        />
        <Modals
          openModal={openNewRisks}
          setOpenModal={setOpenNewRisks}
          title="Nuevo Riesgo de Soborno"
          footer={["Guardar", "Cerrar"]}
          size="lg"
          body={modalNewRisks()}
        />
        <Modals
          openModal={openEditRisks}
          setOpenModal={setOpenEditRisks}
          title="Configuración del Riesgo - PRTR001"
          footer={["Guardar", "Eliminar"]}
          size="lg"
          body={modalEditRisks()}
        />
      </div>
    </>
  );
}

export default Risk_Lista;
