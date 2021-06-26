import React, { Component, useEffect } from 'react';
import {
    Form, Select, Radio, Button, Input, Divider, Checkbox, Row, Col, Modal, notification, DatePicker, Breadcrumb,
    Typography, Card, Steps, Popover, Icon, Table, Result
} from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import AddDetails from './AddDetails';

const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const customDot = (dot, { status, index }) => (
    <span>
        {dot}
    </span>
);

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class RegisterOfficerForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false, sucess: false }
    }

    getColums = (keyData) => {
        if (keyData == "member") {
            return [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'DOB',
                    dataIndex: 'dob',
                    key: 'dob'
                },
                {
                    title: 'Profession',
                    dataIndex: 'profession',
                    key: 'profession'
                },
                {
                    title: 'Relationship',
                    dataIndex: 'relationship',
                    key: 'relationship'
                }
            ]

        } else if (keyData == "service") {
            return [
                {
                    title: 'Designation',
                    dataIndex: 'designation',
                    key: 'designation',
                },
                {
                    title: 'Work Place',
                    dataIndex: 'work_place',
                    key: 'work_place'
                },
                {
                    title: 'Duration',
                    dataIndex: 'duration',
                    key: 'duration'
                }
            ]
        } else if (keyData == "educational_qualification") {
            return [
                {
                    title: 'Degree',
                    dataIndex: 'degree',
                    key: 'degree',
                },
                {
                    title: 'University',
                    dataIndex: 'university',
                    key: 'university'
                },
                {
                    title: 'Major Subjects',
                    dataIndex: 'major_subjects',
                    key: 'major_subjects'
                },
                {
                    title: 'Year',
                    dataIndex: 'year',
                    key: 'year'
                }
            ]
        } else if (keyData == "professional_qualification") {
            return [
                {
                    title: 'Degree',
                    dataIndex: 'degree',
                    key: 'degree',
                },
                {
                    title: 'University',
                    dataIndex: 'university',
                    key: 'university'
                },
                {
                    title: 'Major Subjects',
                    dataIndex: 'major_subjects',
                    key: 'major_subjects'
                },
                {
                    title: 'Year',
                    dataIndex: 'year',
                    key: 'year'
                }
            ]
        } else if (keyData == "publications") {
            return [
                {
                    title: 'Publications',
                    dataIndex: 'publication',
                    key: 'publication',
                }
            ]
        } else if (keyData == "expertise") {
            return [
                {
                    title: 'Subject Expertise',
                    dataIndex: 'subject',
                    key: 'subject',
                },
                {
                    title: 'How Obtained/ Description',
                    dataIndex: 'description',
                    key: 'description'
                }
            ]
        } else if (keyData == "lessons") {
            return [
                {
                    title: 'Best Lessons leant through mistakes',
                    dataIndex: 'lesson',
                    key: 'lesson',
                }
            ]
        } else if (keyData == "awards") {
            return [
                {
                    title: 'Award and Commendations',
                    dataIndex: 'award',
                    key: 'award',
                }
            ]
        } else if (keyData == "achievements") {
            return [
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                },
                {
                    title: 'Target group',
                    dataIndex: 'target_group',
                    key: 'target_group'
                },
                {
                    title: 'Social/Economic impact',
                    dataIndex: 'impact',
                    key: 'impact'
                }
            ]
        }
    }

    addOfficer = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });

                values.family_members = this.props.appStore.familyMembers;
                values.service_history = this.props.appStore.serviceHistory;
                values.educational_qualification = this.props.appStore.educationalQualification;
                values.professional_qualification = this.props.appStore.professionalQualification;
                values.publications = this.props.appStore.publications;
                values.expertise = this.props.appStore.subjectExpertise;
                values.lessons = this.props.appStore.lessons;
                values.awards = this.props.appStore.awards;
                values.achievements = this.props.appStore.achievements;

                values.slas_joined_date = moment(values.slas_joined_date).format('DD-MM-YYYY');
                values.grade_iii_entry = moment(values.grade_iii_entry).format('DD-MM-YYYY');
                values.grade_ii_promoted = moment(values.grade_ii_promoted).format('DD-MM-YYYY');
                values.grade_i_promoted = moment(values.grade_i_promoted).format('DD-MM-YYYY');
                values.special_grade_promoted = moment(values.special_grade_promoted).format('DD-MM-YYYY');

                let body = {
                    nic: values.nic,
                    officer_details: JSON.stringify(values)
                }

                this.props.appStore.registerOfficer(body)
                    .then(sucess => {
                        this.props.form.resetFields();

                        this.props.appStore.familyMembers = [];
                        this.props.appStore.serviceHistory = [];
                        this.props.appStore.educationalQualification = [];
                        this.props.appStore.professionalQualification = [];
                        this.props.appStore.publications = [];
                        this.props.appStore.subjectExpertise = [];
                        this.props.appStore.lessons = [];
                        this.props.appStore.awards = [];
                        this.props.appStore.achievements = [];

                        this.setState({ current: 0, confirmLoading: false, sucess: true });
                        openNotificationWithIcon('success', 'Success', 'Data added successfully!');
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in officer adding!');
                    });
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, sucess } = this.state;
        const { familyMembers, officerData, serviceHistory, professionalQualification, awards,
            educationalQualification, publications, subjectExpertise, achievements, lessons } = this.props.appStore;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
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

        if (familyMembers) { familyMembers.forEach((element, index) => { }) }
        if (serviceHistory) { serviceHistory.forEach((element, index) => { }) }
        if (professionalQualification) { professionalQualification.forEach((element, index) => { }) }
        if (awards) { awards.forEach((element, index) => { }) }
        if (educationalQualification) { educationalQualification.forEach((element, index) => { }) }
        if (publications) { publications.forEach((element, index) => { }) }
        if (subjectExpertise) { subjectExpertise.forEach((element, index) => { }) }
        if (achievements) { achievements.forEach((element, index) => { }) }
        if (lessons) { lessons.forEach((element, index) => { }) }

        return (
            <div>
                <Card bordered={false} style={{ textAlign: 'center' }}>
                    <Title level={4}>Officer Registration</Title>
                </Card>

                <Card bordered={false}>
                    <Form>
                        <Divider plain>Personal &amp; Service Information</Divider>
                        <FormItem
                            label="Full Name"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('full_name', {
                                rules: [{ required: true, message: 'Please input full name' }],
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="NIC"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input nic' }],
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Current Designation"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('current_designation', {
                                rules: [{ required: true, message: 'Please input current designation' }],
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Current Workplace"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('current_workplace', {
                                rules: [{ required: true, message: 'Please input current workplace' }],
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Marital Status"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('marital_status:', {
                                rules: [{ required: true, message: 'Please input marital status' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select marital status"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Address"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please input address' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Telephone"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('telephone:', {
                                rules: [{ required: !true, message: 'Please input telephone' }],
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Mobile"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: 'Please input mobile' }],
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Email"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('email', {
                                rules: [{ required: !true, message: 'Please input email' }],
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Family Members’ Information"
                            extra="(Only for the married officers)"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"member"} label="Add Member" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("member")}
                                    dataSource={familyMembers} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="SLAS Joined Date"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('slas_joined_date', {
                                rules: [{ required: true, message: 'Please input slas joined date' }],
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Intake"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('intake', {
                                rules: [{ required: true, message: 'Please input intake' }],
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Recruitment method"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('recruitment_method', {
                                rules: [{ required: true, message: 'Please input recruitment method' }],
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select recruitment method"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Open">Open</Option>
                                    <Option value="Limited">Limited</Option>
                                    <Option value="Merit">Merit</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Current Grade"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('current_grade', {
                                rules: [{ required: true, message: 'Please input current grade' }]
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select current grade"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Grade III">Grade III</Option>
                                    <Option value="Grade II">Grade II</Option>
                                    <Option value="Grade I">Grade I</Option>
                                    <Option value="Special Grade">Special Grade</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade III Entry"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_iii_entry', {
                                rules: [{ required: !true, message: 'Please input grade iii entry date' }],
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade II Promoted"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_ii_promoted', {
                                rules: [{ required: !true, message: 'Please input grade ii promoted date' }],
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade I Promoted"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_i_promoted', {
                                rules: [{ required: !true, message: 'Please input grade i promoted date' }],
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Special Grade Promoted"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('special_grade_promoted', {
                                rules: [{ required: !true, message: 'Please input special grade promoted date' }]
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Service History"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"service"} label="Add Service" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("service")}
                                    dataSource={serviceHistory} />
                            </div>
                        </FormItem>


                        <Divider plain>Educational &amp; Professional Qualification</Divider>

                        <FormItem
                            label="Educational Qualification"
                            extra="(Post graduate Diploma and above only)"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"educational_qualification"} label="Add Qualification" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("educational_qualification")}
                                    dataSource={educationalQualification} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Professional Qualification"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"professional_qualification"} label="Add Qualification" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("professional_qualification")}
                                    dataSource={professionalQualification} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Publications"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"publications"} label="Add Publications" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    showHeader={false}
                                    pagination={false}
                                    columns={this.getColums("publications")}
                                    dataSource={publications} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Subject Expertise"
                            extra="(Eg: Procurement with DIPPCA, Cabinet paper drafting with 3 years’ experience in
                                Cabinet office, Project Management with PMP)"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"expertise"} label="Add Subject Expertise" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("expertise")}
                                    dataSource={subjectExpertise} />
                            </div>
                        </FormItem>


                        <Divider plain>Achievements and Award</Divider>

                        <FormItem
                            label="Best Career Achievements"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"achievements"} label="Add Achievements" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    columns={this.getColums("achievements")}
                                    dataSource={achievements} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Best Lessons leant through mistakes"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"lessons"} label="Add Data" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    showHeader={false}
                                    pagination={false}
                                    columns={this.getColums("lessons")}
                                    dataSource={lessons} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Award and Commendations"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <div>
                                <AddDetails keyData={"awards"} label="Add Awards" />
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    pagination={false}
                                    showHeader={false}
                                    columns={this.getColums("awards")}
                                    dataSource={awards} />
                            </div>
                        </FormItem>

                        <FormItem
                            label="Referee 01"
                            extra="(Name, Designation and Contact details)"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('referee_01', {
                                rules: [{ required: !true, message: 'Please input referee details' }]
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Referee 02"
                            extra="(Name, Designation and Contact details)"
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('referee_02', {
                                rules: [{ required: !true, message: 'Please input referee details' }]
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 25 }}>
                            <div className="steps-action">
                                <Button type="primary" loading={confirmLoading} onClick={() => this.addOfficer()}>
                                    Submit
                                    </Button>
                            </div>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        )
    }

}
const RegisterOfficer = Form.create()(RegisterOfficerForm);

export default RegisterOfficer;