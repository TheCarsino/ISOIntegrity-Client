import { useState, useEffect } from "react";
import MainContainer from "../../../components/Main/MainContainer";
import "./Risk_Cuestionario.scss";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { URL_RIESGOS_CUESTIONARIOS } from "../../../config";
import ListTableBox from "../../../components/ListTable/ListTableBox";
import NavBar from "../../../components/NavBar/NavBar";
import {
  createSurveyResult,
  getSurveyResultbyCategory,
} from "../../../services/surveyscale.services";
import Spinner from "react-bootstrap/esm/Spinner";

function Risk_Cuestionario_Categoria() {
  const navigate = useNavigate();

  const [currentCheckList, setCurrentCheckList] = useState([]);

  async function updateSurveyResults(scaleId, selectedScale) {
    const data = await createSurveyResult(scaleId, {
      escala_seleccion: selectedScale,
    });
    if (data !== null) return true;
    return false;
  }

  const handleNewSurveyResult = (scaleId, selectedScale) => {
    updateSurveyResults(scaleId, selectedScale).then((verification) => {
      if (verification) {
        setCurrentCheckList((prevCheckedList) => {
          const newMap = new Map(prevCheckedList);
          newMap.set(scaleId, selectedScale);
          return newMap;
        });
        console.log(
          "Correct update in Survey Scale for: " +
            scaleId +
            "with value - " +
            selectedScale
        );
      } else
        console.log(
          "There was an error while updating the current scale with id " +
            scaleId
        );
    });
  };

  const itemsListIndicator = (listScales) => {
    let mappedList = [];
    listScales.forEach((scale) => {
      mappedList.push({
        key: scale.SurveyScale.id.toString(),
        content: (
          <div className="lista-escalas">
            <div className="lista-escalas-item1">
              <p className="text-primary header-text">
                {scale.SurveyScale.RiskIndicator.codigo}
              </p>
            </div>
            <div className="lista-escalas-item2">
              <p className="text-primary header-text">
                {scale.SurveyScale.RiskIndicator.nombre}
              </p>
            </div>
            <div
              key={`escala-${scale.SurveyScale.id}`}
              className="lista-escalas-item3"
            >
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e1 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-1`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e1}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 1}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 1)
                    }
                  />
                )}
              </div>
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e2 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-2`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e2}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 2}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 2)
                    }
                  />
                )}
              </div>
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e3 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-3`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e3}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 3}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 3)
                    }
                  />
                )}
              </div>
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e4 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-4`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e4}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 4}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 4)
                    }
                  />
                )}
              </div>
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e5 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-5`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e5}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 5}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 5)
                    }
                  />
                )}
              </div>
              <div
                className="lista-escalas-radio"
                style={{ padding: "0.75rem" }}
              >
                {scale.SurveyScale.descripcion_e6 != "" && (
                  <Form.Check
                    type="radio"
                    id={`escala-${scale.SurveyScale.id}-6`}
                    name={`escala-${scale.SurveyScale.id}`}
                    label={scale.SurveyScale.descripcion_e6}
                    checked={currentCheckList.get(scale.SurveyScale.id) === 6}
                    onClick={() =>
                      handleNewSurveyResult(scale.SurveyScale.id, 6)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        ),
      });
    });

    return mappedList;
  };

  const handleFinishSurvey = () => {
    setPage(1);
    localStorage.setItem("currentPageCuestionary", 1);
    navigate(`${URL_RIESGOS_CUESTIONARIOS}/resultado`, { state: null });
  };

  async function retrieveCuestionaryCategory(page) {
    const data = await getSurveyResultbyCategory(page);
    return data;
  }

  const handlePageBefore = (page) => {
    if (page > 1) setPage((page) => page - 1);
  };
  const handlePageAfter = (page) => {
    if (page < 5) setPage((page) => page + 1);
  };

  const [isPage, setPage] = useState(null);
  const [listScaleResults, setListScaleResults] = useState(null);

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPageCuestionary");
    if (currentPage) setPage(parseInt(currentPage));
    else setPage(1);
  }, []);

  useEffect(() => {
    if (isPage) {
      retrieveCuestionaryCategory(isPage).then((scales) => {
        //Fill the list of all the checked list for future updates
        const checkedList = new Map();

        for (const scale of scales) {
          checkedList.set(
            scale.SurveyScale.id,
            scale.SurveyResult != null ? scale.SurveyResult.escala_seleccion : 0
          );
        }
        setCurrentCheckList(checkedList);
        //Fill the list of scales
        setListScaleResults(scales);

        localStorage.setItem("currentPageCuestionary", isPage);
      });
    }
  }, [isPage]);
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Resolución del Cuestionario de Evaluación de Riesgos">
          {listScaleResults != null ? (
            <>
              <div className="survey-escalas-header">
                <h4 className="text-primary">
                  <b>
                    {
                      listScaleResults[0].SurveyScale.RiskIndicator
                        .RiskIndicatorCategory.nombre
                    }
                  </b>
                </h4>
              </div>
              <ListTableBox
                noPadding={true}
                overFlowHeight={true}
                header={
                  <div className="list-escalas-header">
                    <h6
                      className="text-primary header-text"
                      style={{ width: "371px" }}
                    >
                      <b>Factores de Riesgo de Soborno</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "924px" }}
                    >
                      <b>Escala de Medición</b>
                    </h6>
                    <hr style={{ margin: "0", width: "100%" }} />
                    <h6
                      className="text-primary header-text"
                      style={{ width: "85px" }}
                    >
                      <b>Codigo</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "286px" }}
                    >
                      <b>Nombre</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>1</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>2</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>3</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>4</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>5</b>
                    </h6>
                    <h6
                      className="text-primary header-text"
                      style={{ width: "154px" }}
                    >
                      <b>6</b>
                    </h6>
                  </div>
                }
                listItems={itemsListIndicator(listScaleResults)}
                overrideColor="override-white"
              />
              <div className="survey-escalas-footer">
                {isPage > 1 && (
                  <Button
                    size="md"
                    variant="primary"
                    onClick={() => handlePageBefore(isPage)}
                  >
                    Paso Anterior
                  </Button>
                )}
                {isPage < 5 && (
                  <Button
                    size="md"
                    variant="primary"
                    onClick={() => handlePageAfter(isPage)}
                  >
                    Paso Siguiente
                  </Button>
                )}
                {isPage == 5 && (
                  <Button
                    onClick={() => handleFinishSurvey()}
                    size="md"
                    variant="primary"
                  >
                    Finalizar Cuestionario
                  </Button>
                )}
              </div>
            </>
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
      </div>
    </>
  );
}

export default Risk_Cuestionario_Categoria;
