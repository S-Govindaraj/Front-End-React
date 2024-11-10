import axios from "axios";
const API_SERVER_URL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_TOKEN;

class ToDoListAPI {
  getTodoList() {
    console.log('Token: ' +apiKey)
    return axios.get(API_SERVER_URL + `/todos?isCompleted=0`, {
      headers: {
        session: apiKey,
        Authorization:   "Bearer " + apiKey ,
      },
    });
  }

  addTodoList(data) {
    debugger
    return axios.post(API_SERVER_URL + "/todos", data, {
      headers: {
        session: apiKey,
        Authorization:   "Bearer " + apiKey ,
      },
    });
  }
}

export default new ToDoListAPI();
