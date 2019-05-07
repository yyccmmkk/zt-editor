import React from 'react';

class canvas extends React.Component {
    constructor(props:any){
        super(props)
    }
    render() {
        const classes = (this.props as any).classes;
        return (
            <div className={classes.root}>
                <canvas />
            </div>
        )
    }
}

export default canvas;
