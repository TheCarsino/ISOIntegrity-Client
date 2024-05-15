import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AccordionBox from "../../../components/Accordion/AccordionBox";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import MainContainer from "../../../components/Main/MainContainer";

import { URL_ORGANIZACION_RIESGOS } from "../../../config";

import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import { getOrganizationStructure } from "../../../services/organization.services";
import "./Org_Riesgos.scss";
import Spinner from "react-bootstrap/esm/Spinner";

function Org_Riesgos() {
  async function retrieveOrganizationStructure() {
    const data = await getOrganizationStructure();

    return data;
  }
  /* ONE VARIABLE TO STORE EVERY ITEM FROM THE ORG STRUCTURE */
  const [structure, setStructure] = useState(null);

  useEffect(() => {
    retrieveOrganizationStructure().then((retrieveStructure) => {
      setStructure(retrieveStructure);
    });
  }, []);

  const fillUnidades = (listUnidades) => {
    let renderUnidades = [];

    listUnidades.forEach((unidad) => {
      renderUnidades.push({
        key: unidad.id.toString(),
        content: (
          <div className="lista-unidades">
            <div className="lista-unidades-item1">
              <p className="text-primary header-text">
                <b>{unidad.id}</b>
              </p>
            </div>
            <div className="lista-unidades-item2">
              <p className="text-primary header-text">{unidad.codigo}</p>
            </div>
            <div className="lista-unidades-item3 header-text">
              <p className="text-primary">{unidad.nombre}</p>
            </div>
            <div className="lista-unidades-item4 header-text">
              <p className="text-primary">{`Total: ${
                unidad.codigo === "DRS001" || unidad.codigo === "DRS002"
                  ? "3"
                  : "1"
              } riesgos`}</p>
              <p
                className={
                  unidad.codigo === "DRS001" || unidad.codigo === "DRS002"
                    ? "text-danger"
                    : "text-success"
                }
              >{`${
                unidad.codigo === "DRS001" || unidad.codigo === "DRS002"
                  ? "2"
                  : "0"
              } exceden el nivel de tolerancia`}</p>
            </div>
            <div
              className={`lista-unidades-item5 header-text ${
                unidad.codigo === "DRS001" || unidad.codigo === "DRS002"
                  ? "bg-warning"
                  : "bg-success"
              }`}
            >
              <h5 className="text-white text-center">
                {unidad.codigo === "DRS001" || unidad.codigo === "DRS002"
                  ? "45.00"
                  : "25.00"}
              </h5>
            </div>
            {unidad.Processes != null && unidad.Processes.length > 0 && (
              <Button
                onClick={() =>
                  handleUnitAreaDetail({
                    id: unidad.id,
                    codigo: unidad.codigo,
                    nombre: unidad.nombre,
                    descripcion: unidad.descripcion,
                    esArea: false,
                  })
                }
                variant="outline-secondary"
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  Ver Detalle
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{
                      fontSize: "1.25rem",
                    }}
                  />
                </div>
              </Button>
            )}
          </div>
        ),
      });
    });

    return renderUnidades;
  };
  const fillAreas = (listAreas) => {
    let renderAreas = [];

    listAreas.forEach((area) => {
      renderAreas.push({
        header: (
          <div className="lista-areas">
            <div className="lista-areas-item1">
              <p className="text-primary header-text">
                <b>{area.id}</b>
              </p>
            </div>
            <div className="lista-areas-item2">
              <p className="text-primary header-text">{area.codigo}</p>
            </div>
            <div className="lista-areas-item3 header-text">
              <p className="text-primary">{area.nombre}</p>
            </div>
            <div className="lista-areas-item4 header-text">
              <p className="text-primary">{`Total: ${
                area.codigo === "LIN001"
                  ? "3"
                  : area.codigo === "LIN002" || area.codigo === "LIN003"
                  ? "1"
                  : "0"
              } riesgos`}</p>
              <p
                className={
                  area.codigo === "LIN001"
                    ? "text-danger"
                    : area.codigo === "LIN002" || area.codigo === "LIN003"
                    ? "text-success"
                    : "text-dark"
                }
              >{`${
                area.codigo === "LIN001"
                  ? "2"
                  : area.codigo === "LIN002" || area.codigo === "LIN003"
                  ? "0"
                  : "0"
              } exceden el nivel de tolerancia`}</p>
            </div>
            <div
              className={`lista-areas-item5 header-text ${
                area.codigo === "LIN001"
                  ? "bg-warning"
                  : area.codigo === "LIN002" || area.codigo === "LIN003"
                  ? "bg-success"
                  : "bg-dark"
              }`}
            >
              <h5 className="text-white text-center">
                {area.codigo === "LIN001"
                  ? "45.00"
                  : area.codigo === "LIN002" || area.codigo === "LIN003"
                  ? "25.00"
                  : "0.00"}
              </h5>
            </div>
            {area.Area_Unit[0].Processes != null &&
              area.Area_Unit[0].Processes.length > 0 && (
                <Button
                  onClick={() =>
                    handleUnitAreaDetail({
                      id: area.Area_Unit[0].id,
                      codigo: area.Area_Unit[0].codigo,
                      nombre: area.Area_Unit[0].nombre,
                      descripcion: area.Area_Unit[0].descripcion,
                      esArea: true,
                    })
                  }
                  variant="outline-secondary"
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    Ver Detalle
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        fontSize: "1.25rem",
                      }}
                    />
                  </div>
                </Button>
              )}
          </div>
        ),
        hasBody: area.Unit_Unit != null && area.Unit_Unit.length > 0,
        body: (
          <div className="accordion-lista-unidades">
            {area.Unit_Unit != null && (
              <ListTableBox
                noPadding={true}
                listItems={fillUnidades(area.Unit_Unit)}
                overrideColor="override-gray"
              />
            )}
          </div>
        ),
      });
    });

    return renderAreas;
  };

  const navigate = useNavigate();

  const handleUnitAreaDetail = (unidad = null) => {
    const datatoPass = unidad;
    navigate(`${URL_ORGANIZACION_RIESGOS}/detalle`, { state: datatoPass });
  };
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Estructura de la Organizacion">
          <div className="accordion-group">
            {structure != null ? (
              <div className="accordion-body">
                {structure.map((group) => (
                  <>
                    <div className="grouped-areas">
                      <h4 className="text-primary">
                        <b>{`${group.nombre} - ${group.codigo}`}</b>
                      </h4>
                    </div>
                    {/* Lista de Areas */}
                    {group.Areas != null && (
                      <div className="accordion-areas">
                        <div className="accordion-areas-header">
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
                            style={{ width: "574px" }}
                          >
                            <b>Nombre</b>
                          </h6>
                          <h6
                            className="text-primary header-text"
                            style={{ width: "225px" }}
                          >
                            <b>Mediciones</b>
                          </h6>
                          <h6
                            className="text-primary header-text"
                            style={{ width: "122px" }}
                          >
                            <b>Nivel Riesgo</b>
                          </h6>
                        </div>
                        <AccordionBox
                          noPadding={true}
                          accordionItems={fillAreas(group.Areas)}
                          overrideBorders={true}
                          overrideColor="override-white"
                        ></AccordionBox>
                      </div>
                    )}
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
      </div>
    </>
  );
}

export default Org_Riesgos;
