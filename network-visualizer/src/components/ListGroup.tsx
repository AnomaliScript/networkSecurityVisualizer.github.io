import { useState } from "react";

interface Props {
  // Variable Definitions
  items: string[];
  heading: string;

  // Function Definitions
  onSelectItem: (item: string) => void;
}

//         destructing "unwrapping" property names with { iterms, heading }
//                                 interface name
function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // default value is -1 (no selection)
  //    variable name | function to update | initial value

  // This will be for if we need to display the selected name somewhere else
  const [name, setName] = useState(""); // default value is empty string

  const getMessage = () => {
    return items.length === 0 && <div>No items found.</div>;
  };

  return (
    // Return statements can only return one element, 
    // so return a fragment, (the empty tags) to do so
    <>
      <h2>{heading}</h2>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
