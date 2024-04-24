import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./ListTableBox.scss";

function ListTableBox({
  header,
  listItems,
  style,
  overrideColor = "override-white",
  noPadding = false,
}) {
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
      {header}
      {listItems.map((item) => (
        <ListGroup.Item
          key={item.key}
          as="li"
          className={`listitem-box ${overrideColor} ${
            item.cellColor != null && item.cellColor
          } ${noPadding != false && "override-noPadding"}`}
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
  header: Of the current listtable to define columns
  accordionItems: Array of objects that defines the header, and body of each accordion item.
    {
      key: String defined to identify the id of the list item
      content: Node Body of the current object
      cellColor: colors that overrides the current background color of the cell
    }
  color: Background color of the accordion
  overrideColor: colors that overrides the current background color
  width: width that occupies the accordion
  noPadding: if we want the listitem-box to have no padding
*/

ListTableBox.propTypes = {
  header: PropTypes.node,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      cellColor: PropTypes.string,
    }).isRequired
  ).isRequired,
  style: PropTypes.string,
  overrideColor: PropTypes.string,
  noPadding: PropTypes.bool,
};

export default ListTableBox;
