import React from "react";

// TODO: is there a better way??
import headerImage from './../../../assets/img/smiley/header.png';
import minimapthumb from './../../../assets/img/smiley/minimapthumb.png';
import minimapimage from './../../../assets/img/smiley/minimapss.png';
import inventorythumb from './../../../assets/img/smiley/inventorythumb.png';
import inventoryss from './../../../assets/img/smiley/inventoryss.png';
import thumb1 from './../../../assets/img/smiley/thumbnail1.png';
import ss1 from './../../../assets/img/smiley/ss1.png';
import thumb2 from './../../../assets/img/smiley/thumbnail2.png';
import ss2 from './../../../assets/img/smiley/ss2.png';
import thumb3 from './../../../assets/img/smiley/thumbnail3.png';
import ss3 from './../../../assets/img/smiley/ss3.png';
import thumb4 from './../../../assets/img/smiley/thumbnail4.png';
import ss4 from './../../../assets/img/smiley/ss4.png';
import thumb5 from './../../../assets/img/smiley/thumbnail5.png';
import ss5 from './../../../assets/img/smiley/ss5.png';
import thumb6 from './../../../assets/img/smiley/thumbnail6.png';
import ss6 from './../../../assets/img/smiley/ss6.png';
import thumb7 from './../../../assets/img/smiley/thumbnail7.png';
import ss7 from './../../../assets/img/smiley/ss1.png';
import thumb8 from './../../../assets/img/smiley/thumbnail8.png';
import ss8 from './../../../assets/img/smiley/ss8.png';
import thumb9 from './../../../assets/img/smiley/thumbnail9.png';
import ss9 from './../../../assets/img/smiley/ss9.png';
import mapthumb from './../../../assets/img/smiley/mapthumb.png';
import mapss from './../../../assets/img/smiley/mapss.png';
import { Header } from "../Header";
import { GameLayout } from "../layout/GameLayout";
import { Thumbnail } from "../screenshots/Thumbnail";
import { ScreenshotGallery } from "../screenshots/ScreenshotGallery";

export class Smiley extends React.Component {
    render() {
        return (
            <GameLayout
                header={
                    <img src={headerImage} alt="smiley header" className="header-image" />
                }
                main={
                    <div>
                        <Header>About Smiley's Maze Hunt</Header>
                        <p>Smiley's Maze Hunt is a 2D, top down puzzle/adventure game which is still under development.
                                The game is programmed in C++ and uses <a href="http://hge.relishgames.com/">Haaf's Game Engine</a>.
                        Game play is inspired primarily by The Legend of Zelda, Metroid, and Chip's Challenge. This is our magnum opus and,
                        speaking personally, the greatest accomplishment of my life that will likely never be surpassed.</p>

                        <Header>Download Beta Test</Header>
                        <p><a href="http://www.smileysmazehunt.com/downloads/Smiley's Maze Hunt.zip">Smiley's Maze Hunt Beta (built 7/15/2012)</a>
                        - Smiley's Maze Hunt is now complete and in beta testing mode. Download it and give it a whirl!
                        </p>
                    </div>
                }
                side={
                    <div>
                        <Header>Screenshots</Header>
                        <p><ScreenshotGallery>
                                <Thumbnail thumbnail={minimapthumb} image={minimapimage} />
                                <Thumbnail thumbnail={thumb1} image={ss1} />
                                <Thumbnail thumbnail={thumb2} image={ss2} />
                                <Thumbnail thumbnail={thumb3} image={ss3} />
                                <Thumbnail thumbnail={thumb4} image={ss4} />
                                <Thumbnail thumbnail={thumb5} image={ss5} />
                                <Thumbnail thumbnail={thumb6} image={ss6} />
                                <Thumbnail thumbnail={thumb7} image={ss7} />
                                <Thumbnail thumbnail={thumb8} image={ss8} />
                                <Thumbnail thumbnail={thumb9} image={ss9} />
                                <Thumbnail thumbnail={mapthumb} image={mapss} />
                                <Thumbnail thumbnail={inventorythumb} image={inventoryss} />
                        </ScreenshotGallery></p>
                    </div>
                } />
        );
    }
}