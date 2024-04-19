import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import MainContainer from "../../../components/Main/MainContainer";
import Modal from "../../../components/Modals/Modals";
import "./Org_Estructura.scss";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function modalNewGroupedAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingresar codigo" />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre del Grupo</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese la descripción" />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalEditGroupedAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar codigo"
              value="GER 0001"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre del Grupo</Form.Label>
            <Form.Control type="text" placeholder="" value="Órganos de línea" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              value="Conjunto de órganos de la institución que dan valor al desarrollo social, económico e integro de la organización"
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalNewAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingresar codigo" />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre del Área</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese la descripción" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Responsable</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese los responsables del área"
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalEditAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar codigo"
              value="LIN001"
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
              value="Gerencia Regional de Desarrollo Social"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              value="Órgano de línea técnico, normativo y ejecutivo responsable del diseño, conducción, coordinación, supervisión y evaluación de las políticas públicas regionales de desarrollo social y humano, en las materias específicas de educación, cultura, ciencia y tecnología, recreación, deportes, salud, vivienda, trabajo, población saneamiento, desarrollo social e igualdad de oportunidades"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Responsable</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese los responsables del área"
              value=""
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalNewUnitAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingresar codigo" />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre de la Unidad</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese la descripción" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Responsable</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese los responsables de la unidad"
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalEditUnitAreas() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar codigo"
              value="DRS001"
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
              value="Dirección Regional de Trabajo y Promoción del Empleo"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              value="La Dirección Regional de Trabajo y Promoción del Empleo (DRTPE) es un organismo descentralizado que opera en diferentes regiones del Perú. Su función principal es liderar la implementación de políticas y programas relacionados con el empleo y el desarrollo económico."
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Responsable</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese los responsables de la unidad"
              value=""
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalNewUnitProcess() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingresar codigo" />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre del Proceso</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese la descripción" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Presenta controles antisoborno"
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalEditUnitProcess() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar codigo"
              value="PRO001"
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
              value="Proceso de Gestionamiento de Contrataciones"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              value="Proceso de contratación es fundamental para asegurar que se incorpore al personal adecuado y que se cumplan las necesidades de la empresa"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Presenta controles antisoborno"
              checked={true}
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalOpenNewAreasProcess() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Ingresar codigo" />
          </Form.Group>

          <Form.Group
            as={Col}
            className="col-md-9"
            controlId="formGridPassword"
          >
            <Form.Label>Nombre del Proceso</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese la descripción" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Presenta controles antisoborno"
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
function modalEditAreasProcess() {
  return (
    <div className="modal-newgrouped-body">
      <Form style={{ width: "100%" }}>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-md-3" controlId="formGridEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar codigo"
              value="PRO001"
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
              value="Proceso de Gestionamiento de Contrataciones"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Ingrese la descripción"
              value="Proceso de contratación es fundamental para asegurar que se incorpore al personal adecuado y que se cumplan las necesidades de la empresa"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Presenta controles antisoborno"
              checked={true}
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

function Org_Estructura() {
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
    <div>
      <MainContainer title="Estructura de la Organizacion">
        <div className="header-org">
          <img
            src="/assets/company-logo.png"
            className="d-inline-block align-text-top"
            style={{ height: "100%", width: "196px" }}
            alt="Company Logo"
          />
          <div className="content-org">
            <h5 className="text-primary" style={{ width: "100%" }}>
              <b>Generic AB Organization S.A.C</b>
            </h5>
            <h6 className="text-primary text-end" style={{ width: "13.25rem" }}>
              <b>Rubro: </b>
            </h6>
            <p className="text-dark" style={{ width: "53.5rem" }}>
              Consultoras en Mercadotecnia / Marketing / Comercialización
            </p>
            <h6 className="text-primary text-end" style={{ width: "13.25rem" }}>
              <b>Categoría: </b>
            </h6>
            <p className="text-dark" style={{ width: "53.5rem" }}>
              Empresa privada - Sociedad o asociación civil
            </p>
            <h6 className="text-primary text-end" style={{ width: "13.25rem" }}>
              <b>Dirección: </b>
            </h6>
            <p className="text-dark" style={{ width: "53.5rem" }}>
              Calle 200, Carretera de Ciudad Real-Almadén. Castilla-La Mancha,
              Abenójar
            </p>
            <div className="button-group">
              <Button
                onClick={() => setOpenNewGroupedAreas(true)}
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
        <div className="accordion-group">
          <div className="accordion-body">
            <div className="grouped-areas">
              <h4 className="text-primary">
                <b>Órganos de línea - GER 0001</b>
              </h4>
              <div className="button-group">
                <Button
                  onClick={() => setOpenNewAreas(true)}
                  size="md"
                  variant="outline-primary"
                >
                  Nueva Área
                </Button>
                <Button
                  onClick={() => setOpenEditGroupedAreas(true)}
                  size="md"
                  variant="outline-primary"
                >
                  Configuración
                </Button>
              </div>
            </div>
            {/* Lista de Areas */}
            <div className="accordion-areas">
              <AccordionBox
                accordionItems={[
                  {
                    header: (
                      <div className="accordion-areas-header">
                        <h5 className="text-primary">
                          <b>Gerencia Regional de Desarrollo Social - LIN001</b>
                        </h5>
                      </div>
                    ),
                    hasBody: true,
                    body: (
                      <div className="accordion-areas-body">
                        <p className="text-dark">
                          Órgano de línea técnico, normativo y ejecutivo
                          responsable del diseño, conducción, coordinación,
                          supervisión y evaluación de las políticas públicas
                          regionales de desarrollo social y humano, en las
                          materias específicas de educación, cultura, ciencia y
                          tecnología, recreación, deportes, salud, vivienda,
                          trabajo, población saneamiento, desarrollo social e
                          igualdad de oportunidades.
                        </p>
                        {/* Lista de Unidades */}
                        <div className="accordion-unidades-header">
                          <h5 className="text-primary">
                            <b>Lista de Unidades</b>
                          </h5>
                          <div className="button-group">
                            <Button
                              onClick={() => setOpenNewUnitAreas(true)}
                              size="md"
                              variant="primary"
                            >
                              Nueva Unidad
                            </Button>
                            <Button
                              onClick={() => setOpenEditAreas(true)}
                              size="md"
                              variant="primary"
                            >
                              Configuración del Área
                            </Button>
                          </div>
                        </div>
                        <div className="accordion-unidades-body">
                          <AccordionBox
                            accordionItems={[
                              {
                                header: (
                                  <div className="accordion-unidades-lista-header">
                                    <h6 className="text-secondary">
                                      <b>
                                        Dirección Regional de Trabajo y
                                        Promoción del Empleo - DRS001
                                      </b>
                                    </h6>
                                  </div>
                                ),
                                hasBody: true,
                                body: (
                                  <div className="accordion-unidades-lista-body">
                                    <p className="text-secondary">
                                      La Dirección Regional de Trabajo y
                                      Promoción del Empleo (DRTPE) es un
                                      organismo descentralizado que opera en
                                      diferentes regiones del Perú. Su función
                                      principal es liderar la implementación de
                                      políticas y programas relacionados con el
                                      empleo y el desarrollo económico.
                                    </p>
                                    <div className="accordion-unidades-procesos">
                                      <h6 className="text-secondary">
                                        <b>Lista de Procesos</b>
                                      </h6>
                                      <div className="button-group">
                                        <Button
                                          onClick={() =>
                                            setOpenNewUnitProcess(true)
                                          }
                                          size="md"
                                          variant="secondary"
                                        >
                                          Nuevo Proceso
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            setOpenEditUnitAreas(true)
                                          }
                                          size="md"
                                          variant="secondary"
                                        >
                                          Configuración de la Unidad
                                        </Button>
                                      </div>
                                    </div>
                                    <ListTableBox
                                      listItems={[
                                        {
                                          key: "1",
                                          content: (
                                            <div className="lista-unidades-procesos-item">
                                              <div className="lista-unidades-procesos-item1">
                                                <p className="text-primary">
                                                  <b>
                                                    PRO001- Proceso de
                                                    Gestionamiento de
                                                    Contrataciones
                                                  </b>
                                                </p>
                                                <small className="text-dark">
                                                  Proceso de contratación es
                                                  fundamental para asegurar que
                                                  se incorpore al personal
                                                  adecuado y que se cumplan las
                                                  necesidades de la empresa
                                                </small>
                                                <small className="text-success">
                                                  Presenta controles antisoborno
                                                </small>
                                              </div>
                                              <div className="button-group">
                                                <Button
                                                  onClick={() =>
                                                    setOpenEditUnitProcess(true)
                                                  }
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
                                        },
                                      ]}
                                      overrideColor="override-white"
                                    />
                                  </div>
                                ),
                              },
                            ]}
                            overrideColor="override-white"
                          ></AccordionBox>
                        </div>
                        {/* Lista de Procesos del Area*/}
                        <div className="accordion-procesosarea-header">
                          <h5 className="text-primary">
                            <b>Lista de Procesos del Area</b>
                          </h5>
                          <div className="button-group">
                            <Button
                              onClick={() => setOpenNewAreasProcess(true)}
                              size="md"
                              variant="secondary"
                            >
                              Nuevo Proceso
                            </Button>
                          </div>
                        </div>
                        <ListTableBox
                          listItems={[
                            {
                              key: "1",
                              content: (
                                <div className="lista-unidades-procesos-item">
                                  <div className="lista-unidades-procesos-item1">
                                    <p className="text-primary">
                                      <b>
                                        PRO001- Proceso de Gestionamiento de
                                        Contrataciones
                                      </b>
                                    </p>
                                    <small className="text-dark">
                                      Proceso de contratación es fundamental
                                      para asegurar que se incorpore al personal
                                      adecuado y que se cumplan las necesidades
                                      de la empresa
                                    </small>
                                    <small className="text-success">
                                      Presenta controles antisoborno
                                    </small>
                                  </div>
                                  <div className="button-group">
                                    <Button
                                      onClick={() =>
                                        setOpenEditAreasProcess(true)
                                      }
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
                            },
                          ]}
                          overrideColor="override-white"
                        />
                      </div>
                    ),
                  },
                ]}
                overrideColor="override-white"
              ></AccordionBox>
            </div>
          </div>
        </div>
      </MainContainer>
      {/* Lista de Modales */}
      <Modal
        openModal={openNewGroupedAreas}
        setOpenModal={setOpenNewGroupedAreas}
        title="Nuevo Grupo de Áreas"
        size="lg"
        body={modalNewGroupedAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openNewAreas}
        setOpenModal={setOpenNewAreas}
        title="Nueva Área"
        size="lg"
        body={modalNewAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openEditGroupedAreas}
        setOpenModal={setOpenEditGroupedAreas}
        title="Edición del Grupo de Áreas"
        size="lg"
        body={modalEditGroupedAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openEditAreas}
        setOpenModal={setOpenEditAreas}
        title="Edición del Área"
        size="lg"
        body={modalEditAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openNewUnitAreas}
        setOpenModal={setOpenNewUnitAreas}
        title="Nueva Unidad del Área"
        size="lg"
        body={modalNewUnitAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openEditUnitAreas}
        setOpenModal={setOpenEditUnitAreas}
        title="Edición de la Unidad"
        size="lg"
        body={modalEditUnitAreas()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openNewUnitProcess}
        setOpenModal={setOpenNewUnitProcess}
        title="Nuevo Proceso de la Unidad"
        size="lg"
        body={modalNewUnitProcess()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openEditUnitProcess}
        setOpenModal={setOpenEditUnitProcess}
        title="Edición del Proceso de la Unidad"
        size="lg"
        body={modalEditUnitProcess()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openNewAreasProcess}
        setOpenModal={setOpenNewAreasProcess}
        title="Nuevo Proceso del Área"
        size="lg"
        body={modalOpenNewAreasProcess()}
        footer={["Guardar", "Cerrar"]}
      />
      <Modal
        openModal={openEditAreasProcess}
        setOpenModal={setOpenEditAreasProcess}
        title="Edición del Proceso del Área"
        size="lg"
        body={modalEditAreasProcess()}
        footer={["Guardar", "Cerrar"]}
      />
    </div>
  );
}

export default Org_Estructura;
