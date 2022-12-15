import React, { useState } from "react";
import axios from "axios";

export type PromptWindowProps = {};

const PromptWindow: React.FC<PromptWindowProps> = () => {
  /** ** ** ** ** ** **
   **                **
   **  Hook States   **
   **                **
   ** ** ** ** ** ** **/
  const defaultName: string = "Name";
  const [name, setName] = useState<string>(defaultName);
  const defaultAction: string = "Aktion";
  const [action, setAction] = useState<string>(defaultAction);

  /** ** ** ** ** ** **
   **                **
   **   Functions    **
   **                **
   ** ** ** ** ** ** **/

  const focusName = () => {
    if (name === defaultName) {
      setName("");
    }
  };
  const blurName = () => {
    if (name === "") {
      setName(defaultName);
    }
  };

  const focusAction = () => {
    if (action === defaultAction) {
      setAction("");
    }
  };
  const blurAction = () => {
    if (action === "") {
      setAction(defaultName);
    }
  };

  const submitForm = () => {
    if (name === defaultName || action === defaultAction) {
      return;
    }
    console.debug(name + " " + action);
    let dataEntry = { name: name, action: action };
    axios.post("/addEntry", dataEntry).then((res) => console.debug(res));
    setAction(defaultAction);
    setName(defaultName);
  };

  return (
    <div>
      <label>
        Name der Person:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onFocus={() => focusName()}
          onBlur={() => blurName()}
        />
      </label>
      <label>
        Aktion:
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.currentTarget.value)}
          onFocus={() => focusAction()}
          onBlur={() => blurAction()}
        />
        <input type="submit" value="Abschicken" onClick={submitForm} />
      </label>
    </div>
  );
};

export default PromptWindow;
