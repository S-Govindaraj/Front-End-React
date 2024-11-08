import axios from "axios";
const API_SERVER_URL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_TOKEN;

class ToDoListAPI {
  getTodoList() {
    return axios.get(API_SERVER_URL + "/todos", {
      headers: {
        session: apiKey,
        header: { Authorization: "Bearer " + apiKey },
      },
    });
  }

  addTodoList(data) {
    const payLoad = { ...data };
    return axios.post(API_SERVER_URL + "/todos", payLoad, {
      headers: {
        session: apiKey,
        header: { Authorization: "Bearer " + apiKey },
      },
    });
  }
}

export default new ToDoListAPI();
