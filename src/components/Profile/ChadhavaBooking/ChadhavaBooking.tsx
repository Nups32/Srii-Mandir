import { Badge, Button, Card, Col, Descriptions, message, Modal, Row, Spin, Table, Tag, Timeline } from "antd";
import { useEffect, useState } from "react";
import { getBookedChadhava } from "@/utils/API";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import ChadhavaEmptyState from "./ChadhavaEmptyState";

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

export default function ChadhavaHistory() {
  const [loading, setLoading] = useState(false);
  const [datasource, setDatasource] = useState<BookChadhava[]>([]);
  const [stats, setStats] = useState<any>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BookChadhava | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchBookChadhavas = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await getBookedChadhava(page, limit);
      if (response.data.status) {
        console.log("response.data.data", response.data.data);
        setDatasource(response.data.data);
        setStats(response.data.stats);
        setPagination({
          current: response.data.pagination.page,
          pageSize: response.data.pagination.limit,
          total: response.data.pagination.total,
        });
      }
    } catch (error) {
      console.log(error);
      message.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookChadhavas(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchBookChadhavas(pagination.current, pagination.pageSize);
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

  const handleViewDetails = (record: BookChadhava) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return dayjs(dateString).format('DD-MM-YYYY hh:mm A');
    } catch {
      return dateString;
    }
  };

  // // Calculate statistics
  // const totalAmount = datasource.reduce((sum, item) => sum + item.amount, 0);
  // const totalBookings = datasource.length;
  // const successBookings = datasource.filter(item =>
  //   ['success', 'completed', 'confirmed'].includes(item.paymentStatus?.toLowerCase())
  // ).length;
  // const pendingBookings = datasource.filter(item =>
  //   ['pending', 'processing'].includes(item.paymentStatus?.toLowerCase())
  // ).length;


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
              status={getStatusColor(record.paymentStatus)}
              text={getStatusText(record.paymentStatus)}
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

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Your Bookings
        </h1>
        <div>
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
                  <div className="text-lg font-bold">₹{stats?.totalSpent?.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border">
                  <div className="text-xs text-gray-500">Successful</div>
                  <div className="text-lg font-bold text-green-600">{stats?.paymentStatusDistribution?.captured || 0}</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm border">
                  <div className="text-xs text-gray-500">Avg. Booking</div>
                  <div className="text-lg font-bold">
                    ₹{stats?.totalBookings > 0 ? Math.round(stats?.averageBooking)?.toLocaleString('en-IN') : 0}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Card className="container mt-5!">
              <Col xs={24} sm={24} md={24} xl={24} xxl={24}>
                <Spin spinning={loading}>
                  {datasource.length > 0 ?
                    <Table
                      scroll={{ x: 1000 }}
                      columns={columns}
                      dataSource={datasource}
                      rowKey="_id"
                      pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50", "100"],
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total} bookings`,
                      }}
                      onChange={handleTableChange}
                    /> : <ChadhavaEmptyState />
                  }
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
                  {/* <Descriptions.Item label="Type">
                {selectedRecord.type || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Chadhava ID">
                <code>{selectedRecord.chadhavaId?._id}</code>
              </Descriptions.Item> */}
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
              </div>
            )}
          </Modal>
        </div>
      </div>
    </section>
  );
}
