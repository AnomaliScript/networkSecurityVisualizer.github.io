import { NavLink } from 'react-router-dom';

function Links() {
  return (
    <NavLink to="/tasks">
      {({ isActive }) => (
        <span className={isActive ? "active" : ""}>Tasks</span>
      )}
    </NavLink>
  );
}

const Sidebar = () => {
  return (
    <>
      <h1>NetworKitchen</h1>
      {Links()}
    </>
  )
}

export default Sidebar;