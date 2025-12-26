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
  Image,
  Tooltip,
  Popconfirm,
  Switch,
} from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { 
  deletePurohit, 
  getAllPurohits, 
  updatePurohitStatus,
  updatePurohitOrder 
} from "@/utils/API";

interface Purohit {
  _id: string;
  name: string;
  experience: string;
  location: string;
  image: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const PurohitTable = () => {
  const [datasource, setDatasource] = useState<Purohit[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Purohit | null>(null);
  const [reordering, setReordering] = useState(false);
  const navigate = useNavigate();

  const fetchPurohits = async () => {
    setLoading(true);
    try {
      const response = await getAllPurohits();
      if (response.data.status) {
        // Sort by orderIndex
        const sortedData = response.data.data.sort((a: Purohit, b: Purohit) => 
          a.orderIndex - b.orderIndex
        );
        setDatasource(sortedData);
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurohits();
  }, []);

  // Filter purohits based on search and filters
  const getFilteredPurohits = () => {
    let filtered = datasource;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchText.toLowerCase()) ||
          item.experience?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      const statusValue = statusFilter === "active";
      filtered = filtered.filter((item) => item.isActive === statusValue);
    }

    return filtered;
  };

  const handleEditRedirect = (record: Purohit) => {
    navigate(`/admin/purohit/${record._id}/edit`);
  };

  const handleAddNew = () => {
    navigate("/admin/purohit/add");
  };

  const handleViewDetails = (record: Purohit) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deletePurohit(deleteId);
        message.success("Purohit deleted successfully");
        fetchPurohits();
      } catch (error) {
        message.error("Failed to delete purohit");
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleStatusChange = async (record: Purohit) => {
    try {
      await updatePurohitStatus(record._id, {
        isActive: !record.isActive,
      });
      message.success(
        `Purohit ${record.isActive ? "deactivated" : "activated"} successfully`
      );
      fetchPurohits();
    } catch (error) {
      message.error("Failed to update purohit status");
    }
  };

  const handleReorder = async (dragIndex: number, dropIndex: number) => {
    if (dragIndex === dropIndex) return;

    const reorderedData = [...datasource];
    const [draggedItem] = reorderedData.splice(dragIndex, 1);
    reorderedData.splice(dropIndex, 0, draggedItem);

    // Update orderIndex based on new position
    const updatedData = reorderedData.map((item, index) => ({
      ...item,
      orderIndex: index + 1
    }));

    setDatasource(updatedData);
    setReordering(true);

    try {
      // Send all order updates to backend
      const orderUpdates = updatedData.map(item => ({
        id: item._id,
        orderIndex: item.orderIndex
      }));
      
      await updatePurohitOrder(orderUpdates);
      message.success("Order updated successfully");
    } catch (error) {
      message.error("Failed to update order");
      fetchPurohits(); // Revert on error
    } finally {
      setReordering(false);
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

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "green" : "red";
  };

  const getExperienceLevel = (experience: string) => {
    if (!experience) return "default";
    
    const years = parseInt(experience.replace(/\D/g, ''));
    if (years >= 20) return "gold";
    if (years >= 10) return "blue";
    if (years >= 5) return "green";
    return "orange";
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Order
        </div>
      ),
      key: "order",
      width: 80,
      render: (_: any, record: Purohit) => (
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="font-bold">{record.orderIndex}</span>
          </div>
        </div>
      ),
      sorter: (a: Purohit, b: Purohit) => a.orderIndex - b.orderIndex,
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Purohit
        </div>
      ),
      key: "purohit",
      render: (record: Purohit) => (
        <div className="flex items-center space-x-3">
          <Image
            width={50}
            height={50}
            src={record.image && `${import.meta.env.VITE_APP_Image_URL}/purohit/${record.image}`}
            alt={record.name}
            className="rounded-full object-cover"
            fallback="https://via.placeholder.com/50"
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">{record.location}</div>
          </div>
        </div>
      ),
      sorter: (a: Purohit, b: Purohit) => a.name.localeCompare(b.name),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Experience
        </div>
      ),
      dataIndex: "experience",
      key: "experience",
      render: (experience: string) => (
        <Tag color={getExperienceLevel(experience)} className="font-medium">
          {experience || "Not specified"}
        </Tag>
      ),
      sorter: (a: Purohit, b: Purohit) => {
        const aYears = parseInt(a.experience?.replace(/\D/g, '') || '0');
        const bYears = parseInt(b.experience?.replace(/\D/g, '') || '0');
        return aYears - bYears;
      },
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Status
        </div>
      ),
      key: "status",
      render: (record: Purohit) => (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge
              status={record.isActive ? "success" : "error"}
              text={record.isActive ? "Active" : "Inactive"}
            />
            <Popconfirm
              title={`Are you sure you want to ${
                record.isActive ? "deactivate" : "activate"
              } this purohit?`}
              onConfirm={() => handleStatusChange(record)}
              okText="Yes"
              cancelText="No"
            >
              <Switch
                size="small"
                checked={record.isActive}
                onChange={() => {}}
              />
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
      sorter: (a: Purohit, b: Purohit) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: Purohit) => (
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

  const filteredPurohits = getFilteredPurohits();

  // Calculate statistics
  const totalPurohits = filteredPurohits.length;
  const activePurohits = filteredPurohits.filter((item) => item.isActive).length;
  const averageExperience = filteredPurohits.length > 0
    ? filteredPurohits.reduce((sum, item) => {
        const years = parseInt(item.experience?.replace(/\D/g, '') || '0');
        return sum + years;
      }, 0) / filteredPurohits.length
    : 0;

  const locationCounts = filteredPurohits.reduce((acc, purohit) => {
    acc[purohit.location] = (acc[purohit.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Reorder functionality - simple drag and drop
  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      handleReorder(dragIndex, dropIndex);
    }
  };

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Purohits */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Purohits</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={14} sm={16} md={16} xl={16} xxl={16} className="">
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by name, location, or experience..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>

            {/* add purohit btn */}
            <Col xs={10} sm={8} md={8} xl={8} xxl={8} className="">
              <button 
                className="flex items-center justify-center py-3 btn-brand w-full"
                onClick={handleAddNew}
              >
                <RiAddBoxFill style={{ fontSize: "15px" }} />
                <div className="ml-1">Add Purohit</div>
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

        {/* Ordering Info */}
        <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">
              Drag & Drop to Reorder
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <SortAscendingOutlined className="mr-2" />
              <span>Drag purohits to change display order</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Purohits</div>
              <div className="text-lg font-bold">{totalPurohits}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Active Purohits</div>
              <div className="text-lg font-bold text-green-600">
                {activePurohits}
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Avg. Experience</div>
              <div className="text-lg font-bold">
                {averageExperience.toFixed(1)} years
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Locations</div>
              <div className="text-lg font-bold">
                {Object.keys(locationCounts).length}
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
              {Object.entries(locationCounts).map(([location, count]) => (
                <div
                  key={location}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded"
                >
                  <Tag color="blue">{location}</Tag>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Purohit Table */}
      <Row>
        <Card className="container mt-5!">
          <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
            <Spin spinning={loading || reordering}>
              <div className="relative">
                {/* Reorder Instructions */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center text-sm text-blue-700">
                    <SortAscendingOutlined className="mr-2" />
                    <span>Drag and drop rows to reorder purohits. Order determines display priority.</span>
                  </div>
                </div>

                {/* Table with drag and drop */}
                <Table
                  scroll={{ x: 1000 }}
                  columns={columns}
                  dataSource={filteredPurohits}
                  rowKey="_id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50", "100"],
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} purohits`,
                  }}
                  onRow={(index: any) => ({
                    draggable: true,
                    onDragStart: (e) => onDragStart(e, index || 0),
                    onDragOver: onDragOver,
                    onDrop: (e) => onDrop(e, index || 0),
                    style: { cursor: 'move' }
                  })}
                />
              </div>
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
          <p>Are you sure you want to delete this purohit?</p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone. All purohit data including image will be permanently deleted.
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
        title="Purohit Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={600}
        centered
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Purohit Header */}
            <div className="flex items-center space-x-4">
              <Image
                width={80}
                height={80}
                src={selectedRecord.image && `${import.meta.env.VITE_APP_Image_URL}/purohit/${selectedRecord.image}`}
                alt={selectedRecord.name}
                className="rounded-full object-cover"
                fallback="https://via.placeholder.com/80"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedRecord.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Tag color={getStatusColor(selectedRecord.isActive)}>
                    {selectedRecord.isActive ? "Active" : "Inactive"}
                  </Tag>
                  <Tag color={getExperienceLevel(selectedRecord.experience)}>
                    Experience: {selectedRecord.experience}
                  </Tag>
                </div>
              </div>
            </div>

            {/* Purohit Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Location</div>
                <div className="font-medium">
                  <Tag color="blue">{selectedRecord.location}</Tag>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Display Order</div>
                <div className="font-medium text-lg">
                  #{selectedRecord.orderIndex}
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

            {/* Experience Details */}
            <div>
              <h4 className="text-lg font-bold mb-3">Experience Details</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="whitespace-pre-line">
                  {selectedRecord.experience || "No experience details provided"}
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-bold mb-3">Status Information</h4>
              <div className="flex items-center justify-between">
                <div>
                  <Badge
                    status={selectedRecord.isActive ? "success" : "error"}
                    text={selectedRecord.isActive ? "Active" : "Inactive"}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {selectedRecord.isActive
                      ? "This purohit is visible to visitors"
                      : "This purohit is hidden from visitors"}
                  </div>
                </div>
                <Switch
                  checked={selectedRecord.isActive}
                  onChange={() => handleStatusChange(selectedRecord)}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PurohitTable;