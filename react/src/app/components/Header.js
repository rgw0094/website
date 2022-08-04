import React from "react";

export class Header extends React.Component {
    render() {
        return (
            <div style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#232323'
            }}>
                {this.props.children}
            </div>
        );
    }
}