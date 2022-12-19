import React, { useEffect, useState } from "react";
import BingoBox from "./BingoBox";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {anyoneNames, BingoCell, BingoField, BingoWinner} from "../datatypes/BingoCell";

export type BingoFieldProps = {
  name:string;
  currentLobby:string;
};

const BingoFieldDisplayer: React.FC<BingoFieldProps> = ({name, currentLobby}) => {
  /** ** ** ** ** ** **
   **                **
   **  Hook States   **
   **                **
   ** ** ** ** ** ** **/
  // lobby currently playing in
  // content of bingo fields
  const [bingoField, setBingoField] = useState<BingoField>(new BingoField());
  const [clickedCell, setClickedCell] = useState<BingoCell>(new BingoCell(-1));
  // BingoWinner object if someone won
  const [bingoWinnerObj, setBingoWinnerObj] = useState<BingoWinner>(new BingoWinner("no",[]));
  // if bingofield contains anyone as name, enter a name who did it
  let defaultAnyoneName = "Wer ?";
  const [anyoneName, setAnyoneName] = useState<string>(defaultAnyoneName);
  // whether popup currently is open
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // popup text
  const [modalText, setModalText] = useState<string>("");
  // whether bingo popup is open
  const [bingoModalOpen, setBingoModalOpen] = useState<boolean>(false);

  useEffect(() => {
      axios.get("/getBingoField/"+currentLobby+"/"+name)
        .then(res => {
          setBingoField(res.data);
        });
    },[name]);

  useEffect(() => {
    if(bingoWinnerObj.name!=="no"){
      setBingoModalOpen(true);
    }
  },[bingoWinnerObj])

  useEffect(() =>{
    if(bingoField.thisBingoFinished){
      axios.get("/getBingoWinner/"+currentLobby)
          .then(
              res =>{
                setBingoWinnerObj(res.data);
              }
          )
    }
  },[bingoField])

  /** ** ** ** ** ** **
   **                **
   **   Functions    **
   **                **
   ** ** ** ** ** ** **/

  const clickCell = (cell: BingoCell) => {
    // open popup with given text
    setClickedCell(cell);
    setModalText(cell.name+" "+cell.action);
    setModalOpen(true);
  };

  const closeModal = () => {
    //   reset modal text and close
    setModalText("");
    setModalOpen(false);
  };

  const acceptCell = () => {
    // http request to backend to set field to true
    let localCopy = clickedCell;
    if(anyoneName===defaultAnyoneName){
      localCopy.anyoneWho = "Irgendjemand";
    }
    else{
      localCopy.anyoneWho = anyoneName;
    }
    axios.post("/acceptField/"+"/"+currentLobby+"/"+name,localCopy)
      .then(res => {
        setBingoField(res.data)
      });
    setAnyoneName(defaultAnyoneName);
    closeModal();
  };

  const focusAnyoneName = ()  => {
    if(anyoneName === defaultAnyoneName){
      setAnyoneName("");
    }
  }

  const blurAnyoneName = () => {
    if(anyoneName === ""){
      setAnyoneName(defaultAnyoneName);
    }
  }


  const refuseField = () => {
    closeModal();
  };

  /** ** ** ** ** ** **
   **                **
   **   Rendering    **
   **                **
   ** ** ** ** ** ** **/

  return (
    <div>
      <Modal show={bingoModalOpen} onHide={() => setBingoModalOpen(false)}
             size="sm">
        <Modal.Header>
          <Modal.Title>{bingoWinnerObj.name===name ? "Herzlichen Glückwunsch" : "Sieger: "+bingoWinnerObj.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          {bingoWinnerObj.cells.map((cell)=>(
            <div
              key={cell.id}
            >{anyoneNames.includes(cell.name) ? cell.anyoneWho : cell.name}
              {" "+cell.action+" um "+cell.happenedTime}</div>
          ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={bingoWinnerObj.name===name ? "success" : "danger"} onClick={() => setBingoModalOpen(false)}>
            {bingoWinnerObj.name===name ? "Gewinnertyp(-in)" : "Verlierertyp(-in)"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Bingofeld erfüllt</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}
          {anyoneNames.includes(clickedCell.name)? <input
              type={"text"}
              value={anyoneName}
              onChange={(e) => setAnyoneName(e.target.value)}
              onFocus={focusAnyoneName}
              onBlur = {blurAnyoneName}
          />:<div/>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={acceptCell}>
            Yesss
          </Button>
          <Button variant="danger" onClick={refuseField}>
            Doch nicht
          </Button>
        </Modal.Footer>
      </Modal>
      <table cellSpacing={0} className={"singleBorder"}>
        <tbody>
          {bingoField.field.map((row) => (
            <tr key={bingoField.field.indexOf(row)}>
              {row.map((cell) => (
                <td
                  className={"singleBorder"}
                  key={bingoField.field.indexOf(row) + " " + row.indexOf(cell)}
                >
                  <BingoBox
                    field = {cell}
                    clickField={() =>
                      clickCell(cell)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoFieldDisplayer;
