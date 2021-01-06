import logo from "../../images/amazon-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useStateValue } from "../../store/StateProvider";
import { auth } from "../../firebase";

function Header() {
  const cssPrefix = "header";

  const [{ cart, user }] = useStateValue();

  const handleAuthentication = () => {
    auth.signOut();
  };

  return (
    <div className={cssPrefix}>
      <Link to="/">
        <img src={logo} alt="" className={`${cssPrefix}__logo`}></img>
      </Link>

      <div className={`${cssPrefix}__search`}>
        <input type="text" className={`${cssPrefix}__searchInput`} />
        <SearchIcon className={`${cssPrefix}__searchIcon`} />
      </div>

      <div className={`${cssPrefix}__nav`}>
        <Link to={!user && "/login"} className={`${cssPrefix}__link`}>
          <div
            onClick={handleAuthentication}
            className={`${cssPrefix}__option`}
          >
            <div className={`${cssPrefix}__optionLineOne`}>
              Hello {user ? user?.email : "Guest"}
            </div>
            <div className={`${cssPrefix}__optionLineTwo`}>
              {user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </Link>

        <Link to="/orders" className={`${cssPrefix}__link`}>
          <div className={`${cssPrefix}__option`}>
            <div className={`${cssPrefix}__optionLineOne`}>Returns</div>
            <div className={`${cssPrefix}__optionLineTwo`}>& Orders</div>
          </div>
        </Link>

        <div className={`${cssPrefix}__option`}>
          <div className={`${cssPrefix}__optionLineOne`}>Your</div>
          <div className={`${cssPrefix}__optionLineTwo`}>Prime</div>
        </div>

        <Link to="/checkout" className={`${cssPrefix}__link`}>
          <div className={`${cssPrefix}__optionBasket`}>
            <ShoppingCartIcon />
            <span className={`${cssPrefix}__optionLineTwo header__basketCount`}>
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
