import { useState, useEffect } from "react";

function ListGroup() {
  const items = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  // Map city names to IANA time zone identifiers
  const timeZones: Record<string, string> = {
    "New York": "America/New_York",
    "Los Angeles": "America/Los_Angeles",
    "Chicago": "America/Chicago",
    "Houston": "America/Chicago",
    "Phoenix": "America/Phoenix",
    "Philadelphia": "America/New_York",
    "San Antonio": "America/Chicago",
    "San Diego": "America/Los_Angeles",
    "Dallas": "America/Chicago",
    "San Jose": "America/Los_Angeles",
  };
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //    variable name | function to update | initial value

  // Updating the name and time
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < items.length) {
      setName(items[selectedIndex]);

      // Function to update the time display
      const updateTime = () => {
        const cityTime = new Date().toLocaleTimeString('en-US', {
          timeZone: timeZones[items[selectedIndex]]
        });
        setTime(cityTime);
      };

      // Show time immediately
      updateTime();

      // Set up a timer to update the clock every second
      const timer = setInterval(updateTime, 1000);

      // Use the "cleanup" function to stop the timer when the component unmounts
      return () => clearInterval(timer);
    }
  }, [selectedIndex]);

  // This will be for if we need to display the selected name somewhere else
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const getMessage = () => {
    return items.length === 0 && <div>No items found.</div>;
  };

  return (
    // Return statements can only return one element, 
    // so return a fragment, (the empty tags) to do so
    <>
      <h2>Hello!  The time in {name} is {time}</h2>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
