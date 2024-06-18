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
import { getOrganizationStructureDetail } from "../../../services/organization.services";
import "./Org_Riesgos.scss";
import Spinner from "react-bootstrap/esm/Spinner";
import {
  colorBackgroundPercentage,
  colorRiskText,
  convertToPercentage,
} from "../../../hooks/ColorCases";
import Helper from "../../../components/PopOvers/Helper";

function Org_Riesgos() {
  async function retrieveOrganizationStructure() {
    const data = await getOrganizationStructureDetail();

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
              <p className="text-primary">{`Total: ${unidad.totalRisk} riesgos`}</p>
              <p
                className={colorRiskText(
                  unidad.totalExceedRisk,
                  unidad.totalRisk
                )}
              >{`${unidad.totalExceedRisk} exceden el nivel de riesgo bajo`}</p>
            </div>
            <div
              className={`lista-unidades-item5 header-text ${colorBackgroundPercentage(
                unidad.nivel_riesgo
              )}`}
            >
              <h5 className="text-white text-center">
                {convertToPercentage(unidad.nivel_riesgo)}
              </h5>
            </div>
            {unidad.Processes != null &&
              unidad.Processes.length > 0 &&
              unidad.nivel_riesgo && (
                <Button
                  onClick={() =>
                    handleUnitAreaDetail({
                      id: unidad.id,
                      codigo: unidad.codigo,
                      nombre: unidad.nombre,
                      descripcion: unidad.descripcion,
                      totalRisk: unidad.totalRisk,
                      totalExceedRisk: unidad.totalExceedRisk,
                      nivel_riesgo: unidad.nivel_riesgo,
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
              <p className="text-primary">{`Total: ${area.totalRisk} riesgos`}</p>
              <p
                className={colorRiskText(area.totalExceedRisk, area.totalRisk)}
              >{`${area.totalExceedRisk} exceden el nivel de riesgo bajo`}</p>
            </div>
            <div
              className={`lista-areas-item5 header-text ${colorBackgroundPercentage(
                area.nivel_riesgo
              )}`}
            >
              <h5 className="text-white text-center">
                {convertToPercentage(area.nivel_riesgo)}
              </h5>
            </div>
            {area.Area_Unit[0].Processes != null &&
              area.Area_Unit[0].Processes.length > 0 &&
              area.Area_Unit[0].nivel_riesgo > 0 && (
                <Button
                  onClick={() =>
                    handleUnitAreaDetail({
                      id: area.Area_Unit[0].id,
                      codigo: area.Area_Unit[0].codigo,
                      nombre: area.Area_Unit[0].nombre,
                      descripcion: area.Area_Unit[0].descripcion,
                      totalRisk: area.Area_Unit[0].totalRisk,
                      totalExceedRisk: area.Area_Unit[0].totalExceedRisk,
                      nivel_riesgo: area.Area_Unit[0].nivel_riesgo,
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
        <MainContainer title="Riesgos por Estructura Organizacional">
          <div className="accordion-group">
            {structure != null && structure.length > 0 ? (
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
                            style={{ width: "542px" }}
                          >
                            <b>Nombre</b>
                          </h6>
                          <h6
                            className="text-primary header-text"
                            style={{ width: "225px" }}
                          >
                            <b>Mediciones</b>
                          </h6>
                          <div
                            style={{ width: "156px", gap: "10px" }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Helper body="unidad"></Helper>
                            <h6 className="text-primary">
                              <b>Nivel Riesgo</b>
                            </h6>
                          </div>
                          <div style={{ width: "84px" }}></div>
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
            ) : structure != null && structure.length <= 0 ? (
              <div className="no-risk">
                <p className="text-primary text-center">
                  No existen áreas ni unidades dentro de la estructura
                  organizativa que hayan sido creados.
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
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Org_Riesgos;
