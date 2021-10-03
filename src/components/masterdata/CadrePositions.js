import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Select, Card, Breadcrumb, Typography, Button } from 'antd';
import AddCadre from './AddCadre';
import EditCadre from './EditCadre';

const { Title, Text } = Typography;
const { Option } = Select;

@inject('appStore')
@observer
class CadrePositions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, grade: '', institute: '', type: '' };

        this.props.appStore.getCadrePositions('', '', '');
        this.props.appStore.getInstitutes();
        this.props.appStore.getInstituteTypes();
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Institute',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Grade',
            dataIndex: 'grade_name',
            key: 'grade_name',
            width: '10%',
            align: 'center'
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            width: '10%',
            align: 'center'
        },
        {
            title: 'Salary Code',
            dataIndex: 'salary_code',
            key: 'salary_code',
            width: '10%',
            align: 'center'
        },
        {
            title: 'No of Cadre',
            dataIndex: 'no_of_cadre',
            key: 'no_of_cadre',
            width: '10%',
            align: 'center'
        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '10%',
            render: (text, record) => (
                <EditCadre record={record} search={this.search}/>
            ),
        }
    ];

    changeFilterGrade = (value) => {
        if (value) {
            this.setState({ grade: value });
        } else {
            this.setState({ grade: '' });
        }
    }

    changeFilterInstitute = (value) => {
        if (value) {
            this.setState({ institute: value });
        } else {
            this.setState({ institute: '' });
        }
    }

    changeFilterInstituteType = (value) => {
        if (value) {
            this.setState({ type: value });
        } else {
            this.setState({ type: '' });
        }
    }

    search = () => {
        this.setState({ loading: true });
        // this.props.appStore.clearCadrePosition();

        const { grade, institute, type } = this.state;
        this.props.appStore.getCadrePositions(grade, institute, type);

        this.setState({ loading: false });
    }

    getTotal = (data) => {
        var count = 0;
        data.forEach(element => {
            count = count + element.no_of_cadre
        });

        return count;
    }

    render() {
        const { cadrePositions, institutes, instituteTypes } = this.props.appStore;
        const { loading } = this.state;

        let instituteValues = [];
        let instituteTypeValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.name}>{element.name}</Option>);
            });
        }

        if (instituteTypes) {
            instituteTypes.forEach((element, index) => {
                instituteTypeValues.push(<Option key={index} value={element.id}>{element.institute_name}</Option>);
            });
        }

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Master Data
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cadre Positions
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Cadre Positions</Title>
                </Card>

                <Card className="card-magrin">
                    <div style={{ marginBottom: 16 }}>
                        <Text>Grade : </Text>
                        <Select
                            style={{ width: 140 }}
                            placeholder="Select filter"
                            optionFilterProp="children"
                            onChange={this.changeFilterGrade}
                            allowClear
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Special Grade">Special Grade</Option>
                            <Option value="Grade I">Grade I</Option>
                            <Option value="Grade II">Grade II</Option>
                            <Option value="Grade III">Grade III</Option>
                            <Option value="Secretary">Secretary</Option>
                        </Select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Text>Institute Type : </Text>
                        <Select
                            showSearch
                            allowClear
                            style={{ width: 200 }}
                            onChange={this.changeFilterInstituteType}
                            placeholder="Select institute type"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {instituteTypeValues}
                        </Select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Text>Institute : </Text>
                        <Select
                            style={{ width: 300 }}
                            placeholder="Select institute"
                            optionFilterProp="children"
                            onChange={this.changeFilterInstitute}
                            showSearch
                            allowClear
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {instituteValues}
                        </Select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button loading={loading} type="primary" icon="refresh" onClick={this.search}>Search</Button>
                    </div>

                    <div style={{ marginBottom: 25 }}><AddCadre /></div>

                    {cadrePositions && <Table
                        size={"small"}
                        rowKey={record => record.id}
                        columns={this.columns}
                        pagination={false}
                        dataSource={cadrePositions}
                        footer={() => <div style={{ textAlign: 'right', marginRight: 25 }}>Total : {this.getTotal(cadrePositions)}</div>}
                    />}

                    {!cadrePositions && <Table
                        size={"small"}
                        rowKey={record => record.id}
                        columns={this.columns}
                        pagination={false}
                        dataSource={null}
                        loading={true} />}

                </Card>
            </div>
        )
    }
}

export default CadrePositions;