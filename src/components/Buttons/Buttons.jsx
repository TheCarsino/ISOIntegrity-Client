import "./Buttons.scss";

function Button(props) {
  /*SUMIT ES PARA EL USO DE FORMULARIOS 
    Title -> se refiere al titulo
    Type -> se refiere al tipo: 
    -  btn-rounded: con bordes redondos
    -  btn-rounded-selection: con bordes redondos y que permite seleccion única
    -  btn-rounded-primary: con bordes redonods y de estilo primario (más grande y se expande a todo el grid)
    -  btn-link: boton que no tiene bordes y corresponde a un texto único
    -  btn-close: boton que no tiene bordes y corresponde a un texto único
    -  btn-outline-primary: no requiere de la definición de color -> es un botón con marco
    Color -> el color del botón -> btn-primary o btn-secondary
    route -> for the anchor route
    buttonDisabled -> si corresponde a un disabled o no
    buttonPressed -> si corresponde a un estado de presionado (sin hover) o no
    {
      For the use of modals
      - modal -> true or false si es que pertenece o no a un botón que activará a un modal
      - closeModal -> para verificar si es un botón de cierre de Modal
      - target -> area-labelled para el modal que se va a adherir al Modal correspondiente
    }
    overrides=> Corresponde a algunas otras clases que se quieren reemplazar del Bootstrap
     */
  const {
    submit,
    type,
    anchor,
    route,
    title,
    color,
    buttonDisabled = false,
    buttonPressed,
    onButtonClick,
    modal = false,
    closeModal = false,
    target,
    override,
  } = props;

  return (
    <>
      {anchor ? (
        <>
          {buttonDisabled ? (
            <a
              href={route}
              className={`btn ${color} ${type} ${override} btn-disabled  ${
                buttonPressed && "active"
              }`}
              aria-disabled="true"
            >
              {title}
            </a>
          ) : (
            <a
              href={route}
              className={`btn ${color} ${type} ${override} ${
                buttonPressed && "active"
              }`}
            >
              {title}
            </a>
          )}
        </>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className={`btn ${color} ${type} ${override} ${
            buttonDisabled && "btn-disabled"
          } ${buttonPressed && "active"}`}
          aria-label={type === "btn-close" && "Close"}
          disabled={buttonDisabled}
          onClick={onButtonClick}
          data-bs-toggle={modal && "modal"}
          data-bs-target={modal && `#${target}`}
          data-bs-dismiss={modal && closeModal && `#${target}`}
          aria-disabled="true"
          aria-pressed={buttonPressed}
        >
          {title}
        </button>
      )}
    </>
  );
}

export default Button;
