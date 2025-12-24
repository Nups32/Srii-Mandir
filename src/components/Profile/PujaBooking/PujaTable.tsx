/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookedPuja } from "@/utils/API";
import {
  Col,
  Descriptions,
  Modal,
  Row,
  message,
  Table,
  Space,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import type { BookPuja } from "@/admin/pages/BookPuja/Index";

export default function PujaTable({
  onReview,
}: {
  onReview: (b: BookPuja) => void;
}) {
  const [booking, setBooking] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<BookPuja | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchBookedPooja = async (page = 1, limit = 10) => {
    try {
      const response: any = await getBookedPuja(page, limit);
      // console.log("res from fetchBookedPooja", response.data.data);
      if (response?.data?.status) {
        setBooking(response.data.data);
        setPagination({
          current: response.data.pagination.page,
          pageSize: response.data.pagination.limit,
          total: response.data.pagination.total,
        });
      } else {
        message.error("failed to fetch poojas");
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookedPooja(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchBookedPooja(pagination.current, pagination.pageSize);
  };

  const handleViewDetails = (record: BookPuja) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Puja Name",
      dataIndex: ["pujaId", "name"],
      key: "pujaName",
      render: (text: string) => (
        <span className="font-medium text-gray-900">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Selected Package",
      key: "package",
      render: (_: any, record: any) => (
        <span>
          {record.pujaPackage?.packageId?.title} –{" "}
          <span className="font-semibold">₹{record.pujaPackage?.price}</span>
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            className="text-green-600!"
            onClick={() => onReview(record)}
          >
            Review
          </Button>
          <Button
            type="link"
            className="text-blue-600!"
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={booking}
        rowKey={(record: any) => record._id}
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
        bordered
        className="rounded-lg"
        scroll={{ x: true }}
      />

      <Modal
        title="Puja Booking Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={900}
        centered
      >
        {selectedRecord && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Header Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">
                    {selectedRecord.pujaPackage?.packageId?.title}
                  </h3>
                  <p className="text-gray-600">{selectedRecord.pujaId?.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{selectedRecord.amount?.toLocaleString("en-IN")}
                  </div>
                  {/* <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      status={getPaymentStatusColor(selectedRecord.paymentStatus)} 
                      text={getPaymentStatusText(selectedRecord.paymentStatus)}
                    />
                    <Tag color={getMethodColor(selectedRecord.method)}>
                      {selectedRecord.method || 'Unknown'}
                    </Tag>
                  </div> */}
                </div>
              </div>
            </div>

            {/* User Information */}
            <Descriptions title="User Information" bordered column={2}>
              <Descriptions.Item label="Name" span={2}>
                <div className="font-medium">
                  {selectedRecord?.userId?.username || "N/A"}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedRecord.userId?.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedRecord.userId?.mobile || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="User ID">
                <code className="text-xs">{selectedRecord.userId?._id}</code>
              </Descriptions.Item>
            </Descriptions>

            {/* Booking Information */}
            <Descriptions title="Booking Information" bordered column={2}>
              <Descriptions.Item label="Order ID">
                {selectedRecord.order_id || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {selectedRecord.transactionId || "N/A"}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Type">
                {selectedRecord.type || 'N/A'}
              </Descriptions.Item> */}
              <Descriptions.Item label="Puja Package ID">
                <code className="text-xs">
                  {selectedRecord.pujaPackage?.packageId?._id}
                </code>
              </Descriptions.Item>
              <Descriptions.Item label="Package Details">
                {selectedRecord.pujaPackage?.person || 1} person(s) • ₹
                {selectedRecord.pujaPackage?.price?.toLocaleString("en-IN") ||
                  0}
              </Descriptions.Item>
              <Descriptions.Item label="Booking Date">
                {formatDate(selectedRecord.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {formatDate(selectedRecord.updatedAt)}
              </Descriptions.Item>
            </Descriptions>

            {/* Participant Details */}
            {selectedRecord.pujaParticipateMemberDetail && (
              <div>
                <h4 className="text-lg font-bold mb-3">Participant Details</h4>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="WhatsApp Number">
                    {selectedRecord.pujaParticipateMemberDetail
                      .whatsappNumber || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Calling Number">
                    {selectedRecord.pujaParticipateMemberDetail.callingNumber ||
                      "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gotra">
                    {selectedRecord.pujaParticipateMemberDetail.gotra || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Members" span={3}>
                    {selectedRecord.pujaParticipateMemberDetail.members
                      ?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {selectedRecord.pujaParticipateMemberDetail.members.map(
                          (member, index) => (
                            <li key={index}>{member}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </Descriptions.Item>
                </Descriptions>

                {/* Address Details */}
                {selectedRecord.pujaParticipateMemberDetail.address && (
                  <>
                    <h5 className="font-bold mt-4 mb-2">Address</h5>
                    <Descriptions bordered column={2} size="small">
                      <Descriptions.Item label="House">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .house || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Road">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .road || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Landmark">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .landMark || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="City">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .city || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="State">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .state || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Pincode">
                        {selectedRecord.pujaParticipateMemberDetail.address
                          .pincode || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </>
                )}
              </div>
            )}

            {/* Offerings Section */}
            {selectedRecord.offering?.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-3">Offerings</h4>
                <div className="border rounded">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <Row gutter={16}>
                      <Col span={12}>
                        <div className="font-bold">Item</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">Price</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">Qty</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">Total</div>
                      </Col>
                    </Row>
                  </div>
                  {selectedRecord.offering.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 border-b last:border-b-0"
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <div className="font-medium">{item.name}</div>
                          {item.offeringId && (
                            <div className="text-xs text-gray-500">
                              ID: <code>{item.offeringId}</code>
                            </div>
                          )}
                        </Col>
                        <Col span={4}>
                          <div>₹{item.price?.toLocaleString("en-IN")}</div>
                        </Col>
                        <Col span={4}>
                          <div>{item.qty}</div>
                        </Col>
                        <Col span={4}>
                          <div className="font-bold">
                            ₹{(item.price * item.qty).toLocaleString("en-IN")}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div className="bg-gray-50 px-4 py-3">
                    <Row gutter={16}>
                      <Col span={16} className="text-right">
                        <div className="font-bold">Offerings Subtotal:</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">
                          ₹
                          {selectedRecord.offering
                            .reduce(
                              (sum, item) => sum + item.price * item.qty,
                              0
                            )
                            .toLocaleString("en-IN")}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} className="mt-2">
                      <Col span={16} className="text-right">
                        <div className="font-bold">Package Amount:</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold">
                          ₹
                          {selectedRecord.pujaPackage?.price?.toLocaleString(
                            "en-IN"
                          ) || 0}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16} className="mt-2 pt-2 border-t">
                      <Col span={16} className="text-right">
                        <div className="font-bold text-lg">Total Amount:</div>
                      </Col>
                      <Col span={4}>
                        <div className="font-bold text-lg text-green-600">
                          ₹{selectedRecord.amount?.toLocaleString("en-IN")}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
