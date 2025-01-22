import "./Header.css";
import logo from "../../../assets/icons/logo_text.svg";
import loupe from "../../../assets/icons/loupe.svg";
import exit from "../../../assets/icons/exit.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="w-250">
          <img src={logo} alt="logo" />
        </div>
        <form className="search" onSubmit={() => alert("Поиск")}>
          <div className="search-input">
            <input type="text" name="text" placeholder="Поиск" />
            <button className="btn-img position-a-img " type="submit">
              <img src={loupe} alt="loupe" />
            </button>
          </div>
        </form>
      </div>

      <div className="exit">
        <button
          className="btn-exit"
          type="button"
          onClick={() => alert("Exit")}
        >
          <p>Выйти</p>
          <img src={exit} alt="exit" className="br-25" />
        </button>
      </div>
    </header>
  );
}
