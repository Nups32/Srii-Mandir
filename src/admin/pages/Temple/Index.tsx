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
  Tooltip,
  Popconfirm,
} from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteTemple, getAllTemplesAdmin, toggleTempleStatus, } from "@/utils/API";

interface Temple {
  _id: string;
  name: string;
  place: string;
  purpose: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const TempleTable = () => {
  const [datasource, setDatasource] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Temple | null>(null);
  const navigate = useNavigate();

  const fetchTemples = async () => {
    setLoading(true);
    try {
      const response = await getAllTemplesAdmin();
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
    fetchTemples();
  }, []);

  // Filter temples based on search and filters
  const getFilteredTemples = () => {
    let filtered = datasource.filter(item => !item.isDeleted);

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.place?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.purpose?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      const statusValue = statusFilter === "active";
      filtered = filtered.filter((item) => item.isActive === statusValue);
    }

    return filtered;
  };

  const handleEditRedirect = (record: Temple) => {
    navigate(`/admin/temple/${record._id}/edit`);
  };

  const handleAddNew = () => {
    navigate("/admin/temple/add");
  };

  const handleViewDetails = (record: Temple) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteTemple(deleteId);
        message.success("Temple deleted successfully");
        fetchTemples();
      } catch (error) {
        message.error("Failed to delete temple");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: Temple) => {
    try {
      await toggleTempleStatus(record._id);
      message.success(`Temple ${record.isActive ? "deactivated" : "activated"} successfully`);
      fetchTemples();
    } catch (error) {
      message.error("Failed to update temple status");
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
    });
  };

  const getPurposeColor = (purpose: string) => {
    if (!purpose) return "default";
    
    const purposeLower = purpose.toLowerCase();
    if (purposeLower.includes('worship') || purposeLower.includes('prayer')) return 'blue';
    if (purposeLower.includes('meditation') || purposeLower.includes('peace')) return 'green';
    if (purposeLower.includes('festival') || purposeLower.includes('celebration')) return 'orange';
    if (purposeLower.includes('learning') || purposeLower.includes('education')) return 'purple';
    return 'cyan';
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return "-";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Temple Name
        </div>
      ),
      key: "name",
      render: (record: Temple) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500">
            ID: {record._id.slice(-8)}
          </div>
        </div>
      ),
      sorter: (a: Temple, b: Temple) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Location
        </div>
      ),
      dataIndex: "place",
      key: "place",
      render: (place: string) => (
        <Tag color="blue" className="font-medium">
          {place || "Not specified"}
        </Tag>
      ),
      sorter: (a: Temple, b: Temple) => (a.place || "").localeCompare(b.place || ""),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Purpose
        </div>
      ),
      dataIndex: "purpose",
      key: "purpose",
      render: (purpose: string) => (
        <div className="max-w-[200px]">
          <Tag color={getPurposeColor(purpose)}>
            {purpose ? truncateText(purpose, 30) : "Not specified"}
          </Tag>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: Temple) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge
              status={record.isActive ? "success" : "error"}
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Popconfirm
              title={`Are you sure you want to ${
                record.isActive ? "deactivate" : "activate"
              } this temple?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" type="link">
                {record.isActive ? "Deactivate" : "Activate"}
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Added On
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
      sorter: (a: Temple, b: Temple) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: Temple) => (
        <div className="flex flex-row items-center space-x-3">
          <Tooltip title="View Details">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
              className="p-0"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <AiFillEdit
              className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={() => handleEditRedirect(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <AiFillDelete
              className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => setDeleteId(record._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const filteredTemples = getFilteredTemples();

  // Calculate statistics
  const totalTemples = filteredTemples.length;
  const activeTemples = filteredTemples.filter((item) => item.isActive).length;
  
  const placeCounts = filteredTemples.reduce((acc, temple) => {
    acc[temple.place] = (acc[temple.place] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Temples */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Temples</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className="">
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name, place, or purpose..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add temple btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className="">
              <button 
                className="flex items-center justify-center py-3 btn-brand w-full"
                onClick={handleAddNew}
              >
                <RiAddBoxFill style={{ fontSize: "15px" }} />
                <div className="ml-1">Add Temple</div>
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">
              Filter by Status
            </div>
            <div className="flex flex-wrap gap-1">
              <Tag
                color={statusFilter === "all" ? "blue" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Tag>
              <Tag
                color={statusFilter === "active" ? "green" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("active")}
              >
                Active
              </Tag>
              <Tag
                color={statusFilter === "inactive" ? "orange" : "default"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("inactive")}
              >
                Inactive
              </Tag>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Temples</div>
              <div className="text-lg font-bold">{totalTemples}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Active Temples</div>
              <div className="text-lg font-bold text-green-600">
                {activeTemples}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Inactive Temples</div>
              <div className="text-lg font-bold text-orange-600">
                {totalTemples - activeTemples}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Unique Locations</div>
              <div className="text-lg font-bold">
                {Object.keys(placeCounts).length}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Location Distribution */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="bg-white p-4 rounded shadow-sm border">
            <div className="text-xs font-medium text-gray-500 mb-2">
              Location Distribution
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(placeCounts).map(([place, count]) => (
                <div
                  key={place}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded"
                >
                  <Tag color="blue">{place || "Unknown"}</Tag>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
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
                dataSource={filteredTemples}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} temples`,
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
          <p>Are you sure you want to delete this temple?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action will mark the temple as deleted. You can restore it later if needed.
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
        title="Temple Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={600}
        centered
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Temple Header */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{selectedRecord.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      status={selectedRecord.isActive ? "success" : "error"}
                      text={selectedRecord.isActive ? "Active" : "Inactive"}
                    />
                    {selectedRecord.isDeleted && (
                      <Tag color="red">Deleted</Tag>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Temple ID
                  </div>
                  <div className="font-medium">
                    {selectedRecord._id.slice(-8)}
                  </div>
                </div>
              </div>
            </div>

            {/* Temple Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Location</div>
                <div className="font-medium">
                  <Tag color="blue">{selectedRecord.place}</Tag>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="font-medium">
                  <Badge
                    status={selectedRecord.isActive ? "success" : "error"}
                    text={selectedRecord.isActive ? "Active" : "Inactive"}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Created On</div>
                <div className="font-medium">
                  {formatDate(selectedRecord.createdAt)}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Last Updated</div>
                <div className="font-medium">
                  {formatDate(selectedRecord.updatedAt)}
                </div>
              </div>
            </div>

            {/* Purpose Details */}
            <div>
              <h4 className="text-lg font-bold mb-3">Purpose</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="whitespace-pre-line">
                  {selectedRecord.purpose || "No purpose details provided"}
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-bold mb-3">Status Information</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge
                      status={selectedRecord.isActive ? "success" : "error"}
                      text={selectedRecord.isActive ? "Active" : "Inactive"}
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedRecord.isActive
                        ? "This temple is visible to visitors"
                        : "This temple is hidden from visitors"}
                    </div>
                  </div>
                  <Button
                    size="small"
                    onClick={() => handleStatusChange(selectedRecord)}
                  >
                    {selectedRecord.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
                {selectedRecord.isDeleted && (
                  <div className="bg-red-50 p-3 rounded border border-red-200">
                    <div className="text-red-700 text-sm">
                      ⚠️ This temple has been marked as deleted
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-bold mb-3">Quick Actions</h4>
              <div className="flex space-x-2">
                <Button
                  type="primary"
                  icon={<AiFillEdit />}
                  onClick={() => {
                    setViewModalVisible(false);
                    handleEditRedirect(selectedRecord);
                  }}
                >
                  Edit Temple
                </Button>
                <Button
                  danger
                  icon={<AiFillDelete />}
                  onClick={() => {
                    setViewModalVisible(false);
                    setDeleteId(selectedRecord._id);
                  }}
                >
                  Delete Temple
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TempleTable;