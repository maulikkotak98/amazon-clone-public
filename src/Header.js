import logo from "./amazon-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.scss";

function Header() {
  const cssPrefix = "header";
  return (
    <div className={cssPrefix}>
      <img src={logo} alt="" className={`${cssPrefix}__logo`}></img>

      <div className={`${cssPrefix}__search`}>
        <input type="text" className={`${cssPrefix}__searchInput`} />
        <SearchIcon className={`${cssPrefix}__searchIcon`} />
      </div>

      <div className={`${cssPrefix}__nav`}>
        <div className={`${cssPrefix}__option`}>
          <div className={`${cssPrefix}__optionLineOne`}>Hello Guest</div>
          <div className={`${cssPrefix}__optionLineTwo`}>Sign In</div>
        </div>

        <div className={`${cssPrefix}__option`}>
          <div className={`${cssPrefix}__optionLineOne`}>Returns</div>
          <div className={`${cssPrefix}__optionLineTwo`}>& Orders</div>
        </div>

        <div className={`${cssPrefix}__option`}>
          <div className={`${cssPrefix}__optionLineOne`}>Your</div>
          <div className={`${cssPrefix}__optionLineTwo`}>Prime</div>
        </div>

        <div className={`${cssPrefix}__optionBasket`}>
          <ShoppingCartIcon />
          <span className={`${cssPrefix}__optionLineTwo header__basketCount`}>
            0
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
