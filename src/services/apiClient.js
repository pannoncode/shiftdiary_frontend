import axios from "axios";

class ApiClient {
  constructor(url, data, dataId) {
    this.url = url;
    this.dataId = dataId;
    this.data = data;
    this.token = localStorage.getItem("token");
  }

  async getData() {
    try {
      const response = await axios.get(this.url, {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createData() {
    try {
      const response = await axios.post(this.url, this.data, {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async editData() {
    try {
      const response = await axios.patch(this.url + this.dataId, this.data, {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteData() {
    try {
      const response = await axios.delete(this.url + this.dataId, {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;
