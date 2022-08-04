import React from "react";
import { GameLayout } from "./GameLayout";
import { Thumbnail } from "./Thumbnail";

import headerImage from './../../assets/img/shooterland/header.png';
import thumb1 from './../../assets/img/shooterland/thumbnail1.png';
import ss1 from './../../assets/img/shooterland/ss1.png';
import thumb2 from './../../assets/img/shooterland/thumbnail2.png';
import ss2 from './../../assets/img/shooterland/ss2.png';
import thumb3 from './../../assets/img/shooterland/thumbnail3.png';
import ss3 from './../../assets/img/shooterland/ss3.png';
import thumb4 from './../../assets/img/shooterland/thumbnail4.png';
import ss4 from './../../assets/img/shooterland/ss4.png';
import thumb5 from './../../assets/img/shooterland/thumbnail5.png';
import ss5 from './../../assets/img/shooterland/ss5.png';
import thumb6 from './../../assets/img/shooterland/thumbnail6.png';
import ss6 from './../../assets/img/shooterland/ss6.png';
import { Header } from "./Header";

export class Shooterland extends React.Component {
    render() {
        return (
            <GameLayout
                header={
                    <img src={headerImage} alt="shooterland header" width="1000" height="250" />
                }
                main={
                    <div>
                        <Header>About Shooterland</Header>
                        <p>Shooterland is a fast, frenzied game of strategy and lining up colors. It starts easy and eventually ramps up to the near-impossible. Give it a whirl if you need some good, clean puzzle fun!</p>

                        <Header>Download</Header>
                        <p><a href="http://www.smileysmazehunt.com/downloads/Shooterland.zip">Download Shooterland!</a></p>
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
                                <td align="center"><Thumbnail thumbnail={thumb4} image={ss4}></Thumbnail></td>
                            </tr>
                            <tr>
                                <td align="center"><Thumbnail thumbnail={thumb5} image={ss5}></Thumbnail></td>
                                <td align="center"><Thumbnail thumbnail={thumb6} image={ss6}></Thumbnail></td>
                            </tr>
                        </table></p>
                    </div>
                } />
        );
    }
}