import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Tag, Icon } from "antd";

class TableHoverOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showID: 0
    };
  }
  render() {
    const { showID } = this.state;
    const {data} = this.props;

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age"
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            render: tags => (
            <span>
                {tags.map(tag => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                    color = "volcano";
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })}
            </span>
            )
        },
        {
            title: "Action",
            key: "action",
            width: "20%",
            render: (text, record) =>
            showID === record.key ? (
                <span>
                <Icon style={{ marginRight: 5 }} type="delete" />
                <Icon style={{ marginRight: 5 }} type="smile" />
                <Icon style={{ marginRight: 5 }} type="question-circle" />
                </span>
            ) : (
                <span>
                <Icon type="edit" />
                </span>
            )
        }
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onMouseEnter: event => {
                this.setState({
                  showID: record.key
                });
              }, // mouse enter row
              onMouseLeave: event => {
                this.setState({
                  showID: false
                });
              } // mouse leave row
            };
          }}
        />
      </div>
    );
  }
}

export default TableHoverOptions;


