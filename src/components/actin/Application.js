import React from 'react';
import {
    Form, Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Title } = Typography;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            applicationType: 'Acting Appointment',
            fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: [], fileList9: [], fileList10: [], fileList11: [], fileList12: [], fileList13: [], fileList14: [], fileList15: [], fileList16: [], fileList17: [], fileList18: [], fileList19: [], fileList20: []
        };
        this.props.appStore.getAllOfficers();
        this.props.appStore.getInstitutes();
    }

    changeApplicationType = (value) => {
        this.setState({ applicationType: value })
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            this.setState({ confirmLoading: true });
            const { fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList8,
                fileList10, fileList12, fileList13, fileList15, fileList17, fileList18, fileList19, fileList20 } = this.state;

            var files = [
                { name: "institute_covering_letter", file: fileList1[0] },
                { name: "est04", file: fileList2[0] },
                { name: "est12", file: fileList3[0] },
                { name: "cv", file: fileList4[0] },
                { name: "nic", file: fileList5[0] },
                { name: "organization_chart", file: fileList6[0] },
                { name: "promotion_application", file: fileList8[0] },
                { name: "est03", file: fileList10[0] },
                { name: "est01", file: fileList12[0] },
                { name: "medical_certificate", file: fileList13[0] },
                { name: "appendix", file: fileList15[0] },
                { name: "est02", file: fileList17[0] },
                { name: "officer_request_letter", file: fileList18[0] },
                { name: "current_institute_consent_letter", file: fileList19[0] },
                { name: "to_be_transferred_institute_consent_letter", file: fileList20[0] }
            ]

            this.props.appStore.uploadFiles(files)
                .then(docs => {

                    let body = {
                        "institutes_id": 1,
                        "officers_id": values.officers_id,
                        "present_grade": values.present_grade,
                        "present_post": values.present_post,
                        "current_work_place": values.current_work_place,
                        "mobile": values.mobile,
                        "application_type": values.application_type,
                        "documents": docs,
                        "reject_reason": values.reject_reason,
                        "status": 100,
                    }

                    this.props.appStore.addActInApplication(body)
                        .then(sucess => {
                            this.setState({
                                confirmLoading: false,
                                fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: [], fileList9: [], fileList10: [], fileList11: [], fileList12: [], fileList13: [], fileList14: [], fileList15: [], fileList16: [], fileList17: [], fileList18: [], fileList19: [], fileList20: []
                            });
                            this.props.form.resetFields();
                            openNotificationWithIcon('success', 'Success', 'Application submit successfully!');
                        })
                        .catch(err => {
                            this.setState({ confirmLoading: false });
                            openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                        });

                })
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                });
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, officers } = this.props.appStore;
        const { applicationType, fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList8,
            fileList10, fileList12, fileList13, fileList15, fileList17, fileList18,
            fileList19, fileList20 } = this.state;

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
        };

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
        };

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
        };

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
        };

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
        };

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
        };

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
        };

        const props10 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList10.indexOf(file);
                    const newFileList = state.fileList10.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList10: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList10: [...state.fileList10, file],
                }));
                return false;
            },
            fileList10,
        };

        const props12 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList12.indexOf(file);
                    const newFileList = state.fileList12.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList12: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList12: [...state.fileList12, file],
                }));
                return false;
            },
            fileList12,
        };

        const props13 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList13.indexOf(file);
                    const newFileList = state.fileList13.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList13: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList13: [...state.fileList13, file],
                }));
                return false;
            },
            fileList13,
        };

        const props15 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList15.indexOf(file);
                    const newFileList = state.fileList15.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList15: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList15: [...state.fileList15, file],
                }));
                return false;
            },
            fileList15,
        };

        const props17 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList17.indexOf(file);
                    const newFileList = state.fileList17.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList17: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList17: [...state.fileList17, file],
                }));
                return false;
            },
            fileList17,
        };

        const props18 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList18.indexOf(file);
                    const newFileList = state.fileList18.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList18: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList18: [...state.fileList18, file],
                }));
                return false;
            },
            fileList18,
        };

        const props19 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList19.indexOf(file);
                    const newFileList = state.fileList19.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList19: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList19: [...state.fileList19, file],
                }));
                return false;
            },
            fileList19,
        };

        const props20 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList20.indexOf(file);
                    const newFileList = state.fileList20.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList20: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList20: [...state.fileList20, file],
                }));
                return false;
            },
            fileList20,
        };

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
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Application
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            New Application
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>New Application</Title>
                </Card>
                <Card style={{ margin: 25 }}>

                    <Form>
                        <Card size="small" title="Application Details" type="inner" style={{ marginBottom: 20 }}>
                            <FormItem
                                label="Application Type"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('application_type', {
                                    rules: [{ required: true, message: 'Please input application type' }],
                                    initialValue: 'Acting Appointment'
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select Application Type"
                                        optionFilterProp="children"
                                        onChange={this.changeApplicationType}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Acting Appointment">Acting Appointment</Option>
                                        <Option value="Class II Promotion">Class II Promotion</Option>
                                        <Option value="Confirmation">Confirmation</Option>
                                        <Option value="Re-employment">Re-employment</Option>
                                        <Option value="Releases">Releases</Option>
                                        <Option value="Retirement">Retirement</Option>
                                        <Option value="Transfer">Transfer</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Officer Name"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('officers_id', {
                                    rules: [{ required: true, message: 'Please input officer' }],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="Officer Name"
                                        optionFilterProp="children"
                                    >
                                        {officerValues}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Grade"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('present_grade', {
                                    rules: [{ required: true, message: 'Please input grade' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select Grade"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Special">Special</Option>
                                        <Option value="Grade I">Grade I</Option>
                                        <Option value="Grade II">Grade II</Option>
                                        <Option value="Grade III">GradeIII</Option>
                                        <Option value="Grade II/III">Grade II/III</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Present Post"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('present_post', {
                                    rules: [{ required: true, message: 'Please input Present Post' }]
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Working Place"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('current_work_place', {
                                    rules: [{ required: true, message: 'Please input institute' }]
                                })(
                                    <Select
                                        showSearch
                                        placeholder="Select institute"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {instituteValues}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Mobile Number"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('mobile', {
                                    rules: [{ required: true, message: 'Please input mobile number' }]
                                })(
                                    <Input style={{ width: '250px' }} />
                                )}
                            </FormItem>
                        </Card>

                        {applicationType == 'Acting Appointment' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="EST04"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props2}>
                                    {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="EST12"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props3}>
                                    {fileList3.length == 1 ? null :
                                        <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="CV"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props4}>
                                    {fileList4.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="NIC"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props5}>
                                    {fileList5.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Organization Chart"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props6}>
                                    {fileList6.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Class II Promotion' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Promotion Application"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props8}>
                                    {fileList8.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Confirmation' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="EST03"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props10}>
                                    {fileList10.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Re-employment' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="EST01"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props12}>
                                    {fileList12.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Medical Certificate"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props13}>
                                    {fileList13.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Releases' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Appendix 10/11"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props15}>
                                    {fileList15.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Retirement' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Institute Covering Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="EST02"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props17}>
                                    {fileList17.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        {applicationType == 'Transfer' && <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Officer Request Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props18}>
                                    {fileList18.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Current Institute’s Consent Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props19}>
                                    {fileList19.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="To be Transferred Institute’s Consent Letter"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props20}>
                                    {fileList20.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            </FormItem>
                        </Card>}

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 15 }}>
                            <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>Submit</Button>
                        </FormItem>
                    </Form>

                </Card>
            </div>
        );
    }
}

const Application = Form.create()(ApplicationForm);

export default Application
