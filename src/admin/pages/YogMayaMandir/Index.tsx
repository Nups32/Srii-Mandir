import {
  Card,
  Row,
  Table,
  Col,
  Input,
  message,
  Spin,
  Modal,
  Button,
  Tag,
  Badge,
  Collapse,
  Descriptions,
} from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteYogMayaMandir, getAllYogMayaMandir, updateYogMayaMandirStatus } from "@/utils/API";

const { Panel } = Collapse;

interface UnderstandingYog {
  title: string;
  description: string;
}

interface MeditationPractice {
  type: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  duration: string;
  step: string[];
  benefit: string;
}

interface Wisdom {
  title: string;
  wisdom: string;
  understanding: string;
}

interface YogMayaMandir {
  _id: string;
  understandingYog: UnderstandingYog[];
  meditationPractices: MeditationPractice[];
  wisdoms: Wisdom[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const YogMayaMandirTable = () => {
  const [datasource, setDatasource] = useState<YogMayaMandir[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<YogMayaMandir | null>(null);
  const navigate = useNavigate();

  const fetchYogMayaMandir = async () => {
    setLoading(true);
    try {
      const response = await getAllYogMayaMandir();
      if (response.data.status) {
        setDatasource(response.data.data);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYogMayaMandir();
  }, []);

  // Filter based on search
  const getFilteredRecords = () => {
    let filtered = datasource;

    if (searchText) {
      filtered = filtered.filter(item =>
        item.understandingYog?.some(yog => 
          yog.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          yog.description?.toLowerCase().includes(searchText.toLowerCase())
        ) ||
        item.meditationPractices?.some(practice => 
          practice.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          practice.benefit?.toLowerCase().includes(searchText.toLowerCase()) ||
          practice.step?.some(step => step.toLowerCase().includes(searchText.toLowerCase()))
        ) ||
        item.wisdoms?.some(wisdom => 
          wisdom.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          wisdom.wisdom?.toLowerCase().includes(searchText.toLowerCase()) ||
          wisdom.understanding?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const handleEditRedirect = () => {
    if (datasource.length > 0) {
      navigate(`/admin/yog-maya-mandir/${datasource[0]._id}/edit`);
    }
  };

  const handleAddNew = () => {
    navigate("/admin/yog-maya-mandir/add");
  };

  const handleViewDetails = (record: YogMayaMandir) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteYogMayaMandir(deleteId);
        message.success("Yog Maya Mandir content deleted successfully");
        fetchYogMayaMandir();
      } catch (error) {
        message.error("Failed to delete content");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: YogMayaMandir) => {
    try {
      await updateYogMayaMandirStatus(record._id, {
        isActive: !record.isActive,
      });
      message.success(
        `Yog Maya Mandir content ${record.isActive ? "deactivated" : "activated"} successfully`
      );
      fetchYogMayaMandir();
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMeditationTypeColor = (type: string) => {
    switch (type) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'purple';
      default: return 'default';
    }
  };

  const getMeditationTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Content Overview
        </div>
      ),
      key: "overview",
      render: (record: YogMayaMandir) => (
        <div className="space-y-2">
          <div className="font-medium text-lg">Yog Maya Mandir</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-gray-500">Yog Sections</div>
              <div className="font-bold">{record.understandingYog?.length || 0}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-gray-500">Meditations</div>
              <div className="font-bold">{record.meditationPractices?.length || 0}</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-gray-500">Wisdoms</div>
              <div className="font-bold">{record.wisdoms?.length || 0}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Meditation Types
        </div>
      ),
      key: "meditationTypes",
      render: (record: YogMayaMandir) => {
        const typeCounts = record.meditationPractices?.reduce((acc, practice) => {
          acc[practice.type] = (acc[practice.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return (
          <div className="space-y-2">
            {typeCounts && Object.entries(typeCounts).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <Tag color={getMeditationTypeColor(type)}>
                  {getMeditationTypeLabel(type)}
                </Tag>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: YogMayaMandir) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge
              status={record.isActive ? "success" : "error"}
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Button
              size="small"
              type="link"
              onClick={() => handleStatusChange(record)}
            >
              {record.isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Last Updated
        </div>
      ),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => formatDate(text),
      sorter: (a: YogMayaMandir, b: YogMayaMandir) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: YogMayaMandir) => (
        <div className="flex flex-row items-center space-x-3">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            className="p-0"
          >
            View
          </Button>
          <AiFillEdit
            className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={handleEditRedirect}
            title="Edit"
          />
          <AiFillDelete
            className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
            onClick={() => setDeleteId(record._id)}
            title="Delete"
          />
        </div>
      ),
    },
  ];

  const filteredRecords = getFilteredRecords();

  // Calculate statistics
  const totalRecords = filteredRecords.length;
  const activeRecords = filteredRecords.filter(item => item.isActive).length;
  const totalYogSections = filteredRecords.reduce((sum, item) => 
    sum + (item.understandingYog?.length || 0), 0);
  const totalMeditations = filteredRecords.reduce((sum, item) => 
    sum + (item.meditationPractices?.length || 0), 0);
  const totalWisdoms = filteredRecords.reduce((sum, item) => 
    sum + (item.wisdoms?.length || 0), 0);

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Yog Maya Mandir */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Yog Maya Mandir</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className="">
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search in yog sections, meditations, or wisdoms..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add/edit btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className="">
              {datasource.length === 0 ? (
                <button 
                  className="flex items-center justify-center py-3 btn-brand w-full"
                  onClick={handleAddNew}
                >
                  <RiAddBoxFill style={{ fontSize: "15px" }} />
                  <div className="ml-1">Add Content</div>
                </button>
              ) : (
                <button 
                  className="flex items-center justify-center py-3 btn-brand w-full"
                  onClick={handleEditRedirect}
                >
                  <AiFillEdit style={{ fontSize: "15px" }} />
                  <div className="ml-1">Edit Content</div>
                </button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Content Sets</div>
              <div className="text-lg font-bold">{totalRecords}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Active Content</div>
              <div className="text-lg font-bold text-green-600">
                {activeRecords}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Yog Sections</div>
              <div className="text-lg font-bold">{totalYogSections}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Meditation Practices</div>
              <div className="text-lg font-bold">{totalMeditations}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Wisdom Teachings</div>
              <div className="text-lg font-bold">{totalWisdoms}</div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading}>
              <Table
                scroll={{ x: 1000 }}
                columns={columns}
                dataSource={filteredRecords}
                rowKey="_id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} content sets`,
                }}
              />
            </Spin>
          </Col>
        </Card>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        footer={null}
        centered
      >
        <div style={{ textAlign: "start", marginBottom: "1rem" }}>
          <p>Are you sure you want to delete this Yog Maya Mandir content?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone. All yoga sections, meditation practices, and wisdom teachings will be permanently deleted.
          </p>
        </div>
        <div style={{ textAlign: "end" }}>
          <Button
            onClick={() => setDeleteId(null)}
            className="rounded mr-3"
            style={{
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} type="primary" className="rounded" danger>
            Delete
          </Button>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        title="Yog Maya Mandir Content Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={900}
        centered
        style={{ maxHeight: '80vh' }}
      >
        {selectedRecord && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Header Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Yog Maya Mandir</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      status={selectedRecord.isActive ? "success" : "error"}
                      text={selectedRecord.isActive ? "Active" : "Inactive"}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Last Updated
                  </div>
                  <div className="font-medium">
                    {formatDate(selectedRecord.updatedAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Understanding Yog Sections */}
            {selectedRecord.understandingYog && selectedRecord.understandingYog.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">
                  Understanding Yog ({selectedRecord.understandingYog.length} sections)
                </h4>
                <Collapse accordion>
                  {selectedRecord.understandingYog.map((yog, index) => (
                    <Panel 
                      header={
                        <div className="font-medium">
                          {index + 1}. {yog.title || `Yog Section ${index + 1}`}
                        </div>
                      } 
                      key={index}
                    >
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Title</div>
                          <div className="font-medium">{yog.title}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Description</div>
                          <div className="whitespace-pre-line">{yog.description}</div>
                        </div>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            )}

            {/* Meditation Practices */}
            {selectedRecord.meditationPractices && selectedRecord.meditationPractices.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">
                  Meditation Practices ({selectedRecord.meditationPractices.length} practices)
                </h4>
                <Collapse accordion>
                  {selectedRecord.meditationPractices.map((practice, index) => (
                    <Panel 
                      header={
                        <div className="flex items-center justify-between">
                          <div className="font-medium">
                            {index + 1}. {practice.title}
                          </div>
                          <Tag color={getMeditationTypeColor(practice.type)}>
                            {getMeditationTypeLabel(practice.type)}
                          </Tag>
                        </div>
                      } 
                      key={index}
                    >
                      <div className="space-y-4">
                        <Descriptions column={2} size="small">
                          <Descriptions.Item label="Duration">
                            {practice.duration}
                          </Descriptions.Item>
                          <Descriptions.Item label="Type">
                            <Tag color={getMeditationTypeColor(practice.type)}>
                              {getMeditationTypeLabel(practice.type)}
                            </Tag>
                          </Descriptions.Item>
                          <Descriptions.Item label="Steps" span={2}>
                            {practice.step?.length || 0} steps
                          </Descriptions.Item>
                        </Descriptions>
                        
                        {practice.step && practice.step.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-2">Steps:</div>
                            <ol className="list-decimal pl-5 space-y-1">
                              {practice.step.map((step, stepIndex) => (
                                <li key={stepIndex} className="whitespace-pre-line">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {practice.benefit && (
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Benefits:</div>
                            <div className="whitespace-pre-line bg-blue-50 p-3 rounded">
                              {practice.benefit}
                            </div>
                          </div>
                        )}
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            )}

            {/* Wisdoms */}
            {selectedRecord.wisdoms && selectedRecord.wisdoms.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3 border-b pb-2">
                  Wisdom Teachings ({selectedRecord.wisdoms.length} teachings)
                </h4>
                <Collapse accordion>
                  {selectedRecord.wisdoms.map((wisdom, index) => (
                    <Panel 
                      header={
                        <div className="font-medium">
                          {index + 1}. {wisdom.title || `Wisdom ${index + 1}`}
                        </div>
                      } 
                      key={index}
                    >
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">Wisdom:</div>
                          <div className="whitespace-pre-line font-medium text-lg text-blue-600">
                            {wisdom.wisdom}
                          </div>
                        </div>
                        {wisdom.understanding && (
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Understanding:</div>
                            <div className="whitespace-pre-line bg-gray-50 p-3 rounded">
                              {wisdom.understanding}
                            </div>
                          </div>
                        )}
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            )}

            {/* Content Statistics */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-bold mb-3">Content Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-500">Total Yog Sections</div>
                  <div className="text-xl font-bold">
                    {selectedRecord.understandingYog?.length || 0}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-500">Total Meditation Practices</div>
                  <div className="text-xl font-bold">
                    {selectedRecord.meditationPractices?.length || 0}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-500">Total Wisdom Teachings</div>
                  <div className="text-xl font-bold">
                    {selectedRecord.wisdoms?.length || 0}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-500">Content Status</div>
                  <div className="text-xl font-bold">
                    <Badge
                      status={selectedRecord.isActive ? "success" : "error"}
                      text={selectedRecord.isActive ? "Active" : "Inactive"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default YogMayaMandirTable;