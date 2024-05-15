import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";
import Modal from "../../../components/Modals/Modals";
import NavBar from "../../../components/NavBar/NavBar";
import "./Org_Estructura.scss";
import {
  getOrganizationById,
  getOrganizationStructure,
} from "../../../services/organization.services";
import Spinner from "react-bootstrap/esm/Spinner";
import {
  createGroupedArea,
  deleteGroupedArea,
  updateGroupedArea,
} from "../../../services/groupedarea.services";
import {
  createArea,
  deleteArea,
  updateArea,
} from "../../../services/area.services";
import {
  createUnitArea,
  deleteUnitArea,
  updateUnitArea,
} from "../../../services/unitarea.services";
import {
  createProcess,
  updateProcess,
  deleteProcess,
} from "../../../services/process.services";

function modalNewGroupedAreas(newGroupedArea, setNewGroupedArea) {
  return (
    <div className="modal-newgrouped-body">
      {newGroupedArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={newGroupedArea.codigo}
                onChange={(e) => {
                  setNewGroupedArea({
                    ...newGroupedArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Grupo</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={newGroupedArea.nombre}
                onChange={(e) => {
                  setNewGroupedArea({
                    ...newGroupedArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalEditGroupedAreas(selectecGroupedArea, setSelectecGroupedArea) {
  return (
    <div className="modal-newgrouped-body">
      {selectecGroupedArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={selectecGroupedArea.codigo}
                onChange={(e) => {
                  setSelectecGroupedArea({
                    ...selectecGroupedArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Grupo</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={selectecGroupedArea.nombre}
                onChange={(e) => {
                  setSelectecGroupedArea({
                    ...selectecGroupedArea,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalNewAreas(newArea, setNewArea) {
  return (
    <div className="modal-newgrouped-body">
      {newArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={newArea.codigo}
                onChange={(e) => {
                  setNewArea({
                    ...newArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Área</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={newArea.nombre}
                onChange={(e) => {
                  setNewArea({
                    ...newArea,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={newArea.descripcion}
                onChange={(e) => {
                  setNewArea({
                    ...newArea,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese los responsables del área"
                value={newArea.responsable}
                onChange={(e) => {
                  setNewArea({
                    ...newArea,
                    responsable: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalEditAreas(selectedArea, setSelectedArea) {
  return (
    <div className="modal-newgrouped-body">
      {selectedArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={selectedArea.codigo}
                onChange={(e) => {
                  setSelectedArea({
                    ...selectedArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Área</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={selectedArea.nombre}
                onChange={(e) => {
                  setSelectedArea({
                    ...selectedArea,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={selectedArea.descripcion}
                onChange={(e) => {
                  setSelectedArea({
                    ...selectedArea,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese los responsables del área"
                value={selectedArea.responsable}
                onChange={(e) => {
                  setSelectedArea({
                    ...selectedArea,
                    responsable: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalNewUnitAreas(newUnitArea, setNewUnitArea) {
  return (
    <div className="modal-newgrouped-body">
      {newUnitArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={newUnitArea.codigo}
                onChange={(e) => {
                  setNewUnitArea({
                    ...newUnitArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre de la Unidad</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={newUnitArea.nombre}
                onChange={(e) => {
                  setNewUnitArea({
                    ...newUnitArea,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={newUnitArea.descripcion}
                onChange={(e) => {
                  setNewUnitArea({
                    ...newUnitArea,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese los responsables de la unidad"
                value={newUnitArea.responsable}
                onChange={(e) => {
                  setNewUnitArea({
                    ...newUnitArea,
                    responsable: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalEditUnitAreas(selectedUnitArea, setSelectedUnitArea) {
  return (
    <div className="modal-newgrouped-body">
      {selectedUnitArea != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={selectedUnitArea.codigo}
                onChange={(e) => {
                  setSelectedUnitArea({
                    ...selectedUnitArea,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre de la Unidad</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={selectedUnitArea.nombre}
                onChange={(e) => {
                  setSelectedUnitArea({
                    ...selectedUnitArea,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={selectedUnitArea.descripcion}
                onChange={(e) => {
                  setSelectedUnitArea({
                    ...selectedUnitArea,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Responsable</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese los responsables de la unidad"
                value={selectedUnitArea.responsable}
                onChange={(e) => {
                  setSelectedUnitArea({
                    ...selectedUnitArea,
                    responsable: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalNewUnitProcess(newUnitProcess, setNewUnitProcess) {
  return (
    <div className="modal-newgrouped-body">
      {newUnitProcess != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={newUnitProcess.codigo}
                onChange={(e) => {
                  setNewUnitProcess({
                    ...newUnitProcess,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Proceso</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={newUnitProcess.nombre}
                onChange={(e) => {
                  setNewUnitProcess({
                    ...newUnitProcess,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={newUnitProcess.descripcion}
                onChange={(e) => {
                  setNewUnitProcess({
                    ...newUnitProcess,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Presenta controles antisoborno"
                checked={newUnitProcess.tiene_controles}
                onChange={() => {
                  setNewUnitProcess({
                    ...newUnitProcess,
                    tiene_controles: !newUnitProcess.tiene_controles,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalEditUnitProcess(selectedUnitProcess, setSelectedUnitProcess) {
  return (
    <div className="modal-newgrouped-body">
      {selectedUnitProcess != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={selectedUnitProcess.codigo}
                onChange={(e) => {
                  setSelectedUnitProcess({
                    ...selectedUnitProcess,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Proceso</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={selectedUnitProcess.nombre}
                onChange={(e) => {
                  setSelectedUnitProcess({
                    ...selectedUnitProcess,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={selectedUnitProcess.descripcion}
                onChange={(e) => {
                  setSelectedUnitProcess({
                    ...selectedUnitProcess,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Presenta controles antisoborno"
                checked={selectedUnitProcess.tiene_controles}
                onChange={() => {
                  setSelectedUnitProcess({
                    ...selectedUnitProcess,
                    tiene_controles: !selectedUnitProcess.tiene_controles,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalOpenNewAreasProcess(newAreaProcess, setNewAreaProcess) {
  return (
    <div className="modal-newgrouped-body">
      {newAreaProcess != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={newAreaProcess.codigo}
                onChange={(e) => {
                  setNewAreaProcess({
                    ...newAreaProcess,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Proceso</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={newAreaProcess.nombre}
                onChange={(e) => {
                  setNewAreaProcess({
                    ...newAreaProcess,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={newAreaProcess.descripcion}
                onChange={(e) => {
                  setNewAreaProcess({
                    ...newAreaProcess,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Presenta controles antisoborno"
                checked={newAreaProcess.tiene_controles}
                onChange={() => {
                  setNewAreaProcess({
                    ...newAreaProcess,
                    tiene_controles: !newAreaProcess.tiene_controles,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}
function modalEditAreasProcess(selectedAreaProcess, setSelectedAreaProcess) {
  return (
    <div className="modal-newgrouped-body">
      {selectedAreaProcess != null && (
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar codigo"
                value={selectedAreaProcess.codigo}
                onChange={(e) => {
                  setSelectedAreaProcess({
                    ...selectedAreaProcess,
                    codigo: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              className="col-md-9"
              controlId="formGridPassword"
            >
              <Form.Label>Nombre del Proceso</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={selectedAreaProcess.nombre}
                onChange={(e) => {
                  setSelectedAreaProcess({
                    ...selectedAreaProcess,
                    nombre: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción"
                value={selectedAreaProcess.descripcion}
                onChange={(e) => {
                  setSelectedAreaProcess({
                    ...selectedAreaProcess,
                    descripcion: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Presenta controles antisoborno"
                checked={selectedAreaProcess.tiene_controles}
                onChange={() => {
                  setSelectedAreaProcess({
                    ...selectedAreaProcess,
                    tiene_controles: !selectedAreaProcess.tiene_controles,
                  });
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </div>
  );
}

function Org_Estructura() {
  async function retrieveOrganizationInfo() {
    const data = await getOrganizationById(1);

    return data;
  }
  async function retrieveOrganizationStructure() {
    const data = await getOrganizationStructure();

    return data;
  }
  async function retrieveCreateGroupedArea(body) {
    const data = await createGroupedArea(body);

    return data;
  }
  async function retrieveEditGroupedArea(id, body) {
    const data = await updateGroupedArea(id, body);

    return data;
  }
  async function retrieveDeleteGroupedArea(id) {
    const data = await deleteGroupedArea(id);

    return data;
  }
  async function retrieveCreateArea(body) {
    const data = await createArea(body);

    return data;
  }
  async function retrieveEditArea(id, body) {
    const data = await updateArea(id, body);

    return data;
  }
  async function retrieveDeleteArea(id) {
    const data = await deleteArea(id);

    return data;
  }
  async function retrieveCreateUnitArea(body) {
    const data = await createUnitArea(body);

    return data;
  }
  async function retrieveEditUnitArea(id, body) {
    const data = await updateUnitArea(id, body);

    return data;
  }
  async function retrieveDeleteUnitArea(id) {
    const data = await deleteUnitArea(id);

    return data;
  }
  async function retrieveCreateProcessUnit(body) {
    const data = await createProcess(body);

    return data;
  }
  async function retrieveEditProcessUnit(id, body) {
    const data = await updateProcess(id, body);

    return data;
  }
  async function retrieveDeleteProcessUnit(id) {
    const data = await deleteProcess(id);

    return data;
  }
  async function retrieveCreateProcessArea(body) {
    const data = await createProcess(body);

    return data;
  }
  async function retrieveEditProcessArea(id, body) {
    const data = await updateProcess(id, body);

    return data;
  }

  async function retrieveDeleteProcessArea(id) {
    const data = await deleteProcess(id);

    return data;
  }

  /* ONE VARIABLE TO STORE EVERY ITEM FROM THE ORG STRUCTURE */
  const [structure, setStructure] = useState({
    Organization: null,
    GroupedAreas: null,
  });
  const [newStruct, setNewStruct] = useState(null);
  const [selectedStruct, setSelectedStruct] = useState(null);

  useEffect(() => {
    retrieveOrganizationInfo().then((retrievedOrg) => {
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          Organization: retrievedOrg,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  }, []);

  const fillProcesos = (listProcesos, idUnidad) => {
    let renderProcesos = [];

    listProcesos.forEach((proceso) => {
      renderProcesos.push({
        key: proceso.id.toString(),
        content: (
          <div className="lista-unidades-procesos-item">
            <div className="lista-unidades-procesos-item1">
              <p className="text-primary">
                <b>{`${proceso.codigo} - ${proceso.nombre}`}</b>
              </p>
              <small className="text-dark">{proceso.descripcion}</small>
              <small
                className={
                  proceso.tiene_controles ? "text-success" : "text-danger"
                }
              >
                {proceso.tiene_controles ? "P" : "No P"}resenta controles
                antisoborno
              </small>
            </div>
            <div className="button-group">
              <Button
                onClick={() => {
                  setSelectedStruct({
                    id: proceso.id,
                    unit_area_id: idUnidad,
                    codigo: proceso.codigo,
                    nombre: proceso.nombre,
                    descripcion: proceso.descripcion,
                    tiene_controles: proceso.tiene_controles,
                  });
                  setOpenEditUnitProcess(true);
                }}
                size="md"
                variant="primary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1.25rem",
                  }}
                />
              </Button>
            </div>
          </div>
        ),
      });
    });

    return renderProcesos;
  };
  const fillProcesosArea = (listProcesosArea, idArea) => {
    let renderProcesosArea = [];

    listProcesosArea.forEach((proceso) => {
      renderProcesosArea.push({
        key: proceso.id.toString(),
        content: (
          <div className="lista-unidades-procesos-item">
            <div className="lista-unidades-procesos-item1">
              <p className="text-primary">
                <b>{`${proceso.codigo} - ${proceso.nombre}`}</b>
              </p>
              <small className="text-dark">{proceso.descripcion}</small>
              <small
                className={
                  proceso.tiene_controles ? "text-success" : "text-danger"
                }
              >
                {proceso.tiene_controles ? "P" : "No P"}resenta controles
                antisoborno
              </small>
            </div>
            <div className="button-group">
              <Button
                onClick={() => {
                  setSelectedStruct({
                    id: proceso.id,
                    unit_area_id: idArea,
                    codigo: proceso.codigo,
                    nombre: proceso.nombre,
                    descripcion: proceso.descripcion,
                    tiene_controles: proceso.tiene_controles,
                  });
                  setOpenEditAreasProcess(true);
                }}
                size="md"
                variant="primary"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  style={{
                    fontSize: "1.25rem",
                  }}
                />
              </Button>
            </div>
          </div>
        ),
      });
    });

    return renderProcesosArea;
  };
  const fillUnidades = (listUnidades, idArea) => {
    let renderUnidades = [];

    listUnidades.forEach((unidad) => {
      renderUnidades.push({
        header: (
          <div key={unidad.id} className="accordion-unidades-lista-header">
            <h6 className="text-secondary">
              <b>{`${unidad.nombre} - ${unidad.codigo}`}</b>
            </h6>
          </div>
        ),
        hasBody: true,
        body: (
          <div className="accordion-unidades-lista-body">
            <p className="text-secondary">{unidad.descripcion}</p>
            <div className="accordion-unidades-procesos">
              <h6 className="text-secondary">
                <b>Lista de Procesos</b>
              </h6>
              <div className="button-group">
                <Button
                  onClick={() => {
                    setNewStruct({
                      unit_area_id: unidad.id,
                      codigo: "",
                      nombre: "",
                      descripcion: "",
                      tiene_controles: false,
                    });
                    setOpenNewUnitProcess(true);
                  }}
                  size="md"
                  variant="secondary"
                >
                  Nuevo Proceso
                </Button>
                <Button
                  onClick={() => {
                    setSelectedStruct({
                      id: unidad.id,
                      area_id: idArea,
                      codigo: unidad.codigo,
                      nombre: unidad.nombre,
                      descripcion: unidad.descripcion,
                      responsable: unidad.responsable,
                    });
                    setOpenEditUnitAreas(true);
                  }}
                  size="md"
                  variant="secondary"
                >
                  Configuración de la Unidad
                </Button>
              </div>
            </div>
            {unidad.Processes != null && (
              <ListTableBox
                listItems={fillProcesos(unidad.Processes, unidad.id)}
                overrideColor="override-white"
              />
            )}
          </div>
        ),
      });
    });

    return renderUnidades;
  };
  const fillAreas = (listAreas, idGroupedArea) => {
    let renderAreas = [];

    listAreas.forEach((area) => {
      renderAreas.push({
        header: (
          <div key={area.id} className="accordion-estructura-areas-header">
            <h5 className="text-primary">
              <b>{`${area.nombre} - ${area.codigo}`}</b>
            </h5>
          </div>
        ),
        hasBody: true,
        body: (
          <div className="accordion-areas-body">
            <p className="text-dark">{area.descripcion}</p>
            {/* Lista de Unidades */}
            <div className="accordion-unidades-header">
              <h5 className="text-primary">
                <b>Lista de Unidades</b>
              </h5>
              <div className="button-group">
                <Button
                  onClick={() => {
                    setNewStruct({
                      area_id: area.id,
                      codigo: "",
                      nombre: "",
                      descripcion: "",
                      responsable: "",
                    });
                    setOpenNewUnitAreas(true);
                  }}
                  size="md"
                  variant="primary"
                >
                  Nueva Unidad
                </Button>
                <Button
                  onClick={() => {
                    setSelectedStruct({
                      id: area.id,
                      grouped_area_id: idGroupedArea,
                      codigo: area.codigo,
                      nombre: area.nombre,
                      descripcion: area.descripcion,
                      tiene_controles: area.tiene_controles,
                    });
                    setOpenEditAreas(true);
                  }}
                  size="md"
                  variant="primary"
                >
                  Configuración del Área
                </Button>
              </div>
            </div>
            {area.Unit_Unit !== null && (
              <div className="accordion-unidades-body">
                <AccordionBox
                  accordionItems={fillUnidades(area.Unit_Unit, area.id)}
                  overrideColor="override-white"
                ></AccordionBox>
              </div>
            )}
            {/* Lista de Procesos del Area*/}
            <div className="accordion-procesosarea-header">
              <h5 className="text-primary">
                <b>Lista de Procesos del Area</b>
              </h5>
              <div className="button-group">
                <Button
                  onClick={() => {
                    setNewStruct({
                      unit_area_id: area.id,
                      codigo: "",
                      nombre: "",
                      descripcion: "",
                      tiene_controles: false,
                    });
                    setOpenNewAreasProcess(true);
                  }}
                  size="md"
                  variant="secondary"
                >
                  Nuevo Proceso
                </Button>
              </div>
            </div>
            {area.Area_Unit[0].Processes != null && (
              <ListTableBox
                listItems={fillProcesosArea(
                  area.Area_Unit[0].Processes,
                  area.Area_Unit[0].id
                )}
                overrideColor="override-gray"
              />
            )}
          </div>
        ),
      });
    });

    return renderAreas;
  };

  const handleCreateGroupedArea = (
    structure,
    setStructure,
    newGroupedArea,
    setNewGroupedArea
  ) => {
    retrieveCreateGroupedArea(newGroupedArea).then(() => {
      setNewGroupedArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleEditGroupedArea = (
    structure,
    setStructure,
    selectecGroupedArea,
    setSelectecGroupedArea
  ) => {
    const body = {
      codigo: selectecGroupedArea.codigo,
      nombre: selectecGroupedArea.nombre,
    };
    retrieveEditGroupedArea(selectecGroupedArea.id, body).then(() => {
      setSelectecGroupedArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleDeleteGroupedArea = (
    structure,
    setStructure,
    selectecGroupedArea,
    setSelectecGroupedArea
  ) => {
    retrieveDeleteGroupedArea(selectecGroupedArea.id).then(() => {
      setSelectecGroupedArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleCreateArea = (structure, setStructure, newArea, setNewArea) => {
    retrieveCreateArea(newArea).then(() => {
      setNewArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleEditArea = (
    structure,
    setStructure,
    selectedArea,
    setSelectedArea
  ) => {
    const body = {
      grouped_area_id: selectedArea.grouped_area_id,
      codigo: selectedArea.codigo,
      nombre: selectedArea.nombre,
      descripcion: selectedArea.descripcion,
      responsable: selectedArea.responsable,
    };
    retrieveEditArea(selectedArea.id, body).then(() => {
      setSelectedArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleDeleteArea = (
    structure,
    setStructure,
    selectedArea,
    setSelectedArea
  ) => {
    retrieveDeleteArea(selectedArea.id).then(() => {
      setSelectedArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleCreateUnitArea = (
    structure,
    setStructure,
    newUnitArea,
    setNewUnitArea
  ) => {
    retrieveCreateUnitArea(newUnitArea).then(() => {
      setNewUnitArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleEditUnitArea = (
    structure,
    setStructure,
    selectedUnitArea,
    setSelectedUnitArea
  ) => {
    const body = {
      area_id: selectedUnitArea.area_id,
      codigo: selectedUnitArea.codigo,
      nombre: selectedUnitArea.nombre,
      descripcion: selectedUnitArea.descripcion,
      responsable: selectedUnitArea.responsable,
    };
    retrieveEditUnitArea(selectedUnitArea.id, body).then(() => {
      setSelectedUnitArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleDeleteUnitArea = (
    structure,
    setStructure,
    selectedUnitArea,
    setSelectedUnitArea
  ) => {
    retrieveDeleteUnitArea(selectedUnitArea.id).then(() => {
      setSelectedUnitArea(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleCreateProcessUnit = (
    structure,
    setStructure,
    newUnitProcess,
    setNewUnitProcess
  ) => {
    retrieveCreateProcessUnit(newUnitProcess).then(() => {
      setNewUnitProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleEditProcessUnit = (
    structure,
    setStructure,
    selectedUnitProcess,
    setSelectedUnitProcess
  ) => {
    const body = {
      unit_area_id: selectedUnitProcess.unit_area_id,
      codigo: selectedUnitProcess.codigo,
      nombre: selectedUnitProcess.nombre,
      descripcion: selectedUnitProcess.descripcion,
      tiene_controles: selectedUnitProcess.tiene_controles,
    };
    retrieveEditProcessUnit(selectedUnitProcess.id, body).then(() => {
      setSelectedUnitProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleDeleteProcessUnit = (
    structure,
    setStructure,
    selectedUnitProcess,
    setSelectedUnitProcess
  ) => {
    retrieveDeleteProcessUnit(selectedUnitProcess.id).then(() => {
      setSelectedUnitProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleCreateProcessArea = (
    structure,
    setStructure,
    newAreaProcess,
    setNewAreaProcess
  ) => {
    retrieveCreateProcessArea(newAreaProcess).then(() => {
      setNewAreaProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleEditProcessArea = (
    structure,
    setStructure,
    selectedAreaProcess,
    setSelectedAreaProcess
  ) => {
    const body = {
      unit_area_id: selectedAreaProcess.unit_area_id,
      codigo: selectedAreaProcess.codigo,
      nombre: selectedAreaProcess.nombre,
      descripcion: selectedAreaProcess.descripcion,
      tiene_controles: selectedAreaProcess.tiene_controles,
    };
    retrieveEditProcessArea(selectedAreaProcess.id, body).then(() => {
      setSelectedAreaProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const handleDeleteProcessArea = (
    structure,
    setStructure,
    selectedAreaProcess,
    setSelectedAreaProcess
  ) => {
    retrieveDeleteProcessArea(selectedAreaProcess.id).then(() => {
      setSelectedAreaProcess(null);
      retrieveOrganizationStructure().then((retrieveStructure) => {
        setStructure({
          ...structure,
          GroupedAreas: retrieveStructure,
        });
      });
    });
  };

  const [openNewGroupedAreas, setOpenNewGroupedAreas] = useState(false);
  const [openEditGroupedAreas, setOpenEditGroupedAreas] = useState(false);
  const [openNewAreas, setOpenNewAreas] = useState(false);
  const [openEditAreas, setOpenEditAreas] = useState(false);
  const [openNewUnitAreas, setOpenNewUnitAreas] = useState(false);
  const [openEditUnitAreas, setOpenEditUnitAreas] = useState(false);
  const [openNewUnitProcess, setOpenNewUnitProcess] = useState(false);
  const [openEditUnitProcess, setOpenEditUnitProcess] = useState(false);
  const [openNewAreasProcess, setOpenNewAreasProcess] = useState(false);
  const [openEditAreasProcess, setOpenEditAreasProcess] = useState(false);

  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Estructura de la Organizacion">
          {structure.Organization != null ? (
            <div className="header-org">
              <img
                src={structure.Organization.logo_filename}
                className="d-inline-block align-text-top"
                style={{ height: "100%", width: "196px" }}
                alt="Company Logo"
              />
              <div className="content-org">
                <h5 className="text-primary" style={{ width: "100%" }}>
                  <b>{structure.Organization.nombre}</b>
                </h5>
                <h6
                  className="text-primary text-end"
                  style={{ width: "13.25rem" }}
                >
                  <b>Rubro: </b>
                </h6>
                <p className="text-dark" style={{ width: "53.5rem" }}>
                  {structure.Organization.rubro}
                </p>
                <h6
                  className="text-primary text-end"
                  style={{ width: "13.25rem" }}
                >
                  <b>Categoría: </b>
                </h6>
                <p className="text-dark" style={{ width: "53.5rem" }}>
                  {`${structure.Organization.tipo} - ${structure.Organization.categoria}`}
                </p>
                <h6
                  className="text-primary text-end"
                  style={{ width: "13.25rem" }}
                >
                  <b>Dirección: </b>
                </h6>
                <p className="text-dark" style={{ width: "53.5rem" }}>
                  {`${structure.Organization.direccion}. ${structure.Organization.ciudad}, ${structure.Organization.pais}`}
                </p>
                <div className="button-group">
                  <Button
                    onClick={() => {
                      setNewStruct({
                        codigo: "",
                        nombre: "",
                      });
                      setOpenNewGroupedAreas(true);
                    }}
                    variant="primary"
                  >
                    Nuevo Grupo de Áreas
                  </Button>
                  {/* <Button variant="primary" disabled>
                Cargar Lista de Procesos
              </Button> */}
                </div>
              </div>
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
          <div className="accordion-group">
            {structure.GroupedAreas != null ? (
              <div className="accordion-body">
                {structure.GroupedAreas.map((group) => (
                  <>
                    <div key={group.id} className="grouped-areas">
                      <h4 className="text-primary">
                        <b>{`${group.nombre} - ${group.codigo}`}</b>
                      </h4>
                      <div className="button-group">
                        <Button
                          onClick={() => {
                            setNewStruct({
                              grouped_area_id: group.id,
                              codigo: "",
                              nombre: "",
                              descripcion: "",
                              responsable: "",
                            });
                            setOpenNewAreas(true);
                          }}
                          size="md"
                          variant="outline-primary"
                        >
                          Nueva Área
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedStruct({
                              id: group.id,
                              codigo: group.codigo,
                              nombre: group.nombre,
                              descripcion: group.descripcion,
                              responsable: group.responsable,
                            });
                            setOpenEditGroupedAreas(true);
                          }}
                          size="md"
                          variant="outline-primary"
                        >
                          Configuración
                        </Button>
                      </div>
                    </div>
                    <div className="accordion-areas">
                      {group.Areas != null && (
                        <AccordionBox
                          accordionItems={fillAreas(group.Areas, group.id)}
                          overrideColor="override-white"
                        ></AccordionBox>
                      )}
                    </div>
                  </>
                ))}
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
          </div>
        </MainContainer>
        {/* Lista de Modales */}
        <Modal
          openModal={openNewGroupedAreas}
          setOpenModal={setOpenNewGroupedAreas}
          title="Nuevo Grupo de Áreas"
          size="lg"
          body={modalNewGroupedAreas(newStruct, setNewStruct)}
          footer={["Guardar", "Cerrar"]}
          handleConfirm={() => {
            handleCreateGroupedArea(
              structure,
              setStructure,
              newStruct,
              setNewStruct
            );
            setOpenNewGroupedAreas(false);
          }}
        />
        <Modal
          openModal={openEditGroupedAreas}
          setOpenModal={setOpenEditGroupedAreas}
          title="Edición del Grupo de Áreas"
          size="lg"
          body={modalEditGroupedAreas(selectedStruct, setSelectedStruct)}
          footer={["Guardar", "Eliminar"]}
          handleConfirm={() => {
            handleEditGroupedArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditGroupedAreas(false);
          }}
          handleCancel={() => {
            handleDeleteGroupedArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditGroupedAreas(false);
          }}
        />
        <Modal
          openModal={openNewAreas}
          setOpenModal={setOpenNewAreas}
          title="Nueva Área"
          size="lg"
          body={modalNewAreas(newStruct, setNewStruct)}
          footer={["Guardar", "Cerrar"]}
          handleConfirm={() => {
            handleCreateArea(structure, setStructure, newStruct, setNewStruct);
            setOpenNewAreas(false);
          }}
        />
        <Modal
          openModal={openEditAreas}
          setOpenModal={setOpenEditAreas}
          title="Edición del Área"
          size="lg"
          body={modalEditAreas(selectedStruct, setSelectedStruct)}
          footer={["Guardar", "Eliminar"]}
          handleConfirm={() => {
            handleEditArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditAreas(false);
          }}
          handleCancel={() => {
            handleDeleteArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditAreas(false);
          }}
        />
        <Modal
          openModal={openNewUnitAreas}
          setOpenModal={setOpenNewUnitAreas}
          title="Nueva Unidad del Área"
          size="lg"
          body={modalNewUnitAreas(newStruct, setNewStruct)}
          footer={["Guardar", "Cerrar"]}
          handleConfirm={() => {
            handleCreateUnitArea(
              structure,
              setStructure,
              newStruct,
              setNewStruct
            );
            setOpenNewUnitAreas(false);
          }}
        />
        <Modal
          openModal={openEditUnitAreas}
          setOpenModal={setOpenEditUnitAreas}
          title="Edición de la Unidad"
          size="lg"
          body={modalEditUnitAreas(selectedStruct, setSelectedStruct)}
          footer={["Guardar", "Eliminar"]}
          handleConfirm={() => {
            handleEditUnitArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditUnitAreas(false);
          }}
          handleCancel={() => {
            handleDeleteUnitArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditUnitAreas(false);
          }}
        />
        <Modal
          openModal={openNewUnitProcess}
          setOpenModal={setOpenNewUnitProcess}
          title="Nuevo Proceso de la Unidad"
          size="lg"
          body={modalNewUnitProcess(newStruct, setNewStruct)}
          footer={["Guardar", "Cerrar"]}
          handleConfirm={() => {
            handleCreateProcessUnit(
              structure,
              setStructure,
              newStruct,
              setNewStruct
            );
            setOpenNewUnitProcess(false);
          }}
        />
        <Modal
          openModal={openEditUnitProcess}
          setOpenModal={setOpenEditUnitProcess}
          title="Edición del Proceso de la Unidad"
          size="lg"
          body={modalEditUnitProcess(selectedStruct, setSelectedStruct)}
          footer={["Guardar", "Eliminar"]}
          handleConfirm={() => {
            handleEditProcessUnit(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditUnitProcess(false);
          }}
          handleCancel={() => {
            handleDeleteProcessUnit(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditUnitProcess(false);
          }}
        />
        <Modal
          openModal={openNewAreasProcess}
          setOpenModal={setOpenNewAreasProcess}
          title="Nuevo Proceso del Área"
          size="lg"
          body={modalOpenNewAreasProcess(newStruct, setNewStruct)}
          footer={["Guardar", "Cerrar"]}
          handleConfirm={() => {
            handleCreateProcessArea(
              structure,
              setStructure,
              newStruct,
              setNewStruct
            );
            setOpenNewAreasProcess(false);
          }}
        />
        <Modal
          openModal={openEditAreasProcess}
          setOpenModal={setOpenEditAreasProcess}
          title="Edición del Proceso del Área"
          size="lg"
          body={modalEditAreasProcess(selectedStruct, setSelectedStruct)}
          footer={["Guardar", "Eliminar"]}
          handleConfirm={() => {
            handleEditProcessArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditAreasProcess(false);
          }}
          handleCancel={() => {
            handleDeleteProcessArea(
              structure,
              setStructure,
              selectedStruct,
              setSelectedStruct
            );
            setOpenEditAreasProcess(false);
          }}
        />
      </div>
    </>
  );
}

export default Org_Estructura;
