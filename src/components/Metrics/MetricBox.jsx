import PropTypes from "prop-types";
import "./MetricBox.scss";

function MetricBox({
  topText,
  middleText,
  bottomText,
  order = "top-middle-bottom",
  status = "info",
  width = "100%",
  gap = "1rem",
}) {
  return (
    <div className="metric-box" style={{ width: width, gap: gap }}>
      <p className="top-text">{topText}</p>
      {order !== "top-bottom-middle" ? (
        <>
          <h1 className={`extrabold text-${status} middle-text`}>
            {middleText}
          </h1>
          <small className="bottom-text">{bottomText}</small>
        </>
      ) : (
        <>
          <small className="bottom-text">{bottomText}</small>
          <h1 className={`extrabold text-${status} middle-text`}>
            {middleText}
          </h1>
        </>
      )}
    </div>
  );
}

/*USO DE METRICBOX PARA ESTABLECER CUADROS DE RESULTADOS FINALES 
    topText = Mensaje que se muestra en el tope 
    middleText = Mensaje que se muestra en el medio [Es la metrica]
    bottomText = Mensaje que s emuestra en la parte baja, es de estilo complementario
    order= top-middle-bottom  top-bottom-middle |> Define el orden en el que se mostrarán los componentes del texto
    status= danger, warning, successs, info |> Define el estado asociado en color al middleText
    width= Ancho del contenedor
    gap= Ancho entre elementos del flex display
*/
MetricBox.propTypes = {
  topText: PropTypes.string.isRequired,
  middleText: PropTypes.string.isRequired,
  bottomText: PropTypes.string,
  order: PropTypes.string,
  status: PropTypes.string,
  width: PropTypes.string,
  gap: PropTypes.string,
};

export default MetricBox;
