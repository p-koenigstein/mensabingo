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
  // content of bingo fields
    const [bingoField, setBingoField] = useState<BingoField>(new BingoField());
    const [fields, setFields] = useState<BingoCell[][]>([[]]);

  const [completed, setCompleted] = useState<boolean[][]>([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const [clickedCell, setClickedCell] = useState<BingoCell>(new BingoCell(-1));

  // whether popup currently is open
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // popup text
  const [modalText, setModalText] = useState<string>("");

  useEffect(() => {
    axios.get("/getBingoField")
      .then(res => {
        console.debug(res.data)
        setBingoField(res.data)
      });
  },[]);

  /** ** ** ** ** ** **
   **                **
   **   Functions    **
   **                **
   ** ** ** ** ** ** **/

  const clickCell = (cell: BingoCell) => {
    console.debug("clicked Cell");
    // open popup with given text
    setClickedCell(cell);
    console.log(bingoField);
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
    axios.post("/acceptField",clickedCell)
      .then(res => setBingoField(res.data));
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
