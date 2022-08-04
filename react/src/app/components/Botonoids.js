import React from "react";
import { GameLayout } from "./GameLayout";
import { Header } from "./Header";
import { Thumbnail } from "./Thumbnail";

import headerImage from './../../assets/img/botonoids2008/header.png';
import thumb1 from './../../assets/img/botonoids2008/thumb1.png';
import ss1 from './../../assets/img/botonoids2008/ss1.png';
import thumb2 from './../../assets/img/botonoids2008/thumb2.png';
import ss2 from './../../assets/img/botonoids2008/ss2.png';
import thumb3 from './../../assets/img/botonoids2008/thumb3.png';
import ss3 from './../../assets/img/botonoids2008/ss3.png';

export class Botonoids extends React.Component {
    render() {
        return (
            <GameLayout
                header={
                    <img src={headerImage} alt="botonoids 2008 header" width="1000" height="250" />
                }
                main={
                    <div>
                        <Header>About Botonoids 2008</Header>
                        <p>Botonoids 2008 is the followup to the original <a href="http://www.freewebs.com/botonoids">Botonoids</a> that was released in 2004. Botonoids
                        2008 retains the classic gameplay of the original Botonoids, with the addition of many new features!</p>

                        <Header>Download</Header>
                        <p><a href="http://www.smileysmazehunt.com/downloads/Botonoids2008.zip">Download Botonoids 2008!</a></p>

                        <Header>How To Play</Header>
                        <p>
                        Gameplay is mostly identical to the original Botonoids, so you should visit its <a href="http://www.freewebs.com/botonoids/howto.html">How
                        To section.</a> I should make one for Botonoids 2008 to explain the items and stuff but I don't really feel like it.
                        </p>
                    </div>
                }
                side={
                    <div>
                        <Header>Screenshots</Header>
                        <p><table>
                            <tr>
                                <td align="center"><Thumbnail thumbnail={thumb1} image={ss1}></Thumbnail></td>
                                <td align="center"><Thumbnail thumbnail={thumb2} image={ss2}></Thumbnail></td>
                            </tr>
                            <tr>
                                <td align="center"><Thumbnail thumbnail={thumb3} image={ss3}></Thumbnail></td>
                            </tr>
                        </table></p>
                    </div>
                } />
        );
    }
}