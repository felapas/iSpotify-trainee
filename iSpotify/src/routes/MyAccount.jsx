import React, { useState, useEffect } from "react";
import api from "../api";
import { Modal, Box, Alert } from "@mui/material";
import "./MyAccount.css";

const MyAccount = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users/user");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailModalOpen = () => {
    setEmailError("");
    setEmailModalOpen(true);
  };
  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
    setNewEmail("");
    setEmailError("");
  };
  const handlePasswordModalOpen = () => {
    setPasswordError("");
    setPasswordModalOpen(true);
  };
  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = async () => {
    if (!newEmail) {
      setEmailError("O e-mail não pode estar vazio.");
      return;
    }
    if (!validateEmail(newEmail)) {
      setEmailError("Formato de e-mail inválido.");
      return;
    }
    try {
      await api.put(`/users/${user.id}`, { email: newEmail });
      setUser({ ...user, email: newEmail });
      handleEmailModalClose();
    } catch (error) {
      console.error("Erro ao trocar e-mail:", error);
      setEmailError("Erro ao trocar e-mail. Tente novamente.");
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Todos os campos são obrigatórios.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("As novas senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post(
        "users/login",
        { email: user.email, password: currentPassword },
        { withCredentials: false }
      );

      if (response.status === 204) {
        await api.put(`/users/${user.id}`, { password: newPassword });
        handlePasswordModalClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setPasswordError("Senha atual incorreta.");
      } else {
        console.error("Erro ao trocar senha:", error);
        setPasswordError("Erro ao trocar senha. Tente novamente.");
      }
    }
  };

  return (
    <div className="account-container">
      <h1 className="account-title">Minha Conta</h1>
      <div className="account-display">
        <div className="input-container">
          <input
            type="text"
            value={user.name}
            readOnly
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">
            account_circle
          </span>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={user.email}
            readOnly
            className="account-field"
          />
          <span className="material-symbols-outlined input-icon">mail</span>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="account-button"
            onClick={handleEmailModalOpen}
          >
            Trocar Email
          </button>
          <button
            type="button"
            className="account-button green-btn"
            onClick={handlePasswordModalOpen}
          >
            Trocar Senha
          </button>
        </div>
      </div>

      {/* Email Modal */}
      <Modal open={emailModalOpen} onClose={handleEmailModalClose}>
        <Box sx={emailModalStyle} className="modal-box">
          <h2 className="edit-label">Novo E-mail</h2>
          <div className="input-container">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              className="account-field"
            />
            <span className="material-symbols-outlined input-icon">mail</span>
          </div>
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <div className="edit-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleEmailModalClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="confirm-button"
              onClick={handleEmailChange}
            >
              Confirmar
            </button>
          </div>
        </Box>
      </Modal>

      {/* Password Modal */}
      <Modal open={passwordModalOpen} onClose={handlePasswordModalClose}>
        <Box sx={passwordModalStyle} className="modal-box">
          <h2 className="edit-label">Nova Senha</h2>
          <div className="input-container">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Senha atual"
              className="account-field"
            />
            <span className="material-symbols-outlined input-icon">lock</span>
          </div>
          <div className="input-container">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nova senha"
              className="account-field"
            />
            <span className="material-symbols-outlined input-icon">lock</span>
          </div>
          <div className="input-container">
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirmar nova senha"
              className="account-field"
            />
            <span className="material-symbols-outlined input-icon">lock</span>
          </div>
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          <div className="edit-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handlePasswordModalClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="confirm-button"
              onClick={handlePasswordChange}
            >
              Confirmar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const emailModalStyle = {
  position: "relative",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 505,
  height: 260,
  bgcolor: "#000000",
  boxShadow: 24,
  p: 4,
};

const passwordModalStyle = {
  position: "relative",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 505,
  height: 453,
  bgcolor: "#000000",
  boxShadow: 24,
  p: 4,
};

export default MyAccount;
