'use strict';

import $ from 'jquery';

class RestHelper {
  get(url) {
    return new Promise((success, error) => {
      $.ajax({
        url: url,
        dataType: 'json',
        success: success,
        error: error
      });
    });
  }

  post(url,data) {
    return new Promise((success, error) => {
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: success,
        error: error
      });
    });
  }

  patch(url,data) {
    return new Promise((success, error) => {
      $.ajax({
        url: url,
        type: 'PATCH',
        data: data,
        success: success,
        error: error
      });
    });
  }

  remove(url) {
    return new Promise((success, error) => {
      $.ajax({
        url: url,
        type: 'DELETE',
        success: success,
        error: error
      });
    });
  }
}

export default new RestHelper();
