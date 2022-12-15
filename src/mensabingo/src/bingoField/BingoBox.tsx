import React from "react";
import classNames from "classnames";

export type BingoBoxProps = {
  text: string;
  clickField: () => void;
  completed: boolean;
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
      className={classNames({ bingoBox: true, completed: props.completed })}
      onClick={props.clickField}
    >
      {props.text}
    </div>
  );
};

export default BingoBox;
