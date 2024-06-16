import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";
import "./Helper.scss";

export default function Helper({ body, placement = "left", ...props }) {
  const listBody = (body) => {
    switch (body) {
      case "unidad":
        return (
          <div
            className="d-flex flex-column justify-content-start"
            style={{ gap: "0.75rem" }}
          >
            <p>
              El <b>cálculo del nivel del riesgo</b> se realiza promediando
              todos los niveles de riesgos de los proceso del{" "}
              <b>área o unidad</b>.
            </p>
            <p>
              El área no toma en cuenta los procesos de la unidad para su
              cálculo, puesto que este presenta con sus propios procesos.
            </p>
            <p>
              <b>
                El nivel del riesgo evalúa los riesgos en un {""}
                <u>valor estimado</u> y contempla los siguientes estados:
              </b>
            </p>
            <ul>
              <li>
                <p className="text-success">
                  <b>Nivel de Riesgo Bajo: </b>0% - 33.33%
                </p>
              </li>
              <li>
                <p className="text-warning">
                  <b>Nivel de Riesgo Medio: </b>33.33% - 66.66%
                </p>
              </li>
              <li>
                <p className="text-danger">
                  <b>Nivel de Riesgo Alto: </b>66.66% - 100%
                </p>
              </li>
            </ul>
          </div>
        );
      case "proceso":
        return (
          <div
            className="d-flex flex-column justify-content-start"
            style={{ gap: "0.75rem" }}
          >
            <p>
              El <b>cálculo del nivel del riesgo</b> se realiza promediando
              todos los niveles de riesgos de los riesgos asociados al{" "}
              <b>proceso</b>.
            </p>
            <p>
              <b>
                El nivel del riesgo evalúa los riesgos en un {""}
                <u>valor estimado</u> y contempla los siguientes estados:
              </b>
            </p>
            <ul>
              <li>
                <p className="text-success">
                  <b>Nivel de Riesgo Bajo: </b>0% - 33.33%
                </p>
              </li>
              <li>
                <p className="text-warning">
                  <b>Nivel de Riesgo Medio: </b>33.33% - 66.66%
                </p>
              </li>
              <li>
                <p className="text-danger">
                  <b>Nivel de Riesgo Alto: </b>66.66% - 100%
                </p>
              </li>
            </ul>
          </div>
        );
      case "indicador":
        return (
          <div
            className="d-flex flex-column justify-content-start"
            style={{ gap: "0.75rem" }}
          >
            <p>
              El <b>cálculo del nivel del riesgo</b> toma en cuenta el último
              resultado del cuestionario y el nivel de riesgo promedio de todos
              los riesgos asociados al indicador de riesgo.
            </p>
            <p>
              Ambas mediciones se promedian. En caso no existan riesgos
              asociados, se muestra el resultado del cuestionario.
            </p>
            <p>
              <b>
                El nivel del riesgo evalúa los riesgos en un {""}
                <u>valor estimado</u> y contempla los siguientes estados:
              </b>
            </p>
            <ul>
              <li>
                <p className="text-success">
                  <b>Nivel de Riesgo Bajo: </b>0% - 33.33%
                </p>
              </li>
              <li>
                <p className="text-warning">
                  <b>Nivel de Riesgo Medio: </b>33.33% - 66.66%
                </p>
              </li>
              <li>
                <p className="text-danger">
                  <b>Nivel de Riesgo Alto: </b>66.66% - 100%
                </p>
              </li>
            </ul>
          </div>
        );
      case "riesgo":
        return (
          <div
            className="d-flex flex-column justify-content-start"
            style={{ gap: "0.75rem" }}
          >
            <p>
              El <b>cálculo del nivel del riesgo</b> toma en cuenta la severidad
              y el total de casos reportados. Y este resulta de la ecuación.
            </p>
            <div>
              <img
                src="/assets/Risk-Formula.png"
                className="d-inline-block align-text-top"
                style={{
                  height: "37px",
                  width: "100%",
                  objectFit: "scale-down",
                }}
                alt="Matriz de Riesgos de Evaluación de Riesgos"
              />
            </div>
            <p>
              Donde la <b>severidad</b> se convierte a un valor entre [0, 1] y
              los <b>casos</b> corresponden a la cantidad total de reportes.
            </p>
            <p>
              <b>
                El nivel del riesgo evalúa los riesgos en un {""}
                <u>valor estimado</u> y contempla los siguientes estados:
              </b>
            </p>
            <ul>
              <li>
                <p className="text-success">
                  <b>Nivel de Riesgo Bajo: </b>0% - 33.33%
                </p>
              </li>
              <li>
                <p className="text-warning">
                  <b>Nivel de Riesgo Medio: </b>33.33% - 66.66%
                </p>
              </li>
              <li>
                <p className="text-danger">
                  <b>Nivel de Riesgo Alto: </b>66.66% - 100%
                </p>
              </li>
            </ul>
          </div>
        );
      default:
        return body;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{listBody(body)}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={placement}
      overlay={popover}
      {...props}
    >
      <div className="text-secondary">
        <FontAwesomeIcon
          icon={faCircleQuestion}
          style={{ fontSize: "1.25rem" }}
        />
      </div>
    </OverlayTrigger>
  );
}

/*USO DE HELPER PARA ESTABLECER CUADROS DE RESULTADOS FINALES 
    body = Mensaje que se encontraré en el cuerpo del helper
    placement = The direction where the popover will appear form the button
*/
Helper.propTypes = {
  body: PropTypes.string || PropTypes.node,
  placement: PropTypes.string,
  props: PropTypes.any,
};
