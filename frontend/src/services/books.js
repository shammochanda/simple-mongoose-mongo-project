import axios from "axios";
import http from "../http-common";

class BookDataService {
  getAll(title = "", author = "", genre = "", page = 0) {
    return http.get(`/?page=${page}&title=${title}&author=${author}&genre=${genre}`);
  }

  createBook(data1) {
    let axiosConfig = {
      headers: {
          'Content-Type' : 'application/json; charset=UTF-8',
          'Accept': 'Token',
          "Access-Control-Allow-Origin": "*",
    
      }
    };
    return axios({
      method: 'post',
      url: "http://localhost:5000/api/v1/books/",
      headers: axiosConfig,
      data: data1
    })
  }

}

export default new BookDataService();