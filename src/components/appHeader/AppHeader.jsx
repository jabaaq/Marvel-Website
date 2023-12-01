import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> Information Portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink end style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/comics">
              {/* here I removed the 'end' so that all links that contained '/comics' would also be colored in this color */}
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
