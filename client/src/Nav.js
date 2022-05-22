import "./Nav.css"
import { NavLink } from "react-router-dom";

/** Nav for navigation between resources
 * 
 * 
 * State: none
 * 
 * App -> Nav 
 * 
 */

function Nav() {

  return (
    <nav className="Nav">
        <div className="Nav-left">
            <NavLink exact to="/">All Items</NavLink>
        </div>
        <div className="Nav-right">
            <NavLink to="/currentItems">Current Items</NavLink>
            <NavLink to="/deletedItems">Deleted Items</NavLink>
            <NavLink to="/addItem">Add New Item</NavLink>
        </div>
    </nav>
  );
}

export default Nav;