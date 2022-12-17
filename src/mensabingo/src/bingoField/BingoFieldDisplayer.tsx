import React, { useEffect, useState } from "react";
import BingoBox from "./BingoBox";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BingoCell, BingoField } from "../datatypes/BingoCell";

export type BingoFieldProps = {};

const BingoFieldDisplayer: React.FC<BingoFieldProps> = () => {
  /** ** ** ** ** ** **
   **                **
   **  Hook States   **
   **                **
   ** ** ** ** ** ** **/
  // name of player
  const [name, setName] = useState<string>("Name");
  const [tmpName, setTmpName] = useState<string>("Name");
  // content of bingo fields
  const [bingoField, setBingoField] = useState<BingoField>(new BingoField());
  const [clickedCell, setClickedCell] = useState<BingoCell>(new BingoCell(-1));

  // whether popup currently is open
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // popup text
  const [modalText, setModalText] = useState<string>("");
  // whether bingo popup is open
  const [bingoModalOpen, setBingoModalOpen] = useState<boolean>(false);
  // bingo popup text
  const [bingoText, setBingoText] = useState<string>("You have the bingo of the kind");

  useEffect(() => {
    if(name !== "Name"){
      axios.get("/getBingoField/"+name)
        .then(res => {
          setBingoField(res.data);
        });
    }
  },[name]);

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
    axios.post("/acceptField/"+name,clickedCell)
      .then(res => {
        setBingoField(res.data)
        if(res.data.thisBingoFinished){
          setBingoModalOpen(true);
        }
      });
    closeModal();
  };


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
      <input type={"text"} onChange={(e) => setTmpName(e.target.value)} value={tmpName}/>
      <button onClick={() => setName(tmpName)}>Name abändern</button>
      <Modal show={bingoModalOpen} onHide={() => setBingoModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Bingo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          {bingoField.finishedBingoCells.map((cell)=>(
            <div
              key={cell.id}
            >{cell.name+" "+cell.action+" um "+cell.happenedTime}</div>
          ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setBingoModalOpen(false)}>
            Gewinnertyp(-in)
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Bingofeld erfüllt</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
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
