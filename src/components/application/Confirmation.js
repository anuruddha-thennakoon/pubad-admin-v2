import React from 'react';
import {
    Form, Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';
import FileUploader from '../../special/fileuploader';

const { Title } = Typography;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { Search } = Input;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class ConfirmationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: []
        };
        this.props.appStore.getAllOfficers();
        this.props.appStore.getInstitutes();
    }


    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {

            console.log('values', values);

            // this.setState({ confirmLoading: true });
            // const { fileList } = this.state;

            // var files = [
            //     { name: "institute_covering_letter", file: fileList1[0] },
            //     { name: "est04", file: fileList2[0] },
            //     { name: "est12", file: fileList3[0] },
            //     { name: "cv", file: fileList4[0] },
            //     { name: "nic", file: fileList5[0] },
            //     { name: "organization_chart", file: fileList6[0] },
            //     { name: "promotion_application", file: fileList8[0] },
            //     { name: "est03", file: fileList10[0] },
            //     { name: "est01", file: fileList12[0] },
            //     { name: "medical_certificate", file: fileList13[0] },
            //     { name: "appendix", file: fileList15[0] },
            //     { name: "est02", file: fileList17[0] },
            //     { name: "officer_request_letter", file: fileList18[0] },
            //     { name: "current_institute_consent_letter", file: fileList1[0] },
            //     { name: "to_be_transferred_institute_consent_letter", file: fileList20[0] }
            // ]

            // this.props.appStore.uploadFiles(files)
            //     .then(docs => {

            //         let body = {
            //             "institutes_id": 1,
            //             "officers_id": values.officers_id,
            //             "present_grade": values.present_grade,
            //             "present_post": values.present_post,
            //             "current_work_place": values.current_work_place,
            //             "mobile": values.mobile,
            //             "application_type": values.application_type,
            //             "documents": docs,
            //             "reject_reason": values.reject_reason,
            //             "status": 100,
            //         }

            //         this.props.appStore.addActInApplication(body)
            //             .then(sucess => {
            //                 this.setState({
            //                     confirmLoading: false,
            //                     fileList: []
            //                 });
            //                 this.props.form.resetFields();
            //                 openNotificationWithIcon('success', 'Success', 'Application submit successfully!');
            //             })
            //             .catch(err => {
            //                 this.setState({ confirmLoading: false });
            //                 openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
            //             });

            //     })
            //     .catch(err => {
            //         this.setState({ confirmLoading: false });
            //         openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
            //     });
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { institutes, officers } = this.props.appStore;
        const { confirmLoading,
            fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList7, fileList8 } = this.state;

        const props1 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList1.indexOf(file);
                    const newFileList = state.fileList1.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList1: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList1: [...state.fileList1, file],
                }));
                return false;
            },
            fileList1,
        }

        const props2 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList2.indexOf(file);
                    const newFileList = state.fileList2.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList2: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList2: [...state.fileList2, file],
                }));
                return false;
            },
            fileList2,
        }

        const props3 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList3.indexOf(file);
                    const newFileList = state.fileList3.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList3: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList3: [...state.fileList3, file],
                }));
                return false;
            },
            fileList3,
        }

        const props4 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList4.indexOf(file);
                    const newFileList = state.fileList4.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList4: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList4: [...state.fileList4, file],
                }));
                return false;
            },
            fileList4,
        }

        const props5 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList5.indexOf(file);
                    const newFileList = state.fileList5.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList5: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList5: [...state.fileList5, file],
                }));
                return false;
            },
            fileList5,
        }

        const props6 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList6.indexOf(file);
                    const newFileList = state.fileList6.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList6: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList6: [...state.fileList6, file],
                }));
                return false;
            },
            fileList6,
        }

        const props7 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList7.indexOf(file);
                    const newFileList = state.fileList7.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList7: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList7: [...state.fileList7, file],
                }));
                return false;
            },
            fileList7,
        }

        const props8 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList8.indexOf(file);
                    const newFileList = state.fileList8.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList8: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList8: [...state.fileList8, file],
                }));
                return false;
            },
            fileList8,
        }


        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        let officerValues = [];
        let instituteValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.name}>{element.name}</Option>);
            });
        }

        if (officers) {
            officers.forEach((element, index) => {
                officerValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        return (
            <div>
                <Card style={{ margin: '0px 25px 25px 25px' }}>
                    <Form
                        style={{ margin: '0px 25px 25px 25px' }}
                        layout={"vertical"}
                    >
                        <FormItem
                            label="NIC : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Search
                                    style={{ width: 350 }}
                                    placeholder="NIC"
                                    enterButton="Search"
                                    onSearch={value => console.log(value)}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Officer Name : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('officers_name', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Designation : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Input style={{ width: 450 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Place of Work : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 450 }}
                                    placeholder="Select institute"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Mobile Number : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of appointment to SLAS : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Duty assumption date : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Recruitment stream : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Open">Open</Option>
                                    <Option value="Limited">Limited</Option>
                                    <Option value="Merit">Merit</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of completing probation or acting time period (Add three years to open stream and 1 year to limited merit officers) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Add three years to open stream and 1 year to limited merit officers"
                        // labelAlign="left"
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the Induction training programme in SLIDA : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the 1st Efficiency Bar (EB) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="Released">Released</Option>
                                    <Option value="Not Relevant">Not Relevant</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of completing 1st efficiency bar (EB) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer failed in passing 1st EB on Date : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="The period to be extended on delay in passing 1st EB : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the Second Language Proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {/* If Yes */}
                        <FormItem
                            label="Date of completing the second language proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has concessionary been given for the second language proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="The period to be extended by failing to complete the second language proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer obtained No Pay or Half Pay leave : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="The time period of leaves : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Is the officer physically and mentally fit to serve according to the medical examination report : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                    <Option value="Not Relevant">Not Relevant</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the recommendation of Secretary received as to whether the work, attendance and conduct of the officer are satisfactory : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('user_category', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    labelAlign="left"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Recommendation letter issued by Department of Head : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Recommendation letter issued by Department of Head"
                        >
                            {getFieldDecorator('d1', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of duty assume letter : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of duty assume letter"
                        >
                            {getFieldDecorator('d2', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props2}>
                                    {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Induction Training completion letter : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Induction Training completion letter"
                        >
                            {getFieldDecorator('d3', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props3}>
                                    {fileList3.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Annual Review Report for 1st Year (APPENDIX 05, PSC rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Annual Review Report for 1st Year (APPENDIX 05, PSC rules)"
                        >
                            {getFieldDecorator('d4', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props4}>
                                    {fileList4.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Annual Review Report for 2nd Year (APPENDIX 05, PSC rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Annual Review Report for 2nd Year (APPENDIX 05, PSC rules)"
                        >
                            {getFieldDecorator('d5', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props5}>
                                    {fileList5.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Annual Review Report for 3rd Year (APPENDIX 05, PSC rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Annual Review Report for 3rd Year (APPENDIX 05, PSC rules)"
                        >
                            {getFieldDecorator('d6', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props6}>
                                    {fileList6.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Efficiency bar result sheet : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Efficiency bar result sheet"
                        >
                            {getFieldDecorator('d7', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props7}>
                                    {fileList7.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of Medical certificate : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        // extra="Certified copy of Medical certificate"
                        >
                            {getFieldDecorator('d8', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props8}>
                                    {fileList8.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 15 }}>
                            <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>Submit</Button>
                        </FormItem>
                    </Form>

                </Card>
            </div>
        );
    }
}

const Confirmation = Form.create()(ConfirmationForm);

export default Confirmation
