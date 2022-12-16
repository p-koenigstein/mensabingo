import React from "react";
import classNames from "classnames";
import { BingoCell } from "../datatypes/BingoCell";

export type BingoBoxProps = {
  clickField: () => void;
  field: BingoCell;
};

const BingoBox: React.FC<BingoBoxProps> = (props) => {
  /** ** ** ** ** ** **
   **                **
   **  Hook States   **
   **                **
   ** ** ** ** ** ** **/

  /** ** ** ** ** ** **
   **                **
   **   Functions    **
   **                **
   ** ** ** ** ** ** **/

  /** ** ** ** ** ** **
   **                **
   **   Rendering    **
   **                **
   ** ** ** ** ** ** **/

  return (
    <div
      className={classNames({ bingoBox: true, completed: props.field.happened})}
      onClick={props.clickField}
    >
      {props.field.name+" "+props.field.action}
    </div>
  );
};

export default BingoBox;
