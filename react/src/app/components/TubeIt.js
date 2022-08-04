import React from "react";
import { GameLayout } from "./GameLayout";
import { Header } from "./Header";
import { Thumbnail } from "./Thumbnail";

import headerImage from './../../assets/img/tubeit/header.png';
import thumb1 from './../../assets/img/tubeit/thumb1.png';
import ss1 from './../../assets/img/tubeit/ss1.png';
import thumb2 from './../../assets/img/tubeit/thumb2.png';
import ss2 from './../../assets/img/tubeit/ss2.png';

export class TubeIt extends React.Component {
    render() {
        return (
            <GameLayout
                header={
                    <img src={headerImage} alt="tube-it header" width="1000" height="250" />
                }
                main={
                    <div>
                        <Header>About Tube-It</Header>
                        <p>Tube-It is like a cross between Tetris and Pipe Dream. It was on some old console but I couldn't find a ROM and
                        wanted to play it so I just programmed it. Includes new music and a cameo by Michael Angelo Batio.</p>

                        <Header>Gameplay</Header>

                        <p>In Tube-It there is a constant stream of tubes falling from the sky. Your goal is to prevent the tubes from piling
                        up to the top of the grid!. To accomplish this task you must clear tubes by creating a path from one of the tube
                        resevoirs on the side of the grid to another. When you create a path, all of the tubes in it will dissapear. To create
                        paths you may manipulate the tube grid by dragging and rotating  tubes. To rotate a tube, simply highlight it with the cursor
                        and press space. To drag a tube, highlight it with a cursor and hold space and then move the cursor to the desired destination.
                        You may only drag tubes left and right, not up and down.</p>

                        <p>To make your task easier, the gods of Tube-It will occaisonally bless you with a powerup. To activate the powerup, you must make a tube
                        loop using the tube that the powerup appears on. The first type of powerup is
                        <a href="http://www.youtube.com/watch?v=qG74eVb6V10">Michael Angelo Batio</a>. He will play arpeggios so fast that time will freeze,
                        allowing you a chance to clear some tubes. The second powerup is the man from <a href="http://www.youtube.com/watch?v=q-5MLPzRjls">Solla
                        Solla Enna Perumai</a>. He will explode, clearing a large chunk of tubes.</p>
                    </div>
                }
                side={
                    <div id="post">
                        <Header>Download</Header>
                        <p><a href="http://www.smileysmazehunt.com/downloads/Tube-It.zip">Download Tube-It!</a></p>

                        <Header>Screenshots</Header>
                        <table>
                            <tr>
                                <td align="center"><Thumbnail thumbnail={thumb1} image={ss1}></Thumbnail></td>
                                <td align="center"><Thumbnail thumbnail={thumb2} image={ss2}></Thumbnail></td>
                            </tr>
                        </table>
                    </div>
                } />
        );
    }
}