import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import './bannerConfig.css';
import {Upload, Button as ButtonA} from 'antd';



const styles = (theme: any) => ({
    root: {
        width: '100%',
        color: 'inherit',
        paddingTop:theme.spacing.unit * 4,
        textDecoration: 'inherit',

    },
    grid:{
        backgroundColor:'transparent',
        paddingBottom:theme.spacing.unit * 2,
    },
    upload:{
        float:'right'
    }
});


/*const asyncValidate = () => {
    return new Promise(resolve=>resolve())
};*/


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }:any) =>{
    debugger;
    return (
        <TextField
            {...input}
            {...custom}
        />)
};



class BannerConfig extends React.Component {
    constructor(props:any){
        super(props);
    }
    render() {
        debugger;
        const {classes,link,fileName} = this.props as any;

        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <Grid container justify={"center"}>
                        <Grid item xs={11}>
                            <Grid container spacing={0} justify={'space-between'} className={classes.grid}>
                                <Grid item xs={7}>
                                    <Input
                                        value={fileName}
                                        className={classes.input}
                                        disabled
                                        inputProps={{
                                            'aria-label': '上传文件',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <Upload {...this.props} className={classes.upload}>
                                        <ButtonA>
                                            上传文件
                                        </ButtonA>
                                    </Upload>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        说明：jpg,png
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={0} justify={"space-between"} className={classes.grid}>
                                <Grid item xs={12}>
                                    <Field name={link} component={renderTextField} label="First Name"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} justify={"space-between"}>
                                <Grid item xs={12}>
                                    {JSON.stringify(this.props)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }

}

export default reduxForm({
    form:'banner',
})( withStyles(styles as any)(BannerConfig) as any);
