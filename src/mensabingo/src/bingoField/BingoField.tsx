import React, { useEffect, useState } from "react";
import BingoBox from "./BingoBox";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

export type BingoFieldProps = {};

const BingoField: React.FC<BingoFieldProps> = () => {
  /** ** ** ** ** ** **
   **                **
   **  Hook States   **
   **                **
   ** ** ** ** ** ** **/
  // content of bingo fields
  const [fields, setFields] = useState<string[][]>([
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10"],
    ["11", "12", "13", "14", "15"],
    ["16", "17", "18", "19", "20"],
    ["21", "22", "23", "24", "25"],
  ]);

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
        setFields(res.data);
      });
  },[]);

  /** ** ** ** ** ** **
   **                **
   **   Functions    **
   **                **
   ** ** ** ** ** ** **/

  const clickCell = (position: number[]) => {
    console.debug("clicked Cell");
    // open popup with given text
    setModalText(fields[position[0]][position[1]]);
    setClickedPosition([position[0], position[1]]);
    setModalOpen(true);
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
          {fields.map((row) => (
            <tr key={fields.indexOf(row)}>
              {row.map((cell) => (
                <td
                  className={"singleBorder"}
                  key={fields.indexOf(row) + " " + row.indexOf(cell)}
                >
                  <BingoBox
                    text={cell}
                    key={cell}
                    clickField={() =>
                      clickCell([fields.indexOf(row), row.indexOf(cell)])
                    }
                    completed={
                      completed[fields.indexOf(row)][row.indexOf(cell)]
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

export default BingoField;
