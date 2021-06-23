import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Dialog, Button } from "@blueprintjs/core";
import SubtitleCard from "../Components/SubtitleCard";
import { useSelector, useDispatch } from "react-redux";
import { deleteCaption } from "../_Redux/Actions";

const Container = styled.div`
  width: 100%;

  max-width: 500px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;
const DialogContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  button {
    margin: 1em;
  }
`;
function SubtitlesEditor() {
  const dispatch = useDispatch();
  const [deleteSubDialog, setDeleteSubDialog] = useState(false);
  const [subtitleToDelete, setSubtitleToDelete] = useState(null);
  const subtitles = useSelector((state) => state.data.present.subtitles);

  const openDeleteCaptionDialog = (subIndex) => {
    setSubtitleToDelete(subIndex);
    setDeleteSubDialog(true);
  };
  return (
    <Container>
      {subtitles.map((subData, i) => (
        <SubtitleCard
          subIndex={i}
          subData={subData}
          key={"sub" + i}
          openDeleteCaptionDialog={openDeleteCaptionDialog}
        />
      ))}

      <Dialog
        icon="info-sign"
        onClose={() => setDeleteSubDialog(false)}
        title="Supprimer ce sous-titre"
        isOpen={deleteSubDialog}
      >
        <DialogContent>
          <div>Êtes-vous sûr de vouloir supprimer ce sous-titre?</div>
          <div>
            <Button
              intent="success"
              onClick={() => {
                setDeleteSubDialog(false);
                dispatch(deleteCaption(subtitleToDelete));
              }}
            >
              Oui
            </Button>
            <Button intent="danger" onClick={() => setDeleteSubDialog(false)}>
              Non
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default SubtitlesEditor;
