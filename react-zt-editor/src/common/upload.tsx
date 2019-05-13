import React from 'react';
import {Button as ButtonA, message, Upload} from "antd";
import {UPLOAD_CONFIG as uc} from "./upload-config";
import {Actions} from "../redux/actions";

class UploadFiled extends React.Component {
    props:any;
    constructor(props: any) {
        super(props);
        this.upload.bind(this);
    }
    upload(info:any){
        debugger;
        const {file,file:{status},fileList}=info;
        const {isBanner,index,input,meta:{dispatch}}=this.props;

        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            const {data:{src,width,height,fileName}}=file.response;
            input.onChange(src);
            if(isBanner){
                dispatch(
                    Actions.updateComponentAction(
                        {
                            index,
                            data:{
                                width,
                                height,
                                fileName
                            }
                        })
                    )
            }
            console.log(isBanner);
            message.success(`${file.name} file uploaded successfully`);
        } else if (status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    }

    render() {
        const { input, label, meta: { touched, error },...custom }=this.props as any;
        console.log('upload',this.props,custom);
        return (
            <div>

                <Upload {...uc} {...custom} onChange={(info:any)=>this.upload(info)}>
                    <ButtonA>
                        上传文件
                    </ButtonA>
                </Upload>
            </div>

        )
    }
}

export default UploadFiled;
export {UploadFiled}
