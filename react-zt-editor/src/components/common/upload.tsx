import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import {TextField,Grid,Typography} from "@material-ui/core";
import {Button as ButtonA, message, Upload} from "antd";
import {UPLOAD_CONFIG as uc} from "../../common/upload-config";
import {Actions} from "../../redux/actions";
import {store} from "../../redux/store";


const styles = (theme: any) => ({
    root: {
        width: '100%',
        color: 'inherit',
        textDecoration: 'inherit',

    },
    grid:{
        backgroundColor:'transparent',
        paddingBottom:theme.spacing.unit * 2,
    },
});

class upload extends React.Component {
    props:any;
    upload(info:any){
        debugger;
        const {file,file:{status},fileList}=info;
        const {isBanner,index}=this.props;


        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            const {data:{src,width,height,fileName}}=file.response;
            let data:any={
                fileName,
                src
            };

            if(isBanner){
               Object.assign(data,{
                   width,
                   height
               })
            }
            store.dispatch(
                Actions.updateComponentAction(
                {
                    index,
                    data
                })
            );

            console.log(isBanner);
            message.success(`${file.name} file uploaded successfully`);
        } else if (status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    }
    render() {

        const {classes,fileName}=this.props;
        return (
            <Grid container spacing={0} justify={'space-between'} className={classes.grid}>
                <Grid item xs={7}>
                    <TextField
                        value={fileName}
                        fullWidth={true}
                    />

                </Grid>
                <Grid item xs={5}>
                    <Upload {...uc}  onChange={(info:any)=>this.upload(info)}>
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

        )
    }
}

export default withStyles(styles as any)(upload);
