import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Icon, Select } from 'antd';

import ReactToPrint from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

const { Title, Text } = Typography;

@inject('appStore')
@observer
class AllOfficers extends React.Component {

    constructor(props) {
        super(props);

        this.state = { loading: false, filter: 'all' };

        this.props.appStore.getCurrentAllOfficers();
    }

    columns = [
        {
            title: 'Serial No',
            dataIndex: 'serial_no',
            key: 'serial_no',
            // render: (text, record, index) => (
            //     <span>{index + 1}</span>
            // ),
        },
        {
            title: ' Seniority Number',
            dataIndex: 'seniority_no',
            key: 'seniority_no',
            sorter: (a, b) => a.seniority_no - b.seniority_no,
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Current Grade',
            dataIndex: 'grade_name',
            key: 'grade_name',
            render: (text, record) => (
                <div>{this.getGradeName(record)}</div>
            ),
        },
        {
            title: 'Present Post',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Present Work Place',
            dataIndex: 'institute_name',
            key: 'institute_name',
            width: '20%'
        },
        {
            title: 'Contact Number',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center'
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Entry to</span><br />
                <span>Grade III</span>
            </span>,
            dataIndex: 'grade_iii_entry',
            key: 'grade_iii_entry',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade II</span>
            </span>,
            dataIndex: 'grade_ii_promoted',
            key: 'grade_ii_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade I</span>
            </span>,
            dataIndex: 'grade_i_promoted',
            key: 'grade_i_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Special Grade</span>
            </span>,
            dataIndex: 'special_grade_promoted',
            key: 'special_grade_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: 'File Number',
            dataIndex: 'file_no',
            key: 'file_no',
        },
    ];

    getGradeName = (record) => {
        if (record.grades_id == 1) {
            return 'Special Grade';
        } else if (record.grades_id == 2) {
            return 'Grade I';
        } else if (record.grades_id == 3) {
            return 'Grade II';
        } else if (record.grades_id == 4) {
            return 'Grade III';
        } else {
            return '';
        }
    }

    filterData = () => {
        let { allOfficers } = this.props.appStore;
        const { filter } = this.state;

        var temp = [];
        var serialNo = 0;

        allOfficers.forEach(element => {
            if (element.current_status != 0) {
                if (element.status != 2) {
                    if (filter == 'all') {
                        serialNo = serialNo + 1;
                        element.serial_no = serialNo;
                        temp.push(element);
                    } else if (filter == 'special') {
                        if (element.grades_id == 1) {
                            serialNo = serialNo + 1;
                            element.serial_no = serialNo;
                            temp.push(element);
                        }
                    } else if (filter == 'grade_i') {
                        if (element.grades_id == 2) {
                            serialNo = serialNo + 1;
                            element.serial_no = serialNo;
                            temp.push(element);
                        }
                    } else if (filter == 'grade_ii') {
                        if (element.grades_id == 3) {
                            serialNo = serialNo + 1;
                            element.serial_no = serialNo;
                            temp.push(element);
                        }
                    } else if (filter == 'grade_iii') {
                        if (element.grades_id == 4) {
                            serialNo = serialNo + 1;
                            element.serial_no = serialNo;
                            temp.push(element);
                        }
                    }
                }
            }
        });

        // return <Table
        //     size={"small"}
        //     loading={false}
        //     rowKey={record => record.id}
        //     columns={this.columns}
        //     scroll={{ x: 1400 }}
        //     pagination={false}
        //     dataSource={temp} />;

        return temp;
    }

    changeFilter = (value) => {
        this.setState({ filter: value });
    }

    arrayToCSV = (objArray) => {
        // if(objArray){
        //     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        //     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

        //     return array.reduce((str, next) => {
        //         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
        //         return str;
        //     }, str);
        // }
    }

    render() {
        let { allOfficers } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Officers
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            All Officers
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>All Officers</Title>

                    <div style={{ textAlign: 'right' }}>
                        {allOfficers && <CSVLink
                            filename={"special-grade-officers.csv"}
                            data={this.filterData()}>
                            <Icon style={{ fontSize: '32px', color: '#08c', marginRight: '10px' }} type="file-text" />
                        </CSVLink>}

                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>

                <Card className="card-magrin" ref={el => (this.componentRef = el)}>

                    <div>
                        <Text>Type : </Text>
                        <Select
                            defaultValue="all"
                            style={{ width: 250 }}
                            placeholder="Select filter"
                            optionFilterProp="children"
                            onChange={this.changeFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="all">All</Option>
                            <Option value="special">Special Grade</Option>
                            <Option value="grade_i">Grade I</Option>
                            <Option value="grade_ii">Grade II</Option>
                            <Option value="grade_iii">Grade III</Option>
                        </Select>
                    </div>

                    <div style={{ marginTop: 15 }}>
                        {allOfficers && <Table
                            size={"small"}
                            loading={false}
                            rowKey={record => record.id}
                            columns={this.columns}
                            scroll={{ x: 1400 }}
                            pagination={false}
                            dataSource={this.filterData()} />}

                        {/* {allOfficers && this.filterData()} */}

                        {!allOfficers && <Table
                            size={"small"}
                            loading={true}
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

export default AllOfficers;