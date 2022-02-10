import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Card, Table } from 'antd';

import ViewApplication from "./ViewApplication";
import TableData from './TableData';

import logo from '../login/logo.png';

import { APPOINTMENT, PROMOTION, PUBAD } from '../../utils/constants';

const generatePrintDoc = (props) => {
    return `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            body {
                font-size: 18px;
                font-family: "Segoe UI";
            }
    
            .title {
                text-align: center;
            }
    
            table {
                border-collapse: collapse;
                table-layout: fixed;
            }
    
            table th {
                text-align: center;
                padding: 3px;
                border: 1px solid #cfcfcf;
            }
    
            table td {
                text-align: left;
                padding: 5px;
                border: 1px solid #cfcfcf;
            }
    
            .margin {
                margin-top: 2rem;
            }
    
            .margin-3x {
                margin-top: 6rem;
            }
    
            .no-border {
                border: none !important;
            }
    
            .letter-head {
                text-align: center;
            }
        </style>
    </head>
    
    <!-- <body onload="window.print()"> -->
    
    <body onload="window.print()">
        <div style="width: 1000px; margin: 0 auto;top: 2rem;">
            <div class="letter-head">
                <div><img src=${logo} alt="logo" height="110"></div>
                <div style="font-size: 24px;">රාජ්‍ය සේවා, පළාත් සභා හා පළාත් පාලන අමාත්‍යාංශය</div>
                <div style="font-size: 20px;">அரச சேவைகள், மாகாண சபை௧ள் மற்றும் உள்ளூராட்சி அமைச்சு</div>
                <div style="font-size: 20px;">Ministry of Public Services, Provincial Councils and Local Government</div>
                <div style="font-size: 16px;">නිදහස් චතුරශ්‍රය, කොළඹ 07, ශ්‍රී ලංකාව.</div>
                <div style="font-size: 16px;">சுதந்திர சதுக்கம், கொழும்பு 07, இலங்கை.</div>
                <div style="font-size: 16px;">Independence Square, Colombo 07, Sri Lanka.</div>
                <hr />
            </div>
    
            <div style="font-size: 14px;">
                <span style="width: 33%;display: inline-block;">
                    <div>මගේ අංකය</div>
                    <div>எனது இல</div>
                    <div>My No</div>
                </span>
                <span style="width: 33%;display: inline-block;">
                    <div>ඔබේ අංකය</div>
                    <div>உமது இல</div>
                    <div>Your No</div>
                </span>
                <span style="width: 33%;display: inline-block;">
                    <div>දිනය</div>
                    <div>திகதி</div>
                    <div>Date</div>
                </span>
            </div>
    
            <div class="officer margin-3x">
                <div>${props.applicantName} (${props.currentGrade} of S.L.A.S)</div>
                <div>through</div>
                <div>${props.currentInstituteHead}, ${props.currentInstitute}</div>
            </div>
    
            <div class="title margin"><u>Transfers of Sri Lanka Administrative Service</u></div>
    
            <div class="description margin">
                You are transferred to the Service Station mentioned below until further notice
                and I should be informed through the relevant Head of the Department on Assumption
                of Duties.
            </div>
    
            <table width="100%" class="margin">
                <tbody>
                    <tr>
                        <th width="20%">Name of the Officer</th>
                        <th width="30%">Service Station and the Post held at Present</th>
                        <th width="30%">Service Station to which the Officer is Transferred and the Post</th>
                        <th width="10%">Date of Transfer</th>
                        <th width="10%">Subsistence Allowance</th>
                    </tr>
                    <tr>
                        <td>${props.applicantName} <br /> (${props.currentGrade} of S.L.A.S)</td>
                        <td>${props.currentInstitute} - <br /> ${props.currentPost}</td>
                        <td>${props.newInstitute} - <br /> ${props.newPost}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
    
            <div class="signature margin-3x">
                <div>G.I. Lakmali Fernando - For Information</div>
                <div>Assistant Director (S.L.A.S)</div>
                <div>For Secretary Ministry of Public Services</div>
                <div>Provincial Councils and Local Government</div>
            </div>
    
            <div class="margin" style="margin-bottom: 6px;">Copies:</div>
            <table width="100%">
                <tbody>
                    <tr>
                        <td width="30%" class="no-border margin">${props.currentInstituteHead}, ${props.currentInstitute}
                        </td>
                        <td width="70%" class="no-border margin">${props.currentInstituteNote}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.newInstituteHead}, ${props.newInstitute}</td>
                        <td width="70%" class="no-border margin">${props.newInstituteNote}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform1Head}${props.inform1Seperator}
                            ${props.inform1Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform1Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform2Head}${props.inform2Seperator}
                            ${props.inform2Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform2Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform3Head}${props.inform3Seperator}
                            ${props.inform3Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform3Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform4Head}${props.inform4Seperator}
                            ${props.inform4Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform4Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform5Head}${props.inform5Seperator}
                            ${props.inform5Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform5Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform6Head}${props.inform6Seperator}
                            ${props.inform6Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform6Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform7Head}${props.inform7Seperator}
                            ${props.inform7Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform7Note}</td>
                    </tr>
                    <tr>
                        <td width="30%" class="no-border margin">${props.inform8Head}${props.inform8Seperator}
                            ${props.inform8Institute}</td>
                        <td width="70%" class="no-border margin">${props.inform8Note}</td>
                    </tr>
                </tbody>
            </table>
    
            <div class="footer">
                <hr />
                <div style="display: flex;align-items: center;justify-content:space-between;font-size: 14px;">
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>දුරකථන</div>
                            <div>தொலைபேசி</div>
                            <div>Telephone</div>
                        </span>
                        <span>
                            <div>011-2696211-13</div>
                            <div>011-2166000</div>
                        </span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>ෆැක්ස්</div>
                            <div>தொலைநகல்</div>
                            <div>Fax</div>
                        </span>
                        <span>
                            <div>011-2695279</div>
                        </span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>ඊ-මේල්</div>
                            <div>மின்னஞ்சல்</div>
                            <div>Email</div>
                        </span>
                        <span>
                            <div style="color: blue;"><u>information@pubad.gov.lk</u></div>
                        </span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>වෙබ් අඩවිය</div>
                            <div>இணையதளம்</div>
                            <div>Website</div>
                        </span>
                        <span>
                            <div style="color: blue;"><u>www.pubad.gov.lk</u></div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </body>
    
    </html>
   `
}

