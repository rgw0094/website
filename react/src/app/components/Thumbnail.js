import React from "react";
import styles from './Thumbnail.module.css';

/**
 * Image thumbnail that shows a full version in an overlay when clicked upon
 */
export class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        return (
            <div>
                {this.state.isOpen &&
                <div>
                    <div className={styles.background}></div>
                    <div className={styles.overlay} onClick={() => this.setState({ 'isOpen': false })}>
                        <img className={styles.image} src={this.props.image} alt="full image" />
                    </div>
                </div>
                }

                <div onClick={() => this.setState({ 'isOpen': true })}>
                    <img src={this.props.thumbnail} width="132" height="99" alt="thumbnail" />
                </div>
            </div>
        );
    }
}