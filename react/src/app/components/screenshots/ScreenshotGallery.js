import React from "react";

export class ScreenshotGallery extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {this.props.children}
            </div>
        )
    }
}