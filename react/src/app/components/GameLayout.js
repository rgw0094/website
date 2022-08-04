import React from "react";
import styles from './GameLayout.module.css';

/**
 * Layout component for presenting each game's content the same way
 *
 * header - the image header for the game
 * main - the main content
 * side - the side content
 */
export class GameLayout extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    {this.props.header}
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.panel} style={{ flex: '1 1 100%' }}>
                        {this.props.main}
                    </div>
                    <div className={styles.panel} style={{ flex: '0 0 200px' }}>
                        {this.props.side}
                    </div>
                </div>
            </div>
        );
    }
}