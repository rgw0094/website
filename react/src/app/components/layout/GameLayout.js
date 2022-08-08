import React from "react";
import MediaQuery from "react-responsive";
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

                {/*
                Arrange all content vertically on smaller screens
                */}
                <MediaQuery maxWidth={1000}>
                    <div className={styles.contentContainerPhone}>
                        <div className={styles.panel}>
                            {this.props.side}
                        </div>
                        <div className={styles.panel} style={{ marginTop: '1.5em' }}>
                            {this.props.main}
                        </div>
                    </div>
                </MediaQuery>

                <MediaQuery minWidth={1000}>
                    <div className={styles.contentContainer} style={{ flexDirection: 'row'}}>
                        <div className={styles.panel} style={{ flex: '1 1 100%' }}>
                            {this.props.main}
                        </div>
                        <div className={styles.panel} style={{ flex: '0 0 285px' }}>
                            {this.props.side}
                        </div>
                    </div>
                </MediaQuery>
            </div>
        );
    }
}