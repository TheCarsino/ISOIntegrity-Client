import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListTableBox.scss";

function ListTableBox({ listItems, style, overrideColor = "override-white" }) {
  const listBoxRef = useRef(null); // Ref to the list-box element
  const [contentExceedsWidth, setContentExceedsWidth] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (listBoxRef.current) {
        const contentWidth = listBoxRef.current.scrollWidth;
        const containerWidth = listBoxRef.current.clientWidth;
        setContentExceedsWidth(contentWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow); // Recheck on resize

    return () => window.removeEventListener("resize", checkOverflow); // Cleanup
  }, []);

  return (
    <ListGroup
      variant="flush"
      className={`list-box ${style} ${overrideColor} ${
        contentExceedsWidth ? "overflow-x" : ""
      }`}
    >
      {listItems.map((item) => (
        <ListGroup.Item
          key={item.key}
          as="li"
          className={`listitem-box ${
            item.cellColor != null ? item.cellColor : "override-white"
          }`}
          ref={listBoxRef}
        >
          {item.content}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

/*
  LIST TABLE VALUES ARE THE FOLLOWING
  accordionItems: Array of objects that defines the header, and body of each accordion item.
    {
      key: String defined to identify the id of the list item
      content: Node Body of the current object
      cellColor: colors that overrides the current background color of the cell
    }
  color: Background color of the accordion
  overrideColor: colors that overrides the current background color
  width: width that occupies the accordion
*/

ListTableBox.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      cellColor: PropTypes.string,
    }).isRequired
  ).isRequired,
  style: PropTypes.string,
  overrideColor: PropTypes.string,
};

export default ListTableBox;
