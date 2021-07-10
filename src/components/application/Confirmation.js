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

@inject('appStore', 'appState')
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


    submitApplication = (e) => {
        this.props.form.validateFields((err, values) => {
            const { fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList7, fileList8 } = this.state;
            let userData = this.props.appState.getUserData();

            this.setState({ confirmLoading: true });

            var files = [
                { name: "recommendation_letter_issued_by_department_of_head", file: fileList1[0] },
                { name: "certified_copy_of_duty_assume_letter", file: fileList2[0] },
                { name: "certified_copy_of_induction_training_completion_letter", file: fileList3[0] },
                { name: "certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)", file: fileList4[0] },
                { name: "certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)", file: fileList5[0] },
                { name: "certified_copy_of_annual_review_report_for_3rd_Year_(APPENDIX_05,_PSC_Rules)", file: fileList6[0] },
                { name: "certified_copy_of_efficiency_bar_result_sheet", file: fileList7[0] },
                { name: "certified_copy_of_medical_certificate", file: fileList8[0] }
            ]

            this.props.appStore.uploadFiles(files)
                .then(docs => {

                    values.documents = docs;

                    let applicationData = {
                        institutes_id: userData.institutes_id,
                        officers_id: 0,
                        nic: values.nic,
                        application: JSON.stringify(values),
                        application_type: 'Confirmation',
                        reject_reason: null,
                        status: 100
                    }

                    this.props.appStore.addApplication(applicationData)
                        .then(sucess => {
                            this.setState({
                                confirmLoading: false,
                                fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: []
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
                            {getFieldDecorator('NIC', {
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
                            {getFieldDecorator('officer_name', {
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
                            label="Place of work : "
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
                            label="Mobile number : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile_number', {
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
                            {getFieldDecorator('date_of_appointment_to_SLAS', {
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
                            {getFieldDecorator('duty_assumption_date', {
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
                            {getFieldDecorator('recruitment_stream', {
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
                        >
                            {getFieldDecorator('date_of_completing_probation_or_acting_time_period', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                // initialValue: officerData.dob != null ? moment(officerData.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the induction training program in SLIDA : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_completed_the_induction_training_program_in_SLIDA', {
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
                            {getFieldDecorator('has_the_officer_completed_the_1st_Efficiency_Bar_(EB)', {
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
                            label="Date of completing 1st Efficiency Bar (EB) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_completing_1st_Efficiency_Bar_(EB)', {
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
                            {getFieldDecorator('has_the_officer_failed_in_passing_1st_EB_on_date', {
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
                            label="Period to be extended on delay in passing 1st EB : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('period_to_be_extended_on_delay_in_passing_1st_EB', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the second language proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_completed_the_second_language_proficiency_requirement', {
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
                            {getFieldDecorator('date_of_completing_the_second_language_proficiency_requirement', {
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
                            {getFieldDecorator('has_concessionary_been_given_for_the_second_language_proficiency_requirement', {
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
                            label="Period to be extended by failing to complete the second language proficiency requirement : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('period_to_be_extended_by_failing_to_complete_the_second_language_proficiency_requirement', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Input style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer obtained no pay or half pay leave : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_obtained_no_pay_or_half_pay_leave', {
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
                            label="Time period of leaves : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('time_period_of_leaves', {
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
                            {getFieldDecorator('is_the_officer_physically_and_mentally_fit_to_serve_according_to_the_medical_examination_report', {
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
                            {getFieldDecorator('has_the_recommendation_of_Secretary_received_as_to_whether_the_work,_attendance,_and_conduct_of_the_officer_are_satisfactory', {
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
                            label="Recommendation letter issued by department of head : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('recommendation_letter_issued_by_department_of_head', {
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
                        >
                            {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props2}>
                                    {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of induction training completion letter : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_induction_training_completion_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props3}>
                                    {fileList3.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 1st Year (APPENDIX 05, PSC Rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props4}>
                                    {fileList4.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 2nd Year (APPENDIX 05, PSC Rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props5}>
                                    {fileList5.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 3rd Year (APPENDIX 05, PSC Rules) : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_annual_review_report_for_3rd_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props6}>
                                    {fileList6.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of efficiency bar result sheet : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_efficiency_bar_result_sheet', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props7}>
                                    {fileList7.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem
                            label="Certified copy of medical certificate : "
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('certified_copy_of_medical_certificate', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <Upload {...props8}>
                                    {fileList8.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                </Upload>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 15 }}>
                            <Button type="primary" loading={confirmLoading} onClick={this.submitApplication}>Submit</Button>
                        </FormItem>
                    </Form>

                </Card>
            </div>
        );
    }
}

const Confirmation = Form.create()(ConfirmationForm);

export default Confirmation
