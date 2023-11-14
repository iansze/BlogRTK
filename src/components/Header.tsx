import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1 className="heading-1">Blog</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <Link to="/">Home</Link>
            <Link to="/post">New Post</Link>
            <Link to="/user">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
