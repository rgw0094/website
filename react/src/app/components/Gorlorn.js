import React from "react";
import { GameLayout } from "./GameLayout";
import { Header } from "./Header";
import { Thumbnail } from "./Thumbnail";

import headerImage from './../../assets/img/gorlorn/header.png';
import thumb1 from './../../assets/img/gorlorn/thumb1.png';
import ss1 from './../../assets/img/gorlorn/ss1.png';

export class Gorlorn extends React.Component {
    render() {
        return (
            <GameLayout
                header={
                    <img src={headerImage} alt="gorlorn header" width="1000" height="250" />
                }
                main={
                    <div>
                        <Header>About Gorlorn</Header>
                        <p>This is my personal interpretation of <a href="http://www.youtube.com/watch?v=q-5MLPzRjls">
                        Solla Solla Enna Perumai</a>.</p>

                        <Header>Download</Header>
                        <p><a href="http://www.smileysmazehunt.com/downloads/Gorlorn.zip">Download Gorlorn!</a></p>
                    </div>
                }
                side={
                    <div>
                        <Header>Screenshots</Header>
                        <Thumbnail thumbnail={thumb1} image={ss1}></Thumbnail>
                    </div>
                } />
        );
    }
}