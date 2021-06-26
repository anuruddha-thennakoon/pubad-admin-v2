import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Select, Icon } from 'antd';

const { Title, Text } = Typography;

import ReactToPrint from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

@inject('appStore')
@observer
class GradeIIIOfficers extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, filter: 'Appointed Officers in Grade III Posts' };

        this.props.appStore.getAllOfficersReport();
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
            // width: '20%'
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

    changeFilter = (value) => {
        this.setState({ filter: value });
    }

    filterData = (data) => {
        const { filter } = this.state;

        if (filter == 'Appointed Officers in Grade III Posts') {
            var temp = [];
            data.forEach(element => {
                if (element.officer_grade == 4 && element.nature_of_attachment == 'Permanent' && element.position_grade == 4) {
                    temp.push(element)
                }
            });
            return temp;
        } else if (filter == 'Pool Attached') {
            var temp = [];
            data.forEach(element => {
                if (element.officer_grade == 4 && element.position_grade == 7) {
                    temp.push(element)
                }
            });
            return temp;
        } else if (filter == 'Secondment Officers') {
            var temp = [];
            data.forEach(element => {
                if (element.officer_grade == 4 && element.position_grade == 6) {
                    temp.push(element)
                }
            });
            return temp;
        } else if (filter == 'SLAS - Cabinet Acting') {
            var temp = [];
            data.forEach(element => {
                if (element.nature_of_attachment == 'SLAS - Cabinet Acting' && element.position_grade == 4) {
                    temp.push(element)
                }
            });
            return temp;
        } else if (filter == 'SLAS - PSC Acting') {
            var temp = [];
            data.forEach(element => {
                if (element.nature_of_attachment == 'SLAS - PSC Acting' && element.position_grade == 4) {
                    temp.push(element)
                }
            });
            return temp;
        } else if (filter == 'SLAS - PSC Contract Basis') {
            var temp = [];
            data.forEach(element => {
                if (element.nature_of_attachment == 'SLAS - PSC Contract Basis' && element.position_grade == 4) {
                    temp.push(element)
                }
            });
            return temp;
        } else {
            return data;
        }
    }

    // arrayToCSV = (objArray) => {
    //     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    //     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    //     return array.reduce((str, next) => {
    //         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
    //         return str;
    //     }, str);
    // }

    render() {
        let { officersReport } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Grade III Officers
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Grade III Officers</Title>

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
                            defaultValue="Appointed Officers in Grade III Posts"
                            style={{ width: 400 }}
                            placeholder="Select filter"
                            optionFilterProp="children"
                            onChange={this.changeFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Appointed Officers in Grade III Posts">Appointed Officers in Grade III Posts</Option>
                            <Option value="Pool Attached">Pool Attached</Option>
                            <Option value="Secondment Officers">Secondment Officers</Option>
                            <Option value="SLAS - Cabinet Acting">SLAS - Cabinet Acting</Option>
                            <Option value="SLAS - PSC Acting">SLAS - PSC Acting </Option>
                            <Option value="SLAS - PSC Contract Basis">SLAS - PSC Contract Basis</Option>
                        </Select>
                    </div>


                    <div style={{ marginTop: 15 }} ref={el => (this.componentRef = el)}>
                        <div style={{ marginBottom: 16, textAlign: 'center' }}>{this.state.filter}</div>
                        {officersReport && <Table
                            size={"small"}
                            loading={this.state.tableLoading}
                            rowKey={record => record.id}
                            columns={this.columns}
                            pagination={false}
                            dataSource={this.filterData(officersReport)} />}

                        {!officersReport && <Table
                            size={"small"}
                            loading={this.state.tableLoading}
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

export default GradeIIIOfficers;