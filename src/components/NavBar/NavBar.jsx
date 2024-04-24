import { faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import {
  URL_DOCUMENTACION_ESTANDARES,
  URL_DOCUMENTACION_REPORTES,
  URL_ORGANIZACION_ESTRUCTURA,
  URL_ORGANIZACION_RIESGOS,
  URL_RIESGOS_ALERTAS,
  URL_RIESGOS_ANALISIS,
  URL_RIESGOS_CUESTIONARIOS,
  URL_RIESGOS_LISTA,
} from "../../config";
import "./NavBar.scss";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../hooks/AuthProvider";

function NavBar() {
  const { userData, logout } = useAuth();

  const [activeNavs, setActiveNavs] = useState({
    main: "",
    sub: "",
  });

  useEffect(() => {
    if (activeNavs !== null && activeNavs.main !== "")
      localStorage.setItem("activeNavs", JSON.stringify(activeNavs));
  }, [activeNavs]);

  useEffect(() => {
    const storedActiveNavs = localStorage.getItem("activeNavs");
    try {
      const parsedActiveNavs = JSON.parse(storedActiveNavs);
      setActiveNavs(parsedActiveNavs);
    } catch (error) {
      setActiveNavs({
        main: "",
        sub: "",
      });
    }
  }, []);

  const handleCloseSesion = () => {
    logout();
  };

  return (
    <div className="iso-main-navbar">
      <div className="div-main-nav">
        <Navbar expand="lg" className="navbar-main">
          <Container fluid>
            <Navbar.Brand>
              <img
                src="/assets/logo.svg"
                className="d-inline-block align-text-top"
                alt="ISOIntegrity 37001"
              />
            </Navbar.Brand>
            <Nav className="me-auto my-2 my-lg-0 nav-sublinks">
              {userData != null && userData.Role.nombre !== "Colaborador" && (
                <Nav.Link
                  className={`${
                    activeNavs != null
                      ? activeNavs.main === "org"
                        ? "nav-sub-links-active"
                        : "nav-sublinks-link"
                      : "nav-sublinks-link"
                  }`}
                  onClick={() => setActiveNavs({ main: "org", sub: "" })}
                >
                  <p className="text-white">Organización</p>
                </Nav.Link>
              )}
              <Nav.Link
                className={`${
                  activeNavs != null
                    ? activeNavs.main === "risk"
                      ? "nav-sub-links-active"
                      : "nav-sublinks-link"
                    : "nav-sublinks-link"
                }`}
                onClick={() => setActiveNavs({ main: "risk", sub: "" })}
              >
                <p className="text-white">Riesgos</p>
              </Nav.Link>
              {(userData != null && userData.Role.nombre) !== "Colaborador" && (
                <Nav.Link
                  className={`${
                    activeNavs != null
                      ? activeNavs.main === "doc"
                        ? "nav-sub-links-active"
                        : "nav-sublinks-link"
                      : "nav-sublinks-link"
                  }`}
                  onClick={() => setActiveNavs({ main: "doc", sub: "" })}
                >
                  <p className="text-white">Documentación</p>
                </Nav.Link>
              )}
            </Nav>
            <Navbar.Collapse className="justify-content-end nav-user">
              <NavDropdown
                className="nav-user-icon"
                title={
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: "1.25rem" }}
                  />
                }
              >
                <div className="user-box">
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ fontSize: "9.5rem" }}
                  />
                  <h5>Nombre del Usuario</h5>
                  <h6 className="text-secondary">Rol de Usuario</h6>
                  <h6 className="text-light">Correo del usuario</h6>
                  <Button
                    size="sm"
                    style={{ marginTop: "0.75rem" }}
                    onClick={() => handleCloseSesion()}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {activeNavs != null && activeNavs.main !== "" && (
        <div className="div-sub-nav">
          {activeNavs.main === "org" && (
            <Navbar expand="lg" className="navbar-sub">
              <Container fluid>
                <div style={{ width: "76px" }}></div>
                <Nav className="me-auto my-2 my-lg-0 nav-sublinks">
                  <Nav.Link
                    href={URL_ORGANIZACION_ESTRUCTURA}
                    className={` ${
                      activeNavs.sub === "str"
                        ? "nav-sub-links-underlined"
                        : "nav-sublinks-link"
                    }`}
                    onClick={() => setActiveNavs({ main: "org", sub: "str" })}
                  >
                    <p className="text-white">Estructura</p>
                  </Nav.Link>
                  <Nav.Link
                    href={URL_ORGANIZACION_RIESGOS}
                    className={` ${
                      activeNavs.sub === "risk"
                        ? "nav-sub-links-underlined"
                        : "nav-sublinks-link"
                    }`}
                    onClick={() => setActiveNavs({ main: "org", sub: "risk" })}
                  >
                    <p className="text-white">Riesgos</p>
                  </Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          )}
          {activeNavs.main === "risk" && (
            <Navbar expand="lg" className="navbar-sub">
              <Container fluid>
                <div style={{ width: "76px" }}></div>
                <Nav className="me-auto my-2 my-lg-0 nav-sublinks">
                  {(userData != null && userData.Role.nombre) !==
                    "Colaborador" && (
                    <Nav.Link
                      href={URL_RIESGOS_ANALISIS}
                      className={` ${
                        activeNavs.sub === "anal"
                          ? "nav-sub-links-underlined"
                          : "nav-sublinks-link"
                      }`}
                      onClick={() =>
                        setActiveNavs({ main: "risk", sub: "anal" })
                      }
                    >
                      <p className="text-white">Análisis</p>
                    </Nav.Link>
                  )}
                  {(userData != null && userData.Role.nombre) !==
                    "Colaborador" && (
                    <Nav.Link
                      href={URL_RIESGOS_LISTA}
                      className={` ${
                        activeNavs.sub === "risk"
                          ? "nav-sub-links-underlined"
                          : "nav-sublinks-link"
                      }`}
                      onClick={() =>
                        setActiveNavs({ main: "risk", sub: "risk" })
                      }
                    >
                      <p className="text-white">Riesgos</p>
                    </Nav.Link>
                  )}
                  <Nav.Link
                    href={URL_RIESGOS_ALERTAS}
                    className={` ${
                      activeNavs.sub === "alert"
                        ? "nav-sub-links-underlined"
                        : "nav-sublinks-link"
                    }`}
                    onClick={() =>
                      setActiveNavs({ main: "risk", sub: "alert" })
                    }
                  >
                    <p className="text-white">Alertas</p>
                  </Nav.Link>
                  {(userData != null && userData.Role.nombre) !==
                    "Colaborador" && (
                    <Nav.Link
                      href={URL_RIESGOS_CUESTIONARIOS}
                      className={` ${
                        activeNavs.sub === "surv"
                          ? "nav-sub-links-underlined"
                          : "nav-sublinks-link"
                      }`}
                      onClick={() =>
                        setActiveNavs({ main: "risk", sub: "surv" })
                      }
                    >
                      <p className="text-white">Cuestionarios</p>
                    </Nav.Link>
                  )}
                </Nav>
              </Container>
            </Navbar>
          )}
          {activeNavs.main === "doc" && (
            <Navbar expand="lg" className="navbar-sub">
              <Container fluid>
                <div style={{ width: "76px" }}></div>
                <Nav className="me-auto my-2 my-lg-0 nav-sublinks">
                  <Nav.Link
                    href={URL_DOCUMENTACION_ESTANDARES}
                    className={` ${
                      activeNavs.sub === "stnd"
                        ? "nav-sub-links-underlined"
                        : "nav-sublinks-link"
                    }`}
                    onClick={() => setActiveNavs({ main: "doc", sub: "stnd" })}
                  >
                    <p className="text-white">Estándares</p>
                  </Nav.Link>
                  <Nav.Link
                    href={URL_DOCUMENTACION_REPORTES}
                    className={` ${
                      activeNavs.sub === "rep"
                        ? "nav-sub-links-underlined"
                        : "nav-sublinks-link"
                    }`}
                    onClick={() => setActiveNavs({ main: "doc", sub: "rep" })}
                  >
                    <p className="text-white">Reportes</p>
                  </Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
