import { Route, Routes } from "react-router-dom";
import TestComponents from "./pages/TestComponents/TestComponents";

import {
  URL_DOCUMENTACION_ESTANDARES,
  URL_DOCUMENTACION_REPORTES,
  URL_ORGANIZACION_ESTRUCTURA,
  URL_ORGANIZACION_RIESGOS,
  URL_RIESGOS_ALERTAS_IRREGULARIDADES,
  URL_RIESGOS_ALERTAS_FACTORES,
  URL_RIESGOS_ANALISIS,
  URL_RIESGOS_CUESTIONARIOS,
  URL_RIESGOS_LISTA,
  URL_TEST,
} from "./config";

import Doc_Estandares from "./pages/Documentacion/Estándares/Doc_Estandares";
import Doc_Reportes from "./pages/Documentacion/Reportes/Doc_Reportes";
import Org_Estructura from "./pages/Organizacion/Estructura/Org_Estructura";
import Org_Riesgos from "./pages/Organizacion/Riesgos/Org_Riesgos";
import Org_Riesgos_Area from "./pages/Organizacion/Riesgos/Org_Riesgos_Area";
import Risk_Alertas_Irr from "./pages/Riesgos/Alertas/Risk_Alertas_Irr";
import Risk_Alertas_Fact from "./pages/Riesgos/Alertas/Risk_Alertas_Fact";
import Risk_Analisis from "./pages/Riesgos/Analisis/Risk_Analisis";
import Risk_Cuestionario from "./pages/Riesgos/Cuestionario/Risk_Cuestionario";
import Risk_Cuestionario_Categoria from "./pages/Riesgos/Cuestionario/Risk_Cuestionario_Categoria";
import Risk_Cuestionario_Fin from "./pages/Riesgos/Cuestionario/Risk_Cuestionario_Fin";
import Risk_Lista from "./pages/Riesgos/Lista/Risk_Lista";
import Login from "./pages/Login";

import "./App.scss";
import PrivateRoute from "./hooks/PrivateRoute";

function App() {
  return (
    <div className="wrapper" id="main">
      {/*Main components on each page*/}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route
          path={`${URL_ORGANIZACION_ESTRUCTURA}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Org_Estructura />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_ORGANIZACION_RIESGOS}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Org_Riesgos />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_ORGANIZACION_RIESGOS}/detalle`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Org_Riesgos_Area />
            </PrivateRoute>
          }
        />

        <Route
          path={`${URL_RIESGOS_LISTA}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Lista />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_ANALISIS}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Analisis />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_ALERTAS_IRREGULARIDADES}`}
          exact
          element={
            <PrivateRoute
              role={[
                "Administrador",
                "Alta Directiva",
                "Gestor de Proyectos",
                "Colaborador",
              ]}
            >
              <Risk_Alertas_Irr />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_ALERTAS_FACTORES}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Alertas_Fact />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_CUESTIONARIOS}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Cuestionario />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_CUESTIONARIOS}/categorias`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Cuestionario_Categoria />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_RIESGOS_CUESTIONARIOS}/resultado`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Risk_Cuestionario_Fin />
            </PrivateRoute>
          }
        />

        <Route
          path={`${URL_DOCUMENTACION_ESTANDARES}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Doc_Estandares />
            </PrivateRoute>
          }
        />
        <Route
          path={`${URL_DOCUMENTACION_REPORTES}`}
          exact
          element={
            <PrivateRoute
              role={["Administrador", "Alta Directiva", "Gestor de Proyectos"]}
            >
              <Doc_Reportes />
            </PrivateRoute>
          }
        />

        <Route path={`${URL_TEST}`} exact element={<TestComponents />} />
      </Routes>
    </div>
  );
}

export default App;
