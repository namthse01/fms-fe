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
    const [orders, setOrders] = useState([]);
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
        console.log("Status:", filterWorking.status);
        if (!isFetching) {
            setOrders(ordersData.filter((x) => x.statusId == filterWorking.status));

        }
    }, [isFetching]);

    const handleFilterStatusChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setfilterWorking({ ...filterWorking, [name]: value });
    };


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

    console.log("Order:", orders.slice(10 * (active - 1), 10 * active));

    return (

        < React.Fragment >
            <Container fluid className="order-main-container">
                <Card body className="order-content-container">
                    <Row>
                        <Col>

                            <Card.Title>Danh s??ch ????n</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col xs={6}>
                            <Form.Label>T??m ki???m theo t??n:</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="search"
                                />
                                <Button>
                                    T??m ki???m
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label>Tr???ng Th??i:</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={filterWorking.status}
                                onChange={handleFilterStatusChange}
                            >
                                <option value="1">???? ti???p nh???n</option>
                                <option value="4">Ch??? kh???o s??t</option>
                                <option value="2">??ang kh???o s??t</option>
                                <option value="3">??ang th???c hi???n</option>
                                <option value="5">Ch??? thanh to??n</option>
                                <option value="6">Ho??n t???t ????n</option>
                                <option value="1002">H???y</option>
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
                                T???i l???i d??? li???u{" "}
                                <RefreshIcon />
                            </Button>
                        </Col>
                    </Row>

                    {/* Danh s??ch ????n */}
                    <Row className="mt-2">
                        {isFetching ? (<div className="loading">
                            <Spinner animation="border" />
                            <div className="loading-text">??ang t???i d??? li???u...</div>
                        </div>) : (
                            <Col className="table-container">
                                <Table bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>M?? ????n</th>
                                            <th>T??n kh??ch h??ng</th>
                                            <th>S??? ??i???n tho???i</th>
                                            <th>Tr???ng th??i ????n</th>
                                            <th>Th???i gian t???o</th>
                                            <th>Thay ?????i tr???ng th??i</th>
                                            <th>H??nh ?????ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders
                                            .slice(5 * (active - 1), 5 * active)
                                            .map((order, index) => {
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
                                                                ?????i tr???ng th??i ????n
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
                                                                            Xem chi ti???t
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
                                count={Math.ceil(orders.length / 5)}
                                handlePaginationClick={handlePaginationClick}
                                page={active}
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>

            {/*?????i tr???ng th??i ????n */}
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
                            <Card.Title>Tr???ng th??i ????n</Card.Title>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-end justify-content-between">
                        <Col>
                            <Form.Label>Tr???ng Th??i:</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={filterOrderchange.status}
                                onChange={handleOrderStatusChange}
                            >
                                <option value="1">???? ti???p nh???n</option>
                                <option value="4">??ang ch??? kh???o s??t</option>
                                <option value="2">??ang kh???o s??t</option>
                                <option value="3">??ang th???c hi???n</option>
                                <option value="5">Ch??? thanh to??n</option>
                                <option value="6">Ho??n t???t ????n</option>
                                <option value="1002">H???y</option>
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
                        X??c nh???n
                    </Button>
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    );
}

export default Order;