import request from "@/utils/request";

export default {
  login(data) {
    return request({
      url: "",
      method: "post",
      data,
    });
  },
  banner() {
    return request({
      url: "/api/u/article/list?categoryId=&title=&pageIndex=1",
      method: "GET",
    });
  },
};
