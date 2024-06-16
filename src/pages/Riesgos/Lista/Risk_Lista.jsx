import {
  faArrowRightFromBracket,
  faChevronDown,
  faChevronUp,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";
import MetricBox from "../../../components/Metrics/MetricBox";
import Modals from "../../../components/Modals/Modals";
import NavBar from "../../../components/NavBar/NavBar";
import Helper from "../../../components/PopOvers/Helper";
import {
  colorBackgroundPercentage,
  convertToPercentage,
  statusImpact,
  statusPercentage,
} from "../../../hooks/ColorCases";
import { getArea, getUnitAreabyAreaId } from "../../../services/area.services";
import {
  createRisk,
  deleteRisk,
  getRiskDetail,
  getRiskTreatment,
  updateRisk,
} from "../../../services/risk.services";
import { getRiskIndicator } from "../../../services/riskindicator.services";
import { getProcessbyUnitAreaId } from "../../../services/unitarea.services";
import "./Risk_Lista.scss";

function modalRiskDetail(selectedRisk) {
  return (
    <div className="modal-detailrisk-body">
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
                      placeholder="de 100"
                      readOnly
                      value={`${selectedRisk.severidad_riesgo * 10} de 100`}
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
function modalNewRisks(
  newRisk,
  setNewRisk,
  riskTreatments,
  riskIndicators,
  riskAreas,
  riskUnitAreas,
  riskProcess,
  selectedArea,
  setSelectedArea,
  selectedUnitArea,
  setSelectedUnitArea
) {
  return (
    <div className="modal-detailrisk-body">
      {newRisk != null &&
        riskIndicators != null &&
        riskIndicators.length > 0 &&
        riskTreatments != null &&
        riskTreatments.length > 0 &&
        riskAreas != null &&
        riskAreas.length > 0 && (
          <Form style={{ width: "100%" }}>
            <div className="risk-details">
              <h5 className="text-secondary">
                <b>Relación con Indicador de Riesgo</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-3"
                    controlId="formGridCodIndicador"
                  >
                    <Form.Label>Código</Form.Label>
                    <Form.Select
                      value={
                        newRisk.risk_indicator_id != null
                          ? newRisk.risk_indicator_id
                          : 1
                      }
                      onChange={(e) =>
                        setNewRisk({
                          ...newRisk,
                          risk_indicator_id: parseInt(e.target.value),
                        })
                      }
                    >
                      {riskIndicators.map((ind) => (
                        <option key={`ind-${ind.id}`} value={ind.id}>
                          {ind.codigo}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-7"
                    controlId="formGridNombIndicador"
                  >
                    <Form.Label>Nombre del Indicador de Riesgo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={
                        newRisk.risk_indicator_id != null
                          ? riskIndicators[
                              riskIndicators.findIndex(
                                (ind) => ind.id === newRisk.risk_indicator_id
                              )
                            ].nombre
                          : ""
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridEscala"
                  >
                    <Form.Label>Escala</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0.00"
                      value={newRisk.escala_indicador}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          escala_indicador: isNaN(parseInt(e.target.value))
                            ? 0
                            : parseInt(e.target.value),
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Text>
                    La escala del riesgo sobre el indicador establece el nivel
                    de impacto que tendrá este en la medición del nivel de
                    riesgo del indicador
                  </Form.Text>
                </Row>
              </div>
              <h5 className="text-secondary">
                <b>Relación con Procesos de la Organización</b>
              </h5>
              <div className="container-form-controls">
                {riskAreas != null && (
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
                        {riskAreas.map((area) => (
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
                            ? riskAreas[
                                riskAreas.findIndex(
                                  (area) => area.id === selectedArea
                                )
                              ].nombre
                            : ""
                        }
                      />
                    </Form.Group>
                  </Row>
                )}
                {riskUnitAreas != null && riskUnitAreas.length > 0 && (
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
                        {riskUnitAreas.map((unit) => (
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
                            ? riskUnitAreas[
                                riskUnitAreas.findIndex(
                                  (unit) => unit.id === selectedUnitArea
                                )
                              ].nombre
                            : ""
                        }
                      />
                    </Form.Group>
                    <Form.Text>
                      En caso el código de la unidad coincida con el del área,
                      se mostrarán la lista de procesos asociados al área.
                    </Form.Text>
                  </Row>
                )}
                {riskProcess != null && riskProcess.length > 0 && (
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-3"
                      controlId="formGridCodProceso"
                    >
                      <Form.Label>Código del Proceso</Form.Label>
                      <Form.Select
                        value={
                          newRisk.process_id != null ? newRisk.process_id : -1
                        }
                        onChange={(e) =>
                          setNewRisk({
                            ...newRisk,
                            process_id: parseInt(e.target.value),
                          })
                        }
                      >
                        <option key={`default`} value={-1}>
                          -
                        </option>
                        {riskProcess.map((process) => (
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
                      controlId="formGridNombProceso"
                    >
                      <Form.Label>
                        Nombre del Proceso
                        {riskUnitAreas != null &&
                          selectedUnitArea != -1 &&
                          (riskUnitAreas[
                            riskUnitAreas.findIndex(
                              (unit) => unit.id === selectedUnitArea
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
                          riskProcess != null &&
                          riskProcess.length > 0 &&
                          newRisk.process_id != null &&
                          newRisk.process_id != -1
                            ? riskProcess[
                                riskProcess.findIndex(
                                  (process) => process.id === newRisk.process_id
                                )
                              ] != null
                              ? riskProcess[
                                  riskProcess.findIndex(
                                    (process) =>
                                      process.id === newRisk.process_id
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
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={newRisk.codigo}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          codigo: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  {riskTreatments != null && (
                    <Form.Group
                      as={Col}
                      className="col-md-3"
                      controlId="formGridTratamiento"
                    >
                      <Form.Label>Tratamiento</Form.Label>
                      <Form.Select
                        value={
                          newRisk.risk_treatment_id != null
                            ? newRisk.risk_treatment_id
                            : -1
                        }
                        onChange={(e) =>
                          setNewRisk({
                            ...newRisk,
                            risk_treatment_id: parseInt(e.target.value),
                          })
                        }
                      >
                        <option key={`default`} value={-1}>
                          Sin evaluar
                        </option>
                        {riskTreatments.map((treatment) => (
                          <option
                            key={`treatment-${treatment.id}`}
                            value={treatment.id}
                          >
                            {treatment.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridProbabilidad"
                  >
                    <Form.Label>Probabilidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      value={newRisk.probabilidad}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          probabilidad:
                            e.target.value != ""
                              ? parseFloat(e.target.value)
                              : 0,
                          severidad_riesgo:
                            e.target.value != ""
                              ? (parseFloat(e.target.value) * newRisk.impacto) /
                                10
                              : 0,
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridImpacto"
                  >
                    <Form.Label>Impacto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      value={newRisk.impacto}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          impacto:
                            e.target.value != ""
                              ? parseFloat(e.target.value)
                              : 0,
                          severidad_riesgo:
                            e.target.value != ""
                              ? (parseFloat(e.target.value) *
                                  newRisk.probabilidad) /
                                10
                              : 0,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridSeveridad"
                  >
                    <Form.Label>Severidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 100"
                      readOnly
                      value={newRisk.impacto * newRisk.probabilidad}
                    />
                  </Form.Group>
                  <Form.Group as={Col} className="col-md-6"></Form.Group>
                  <Form.Group as={Col} className="col-md-6">
                    <Form.Text>
                      Severidad = Cálculo de Probabilidad [1-10] x Impacto
                      [1-10]
                    </Form.Text>
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
                      value={newRisk.nombre}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          nombre: e.target.value,
                        });
                      }}
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
                      value={newRisk.descripcion}
                      onChange={(e) => {
                        setNewRisk({
                          ...newRisk,
                          descripcion: e.target.value,
                        });
                      }}
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
                        value={newRisk.sintomas}
                        onChange={(e) => {
                          setNewRisk({
                            ...newRisk,
                            sintomas: e.target.value,
                          });
                        }}
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
                        value={newRisk.causas}
                        onChange={(e) => {
                          setNewRisk({
                            ...newRisk,
                            causas: e.target.value,
                          });
                        }}
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
                        value={newRisk.plan_accion}
                        onChange={(e) => {
                          setNewRisk({
                            ...newRisk,
                            plan_accion: e.target.value,
                          });
                        }}
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
                        value={newRisk.responsables_encargados}
                        onChange={(e) => {
                          setNewRisk({
                            ...newRisk,
                            responsables_encargados: e.target.value,
                          });
                        }}
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
                        value={newRisk.especificacion}
                        onChange={(e) => {
                          setNewRisk({
                            ...newRisk,
                            especificacion: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
        )}
    </div>
  );
}
function modalEditRisks(
  selectedRisk,
  setSelectedRisk,
  riskTreatments,
  riskIndicators,
  riskAreas,
  riskUnitAreas,
  riskProcess,
  selectedArea,
  setSelectedArea,
  selectedUnitArea,
  setSelectedUnitArea
) {
  return (
    <div className="modal-detailrisk-body">
      {selectedRisk != null &&
        riskIndicators != null &&
        riskIndicators.length > 0 &&
        riskTreatments != null &&
        riskTreatments.length > 0 &&
        riskAreas != null &&
        riskAreas.length > 0 && (
          <Form style={{ width: "100%" }}>
            <div className="risk-details">
              <h5 className="text-secondary">
                <b>Relación con Indicador de Riesgo</b>
              </h5>
              <div className="container-form-controls">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-md-3"
                    controlId="formGridCodIndicador"
                  >
                    <Form.Label>Código</Form.Label>
                    <Form.Select
                      value={
                        selectedRisk.risk_indicator_id != null
                          ? selectedRisk.risk_indicator_id
                          : 1
                      }
                      onChange={(e) =>
                        setSelectedRisk({
                          ...selectedRisk,
                          risk_indicator_id: parseInt(e.target.value),
                        })
                      }
                    >
                      {riskIndicators.map((ind) => (
                        <option key={`ind-${ind.id}`} value={ind.id}>
                          {ind.codigo}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-7"
                    controlId="formGridNombIndicador"
                  >
                    <Form.Label>Nombre del Indicador de Riesgo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      readOnly
                      value={
                        selectedRisk.risk_indicator_id != null
                          ? riskIndicators[
                              riskIndicators.findIndex(
                                (ind) =>
                                  ind.id === selectedRisk.risk_indicator_id
                              )
                            ].nombre
                          : ""
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridEscala"
                  >
                    <Form.Label>Escala</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0.00"
                      value={selectedRisk.escala_indicador}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          escala_indicador: isNaN(parseInt(e.target.value))
                            ? 0
                            : parseInt(e.target.value),
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Text>
                    La escala del riesgo sobre el indicador establece el nivel
                    de impacto que tendrá este en la medición del nivel de
                    riesgo del indicador
                  </Form.Text>
                </Row>
              </div>
              <h5 className="text-secondary">
                <b>Relación con Procesos de la Organización</b>
              </h5>
              <div className="container-form-controls">
                {riskAreas != null && (
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
                        {riskAreas.map((area) => (
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
                            ? riskAreas[
                                riskAreas.findIndex(
                                  (area) => area.id === selectedArea
                                )
                              ].nombre
                            : ""
                        }
                      />
                    </Form.Group>
                  </Row>
                )}
                {riskUnitAreas != null && riskUnitAreas.length > 0 && (
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
                        {riskUnitAreas.map((unit) => (
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
                            ? riskUnitAreas[
                                riskUnitAreas.findIndex(
                                  (unit) => unit.id === selectedUnitArea
                                )
                              ].nombre
                            : ""
                        }
                      />
                    </Form.Group>
                    <Form.Text>
                      En caso el código de la unidad coincida con el del área,
                      se mostrarán la lista de procesos asociados al área.
                    </Form.Text>
                  </Row>
                )}
                {riskProcess != null && riskProcess.length > 0 && (
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="col-md-3"
                      controlId="formGridCodProceso"
                    >
                      <Form.Label>Código del Proceso</Form.Label>
                      <Form.Select
                        value={
                          selectedRisk.process_id != null
                            ? selectedRisk.process_id
                            : -1
                        }
                        onChange={(e) =>
                          setSelectedRisk({
                            ...selectedRisk,
                            process_id: parseInt(e.target.value),
                          })
                        }
                      >
                        <option key={`default`} value={-1}>
                          -
                        </option>
                        {riskProcess.map((process) => (
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
                      controlId="formGridNombProceso"
                    >
                      <Form.Label>
                        Nombre del Proceso
                        {riskUnitAreas != null &&
                          selectedUnitArea != -1 &&
                          (riskUnitAreas[
                            riskUnitAreas.findIndex(
                              (unit) => unit.id === selectedUnitArea
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
                          riskProcess != null &&
                          riskProcess.length > 0 &&
                          selectedRisk.process_id != null &&
                          selectedRisk.process_id != -1
                            ? riskProcess[
                                riskProcess.findIndex(
                                  (process) =>
                                    process.id === selectedRisk.process_id
                                )
                              ] != null
                              ? riskProcess[
                                  riskProcess.findIndex(
                                    (process) =>
                                      process.id === selectedRisk.process_id
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
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={selectedRisk.codigo}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          codigo: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  {riskTreatments != null && (
                    <Form.Group
                      as={Col}
                      className="col-md-3"
                      controlId="formGridTratamiento"
                    >
                      <Form.Label>Tratamiento</Form.Label>
                      <Form.Select
                        value={
                          selectedRisk.risk_treatment_id != null
                            ? selectedRisk.risk_treatment_id
                            : -1
                        }
                        onChange={(e) =>
                          setSelectedRisk({
                            ...selectedRisk,
                            risk_treatment_id: parseInt(e.target.value),
                          })
                        }
                      >
                        <option key={`default`} value={-1}>
                          Sin evaluar
                        </option>
                        {riskTreatments.map((treatment) => (
                          <option
                            key={`treatment-${treatment.id}`}
                            value={treatment.id}
                          >
                            {treatment.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridProbabilidad"
                  >
                    <Form.Label>Probabilidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      value={selectedRisk.probabilidad}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          probabilidad:
                            e.target.value != ""
                              ? parseFloat(e.target.value)
                              : 0,
                          severidad_riesgo:
                            e.target.value != ""
                              ? (parseFloat(e.target.value) *
                                  selectedRisk.impacto) /
                                10
                              : 0,
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridImpacto"
                  >
                    <Form.Label>Impacto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 10"
                      value={selectedRisk.impacto}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          impacto:
                            e.target.value != ""
                              ? parseFloat(e.target.value)
                              : 0,
                          severidad_riesgo:
                            e.target.value != ""
                              ? (parseFloat(e.target.value) *
                                  selectedRisk.probabilidad) /
                                10
                              : 0,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-md-2"
                    controlId="formGridSeveridad"
                  >
                    <Form.Label>Severidad</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="de 100"
                      readOnly
                      value={selectedRisk.impacto * selectedRisk.probabilidad}
                    />
                  </Form.Group>
                  <Form.Group as={Col} className="col-md-6"></Form.Group>
                  <Form.Group as={Col} className="col-md-6">
                    <Form.Text>
                      Severidad = Cálculo de Probabilidad [1-10] x Impacto
                      [1-10]
                    </Form.Text>
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
                      value={selectedRisk.nombre}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          nombre: e.target.value,
                        });
                      }}
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
                      value={selectedRisk.descripcion}
                      onChange={(e) => {
                        setSelectedRisk({
                          ...selectedRisk,
                          descripcion: e.target.value,
                        });
                      }}
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
                        value={selectedRisk.sintomas}
                        onChange={(e) => {
                          setSelectedRisk({
                            ...selectedRisk,
                            sintomas: e.target.value,
                          });
                        }}
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
                        value={selectedRisk.causas}
                        onChange={(e) => {
                          setSelectedRisk({
                            ...selectedRisk,
                            causas: e.target.value,
                          });
                        }}
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
                        value={selectedRisk.plan_accion}
                        onChange={(e) => {
                          setSelectedRisk({
                            ...selectedRisk,
                            plan_accion: e.target.value,
                          });
                        }}
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
                        value={selectedRisk.responsables_encargados}
                        onChange={(e) => {
                          setSelectedRisk({
                            ...selectedRisk,
                            responsables_encargados: e.target.value,
                          });
                        }}
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
                        value={selectedRisk.especificacion}
                        onChange={(e) => {
                          setSelectedRisk({
                            ...selectedRisk,
                            especificacion: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
        )}
    </div>
  );
}

function Risk_Lista() {
  async function retrieveRiskTreatmentList() {
    const data = await getRiskTreatment();

    return data;
  }

  async function retrieveRiskIndicatorList() {
    const data = await getRiskIndicator();

    return data;
  }

  async function retrieveAreaList() {
    const data = await getArea();

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

  async function retrieveRiskList() {
    const data = await getRiskDetail();

    return data;
  }

  async function retrieveCreateRisk(body) {
    const data = await createRisk(body);

    return data;
  }

  async function retrieveEditRisk(id, body) {
    const data = await updateRisk(id, body);

    return data;
  }

  async function retrieveDeleteRisk(id) {
    const data = await deleteRisk(id);

    return data;
  }

  const [listRisk, setListRisk] = useState(null);
  const [riskTreatments, setRiskTreatments] = useState(null);
  const [riskIndicators, setRiskIndicators] = useState(null);
  const [riskAreas, setRiskAreas] = useState(null);
  const [riskUnitAreas, setRiskUnitAreas] = useState(null);
  const [riskProcess, setRiskProcess] = useState(null);
  const [selectedArea, setSelectedArea] = useState(-1);
  const [selectedUnitArea, setSelectedUnitArea] = useState(-1);
  const [newRisk, setNewRisk] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const fillListaContent = (risks) => {
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
                  setSelectedRisk(risk);
                  setSelectedUnitArea(1000 + risk.Process.UnitArea.id);
                  setSelectedArea(risk.Process.UnitArea.Area.id);
                  setOpenEditRisks(true);
                }}
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
                onClick={() => {
                  setSelectedRisk(risk);
                  setOpenRiskDetail(true);
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

  const handleCreateRisks = (newRisk, setNewRisk, listRisk, setListRisk) => {
    if (
      newRisk.risk_indicator_id == null ||
      newRisk.risk_indicator_id == -1 ||
      newRisk.process_id == null ||
      newRisk.process_id == -1
    )
      return;
    if (newRisk.risk_treatment_id == -1) newRisk.risk_treatment_id = null;
    retrieveCreateRisk(newRisk).then(() => {
      setNewRisk(null);
      retrieveRiskList().then((risks) => {
        setListRisk(risks);
      });
    });
  };
  const handleEditRisks = (
    selectedRisk,
    setSelectedRisk,
    listRisk,
    setListRisk
  ) => {
    if (
      selectedRisk.risk_indicator_id == null ||
      selectedRisk.risk_indicator_id == -1 ||
      selectedRisk.process_id == null ||
      selectedRisk.process_id == -1
    )
      return;
    if (selectedRisk.risk_treatment_id == -1)
      selectedRisk.risk_treatment_id = null;
    const body = {
      risk_indicator_id: selectedRisk.risk_indicator_id,
      process_id: selectedRisk.process_id,
      risk_treatment_id: selectedRisk.risk_treatment_id,
      codigo: selectedRisk.codigo,
      nombre: selectedRisk.nombre,
      descripcion: selectedRisk.descripcion,
      probabilidad: selectedRisk.probabilidad,
      impacto: selectedRisk.impacto,
      severidad_riesgo: selectedRisk.severidad_riesgo,
      escala_indicador: selectedRisk.escala_indicador,
      sintomas: selectedRisk.sintomas,
      causas: selectedRisk.causas,
      plan_accion: selectedRisk.plan_accion,
      responsables_encargados: selectedRisk.responsables_encargados,
      especificacion: selectedRisk.especificacion,
    };
    retrieveEditRisk(selectedRisk.id, body).then(() => {
      setSelectedRisk(null);
      retrieveRiskList().then((risks) => {
        setListRisk(risks);
      });
    });
  };
  const handleRemoveRisks = (
    selectedRisk,
    setSelectedRisk,
    listRisk,
    setListRisk
  ) => {
    retrieveDeleteRisk(selectedRisk.id).then(() => {
      setSelectedRisk(null);
      retrieveRiskList().then((risks) => {
        setListRisk(risks);
      });
    });
  };

  useEffect(() => {
    retrieveRiskList().then((risks) => {
      setListRisk(risks);
      retrieveRiskTreatmentList().then((treatments) => {
        setRiskTreatments(treatments);
        retrieveRiskIndicatorList().then((indicators) => {
          setRiskIndicators(indicators);
          retrieveAreaList().then((areas) => {
            setRiskAreas(areas);
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    if (selectedArea != -1) {
      retrieveUnitbyAreaList(selectedArea).then((units) => {
        setRiskUnitAreas(units);
      });
    } else {
      setRiskUnitAreas(null);
    }
    if (selectedUnitArea <= 1000) setSelectedUnitArea(-1);
    else setSelectedUnitArea(selectedUnitArea - 1000);
    setRiskProcess(null);
  }, [selectedArea]);

  useEffect(() => {
    if (selectedUnitArea != -1) {
      retrieveProcessbyUnitList(selectedUnitArea).then((process) => {
        setRiskProcess(process);
      });
    } else {
      setRiskProcess(null);
    }
  }, [selectedUnitArea]);

  const [openRiskDetail, setOpenRiskDetail] = useState(false);
  const [openNewRisks, setOpenNewRisks] = useState(false);
  const [openEditRisks, setOpenEditRisks] = useState(false);
  const [isDetailRiskOpen, setIsDetailRiskOpen] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Lista de Riesgos">
          <div className="header-risk">
            <p>
              La lista de riesgos permite gestionar eficazmente los riesgos
              identificados en el sistema ISOIntegrity 37001. Estos riesgos se
              manejan conforme a la metodología de gestión de riesgos definida
              en la <b>norma ISO 31000:2018</b>. Cada riesgo está vinculado a
              los procesos organizacionales y a los indicadores de riesgo del
              Bribery Risk Index (BRI), asegurando una evaluación integral y
              precisa.
            </p>
            <div className="header-risk-detail">
              <h5
                className="text-secondary"
                onClick={() => {
                  setIsDetailRiskOpen(!isDetailRiskOpen);
                }}
              >
                Detalle de la Definición de Riesgos{" "}
                <FontAwesomeIcon
                  icon={isDetailRiskOpen ? faChevronUp : faChevronDown}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </h5>
              {isDetailRiskOpen && (
                <section className="header-risk-detail dropdown">
                  <p>
                    Mediante la evaluación de riesgos, se determina la{" "}
                    <b>severidad de cada riesgo</b>. La evaluación se representa
                    como un número que va del 1 al 100 y se calcula aplicando el
                    producto de la probabilidad y el impacto.
                  </p>
                  <ul>
                    <li>
                      La <b>probabilidad</b> se describe como la frecuencia en
                      la que un riesgo puede ocurrir. Se calcula del 1 al 10.
                    </li>
                    <li>
                      El <b>impacto</b> se describe como un grado de afectación
                      en caso ocurra el riesgo. Se calcula del 1 al 10.
                    </li>
                  </ul>
                  <p>
                    El cálculo resultante demuestra la severidad que presenta el
                    riesgo y esta puede categorizarse en 3 estados distintos:
                    Nivel de tolerancia bajo, medio y alto.
                  </p>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <h6>Matriz de Severidad de los Riesgos</h6>
                  </div>
                  <img
                    src="/assets/Matriz-Riesgos.png"
                    className="d-inline-block align-text-top"
                    style={{
                      height: "396px",
                      width: "100%",
                      objectFit: "scale-down",
                    }}
                    alt="Matriz de Riesgos de Evaluación de Riesgos"
                  />
                  <p>
                    Mediante el reporte de divulgación de irregularidades o
                    factores de riesgo de soborno se establece la generación de{" "}
                    <b>casos reportados asociados a los riesgos</b>. Ambos
                    factores definirán el{" "}
                    <b>
                      <u>nivel de riesgo</u>
                    </b>
                  </p>
                </section>
              )}
            </div>
            <div className="button-group">
              {/* <Button
              onClick={() => setOpenNewRisks(true)}
              size="md"
              variant="primary"
            >
              Cargar Lista de Riesgos
            </Button> */}
              <Button
                onClick={() => {
                  setNewRisk({
                    risk_indicator_id: 1,
                    process_id: null,
                    risk_treatment_id: null,
                    codigo: "",
                    nombre: "",
                    descripcion: "",
                    probabilidad: 0.0,
                    impacto: 0.0,
                    severidad_riesgo: 0.0,
                    escala_indicador: 0.0,
                    sintomas: "",
                    causas: "",
                    plan_accion: "",
                    responsables_encargados: "",
                    especificacion: "",
                  });
                  setOpenNewRisks(true);
                }}
                size="md"
                variant="primary"
              >
                Nuevo Riesgo de Soborno
              </Button>
            </div>
          </div>
          {listRisk != null && listRisk.length > 0 ? (
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
                listItems={fillListaContent(listRisk)}
                overrideColor="override-white"
                maxHeight="632px"
              />
            </div>
          ) : listRisk != null && listRisk.length <= 0 ? (
            <div className="no-risk">
              <p className="text-primary text-center">
                No existen riesgos existentes hasta el momento. Para crear un
                nuevo riesgo se debe establecer la estructura organizativa
                dentro del sistema.
              </p>
            </div>
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
        </MainContainer>
        <Modals
          openModal={openRiskDetail}
          setOpenModal={setOpenRiskDetail}
          title={`Detalle del Riesgo - ${selectedRisk?.codigo}`}
          size="lg"
          body={modalRiskDetail(selectedRisk)}
        />
        <Modals
          openModal={openNewRisks}
          setOpenModal={setOpenNewRisks}
          title="Nuevo Riesgo de Soborno"
          footer={["Guardar", "Cerrar"]}
          size="lg"
          body={modalNewRisks(
            newRisk,
            setNewRisk,
            riskTreatments,
            riskIndicators,
            riskAreas,
            riskUnitAreas,
            riskProcess,
            selectedArea,
            setSelectedArea,
            selectedUnitArea,
            setSelectedUnitArea
          )}
          handleConfirm={() => {
            setOpenNewRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            handleCreateRisks(newRisk, setNewRisk, listRisk, setListRisk);
          }}
          handleCancel={() => {
            setOpenNewRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            setNewRisk(null);
          }}
          handleClose={() => {
            setOpenNewRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            setNewRisk(null);
          }}
        />
        <Modals
          openModal={openEditRisks}
          setOpenModal={setOpenEditRisks}
          title={`Configuración del Riesgo - ${selectedRisk?.codigo}`}
          footer={["Guardar", "Eliminar"]}
          size="lg"
          body={modalEditRisks(
            selectedRisk,
            setSelectedRisk,
            riskTreatments,
            riskIndicators,
            riskAreas,
            riskUnitAreas,
            riskProcess,
            selectedArea,
            setSelectedArea,
            selectedUnitArea,
            setSelectedUnitArea
          )}
          handleConfirm={() => {
            setOpenEditRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            handleEditRisks(
              selectedRisk,
              setSelectedRisk,
              listRisk,
              setListRisk
            );
          }}
          handleCancel={() => {
            setOpenEditRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            handleRemoveRisks(
              selectedRisk,
              setSelectedRisk,
              listRisk,
              setListRisk
            );
          }}
          handleClose={() => {
            setOpenEditRisks(false);
            setRiskUnitAreas(null);
            setRiskProcess(null);
            setSelectedUnitArea(-1);
            setSelectedArea(-1);
            setSelectedRisk(null);
          }}
        />
      </div>
    </>
  );
}

export default Risk_Lista;
