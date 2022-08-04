import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Botonoids } from "./Botonoids";
import { Shooterland } from "./Shooterland";
import { TubeIt } from "./TubeIt";
import { Smiley } from "./Smiley";
import { Gorlorn } from "./Gorlorn";
import styles from './Home.module.css';

/**
 * The home page. Contains the header and navigation buttons
 */
export class Home extends React.Component {
    render() {
        return (
            <Router>
                <div className={styles.homeContainer}>
                    <div className={styles.navContainer}>
                        <ul>
                            <Link to="/"><li>Smiley's Maze Hunt</li></Link>
                            <Link to="/botonoids"><li>Botonoids 2008</li></Link>
                            <Link to="/shooterland"><li>Shooterland</li></Link>
                            <Link to="/tubeit"><li>Tube-It</li></Link>
                            <Link to="/gorlorn"><li>Gorlorn</li></Link>
                        </ul>
                    </div>

                    <div className={styles.scrollContainer}>
                        <div className={styles.content}>
                            <Routes>
                                <Route path="/" element={<Smiley />} />
                                <Route path="/botonoids" element={<Botonoids />} />
                                <Route path="/shooterland" element={<Shooterland />} />
                                <Route path="/tubeit" element={<TubeIt />} />
                                <Route path="/gorlorn" element={<Gorlorn />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}