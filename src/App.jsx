import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import TestComponents from "./pages/TestComponents/TestComponents";

import {
  URL_TEST,
  URL_DOCUMENTACION_ESTANDARES,
  URL_DOCUMENTACION_REPORTES,
  URL_ORGANIZACION_ESTRUCTURA,
  URL_ORGANIZACION_RIESGOS,
  URL_RIESGOS_ALERTAS,
  URL_RIESGOS_ANALISIS,
  URL_RIESGOS_CUESTIONARIOS,
  URL_RIESGOS_LISTA,
} from "./config";

import Org_Estructura from "./pages/Organizacion/Estructura/Org_Estructura";
import Org_Riesgos from "./pages/Organizacion/Riesgos/Org_Riesgos";
import Org_Riesgos_Area from "./pages/Organizacion/Riesgos/Org_Riesgos_Area";
import Risk_Alertas from "./pages/Riesgos/Alertas/Risk_Alertas";
import Risk_Analisis from "./pages/Riesgos/Analisis/Risk_Analisis";
import Risk_Cuestionario from "./pages/Riesgos/Cuestionario/Risk_Cuestionario";
import Risk_Lista from "./pages/Riesgos/Lista/Risk_Lista";
import Doc_Estandares from "./pages/Documentacion/Estándares/Doc_Estandares";
import Doc_Reportes from "./pages/Documentacion/Reportes/Doc_Reportes";

import "./App.scss";

function App() {
  return (
    <div className="wrapper" id="main">
      {/*Main components on each page*/}
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <Routes>
          <Route
            path={`${URL_ORGANIZACION_ESTRUCTURA}`}
            exact
            element={<Org_Estructura />}
          />
          <Route
            path={`${URL_ORGANIZACION_RIESGOS}`}
            exact
            element={<Org_Riesgos />}
          />
          <Route
            path={`${URL_ORGANIZACION_RIESGOS}/detalle`}
            exact
            element={<Org_Riesgos_Area />}
          />

          <Route path={`${URL_RIESGOS_LISTA}`} exact element={<Risk_Lista />} />
          <Route
            path={`${URL_RIESGOS_ANALISIS}`}
            exact
            element={<Risk_Analisis />}
          />
          <Route
            path={`${URL_RIESGOS_ALERTAS}`}
            exact
            element={<Risk_Alertas />}
          />
          <Route
            path={`${URL_RIESGOS_CUESTIONARIOS}`}
            exact
            element={<Risk_Cuestionario />}
          />

          <Route
            path={`${URL_DOCUMENTACION_ESTANDARES}`}
            exact
            element={<Doc_Estandares />}
          />
          <Route
            path={`${URL_DOCUMENTACION_REPORTES}`}
            exact
            element={<Doc_Reportes />}
          />

          <Route path={`${URL_TEST}`} exact element={<TestComponents />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
