import React,{useEffect,useRef} from "react";
import styled from "styled-components";
import SubtitleCard from "../Components/SubtitleCard";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  min-width: 700px;
  height: 100%;
  overflow-y: scroll;
  flex: 1;
`;

function SubtitlesEditor() {
  const selectedSub = useRef()
  const subtitles = useSelector((state) => state.data.subtitles);
  const currentlySelected = useSelector((state) => state.data.currentlySelected);

  // useEffect(()=>{
  //   if(currentlySelected !== null) selectedSub.current.scrollIntoView()
  // },[currentlySelected])
  
  return (
    <Container>
      {subtitles.map((subData, i) => (
        <SubtitleCard subIndex={i} subData={subData} 
        // isSelected={currentlySelected === i ? selectedSub: null} 
        />
      ))}
    </Container>
  );
}

export default SubtitlesEditor;
