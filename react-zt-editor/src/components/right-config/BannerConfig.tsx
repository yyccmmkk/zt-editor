import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import './bannerConfig.css';
import {store} from "../../redux/store";
import Actions from "../../redux/actions"
import UploadImg from '../common/upload';

let initValue={
    link:'',
    src:'',
    fileName:''
};
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


function Values(props:any){

    return (<div>
        {JSON.stringify(props.data)}
    </div>)
}


const renderTextField = (filed:any) =>{
    const { input, label, meta: { touched, error }, ...custom }=filed as any;

    return (
        <TextField
           {...input}
           {...custom}
           fullWidth={true}
        />)
};




class BannerConfig extends React.Component {
    state:any;
    constructor(props:any){
        super(props);
        this.state={
            initValue:{
                link:'',
                src:'',
                fileName:''
            }
        }
    }

    componentDidMount(): void {

    }

    componentWillUnmount(): void {

    }

    render() {

        const {classes,fileName,src,link,index,isEmpty,history} = this.props as any;
        if(isEmpty){
            history.push('/');
        }
        console.log('reRender',this.state);
        debugger;
        return (
            <div className={classes.root}>
                    <form noValidate autoComplete="off">
                        <Grid container justify={"center"}>
                            <Grid item xs={11}>
                               {/* <Grid container spacing={0} justify={'space-between'} className={classes.grid}>
                                    <Grid item xs={7}>
                                        <Field name="fileName"  component={renderTextFieldDisabled}/>

                                    </Grid>
                                    <Grid item xs={5}>
                                        <Field name='src' props={{isBanner:true,index}}  component={UploadFiled}/>

                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            说明：jpg,png
                                        </Typography>
                                    </Grid>
                                </Grid>
*/}
                                <UploadImg  {...{index,fileName,isBanner:true}}/>
                                <Grid container spacing={0} justify={"space-between"} className={classes.grid}>
                                    <Grid item xs={12}>
                                        <Field name='link'  component={renderTextField} label="link"/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} justify={"space-between"}>
                                    <Grid item xs={12}>
                                        <Values form='banner'/>
                                        {JSON.stringify({link,fileName,src})}
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
    enableReinitialize:true,
    initialValues:initValue,
    onChange(values:any, dispatch: any, props: any, previousValues:any): void {

        if(typeof values.link =='undefined'){
            return;
        }
        console.log('update');
        const data:any=store.getState();
        debugger;
        dispatch(Actions.updateComponentAction({
            index:data.ui.index.index,
            data:Object.assign({},values)
        }));

    }

})( withStyles(styles as any)(BannerConfig) as any);
