import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerElementsContainer">
        <NavLink
          to="/home"
          className={(navData) =>
            navData.isActive ? "selectedButton footerElement" : "footerElement"
          }
        >
          <div className="icon">
            <i className="fas fa-home"></i>
            <div className="label">Home</div>
          </div>
        </NavLink>
        <NavLink
          to="/section"
          className={(navData) =>
            navData.isActive ? "selectedButton footerElement" : "footerElement"
          }
        >
          <div className="icon">
            <i className="fas fa-balance-scale"></i>
            <div className="label">PG</div>
          </div>
        </NavLink>
        <NavLink
          to="/reference"
          className={(navData) =>
            navData.isActive ? "selectedButton footerElement" : "footerElement"
          }
        >
          <div className="icon">
            <i className="fas fa-table"></i>
            <div className="label">Reference</div>
          </div>
        </NavLink>
        <NavLink
          to="/tournament"
          className={(navData) =>
            navData.isActive ? "selectedButton footerElement" : "footerElement"
          }
        >
          <div className="icon">
            <i className="fas fa-trophy"></i>
            <div className="label">TR</div>
          </div>
        </NavLink>
      </div>
    </footer>
  );
}
