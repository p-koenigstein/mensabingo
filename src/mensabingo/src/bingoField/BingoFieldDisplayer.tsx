import React, { useEffect, useState } from "react";
import BingoBox from "./BingoBox";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BingoCell, BingoField } from "../datatypes/BIngoCell";

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
  // const [fields, setFields] = useState<string[][]>([
  //   ["1", "2", "3", "4", "5"],
  //   ["6", "7", "8", "9", "10"],
  //   ["11", "12", "13", "14", "15"],
  //   ["16", "17", "18", "19", "20"],
  //   ["21", "22", "23", "24", "25"],
  // ]);

  const [completed, setCompleted] = useState<boolean[][]>([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);

  const [clickedPosition, setClickedPosition] = useState<number[]>([-1, -1]);

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
    // setModalText(bingoField.field[position[0]][position[1]].name);
    // setClickedPosition([position[0], position[1]]);
    // setModalOpen(true);
  };

  const closeModal = () => {
    //   reset modal text and close
    setModalText("");
    setModalOpen(false);
  };

  const acceptField = () => {
    let tmpCompleted = completed;
    tmpCompleted[clickedPosition[0]][clickedPosition[1]] = true;
    setCompleted(tmpCompleted);
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
          <Button variant="success" onClick={acceptField}>
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
