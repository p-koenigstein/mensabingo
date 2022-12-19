import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import BingoFieldDisplayer from "./bingoField/BingoFieldDisplayer";
import {useCookies} from "react-cookie";

export type LandingPageProps = {};

const LandingPage: React.FC<LandingPageProps> = () => {
    /** ** ** ** ** ** **
     **                **
     **  Hook States   **
     **                **
     ** ** ** ** ** ** **/

    const defaultName = "Name";
    const [localName, setLocalName] = useState<string>(defaultName);
    const [name, setName] = useState<string>(defaultName);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const[loginModalOpen, setLoginModalOpen] = useState<boolean>(true);
    const [cookies, setCookie] = useCookies<string>(['mensabingo']);

    useEffect(() => {
        if(name !== defaultName){
            setLoggedIn(true);
        }
        else{
            setLoggedIn(false);
        }
    },[name]);

    useEffect(() => {
        let cookieName = cookies["name"]
        if(cookieName){
            if(cookieName!==defaultName){
                setName(cookieName);
            }
        }
    },[cookies]);

    /** ** ** ** ** ** **
     **                **
     **   Functions    **
     **                **
     ** ** ** ** ** ** **/

    const focusName = () =>{
        if(localName === defaultName){
            setLocalName("");
        }
    }

    const blurName = () => {
        if(localName === ""){
            setLocalName(defaultName);
        }
    }

    const login = () => {
        //set cookie !!
        setName(localName);
        setCookie("name",localName);
    }

    return loggedIn ? <BingoFieldDisplayer name={name}/> : (
        <div>
                <Modal show={loginModalOpen} onHide={() => setLoginModalOpen(false)}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Body>
                        <input
                            type={"text"}
                            value={localName}
                            onChange={e => setLocalName(e.target.value)}
                            onFocus={focusName}
                            onBlur={blurName}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"success"} onClick={login}>Login</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
};

export default LandingPage;