@inject('appStore', 'appState')
@observer
class ApplicationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: null,
            selectedRowKeys: [],
            loading: false,
        };

        this.props.appStore.getInstitutes();
    }

    componentDidMount() {
        this.reloadApplications();
    }

    filterData = (array, filterBy, key) => {
        return array && array.filter(function (element) {
            return element[filterBy] === key
        })[0];
    }

    generateColumns = () => {
        const applicationType = this.props.applicationType;
        const applicationStatus = this.props.applicationStatus;
        const role = this.props.appState.getUserRole();

        let columns = [
            {
                title: '#ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'NIC',
                dataIndex: 'nic',
                key: 'nic',
                width: '10%',
            },
            {
                title: 'Name',
                dataIndex: 'officer_name',
                key: 'officer_name',
            },
            {
                title: 'Designation',
                dataIndex: 'designation',
                key: 'designation',
            },
            {
                title: 'Place of work',
                dataIndex: 'place_of_work',
                key: 'place_of_work',

            },
            {
                title: 'Mobile',
                dataIndex: 'mobile_number',
                key: 'mobile_number',
                width: '10%',
            },
            {
                title: 'Submitted by',
                dataIndex: 'submited_by',
                key: 'submited_by',
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '5%',
                render: (text, record) => (
                    <ViewApplication reloadData={() => this.reloadApplications()} applicationType={applicationType} application={record} />
                ),
            }
        ];

        if (applicationType === 7 && applicationStatus === 400 && role === '2') {
            columns.push(
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '5%',
                    render: (text, record) => (
                        <Button type="link" icon="printer" onClick={() => this.printDocument(record)}>Print</Button>
                    )
                }
            );
            return columns;
        } else {
            return columns;
        }

    }

    printDocument = (data) => {
        const { institutes } = this.props.appStore;
        let application = JSON.parse(data.application);
        let approvalDetails = JSON.parse(data.approval_details);

        let printBody = {
            applicantName: application.officer_name,
            currentGrade: application.grade,
            currentInstituteHead: this.filterData(institutes, 'name', application.place_of_work).department_head,
            currentInstitute: application.place_of_work,
            currentPost: application.current_designation,
            newInstituteHead: this.filterData(institutes, 'name', application.new_place_of_work).department_head,
            newInstitute: application.new_place_of_work,
            newPost: application.new_designation,
            currentInstituteNote: approvalDetails.notice_current_work_place,
            newInstituteNote: approvalDetails.notice_new_work_place,

            inform1Head: approvalDetails.inform_1 ? this.filterData(institutes, 'name', approvalDetails.inform_1).department_head : '',
            inform1Institute: approvalDetails.inform_1 ? approvalDetails.inform_1 : '',
            inform1Note: approvalDetails.inform_1 ? 'For Information' : '',
            inform1Seperator: approvalDetails.inform_1 ? ',' : '',

            inform2Head: approvalDetails.inform_2 ? this.filterData(institutes, 'name', approvalDetails.inform_2).department_head : '',
            inform2Institute: approvalDetails.inform_2 ? approvalDetails.inform_2 : '',
            inform2Note: approvalDetails.inform_2 ? 'For Information' : '',
            inform2Seperator: approvalDetails.inform_2 ? ',' : '',

            inform3Head: approvalDetails.inform_3 ? this.filterData(institutes, 'name', approvalDetails.inform_3).department_head : '',
            inform3Institute: approvalDetails.inform_3 ? approvalDetails.inform_3 : '',
            inform3Note: approvalDetails.inform_3 ? 'For Information' : '',
            inform3Seperator: approvalDetails.inform_3 ? ',' : '',

            inform4Head: approvalDetails.inform_4 ? this.filterData(institutes, 'name', approvalDetails.inform_4).department_head : '',
            inform4Institute: approvalDetails.inform_4 ? approvalDetails.inform_4 : '',
            inform4Note: approvalDetails.inform_4 ? 'For Information' : '',
            inform4Seperator: approvalDetails.inform_4 ? ',' : '',

            inform5Head: approvalDetails.inform_5 ? this.filterData(institutes, 'name', approvalDetails.inform_5).department_head : '',
            inform5Institute: approvalDetails.inform_5 ? approvalDetails.inform_5 : '',
            inform5Note: approvalDetails.inform_5 ? 'For Information' : '',
            inform5Seperator: approvalDetails.inform_5 ? ',' : '',

            inform6Head: approvalDetails.inform_6 ? this.filterData(institutes, 'name', approvalDetails.inform_6).department_head : '',
            inform6Institute: approvalDetails.inform_6 ? approvalDetails.inform_6 : '',
            inform6Note: approvalDetails.inform_6 ? 'For Information' : '',
            inform6Seperator: approvalDetails.inform_6 ? ',' : '',

            inform7Head: approvalDetails.inform_7 ? this.filterData(institutes, 'name', approvalDetails.inform_7).department_head : '',
            inform7Institute: approvalDetails.inform_7 ? approvalDetails.inform_7 : '',
            inform7Note: approvalDetails.inform_7 ? 'For Information' : '',
            inform7Seperator: approvalDetails.inform_7 ? ',' : '',

            inform8Head: approvalDetails.inform_8 ? this.filterData(institutes, 'name', approvalDetails.inform_8).department_head : '',
            inform8Institute: approvalDetails.inform_8 ? approvalDetails.inform_8 : '',
            inform8Note: approvalDetails.inform_8 ? 'For Information' : '',
            inform8Seperator: approvalDetails.inform_8 ? ',' : '',
        }

        let printWindow = window.open('', '_blank', 'resizable=1,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        printWindow.document.open();
        printWindow.document.write(generatePrintDoc(printBody));
        printWindow.document.close();
    }

    reloadApplications = () => {
        this.setState({ applications: null });
        const user = this.props.appState.getUserData();
        const role = this.props.appState.getUserRole();

        this.props.appStore.getApplications({
            user_role: role,
            institutes_id: user.institutes_id,
            application_type: this.props.applicationType,
            application_status: this.props.applicationStatus
        })
            .then(response => {
                this.setState({ applications: response });
            })
            .catch(err => {
                this.setState({ applications: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    showBulkAction = () => {
        const role = this.props.appState.getUserRole();
        const applicationType = this.props.applicationType;
        const applicationStatus = this.props.applicationStatus;

        if (role === PUBAD && (applicationType === PROMOTION || applicationType === APPOINTMENT) && applicationStatus === 400) {
            return true;
        } else {
            return false;
        }
    }

    generateReport = (keys, applications) => {
        let csv = [];
        if (applications) {
            keys.forEach(element => {
                let appObj = applications.filter(value => value.id == element);
                let application = JSON.parse(appObj[0].application);
                csv.push(application);
            });
        }
        return csv;
    }

    render() {
        const { applications, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const applicationType = this.props.applicationType;

        return (
            <Card className="card-magrin">
                {this.showBulkAction() && <div style={{ marginBottom: 16 }}>
                    <TableData applicationType={applicationType} tableData={this.generateReport(selectedRowKeys, applications)} />

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} applications` : ''}
                    </span>
                </div>}

                {applications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.generateColumns(applicationType)}
                    dataSource={applications}
                    pagination={false}
                    rowSelection={this.showBulkAction() && rowSelection}
                />}

                {!applications && <Table
                    size={"small"}
                    loading={true}
                    rowKey={record => record.id}
                    columns={this.generateColumns(applicationType)}
                    dataSource={null}
                    pagination={false}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
