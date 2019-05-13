import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearBuffer from './LinearBuffer';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './Top.css';
import {store} from "../../redux/store";


const styles = (theme:any) => ({
    root: {
        width:'100%',
        height:70,
        color: '#fff',
        backgroundColor:grey["900"],
        textDecoration: 'inherit',
        textAlign:'left',

    },
    button:{
        color:'#fff',
        border:'1px solid rgba(255,255,255,0.5)',
        '&:hover':{
            border:'1px solid rgba(255,255,255,0.8)',
        }
    }


});
class Top extends React.Component{
    constructor(props:any) {
        super(props);
    }

    render(){
        const classes = (this.props as any).classes;
        return (
            <div className={classes.root}>
                <LinearBuffer/>
                <Grid container  justify="space-between">
                    <Grid item xs={2}>
                        <h4 style={{color:'#fff',height:"70px",lineHeight:'70px', textIndent:'2em',minWidth:140}}>专题DIY工具</h4>
                    </Grid>
                    <Grid item xs={7}>
                        <p className={'topPath'} style={{height:"49px",lineHeight:'49px' }}>
                            information:path/title/des/date
                        </p>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={'topSave'}>
                            <Button variant="outlined"  color="primary"  onClick={(e:any)=>console.log(store.getState())}>
                                保存
                            </Button>
                            <span className={'w16'}> </span>
                            <Button variant="outlined"  className={classes.button}>
                                预览
                            </Button>
                        </div>

                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withStyles(styles as any)(Top);
