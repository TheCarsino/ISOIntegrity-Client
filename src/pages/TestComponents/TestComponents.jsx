import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AccordionBox from "../../components/Accordion/AccordionBox";
import ListTableBox from "../../components/ListTable/ListTableBox";
import MainContainer from "../../components/Main/MainContainer";
import MetricBox from "../../components/Metrics/MetricBox";
import Modal from "../../components/Modals/Modals";
function TestComponents() {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  // Function to increment the counter
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <MainContainer title="Test Components">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <div>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h4>Tabs for Nav Links.</h4>
            <Tabs
              defaultActiveKey="buttons"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="buttons" title="Buttons Deploy">
                <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
                  <h4>Buttons for the Pages.</h4>
                  <Button variant="primary">Main primary</Button>
                  <Button variant="secondary">Main secondary</Button>
                  <Button
                    variant="link"
                    style={{ display: "flex", gap: "0.5rem", color: "#A23555" }}
                  >
                    Link Button
                    <FontAwesomeIcon
                      icon={faGear}
                      style={{ fontSize: "1.5rem" }}
                    />
                  </Button>
                  <Button variant="outline-primary">Outline primary</Button>
                  <Button variant="outline-secondary">Outline secondary</Button>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Profile">
                Tab content for Profile
              </Tab>
              <Tab eventKey="contact" title="Contact" disabled>
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>

          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <h4>Metric Boxes</h4>
            <MetricBox
              topText="Evaluacion de Riesgos Organizacional"
              middleText="45.80"
              bottomText="En la evaluacion original"
              order="top-bottom-middle"
              status="warning"
              width="320px"
              gap="0.5rem"
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <h4>Acoordion Items</h4>
            <div style={{ width: "1100px" }}>
              <AccordionBox
                accordionItems={[
                  {
                    header: <h4 className="text-secondary">Header 1</h4>,
                    hasBody: true,
                    body: (
                      <ListTableBox
                        listItems={[
                          {
                            key: "1",
                            content: (
                              <div style={{ width: "500px" }}>
                                <div className="fw-bold">Subheading</div>
                              </div>
                            ),
                          },
                          {
                            key: "2",
                            content: (
                              <div style={{ width: "500px" }}>
                                <div className="fw-bold">Subheading 2</div>
                                <div className="fw-bold">Subheading 2</div>
                              </div>
                            ),
                          },
                          {
                            key: "3",
                            content: (
                              <div style={{ width: "500px" }}>
                                <div className="fw-bold">Subheading 3</div>
                              </div>
                            ),
                            cellColor: "override-danger",
                          },
                        ]}
                        overrideColor="override-white"
                      />
                    ),
                  },
                  {
                    header: <h4>Header 2</h4>,
                    hasBody: true,
                    body: (
                      <>
                        <p>Texto 2</p>
                        <ListTableBox
                          listItems={[
                            {
                              key: "1",
                              content: (
                                <div style={{ width: "500px" }}>
                                  <div className="fw-bold">Subheading</div>
                                </div>
                              ),
                            },
                          ]}
                          overrideColor="override-white"
                        />
                      </>
                    ),
                  },
                  {
                    header: <h4>Header 3</h4>,
                    hasBody: false,
                  },
                ]}
                overrideColor="override-white"
              ></AccordionBox>
            </div>
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <h4>Form Inputs.</h4>
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <Form style={{ width: "100%" }}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  disabled
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
          <h4>Modal Button.</h4>
          <Button variant="primary" onClick={() => setOpenModal(true)}>
            Go to Modal{" "}
          </Button>
        </div>
      </MainContainer>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Eliminado de Documentos"
        size="lg"
        body={`¿Desea eliminar el archivo ${name}?`}
        footer={["Confirmar", "Cerrar"]}
      />
    </div>
  );
}

export default TestComponents;
