import request from '@/utils/request';

export default {
  login (data) {
    return request({
      url: '',
      method: 'post',
      data
    });
  },
  banner () {
    return request({
      url: '/api/system/banner/list',
      method: 'get'
    });
  }
};
