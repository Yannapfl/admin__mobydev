import "./Header.css";
import logo from "../../../assets/icons/logo_text.svg";
import loupe from "../../../assets/icons/loupe.svg";
import exit from "../../../assets/icons/exit.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModalManager } from "../../Modals/useModalManager";
import { ModalFactory } from "../../Modals/ModalFactory";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalType, modalProps, openModal, closeModal } = useModalManager();
  const [request, setRequest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("result", { state: { value: request } });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRequest(e.target.value);
  }

  useEffect(() => {
    if (!location.pathname.includes('result')) {
      setRequest('');
    }
  }, [location.pathname])

  return (
    <header className="header">
      <div className="header-left">
        <div className="w-250" onClick={() => navigate('projects')}>
          <img src={logo} alt="logo" />
        </div>
        <form className="search" onSubmit={handleSubmit}>
          <div className="search-input">
            <input type="text" name="text" placeholder="Поиск" value={request} onChange={handleChange}/>
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
          onClick={
            () => openModal('exit', { closeModal })
          }
        >
          <p>Выйти</p>
          <img src={exit} alt="exit" className="br-25" />
        </button>
      </div>

      {modalType && (
        <ModalFactory
          type={modalType}
          modalProps={{
            ...modalProps,
            closeModal,
          }}
        />
      )}
    </header>
  );
}
