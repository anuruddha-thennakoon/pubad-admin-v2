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
class NewApplicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { confirmLoading: false, fileList1: [], fileList2: [], fileList3: [], fileList4: [] };
        this.props.appStore.getAllOfficers();
        this.props.appStore.getInstitutes();
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            this.setState({ confirmLoading: true });
            const { fileList1, fileList2, fileList3, fileList4 } = this.state;

            //doc 4 upload
            const formData4 = new FormData();
            formData4.append('file', fileList4[0]);

            this.props.appStore.uploadFile(formData4)
                .then(doc4 => {
                    //doc 3 upload
                    const formData3 = new FormData();
                    formData3.append('file', fileList3[0]);

                    this.props.appStore.uploadFile(formData3)
                        .then(doc3 => {
                            //doc 2 upload
                            const formData2 = new FormData();
                            formData2.append('file', fileList2[0]);

                            this.props.appStore.uploadFile(formData2)
                                .then(doc2 => {

                                    //doc 1 upload
                                    const formData1 = new FormData();
                                    formData1.append('file', fileList1[0]);

                                    this.props.appStore.uploadFile(formData1)
                                        .then(doc1 => {

                                            let body = {
                                                "institutes_id": 1,
                                                "officers_id": values.officers_id,
                                                "appointment_date": values.appointment_date.format('YYYY-MM-DD'),
                                                "category": values.category,
                                                "officer_confirmed": values.officer_confirmed,
                                                "present_post": values.present_post,
                                                "present_grade": values.present_grade,
                                                "present_institute": values.present_institute,
                                                "proposed_post": values.proposed_post,
                                                "proposed_grade": values.proposed_grade,
                                                "proposed_institute": values.proposed_institute,
                                                "vacancy_date": values.vacancy_date.format('YYYY-MM-DD'),
                                                "vacancy_manner": values.vacancy_manner,
                                                "check_duties": values.check_duties,
                                                "basis": values.basis,
                                                "suggested_period": values.suggested_period[0].format('YYYY-MM-DD') + ' - ' + values.suggested_period[1].format('YYYY-MM-DD'),
                                                "check_recommendation": values.check_recommendation,
                                                "doc1": doc1,
                                                "doc2": doc2,
                                                "doc3": doc3,
                                                "doc4": doc4,
                                                "status": 100
                                            }

                                            this.props.appStore.addActInApplication(body)
                                                .then(sucess => {
                                                    this.setState({ confirmLoading: false });
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
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                });


        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, officers } = this.props.appStore;
        const { fileList1, fileList2, fileList3, fileList4 } = this.state;

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
                            Act In
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
                            {/* <FormItem
                            label='NIC No'
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 12 }}>
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input NIC No' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem> */}
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
                                label="Appointment date to SLAS"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('appointment_date', {
                                    rules: [{ required: true, message: 'Please input Date to SLAS' }],
                                })(
                                    <DatePicker style={{ width: 250 }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="Category"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('category', {
                                    rules: [{ required: true, message: 'Please input category' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select Category"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Open">Open</Option>
                                        <Option value="Limited">Limited</Option>
                                        <Option value="Merit">Merit</Option>
                                        <Option value="Northern-Eastern Special">Northern-Eastern Special</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Is the officer confirmed in the Service"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('officer_confirmed', {
                                    rules: [{ required: true, message: 'Please input option' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select Confirmation"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
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
                                label="Working Place"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('present_institute', {
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
                            {/* <FormItem
                            label="NIC No"
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic_no', {
                                rules: [{ required: true, message: 'Please input nic no' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem> */}
                            <FormItem
                                label="Proposed Post to acting or attend to duties"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('proposed_post', {
                                    rules: [{ required: true, message: 'Please fill this input' }]
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="Proposed Grade"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('proposed_grade', {
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
                                label="Proposed Working Place"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('proposed_institute', {
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
                                label="The date in which the vacancy occurred"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('vacancy_date', {
                                    rules: [{ required: true, message: 'Please input vacancy date' }],
                                })(
                                    <DatePicker style={{ width: 250 }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="The Manner in which the vacancy occurred"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('vacancy_manner', {
                                    rules: [{ required: true, message: 'Please fill this input' }]
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                            <FormItem
                                label="Whether acting or attend to duties"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('check_duties', {
                                    rules: [{ required: true, message: 'Please select one option' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select option"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Acting">Acting</Option>
                                        <Option value="Attend to Duties">Attend to Duties</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Which Basis"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('basis', {
                                    rules: [{ required: true, message: 'Please select one option' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select option"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Full Time">Full Time</Option>
                                        <Option value="In Addition to permanent">In Addition to permanent</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="Suggested Period"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('suggested_period', {
                                    rules: [{ required: true, message: 'Please select suggested period' }],
                                })(
                                    <RangePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label={<span>Whether recommendation of relevant &nbsp;<br />secretary is received</span>}
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('check_recommendation', {
                                    rules: [{ required: true, message: 'Please select one option' }],
                                })(
                                    <Select
                                        style={{ width: 250 }}
                                        placeholder="Select option"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Yes">Yes</Option>
                                        <Option value="No">No</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Card>

                        {/* <Title level={4}>Upload Document</Title><hr /> */}
                        {/* <Divider orientation="left">Documents</Divider> */}
                        <Card size="small" title="Documents" type="inner">
                            <FormItem
                                label="Document 01"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props1}>
                                    {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Est 04</Button>}
                                </Upload>

                            </FormItem>
                            <FormItem
                                label="Document 02"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props2}>
                                    {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Est 12</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Document 03"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props3}>
                                    {fileList3.length == 1 ? null :
                                        <Button><Icon type={'upload'} />Organization Chart</Button>}
                                </Upload>
                            </FormItem>
                            <FormItem
                                label="Document 04"
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Upload {...props4}>
                                    {fileList4.length == 1 ? null : <Button><Icon type={'upload'} />Bio Data</Button>}
                                </Upload>
                            </FormItem>
                        </Card>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 15 }}>
                            <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>Submit</Button>
                        </FormItem>
                    </Form>

                </Card>
            </div>
        );
    }
}

const NewApplication = Form.create()(NewApplicationForm);

export default NewApplication
