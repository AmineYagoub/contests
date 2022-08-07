import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "الإسم الكامل",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "السن",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "الجنسية",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "نوع العضوية",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = "green";
          if (tag === "بدون مشرف") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "أحمد عمر 1",
    age: 13,
    address: "مصر",
    tags: ["بدون مشرف"],
  },
  {
    key: "2",
    name: "أحمد عمر 2",
    age: 13,
    address: "السعودية",
    tags: ["مع مشرف"],
  },
  {
    key: "3",
    name: "أحمد عمر 3",
    age: 18,
    address: "مصر",
    tags: ["مع مشرف"],
  },
  {
    key: "4",
    name: "أحمد عمر 4",
    age: 15,
    address: "الأردن",
    tags: ["مع مشرف"],
  },
  {
    key: "5",
    name: "أحمد عمر 5",
    age: 17,
    address: "الكويت",
    tags: ["مع مشرف"],
  },
];

const LatestUsers = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ hideOnSinglePage: true }}
      style={{ height: 350 }}
    />
  );
};

export default LatestUsers;
