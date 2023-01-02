import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
    InputGroup,
    OverlayTrigger,
    Tooltip,
    Spinner
} from "react-bootstrap";

//Images
import defaultUserAvatar from "../../../../assets/images/login.png";

//Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// CSS
import './CustomerDetail.scss'
import { Avatar } from "@mui/material";

//API
import { useGetCustomerByPhoneNumbQuery } from "../../../../services/slices/customer/customerApi";

const CustomerDetail = () => {

    //local state
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    const customerPhoneNumb = useParams();

    //API
    const {
        data: customerDetailData = [],
        refetch: refetch,
        isFetching: isFetching,
        error,
    } = useGetCustomerByPhoneNumbQuery(customerPhoneNumb.customerPhone);

    useEffect(() => {
        if (!isFetching) {
            setCustomer(customerDetailData)
        }
    }, [isFetching]);


    return (
        <>
            <Container fluid >
                <Card className="customer-detail-container">
                    <Card className="customer-info-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        <ArrowBackIcon onClick={() => {
                                            navigate('/manager/customer');
                                        }} />
                                        Thông tin khách hàng
                                    </Card.Title>
                                </Col>
                            </Row>

                            {/* Tải dữ liệu khi có api */}

                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Họ và tên:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={customer[0].customerName} // tên khách hàng
                                                />
                                            </Form.Group>
                                        </Col>
                                        {/* <Col>
                                            <Form.Group>
                                                <Form.Label>Ngày sinh:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={'1/9/2024'} // thời gian
                                                />
                                            </Form.Group>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Số điện thoại:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue={customer[0].customerPhone} // Số điện thoại
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Số địa chỉ:</Form.Label>
                                                <Form.Control
                                                    readOnly
                                                    defaultValue="243/28/2 Lê văn Ngân" // Địa chỉ
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={3}>
                                    <Row>
                                        <Col>
                                            <Form.Label>Ảnh đại diện:</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <Avatar
                                                src={defaultUserAvatar}
                                                sx={{
                                                    width: "120px",
                                                    height: "120px",
                                                    border: "1px solid #000000",
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Card className="order-booking-container">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>Lịch sử dịch vụ</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Trạng Thái dịch vụ */}
                                    <InputGroup>
                                        <InputGroup.Text>
                                            Trạng Thái
                                        </InputGroup.Text>
                                        <Form.Control
                                            as="select"
                                            name="status"
                                        >
                                            <option value="">Toàn bộ</option>
                                            <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                                            <option value="Đang xử lí">Đang xử lí</option>
                                            <option value="Hủy">Hủy</option>
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    {/* Thứ tự */}
                                    <InputGroup>
                                        <InputGroup.Text>
                                            Thứ tự
                                        </InputGroup.Text>
                                        <Form.Control
                                            as="select"
                                            name="status"
                                        >
                                            <option value="">Mới đến cũ</option>
                                            <option value="Đã tiếp nhận">Cũ đến mới</option>
                                        </Form.Control>
                                    </InputGroup>
                                </Col>
                            </Row>

                            {/* Danh sách đơn */}
                            <Row className="mt-2">
                                <Col className="table-container">
                                    <Table bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Mã đơn</th>
                                                <th>Loại dịch vụ</th>
                                                <th>Thời gian hẹn</th>
                                                <th>Cập nhật lúc</th>
                                                <th>Trạng thái lịch hẹn</th>
                                                <th>Trạng thái dịch vụ</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>0001</td>
                                                <td>Sửa ghế gỗ</td>
                                                <td>13:24 11/10/2022</td>
                                                <td>15:30 11/10/2022</td>
                                                <td>Đã tiếp nhận</td>
                                                <td>Hoàn thành</td>
                                                <td>
                                                    <div className="action-button-container">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{ show: 200, hide: 100 }}
                                                            overlay={
                                                                <Tooltip
                                                                    className="customer-edit-button"
                                                                    id="edit-button-tooltip"
                                                                >
                                                                    Xem chi tiết
                                                                </Tooltip>
                                                            }
                                                        >

                                                            {/* navigate to order detail */}
                                                            <Button
                                                                onClick={() => {
                                                                    navigate('/manager/order-detail');
                                                                }}
                                                            >
                                                                <BorderColorIcon />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                </Card>
            </Container>
        </>
    );
}

export default CustomerDetail;