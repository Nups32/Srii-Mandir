import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Tag,
  Button,
  Modal,
  message,
  Space,
  Descriptions,
  Avatar,
} from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import { getAllQuestions, deleteQuestion, getQuestionById } from "@/utils/API";
import dayjs from "dayjs";
// import moment from "moment";

interface QuestionData {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    profileImage?: string;
  };
  name: string;
  fatherName?: string;
  spouseName?: string;
  childrenNames: string[];
  email?: string;
  dob?: string;
  birthPlace?: string;
  question: string;
  createdAt: string;
  updatedAt: string;
}

const AskQuestionsIndex: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(null);
  const [viewLoading, setViewLoading] = useState<boolean>(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await getAllQuestions();
      if (response.data.status) {
        setQuestions(response.data.data);
      } else {
        message.error(response.data.message || "Failed to fetch questions");
      }
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      message.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleView = async (id: string) => {
    setViewLoading(true);
    try {
      const response = await getQuestionById(id);
      if (response.data.status) {
        setSelectedQuestion(response.data.data);
        setViewModalVisible(true);
      } else {
        message.error(response.data.message || "Failed to load question details");
      }
    } catch (error: any) {
      console.error("Error fetching question details:", error);
      message.error("Failed to load question details");
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this question?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setDeleteLoading(id);
        try {
          const response = await deleteQuestion(id);
          if (response.data.status) {
            message.success("Question deleted successfully");
            fetchQuestions(); // Refresh the list
          } else {
            message.error(response.data.message || "Failed to delete question");
          }
        } catch (error: any) {
          console.error("Error deleting question:", error);
          message.error("Failed to delete question");
        } finally {
          setDeleteLoading(null);
        }
      },
    });
  };

  const columns = [
    {
      title: "S.No",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 70,
      align: "center" as const,
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "user",
      render: (userId: any) => (
        <div className="flex items-center">
          <Avatar
            size="small"
            src={userId?.profileImage}
            className="mr-2"
          >
            {userId?.name?.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{userId?.name || "N/A"}</div>
            <div className="text-xs text-gray-500">{userId?.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Question By",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: QuestionData) => (
        <div>
          <div className="font-medium">{name}</div>
          {record.fatherName && (
            <div className="text-xs text-gray-500">
              Father: {record.fatherName}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (question: string) => (
        <div className="max-w-xs truncate" title={question}>
          {question}
        </div>
      ),
    },
    {
      title: "Submitted Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD MMM YYYY, hh:mm A"),
      width: 180,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      align: "center" as const,
      render: (_: any, record: QuestionData) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<FaEye />}
            size="small"
            onClick={() => handleView(record._id)}
            loading={viewLoading && selectedQuestion?._id === record._id}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600"
          />
          <Button
            type="primary"
            danger
            icon={<FaTrash />}
            size="small"
            onClick={() => handleDelete(record._id)}
            loading={deleteLoading === record._id}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row className="mb-4" justify="space-between" align="middle">
        <Col>
          <h2 className="text-2xl font-bold">Ask Questions</h2>
          <p className="text-gray-500">Manage user submitted questions</p>
        </Col>
      </Row>

      <Card>
        <Table
          columns={columns}
          dataSource={questions}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} questions`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* View Modal */}
      <Modal
        title="Question Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedQuestion && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="User" span={2}>
              <div className="flex items-center">
                <Avatar
                  src={selectedQuestion.userId?.profileImage}
                  className="mr-2"
                >
                  {selectedQuestion.userId?.name?.charAt(0)}
                </Avatar>
                <div>
                  <div className="font-medium">{selectedQuestion.userId?.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedQuestion.userId?.email}
                    {selectedQuestion.userId?.phone && (
                      <> • {selectedQuestion.userId?.phone}</>
                    )}
                  </div>
                </div>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Question By">{selectedQuestion.name}</Descriptions.Item>
            <Descriptions.Item label="Father's Name">
              {selectedQuestion.fatherName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Spouse's Name">
              {selectedQuestion.spouseName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Children's Names" span={2}>
              {selectedQuestion.childrenNames && selectedQuestion.childrenNames.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedQuestion.childrenNames.map((child, index) => (
                    <Tag key={index} color="blue">
                      {child}
                    </Tag>
                  ))}
                </div>
              ) : (
                "N/A"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{selectedQuestion.email || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {selectedQuestion.dob || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Birth Place">
              {selectedQuestion.birthPlace || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Question" span={2}>
              <div className="p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                {selectedQuestion.question}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Submitted Date">
              {dayjs(selectedQuestion.createdAt).format("DD MMM YYYY, hh:mm A")}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {dayjs(selectedQuestion.updatedAt).format("DD MMM YYYY, hh:mm A")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default AskQuestionsIndex;