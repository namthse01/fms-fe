import React, { useEffect, useState } from "react";
import './Order.scss';
//React-bootstrap
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Row,
    Table,
    Tooltip,
    Spinner,
    Modal
} from "react-bootstrap";

//Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router-dom";

//Api
import { usePostChangeWorkingStatusMutation, useGetAllOrdersQuery } from "../../../../services/slices/order/orderApi";


import CustomPagination from "../../../customPagination/CustomPagination";

//Momentjs
import moment from "moment";

const Order = () => {

    // local state
    const [active, setActive] = useState(1);
    const [Orders, setOrders] = useState([]);
    const [filterWorking, setfilterWorking] = useState({
        status: "1",
    });

    //pageination

    const handlePaginationClick = (number) => {
        refetch();

        setActive(number);
    };

    const {
        data: ordersData = [],
        refetch,
        isFetching,
    } = useGetAllOrdersQuery();

    useEffect(() => {
        if (!isFetching) {
            setOrders(ordersData);
        }
    }, [isFetching]);

    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterWorking({ ...filterWorking, [name]: value });
    };

    //Status
    const filterStatus = (status) => {
        if (status === 1) {
            return "1";
        }

        if (status === 2) {
            return "2";
        }

        if (status === 3) {
            return "3";
        }

        if (status === 4) {
            return "4";
        }

        if (status === 5) {
            return "5";
        }

        if (status === 6) {
            return "6";
        }

        if (status === 7) {
            return "7";
        }

        return "";
    }

    const navigate = useNavigate();

    //Working Status
    const [showChangeStatus, setShowChangeStatus] = useState(false);
    const [orderWorkingStatus] = usePostChangeWorkingStatusMutation();
    const [filterOrderchange, setfilterOrderChange] = useState({
        status: "1",
        page: 1,
    });

    const [orderChangeData, setOrderChangeData] = useState({
        orderId: "",
        workingStatus: "",
    })

    const changeWorkingStatus = async () => {
        try {
            await orderWorkingStatus(orderChangeData)
            refetch()
        } catch (error) {
            console.log("Show error: ", error)
        }
    }
    const handleOrderStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setfilterOrderChange({ ...filterOrderchange, [name]: value });
        setOrderChangeData({ ...orderChangeData, workingStatus: value })
    };


    return (

        < React.Fragment >
            <Container fluid className="order-main-container">
                <Card body className="order-content-container">
                    <Row>
                        <Col>

                            <Card.Title>Danh sách đơn</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>Tìm kiếm theo tên:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="search"
                                />
                                <Button>
                                    Tìm kiếm
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label>Trạng Thái:</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={filterWorking.status}
                                onChange={handleFilterStatusChange}
                            >
                                <option value="1">Đã tiếp nhận</option>
                                <option value="4">Chờ khảo sát</option>
                                <option value="2">Đang khảo sát</option>
                                <option value="3">Đang thực hiện</option>
                                <option value="5">Chờ thanh toán</option>
                                <option value="6">Hoàn tất đơn</option>
                                <option value="1002">Hủy</option>
                            </Form.Control>
                        </Col>
                        <Col xs={2}>
                            <Button
                                // disabled={isFetching}
                                style={{ width: "100%" }}
                                variant="dark"
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                Tải lại dữ liệu{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh sách đơn */}
                    <Row className="mt-2">
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">Đang tải dữ liệu...</div>
                        </div>) : (
                            <Col className="table-container">
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Mã đơn</th>
                                            <th>Tên khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Trạng thái đơn</th>
                                            <th>Thời gian tạo</th>
                                            <th>Thay đổi trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Orders
                                            .slice(10 * (active - 1), 10 * active)
                                            .map((order, index) => {
                                                if (filterStatus(order.statusId) === filterWorking.status) {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{order.orderId}</td>
                                                            <td>{order.customerName}</td>
                                                            <td>{order.customerPhone}</td>
                                                            <td>{order.statusName}</td>
                                                            <td>
                                                                {moment(order.createAt).format("MM/DD/YYYY")}
                                                            </td>
                                                            <td>
                                                                <Button onClick={() => {
                                                                    setShowChangeStatus(true);
                                                                    setOrderChangeData({ ...orderChangeData, orderId: order.orderId })
                                                                }} >
                                                                    Đổi trạng thái đơn
                                                                </Button>
                                                            </td>
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
                                                                                if (order.statusId === 1) {
                                                                                    navigate('/manager/order-detail/' + order.orderId);
                                                                                } else if (order.statusId === 3) {
                                                                                    navigate('/manager/order-approved/' + order.orderId);
                                                                                }
                                                                                // else if(order.workingStatusId===6){
                                                                                //     navigate('/manager/order-detail/' + order.orderId);
                                                                                // }

                                                                            }}
                                                                        >
                                                                            <BorderColorIcon />
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        )}
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <CustomPagination
                                count={Math.ceil(Orders.length / 10)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/*Đổi trạng thái đơn */}
            < Modal
                show={showChangeStatus}
                onHide={() => {
                    setShowChangeStatus(false);
                }}
                centered
                dialogClassName="change-status-modal"
            >
                <Modal.Body>
                    <Row>
                        <Col>
                            <Card.Title>Trạng thái đơn</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Label>Trạng Thái:</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={filterOrderchange.status}
                                onChange={handleOrderStatusChange}
                            >
                                <option value="1">Đã tiếp nhận</option>
                                <option value="4">Đang chờ khảo sát</option>
                                <option value="2">Đang khảo sát</option>
                                <option value="3">Đang thực hiện</option>
                                <option value="5">Chờ thanh toán</option>
                                <option value="6">Hoàn tất đơn</option>
                                <option value="1002">Hủy</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowChangeStatus(false);

                            changeWorkingStatus();
                        }}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    );
}

export default Order;