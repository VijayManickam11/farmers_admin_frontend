import { Backdrop, Box, Button, Typography } from "@mui/material";
import React from "react";
// import modalCancel from "../../Assets/Images/PopupIcons/modalCancel.png";
import modalDelete from "@mui/icons-material/Delete";
import modalSave from "@mui/icons-material/Save";
import modalLogout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import popupMessages from "../../util/popupMessages/popupMessages";

export default function ModalPopup({
  confirmModal,
  cancelModal,
  saveModal,
  logoutModal,
  modalData,
}) {
  // const modalIcon = require(`../../Assets/Images/PopupIcons/${modalData.icon}`);

  const modalIcon = modalData.type.includes("CANCEL")
    ? modalDelete
    : modalData.type == "DELETE"
    ? modalDelete
    : ["SUCCESS", "SAVE", "SAVE_DRAFT" ].includes(modalData.type)
    ? modalSave
    : ["APPROVE", "SET_TO_DRAFT", "COMPLETE", "AMENDMENT"].includes(modalData.type)
    ? ""
    : modalLogout;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100000 }}
      open={modalData.open}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 370,
          maxHeight: 400,
          backgroundColor: "white",
          borderRadius: "25px",
          boxShadow: 24,
          padding: 20,
          paddingBottom: 30,
        }}
      >
        {/* {modalIcon && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
                width: "15%",
                border: "1px solid #C4C4C4",
                borderRadius: "90px",
              }}
            >
              <img
                src={modalIcon}
                alt="modalIcon"
                
              />
            </Box>
          </Box>
        )} */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: 1,
            fontWeight: 500,
            fontSize: "20px",
            textTransform: "initial",
            color: "#000",
          }}
        >
          {popupMessages[modalData?.modalData]}
        </Box>
        {modalData.type === "SUCCESS" ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            padding={3}
            paddingBottom={0}
            textAlign={"center"}
          >
            <Button
              variant="contained"
              className="cancel_btn1"
              onClick={() => cancelModal()}
            >
              Ok
            </Button>
          </Box>
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            padding={3}
            paddingBottom={0}
            textAlign={"center"}
          >
            <Button
              variant="contained"
              className="cancel_btn1"
              onClick={() => cancelModal()}
            >
              No
            </Button>
            <Button
              variant="contained"
              className="save_btn1"
              onClick={() => confirmModal()}
            >
              Yes
            </Button>
          </Box>
        )}
      </Box>
    </Backdrop>
  );
}
