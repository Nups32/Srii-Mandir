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
  // Select,
  Descriptions,
  Timeline,
} from "antd";
// import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllBookChadhavas } from "@/utils/API";
// import { format } from "date-fns";
import dayjs from 'dayjs';

interface OfferingItem {
  name: string;
  price: number;
  qty: number;
  offeringId: string;
}

interface BookChadhava {
  _id: string;
  userId: { _id: string; username: string; email: string; mobile?: string };
  chadhavaId: { _id: string; name: string; description?: string };
  transactionId: string;
  order_id: string;
  method: string;
  paymentStatus: string;
  offering: OfferingItem[];
  type: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const BookChadhavaTable = () => {
  const [datasource, setDatasource] = useState<BookChadhava[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [chadhavaFilter, setChadhavaFilter] = useState<string>("all");
  //   const [statusFilter, setStatusFilter] = useState<string>("all");
  // const [uniqueChadhavas, setUniqueChadhavas] = useState<{_id: string, name: string}[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BookChadhava | null>(null);
  const [stats, setStats] = useState<any>();

  //   const navigate = useNavigate();

  const fetchBookChadhavas = async () => {
    setLoading(true);
    try {
      const response = await getAllBookChadhavas();
      if (response.data.status) {
        setDatasource(response.data.data);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log(error);
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookChadhavas();
  }, []);

  // Filter bookings based on search and filters
  const getFilteredBookings = () => {
    let filtered = datasource;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        item.userId?.username?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.userId?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.transactionId?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.order_id?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.chadhavaId?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // // Chadhava filter
    // if (chadhavaFilter !== "all") {
    //   filtered = filtered.filter(item => item.chadhavaId._id === chadhavaFilter);
    // }

    // // Status filter
    // if (statusFilter !== "all") {
    //   filtered = filtered.filter(item => item.status === statusFilter);
    // }

    return filtered;
  };

  const handleViewDetails = (record: BookChadhava) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const formatDate = (dateString: string) => {
    try {
      return dayjs(dateString).format('DD-MM-YYYY hh:mm A');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'confirmed':
        return 'success';
      case 'pending':
      case 'processing':
        return 'processing';
      case 'failed':
      case 'cancelled':
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getMethodColor = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'online':
      case 'card':
      case 'upi':
        return 'blue';
      case 'cash':
        return 'green';
      case 'cheque':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Booking ID
        </div>
      ),
      key: "bookingId",
      render: (record: BookChadhava) => (
        <div>
          <div className="font-medium">#{record.order_id || record._id.slice(-6)}</div>
          <div className="text-xs text-gray-500">
            {record.transactionId ? `TXN: ${record.transactionId}` : 'No TXN ID'}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          User
        </div>
      ),
      key: "user",
      render: (record: BookChadhava) => (
        <div>
          <div className="font-medium">{record.userId?.username || "Anonymous"}</div>
          <div className="text-xs text-gray-500">{record.userId?.email || "No email"}</div>
          {record.userId?.mobile && (
            <div className="text-xs text-gray-500">{record.userId.mobile}</div>
          )}
        </div>
      ),
      sorter: (a: BookChadhava, b: BookChadhava) =>
        (a.userId?.username || "").localeCompare(b.userId?.username || ""),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Chadhava
        </div>
      ),
      key: "chadhava",
      render: (record: BookChadhava) => (
        <div>
          <div className="font-medium">{record.chadhavaId?.name || "Unknown Chadhava"}</div>
          {record.type && (
            <Tag color="blue" className="text-xs mt-1">
              {record.type}
            </Tag>
          )}
        </div>
      ),
      sorter: (a: BookChadhava, b: BookChadhava) =>
        (a.chadhavaId?.name || "").localeCompare(b.chadhavaId?.name || ""),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Payment
        </div>
      ),
      key: "payment",
      render: (record: BookChadhava) => (
        <div className="space-y-1">
          <div className="font-bold text-lg">₹{record.amount?.toLocaleString('en-IN') || 0}</div>
          <div className="flex items-center space-x-2">
            <Tag color={getMethodColor(record.method)}>
              {record.method || 'Unknown'}
            </Tag>
            <Badge
              status={getStatusColor(record?.paymentStatus)}
              text={getStatusText(record?.paymentStatus)}
            />
          </div>
        </div>
      ),
      sorter: (a: BookChadhava, b: BookChadhava) => a.amount - b.amount,
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Offerings
        </div>
      ),
      key: "offerings",
      render: (record: BookChadhava) => (
        <div>
          {record.offering?.length > 0 ? (
            <div>
              <div className="font-medium">{record.offering.length} items</div>
              <div className="text-xs text-gray-500">
                Total: ₹{record.offering.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString('en-IN')}
              </div>
            </div>
          ) : (
            <Tag color="default">No offerings</Tag>
          )}
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Date
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      //   render: (text: string) => formatDate(text),
      render: (text: string) => dayjs(text).format('DD-MM-YYYY hh:mm A'),
      sorter: (a: BookChadhava, b: BookChadhava) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: (
        <div style={{ fontWeight: "bold", fontSize: "10px", color: "#a6a6a6" }}>
          Actions
        </div>
      ),
      key: "action",
      render: (_text: any, record: BookChadhava) => (
        <div className="flex flex-row items-center space-x-2">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            className="p-0"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const filteredBookings = getFilteredBookings();

  // Calculate statistics
  const totalAmount = filteredBookings.reduce((sum, item) => sum + item.amount, 0);
  const totalBookings = filteredBookings.length;
  const successBookings = filteredBookings.filter(item =>
    ['success', 'completed', 'confirmed'].includes(item.paymentStatus?.toLowerCase())
  ).length;
  const pendingBookings = filteredBookings.filter(item =>
    ['pending', 'processing'].includes(item.paymentStatus?.toLowerCase())
  ).length;

  return (
    <div className="">
      <Row className="m-2">
        {/* Manage Chadhava Bookings */}
        <Col
          xs={24}
          sm={10}
          md={10}
          xl={14}
          xxl={14}
          className="flex justify-start font-bold"
        >
          <h2 className="text-2xl">Manage Chadhava Bookings</h2>
        </Col>

        <Col xs={24} sm={14} md={14} xl={10} xxl={10} className="">
          <Row gutter={16} className="justify-end xs:m-2">
            {/* search */}
            <Col xs={24} sm={24} md={24} xl={24} xxl={24} className=''>
              <Input
                prefix={<SearchOutlined style={{ color: "#a6a6a6" }} />}
                size="large"
                className="w-full"
                placeholder="Search by user, email, TXN ID, order ID or chadhava..."
                allowClear
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Filters Row */}
      <Row className="m-2 mt-4" gutter={16}>
        {/* <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">Filter by Chadhava</div>
            <Select
              className="w-full"
              placeholder="Select Chadhava"
              value={chadhavaFilter}
              onChange={setChadhavaFilter}
              allowClear
              options={[
                { value: 'all', label: 'All Chadhavas' },
                ...uniqueChadhavas.map(chadhava => ({
                  value: chadhava._id,
                  label: chadhava.name
                }))
              ]}
            />
          </div>
        </Col> */}

        {/* <Col xs={24} sm={12} md={8} xl={6} xxl={6}>
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500">Filter by Status</div>
            <div className="flex flex-wrap gap-1">
              <Tag
                color={statusFilter === 'all' ? 'blue' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Tag>
              <Tag
                color={statusFilter === 'success' ? 'green' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('success')}
              >
                Success
              </Tag>
              <Tag
                color={statusFilter === 'pending' ? 'orange' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Tag>
              <Tag
                color={statusFilter === 'failed' ? 'red' : 'default'}
                className="cursor-pointer"
                onClick={() => setStatusFilter('failed')}
              >
                Failed
              </Tag>
            </div>
          </div>
        </Col> */}
      </Row>

      {/* Stats Row */}
      <Row className="m-2 mt-4" gutter={16}>
        <Col span={24}>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Bookings</div>
              <div className="text-lg font-bold">{stats?.totalBookings}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Total Amount</div>
              <div className="text-lg font-bold">₹{stats?.totalAmount?.toLocaleString('en-IN')}</div>
            </div>
            {/* <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Successful</div>
              <div className="text-lg font-bold text-green-600">{stats?.paymentStatusDistribution?.captured}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border">
              <div className="text-xs text-gray-500">Avg. Booking</div>
              <div className="text-lg font-bold">
                ₹{stats?.totalBookings > 0 ? Math.round(stats?.averageBooking)?.toLocaleString('en-IN') : 0}
              </div>
            </div> */}
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
                dataSource={filteredBookings}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50", "100"],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} bookings`,
                }}
              />
            </Spin>
          </Col>
        </Card>
      </Row>

      {/* View Details Modal */}
      <Modal
        title="Booking Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
        centered
      >
        {selectedRecord && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{selectedRecord.chadhavaId?.name}</h3>
                  <p className="text-gray-600">{selectedRecord.chadhavaId?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{selectedRecord.amount?.toLocaleString('en-IN')}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      status={getStatusColor(selectedRecord?.paymentStatus)}
                      text={getStatusText(selectedRecord?.paymentStatus)}
                    />
                    <Tag color={getMethodColor(selectedRecord.method)}>
                      {selectedRecord.method || 'Unknown'}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* User Information */}
            <Descriptions title="User Information" bordered column={2}>
              <Descriptions.Item label="Username">
                {selectedRecord.userId?.username || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedRecord.userId?.email || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                {selectedRecord.userId?.mobile || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                <code>{selectedRecord.userId?._id}</code>
              </Descriptions.Item>
            </Descriptions>

            {/* Booking Information */}
            <Descriptions title="Booking Information" bordered column={2}>
              <Descriptions.Item label="Order ID">
                {selectedRecord.order_id || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {selectedRecord.transactionId || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {selectedRecord.type || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Chadhava ID">
                <code>{selectedRecord.chadhavaId?._id}</code>
              </Descriptions.Item>
              <Descriptions.Item label="Booking Date">
                {formatDate(selectedRecord.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {formatDate(selectedRecord.updatedAt)}
              </Descriptions.Item>
            </Descriptions>

            {/* Offerings Section */}
            {selectedRecord.offering?.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3">Offerings</h4>
                <div className="border rounded">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <Row gutter={16}>
                      <Col span={10}>
                        <div className="font-bold">Item</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">Price</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">Qty</div>
                      </Col>
                      <Col span={6}>
                        <div className="font-bold">Total</div>
                      </Col>
                    </Row>
                  </div>
                  {selectedRecord.offering.map((item, index) => (
                    <div key={index} className="px-4 py-3 border-b last:border-b-0">
                      <Row gutter={16}>
                        <Col span={10}>
                          <div className="font-medium">{item.name}</div>
                          {item.offeringId && (
                            <div className="text-xs text-gray-500">
                              ID: <code>{item.offeringId}</code>
                            </div>
                          )}
                        </Col>
                        <Col span={4}>
                          <div>₹{item.price?.toLocaleString('en-IN')}</div>
                        </Col>
                        <Col span={4}>
                          <div>{item.qty}</div>
                        </Col>
                        <Col span={6}>
                          <div className="font-bold">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div className="bg-gray-50 px-4 py-3">
                    <Row gutter={16}>
                      <Col span={18} className="text-right">
                        <div className="font-bold">Subtotal:</div>
                      </Col>
                      <Col span={6}>
                        <div className="font-bold">
                          ₹{selectedRecord.offering.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString('en-IN')}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} className="mt-1">
                      <Col span={18} className="text-right">
                        <div className="font-bold">Booking Amount:</div>
                      </Col>
                      <Col span={6}>
                        <div className="font-bold">
                          ₹{selectedRecord.amount?.toLocaleString('en-IN')}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline for Status */}
            <div>
              <h4 className="text-lg font-bold mb-3">Booking Timeline</h4>
              <Timeline>
                <Timeline.Item color="green">
                  <div className="font-medium">Booking Created</div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(selectedRecord.createdAt)}
                  </div>
                  <div className="text-sm">Booking ID: {selectedRecord.order_id || selectedRecord._id.slice(-6)}</div>
                </Timeline.Item>
                {selectedRecord.transactionId && (
                  <Timeline.Item color="blue">
                    <div className="font-medium">Payment Processed</div>
                    <div className="text-gray-500 text-sm">
                      Transaction ID: {selectedRecord.transactionId}
                    </div>
                    <div className="text-sm">Method: {selectedRecord.method}</div>
                  </Timeline.Item>
                )}
                <Timeline.Item
                  color={
                    ['success', 'completed', 'confirmed'].includes(selectedRecord?.paymentStatus?.toLowerCase())
                      ? 'green'
                      : ['pending', 'processing'].includes(selectedRecord?.paymentStatus?.toLowerCase())
                        ? 'orange'
                        : 'red'
                  }
                >
                  <div className="font-medium">Status: {getStatusText(selectedRecord?.paymentStatus)}</div>
                  <div className="text-gray-500 text-sm">
                    Last Updated: {formatDate(selectedRecord.updatedAt)}
                  </div>
                </Timeline.Item>
              </Timeline>
            </div>

            {/* Raw Data (Optional - for debugging) */}
            <div className="border-t pt-4 mt-4">
              <details>
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                  View Raw Data
                </summary>
                <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(selectedRecord, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookChadhavaTable;