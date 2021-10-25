import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Select, Icon } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

import ReactToPrint from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

@inject('appStore')
@observer
class OfficerReports extends React.Component {

    constructor(props) {
        super(props);

        this.state = { allOfficers: [], loading: true };
        this.loadOfficers();
    }

    columns = [
        {
            title: 'Serial No',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Present Post',
            dataIndex: 'designation',
            key: 'designation',
            width: '20%'
        },
        {
            title: 'Present Work Place',
            dataIndex: 'institute_name',
            key: 'institute_name',
        },
        // {
        //     title: 'Grade',
        //     dataIndex: 'grade_name',
        //     key: 'grade_name'
        // },
        // {
        //     title: 'Nature of Attachment',
        //     dataIndex: 'nature_of_attachment',
        //     key: 'nature_of_attachment'
        // }
    ];

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.loadOfficers();
        }
    }

    loadOfficers = (noa = null) => {
        this.setState({ allOfficers: [], loading: true });
        let path = this.props.match.params.grade;
        let queryData = {};
        queryData.nature_of_attachment = noa ? noa : 'General Officer Attachment';
        if (path === 'special') {
            queryData.type = 'OFFICER_REPORTS_SPECIAL_GRADE';
        } else if (path === 'gradei') {
            queryData.type = 'OFFICER_REPORTS_GRADE_I';
        } else if (path === 'gradeii') {
            queryData.type = 'OFFICER_REPORTS_GRADE_II';
        } else if (path === 'gradeiii') {
            queryData.type = 'OFFICER_REPORTS_GRADE_III';
        }

        this.props.appStore.generateReports(queryData)
            .then(sucess => {
                this.setState({ allOfficers: sucess, loading: false });
            })
            .catch(err => {
                this.setState({ allOfficers: [], loading: false });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong in officer adding!');
            });
    }

    changeFilter = (value) => {
        this.loadOfficers(value);
    }

    // arrayToCSV = (objArray) => {
    //     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    //     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    //     return array.reduce((str, next) => {
    //         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
    //         return str;
    //     }, str);
    // }

    getReportTypes = () => {
        let path = this.props.match.params.grade;
        if (path === 'special') {
            return [
                <Option value="General Officer Attachment">General Officer Attachment</Option>,
                <Option value="PSC - Acting in Post – Part Time">PSC - Acting in Post – Part Time</Option>,
                <Option value="Below Post Staying">Below Post Staying</Option>,
                <Option value="PubAd Pool Attachment">PubAd Pool Attachment</Option>,
                <Option value="No Pay Leave">No Pay Leave</Option>,
                <Option value="Secondment/Other Posts Attachment">Secondment/Other Posts Attachment</Option>,
                <Option value="Secretary Appointment">Secretary Appointment</Option>
            ]
        } else if (path === 'gradei') {
            return [
                <Option value="General Officer Attachment">General Officer Attachment</Option>,
                <Option value="Cabinet Acting">Cabinet Acting</Option>,
                <Option value="PSC Acting">PSC Acting</Option>,
                <Option value="Below Post Staying">Below Post Staying</Option>,
                <Option value="PubAd Pool Attachment">PubAd Pool Attachment</Option>,
                <Option value="No Pay Leave">No Pay Leave</Option>,
                <Option value="Secondment/Other Posts Attachment">Secondment/Other Posts Attachment</Option>
            ]
        } else if (path === 'gradeii') {
            return [
                <Option value="General Officer Attachment">General Officer Attachment</Option>,
                <Option value="Cabinet - Acting in Post">Cabinet - Acting in Post</Option>,
                <Option value="Cabinet - Attending to Duties in Post">Cabinet - Attending to Duties in Post</Option>,
                <Option value="PSC - Acting in Post – Full Time">PSC - Acting in Post – Full Time</Option>,
                <Option value="PSC - Acting in Post – Part Time">PSC - Acting in Post – Part Time</Option>,
                <Option value="PSC - Attending to Duties in Post – Full Time">PSC - Attending to Duties in Post – Full Time</Option>,
                <Option value="PSC - Attending to Duties in Post – Part Time">PSC - Attending to Duties in Post – Part Time</Option>,
                <Option value="PubAd Pool Attachment">PubAd Pool Attachment</Option>,
                <Option value="No Pay Leave">No Pay Leave</Option>,
                <Option value="Secondment/Other Posts Attachment">Secondment/Other Posts Attachment</Option>
            ]
        } else if (path === 'gradeiii') {
            return [
                <Option value="General Officer Attachment">General Officer Attachment</Option>,
                <Option value="Cabinet - Acting in Post">Cabinet - Acting in Post</Option>,
                <Option value="Cabinet - Attending to Duties in Post">Cabinet - Attending to Duties in Post</Option>,
                <Option value="PSC - Acting in Post – Full Time">PSC - Acting in Post – Full Time</Option>,
                <Option value="PSC - Acting in Post – Part Time">PSC - Acting in Post – Part Time</Option>,
                <Option value="PSC - Attending to Duties in Post – Full Time">PSC - Attending to Duties in Post – Full Time</Option>,
                <Option value="PSC - Attending to Duties in Post – Part Time">PSC - Attending to Duties in Post – Part Time</Option>,
                <Option value="Below Post Staying">Below Post Staying</Option>,
                <Option value="PubAd Pool Attachment">PubAd Pool Attachment</Option>,
                <Option value="No Pay Leave">No Pay Leave</Option>,
                <Option value="Secondment/Other Posts Attachment">Secondment/Other Posts Attachment</Option>,
                <Option value="Contract Basis Appointment">Contract Basis Appointment</Option>,
                <Option value="Other Officer Appointment">Other Officer Appointment</Option>,
                <Option value="Secretary Appointment">Secretary Appointment</Option>
            ]
        }
    }

    render() {
        let { allOfficers, loading } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Grade I Officers
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Grade I Officers</Title>

                    <div style={{ textAlign: 'right' }}>
                        {/* {officersReport && <CSVLink
                            filename={"grade-i-officers.csv"}
                            data={this.arrayToCSV(this.filterData(officersReport))}>
                            <Icon style={{ fontSize: '32px', color: '#08c', marginRight: '10px' }} type="file-text" />
                        </CSVLink>} */}

                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>

                <Card className="card-magrin">
                    <div>
                        <Text>Type : </Text>
                        <Select
                            defaultValue="General Officer Attachment"
                            style={{ width: 400 }}
                            placeholder="Select filter"
                            optionFilterProp="children"
                            onChange={this.changeFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.getReportTypes()}
                        </Select>
                    </div>


                    <div style={{ marginTop: 15 }} ref={el => (this.componentRef = el)}>
                        {!loading && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            pagination={false}
                            dataSource={allOfficers} />}

                        {loading && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={null}
                            loading={true} />}
                    </div>

                </Card>
            </div>
        )
    }
}

export default OfficerReports;