import MainContainer from "../../../components/Main/MainContainer";
import NavBar from "../../../components/NavBar/NavBar";
import "./Risk_Cuestionario.scss";

function Risk_Cuestionario_Fin() {
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Cuestionarios de Evaluación de Riesgos">
          <div className="cuestionario-main">
            <h4 className="text-primary">
              <b>
                Se ha registrado el cuestionario de evaluación de índices de
                riesgos de soborno
              </b>
            </h4>
            <h5 className="text-secondary text-start">
              <b>
                En la pantalla de Riesgos - Análisis podrá ver los resultados
              </b>
            </h5>
          </div>
        </MainContainer>
      </div>
    </>
  );
}

export default Risk_Cuestionario_Fin;
