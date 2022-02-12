import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Card, Table } from 'antd';

import ViewApplication from "./ViewApplication";
import TableData from './TableData';

import _get from "lodash/get";

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
        
                <div style="display: flex;align-items: center;justify-content:space-between;font-size: 14px;">
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>මගේ අංකය</div>
                            <div>எனது இல</div>
                            <div>My No</div>
                        </span>
                        <span>
                            <div>${props.myNo}</div>
                        </span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>ඔබේ අංකය</div>
                            <div>உமது இல</div>
                            <div>Your No</div>
                        </span>
                        <span>
                            <div>${props.yourNo}</div>
                        </span>
                    </div>
                    <div style="display: flex;align-items: center;justify-content:space-between">
                        <span style="margin-right: 1rem;">
                            <div>දිනය</div>
                            <div>திகதி</div>
                            <div>Date</div>
                        </span>
                        <span>
                            <div>${props.date}</div>
                        </span>
                    </div>
                </div>
        
                <div class="officer margin-3x">
                    <div>${props.applicantName} (${props.currentGrade} of S.L.A.S)</div>
                    <div>through</div>
                    <div>${props.currentInstituteHead}, ${props.currentInstitute}</div>
                </div>
        
                <div class="title margin"><u>Transfers of Sri Lanka Administrative Service</u></div>
        
                <div class="description margin">
                ${props.printFormat === 1 && "You are transferred to the Service Station mentioned below until further notice and I should be informed through the relevant Head of the Department on Assumption of Duties."}
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
                            <td width="40%" class="no-border margin">${props.inform1Head}${props.inform1Seperator}
                                ${props.inform1Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform1Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform2Head}${props.inform2Seperator}
                                ${props.inform2Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform2Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform3Head}${props.inform3Seperator}
                                ${props.inform3Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform3Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform4Head}${props.inform4Seperator}
                                ${props.inform4Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform4Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform5Head}${props.inform5Seperator}
                                ${props.inform5Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform5Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform6Head}${props.inform6Seperator}
                                ${props.inform6Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform6Note}</td>
                        </tr>
                        <tr>
                            <td width="40%" class="no-border margin">${props.inform7Head}${props.inform7Seperator}
                                ${props.inform7Institute}</td>
                            <td width="60%" class="no-border margin">${props.inform7Note}</td>
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

    getDepartmentHead = (array, filterBy, key) => {
        if (key === '') return key;
        return array && array.filter(function (element) {
            return element[filterBy] === key
        })[0].department_head;
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
            printFormat: approvalDetails.print_format,
            applicantName: application.officer_name,
            currentGrade: application.grade,
            currentInstituteHead: this.getDepartmentHead(institutes, 'name', application.place_of_work),
            currentInstitute: application.place_of_work,
            currentPost: application.current_designation,
            newInstituteHead: this.getDepartmentHead(institutes, 'name', application.new_place_of_work),
            newInstitute: application.new_place_of_work,
            newPost: application.new_designation,
            myNo: approvalDetails.myNo,
            yourNo: approvalDetails.yourNo,
            date: approvalDetails.approvedDate,

            inform1Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_1, "institute", '')),
            inform1Institute: _get(approvalDetails.inform_1, "institute", ''),
            inform1Note: _get(approvalDetails.inform_1, "note", '') ? _get(approvalDetails.inform_1, "note", '') : '',
            inform1Seperator: _get(approvalDetails.inform_1, "institute", undefined) ? ',' : '',

            inform2Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_2, "institute", '')),
            inform2Institute: _get(approvalDetails.inform_2, "institute", ''),
            inform2Note: _get(approvalDetails.inform_2, "note", '') ? _get(approvalDetails.inform_2, "note", '') : '',
            inform2Seperator: _get(approvalDetails.inform_2, "institute", undefined) ? ',' : '',

            inform3Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_3, "institute", '')),
            inform3Institute: _get(approvalDetails.inform_3, "institute", ''),
            inform3Note: _get(approvalDetails.inform_3, "note", '') ? _get(approvalDetails.inform_3, "note", '') : '',
            inform3Seperator: _get(approvalDetails.inform_3, "institute", undefined) ? ',' : '',

            inform4Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_4, "institute", '')),
            inform4Institute: _get(approvalDetails.inform_4, "institute", ''),
            inform4Note: _get(approvalDetails.inform_4, "note", '') ? _get(approvalDetails.inform_4, "note", '') : '',
            inform4Seperator: _get(approvalDetails.inform_4, "institute", undefined) ? ',' : '',

            inform5Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_5, "institute", '')),
            inform5Institute: _get(approvalDetails.inform_5, "institute", ''),
            inform5Note: _get(approvalDetails.inform_5, "note", '') ? _get(approvalDetails.inform_5, "note", '') : '',
            inform5Seperator: _get(approvalDetails.inform_5, "institute", undefined) ? ',' : '',

            inform6Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_6, "institute", '')),
            inform6Institute: _get(approvalDetails.inform_6, "institute", ''),
            inform6Note: _get(approvalDetails.inform_6, "note", '') ? _get(approvalDetails.inform_6, "note", '') : '',
            inform6Seperator: _get(approvalDetails.inform_6, "institute", undefined) ? ',' : '',

            inform7Head: this.getDepartmentHead(institutes, 'name', _get(approvalDetails.inform_7, "institute", '')),
            inform7Institute: _get(approvalDetails.inform_7, "institute", ''),
            inform7Note: _get(approvalDetails.inform_7, "note", '') ? _get(approvalDetails.inform_7, "note", '') : '',
            inform7Seperator: _get(approvalDetails.inform_7, "institute", undefined) ? ',' : '',
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
