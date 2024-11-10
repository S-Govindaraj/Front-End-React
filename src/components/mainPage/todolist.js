import { React, useState, useEffect } from "react";
import "./todolist.css";
import { io } from "socket.io-client";
import MyForm from "../addPage/addpage";
import todolistService from "../../api/todolist.service";
import ReactPaginate from "react-paginate";

function Todolist({onRefresh}) {
  const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

  const [todoLists, setTodoLists] = useState([]);

  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isTodoUpdated, setIsTodoUpdated] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL, {
      transports: ["websocket","polling"], // Adding transports in case WebSocket is unavailable
    });
    setSocket(socketInstance);

    socketInstance.on("receive_message", (newNotification) => {
      setNotification((prev) => [...prev, newNotification]);
    });

  }, [SOCKET_SERVER_URL]);


  // useEffect(() => {
  //   debugger
  //   const data = setTodoLists(todolistService.getTodoList());

  //   // getDaysBetween(dateRange);
  // }, []);

  useEffect(() => {
    todolistService.getTodoList()
      .then((res) => {
        debugger
        const projectData = res.data.data;
        setTodoLists(projectData ? projectData : []);
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, [isTodoUpdated]);

  // console.log('Response:' +JSON.stringify(todoLists))
  const displayedItems = todoLists?.slice(
    currentPage * 4,
    (currentPage + 1) * 4
  );

  const pageCount = Math.ceil(todoLists.length / 4);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  function onRefresh() {
    setIsTodoUpdated((prev) => !prev);
  }
  //   useEffect(() => {
  //     todolistService
  //       .getTodoList()
  //       .then((res) => {
  //         console.log("response  ----", res?.data);
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error while fetching todo list : ",
  //           error?.data?.response?.message
  //         );
  //       });
  //   }, [isTodoUpdated]);

  return (
    <div className="todo-list-container">
      <p>My Todo List</p>
      <div className="add-btn-container">
        <div>
          <button
            type="submit"
            className="btn btn-link"
            onClick={() => setIsAdd((prev) => !prev)}
          >
            {isAdd ? "Close" : "Add Todo"}
          </button>
        </div>
      </div>
      {isAdd && <MyForm onRefresh={onRefresh} />}
      <div className="list-container">
        <table className="table table-hover">
          <thead>
            <tr className="">
              <th className="col-3 bg-primary text-white">Title</th>
              <th className="col-6 bg-primary text-white">Description</th>
              <th className="col-3 bg-primary text-white">Image</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item, index) => {
              return (
                <tr className="items-card-container" key={index}>
                  <td>{item?.title}</td>
                  <td>{item?.description}</td>
                  <td>
                    {item?.image ? (
                      <img src={`http://localhost:3000/images/${item.image}`} alt="Item Image" className="image-icon"     style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
 
                      />
                    ) : (
                      <div className="no-image-icon">{item?.image}</div>
                    )}
                  </td>
                  {/* <div className="items-card-body">
                <div className="item-card-img">
                  {item?.image ? (
                    <image src="" className="image-icon" />
                  ) : (
                    <div className="no-image-icon">{item?.title?.[0]}</div>
                  )}
                </div>
                <div className="item-card-details">
                  <div className="item-title">
                    <h6>{item?.title}</h6>
                  </div>
                  <div className="item-description">
                    <h6>{item?.description}</h6>
                  </div>
                </div>
              </div> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center w-100">
          {" "}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}

export default Todolist;
