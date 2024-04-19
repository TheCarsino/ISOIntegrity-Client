import PropTypes from "prop-types";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import Card from "react-bootstrap/Card";
import "./AccordionBox.scss";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContextAwareToggle({
  children,
  eventKey,
  callback,
  toggleArrow,
  overrideColor,
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div className={`header-box ${overrideColor}`} onClick={decoratedOnClick}>
      <div className="box-content">{children}</div>
      {toggleArrow && (
        <div className="box-arrow">
          <FontAwesomeIcon
            icon={isCurrentEventKey === false ? faChevronDown : faChevronUp}
            style={{ fontSize: "1rem" }}
          />
        </div>
      )}
    </div>
  );
}
ContextAwareToggle.propTypes = {
  children: PropTypes.node,
  eventKey: PropTypes.any,
  callback: PropTypes.any,
  toggleArrow: PropTypes.any,
  overrideColor: PropTypes.any,
};

function AccordionBox({
  accordionItems,
  defaultKey,
  style = "bg-white",
  overrideColor = "",
  overrideColorBody = "",
  width = "100%",
  noPadding = false,
}) {
  let index = 0;

  return (
    <Accordion
      defaultActiveKey={defaultKey !== "" ? defaultKey : null}
      style={{ width: width }}
    >
      {accordionItems.map((card) => (
        <Card
          key={card.id || Math.random().toString()}
          className={`${style}  ${overrideColor}`}
        >
          <Card.Header
            className={`${noPadding != false && "no-padding"} ${overrideColor}`}
          >
            <ContextAwareToggle
              eventKey={index++}
              toggleArrow={card.hasBody}
              overrideColor={overrideColor}
            >
              {card.header}
            </ContextAwareToggle>
          </Card.Header>
          {card.hasBody === true && (
            <Accordion.Collapse eventKey={index - 1}>
              <Card.Body className={`body-box ${overrideColorBody}`}>
                {card.body}
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      ))}
    </Accordion>
  );
}
/*
  ACCORDION VALUES ARE THE FOLLOWING
  accordionItems: Array of objects that defines the header, and body of each accordion item.
    {
      header: Node Component of the header
      hasBody: If the header should collapse a body or not
      body: Node Component of the body that is collapsed
    }
  defaultKey: String to define the default opened key to accordion
  style: Background color of the accordion
  overrideColor and Body: colors that overrides the current background color
  width: width that occupies the accordion
  noPadding: If it's neccesary to eliminate padding
*/

AccordionBox.propTypes = {
  accordionItems: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      hasBody: PropTypes.bool,
      body: PropTypes.node,
    }).isRequired
  ).isRequired,
  defaultKey: PropTypes.string,
  style: PropTypes.string,
  overrideColor: PropTypes.string,
  overrideColorBody: PropTypes.string,
  width: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default AccordionBox;
