
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth"
const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
       <li>
        <Link to="/dashboard">
        <i className="fas fa-user"></i>{''}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{''}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
      <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  )
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to={!isAuthenticated && !loading ? '/' : '/dashboard'}>
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        {!loading && (
          <>{isAuthenticated ? authLinks : guestLinks}</>
        )}
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
