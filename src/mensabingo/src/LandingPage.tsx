import React, {useEffect, useState} from "react";
import {Button, ListGroupItem, Modal} from "react-bootstrap";
import BingoFieldDisplayer from "./bingoField/BingoFieldDisplayer";
import ListGroup from 'react-bootstrap/ListGroup';
import {useCookies} from "react-cookie";
import axios from "axios";

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
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(true);
    const [cookies, setCookie] = useCookies<string>(['mensabingo']);
    const [lobby, setLobby] = useState<string>("");
    const [lobbyList, setLobbyList] = useState<string[]>([]);

    useEffect(() => {
        if(name !== defaultName){
            setLoggedIn(true);
            setLoginModalOpen(false);
        }
        else{
            setLoggedIn(false);
            setLoginModalOpen(true);
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

    useEffect(() => {
        axios.get("/getLobbyList")
            .then(res => {
                setLobbyList(res.data)
            })
    },[])

    /** ** ** ** ** ** **
     **                **
     **   Functions    **
     **                **
     ** ** ** ** ** ** **/

    const resetLobby = () => {
        setLobby("");
    }

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
        setLoginModalOpen(false);
    }

    const createLobby = (lobbyName:string) => {
        axios.post("/createLobby",lobbyName)
            .then();
    }

    return loggedIn && lobby!=="" ? <BingoFieldDisplayer name={name} currentLobby={lobby}/> : (
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
            <ListGroup>
                {lobbyList.map(entry =>(<ListGroupItem action onClick={() =>setLobby(entry)}>
                    {entry}
                </ListGroupItem>))}
            </ListGroup>
            <Button onClick={()=>createLobby("new")}>Neue Lobby</Button>
        </div>
    );
};

export default LandingPage;
