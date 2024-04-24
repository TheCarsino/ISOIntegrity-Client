import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { authenticateUser } from "../services/authentication.services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import "../App.scss";
import { useNavigate } from "react-router-dom";
import { URL_RIESGOS_ALERTAS, URL_RIESGOS_ANALISIS } from "../config";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn, userData, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      if (userData.Role.nombre !== "Colaborador") {
        localStorage.setItem(
          "activeNavs",
          JSON.stringify({ main: "risk", sub: "anal" })
        );
        navigate(`${URL_RIESGOS_ANALISIS}`);
      } else {
        localStorage.setItem(
          "activeNavs",
          JSON.stringify({ main: "risk", sub: "alert" })
        );
        navigate(`${URL_RIESGOS_ALERTAS}`);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser({
      usuario: username,
      contrasena: password,
    }).then((authResp) => {
      if (authResp != null) {
        login(authResp[0]);
        if (authResp[0].Role.nombre !== "Colaborador") {
          localStorage.setItem(
            "activeNavs",
            JSON.stringify({ main: "risk", sub: "anal" })
          );
          navigate(`${URL_RIESGOS_ANALISIS}`);
        } else {
          localStorage.setItem(
            "activeNavs",
            JSON.stringify({ main: "risk", sub: "alert" })
          );
          navigate(`${URL_RIESGOS_ALERTAS}`);
        }
      }
    });
  };

  return (
    <div className="login-content">
      <div className="login-header">
        <div className="login-logo">
          <img
            src="/assets/logo.svg"
            style={{ width: "100%", height: "100%" }}
            className="d-inline-block align-text-top"
            alt="ISOIntegrity 37001"
          />
        </div>
        <h4 className="text-primary text-center">
          <b>ISOIntegrity 37001</b>
        </h4>
        <br />
        <h5 className="text-primary text-center">
          Software diseñada para simplificar y fortalecer la gestión antisoborno
          en organizaciones públicas y privadas.
        </h5>
        <hr />
        <p className="text-dark text-center" style={{ fontSize: "0.825rem" }}>
          Basado en la norma ISO 37001, este sistema permite evaluar, controlar
          y mitigar los riesgos de soborno, ofreciendo funciones como evaluación
          de riesgos con indicadores cuantificables, gestión de casos de soborno
          y divulgación de irregularidades, generación de informes y
          documentación conforme a estándares ISO.
        </p>
      </div>
      <div className="login-body">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-12" controlId="formUsuario">
              <Form.Label>Usuario </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-12" controlId="formUsuario">
              <Form.Label>Contraseña </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Row>
          <div className="login-footer">
            <Button
              style={{
                width: "100%",
                alignSelf: "center",
              }}
              className="btn-primary"
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
