import React from 'react';
import { Button, Upload, Icon } from 'antd';

class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = { fileList: [] };
    }

    render() {
        const { fileList } = this.state;

        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList
        };

        return (
            <Upload {...props}>
                {fileList.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
            </Upload>
        )
    }
}

export default FileUploader;