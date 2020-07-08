import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import {
  Message,
  Loading
} from 'element-ui';

Vue.use(ElementUi)
Vue.use(VueAxios, axios)
export default ({
  getAxios: function(apiurl, callback) {
    const loading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    Vue.axios.get(apiurl).then((response) => {
      // console.log(response.data)
      if (response.data.status) {
        callback(response)
      } else {
        Message.error(response.data.msg);
				callback(response)
      }
      loading.close();
    }).catch((response) => {
      // console.log(response)
      loading.close();
    })
  },
	postAxios: function(apiurl, data, callback) {
	  const loading = Loading.service({
	    lock: true,
	    text: '加载中...',
	    spinner: 'el-icon-loading',
	    background: 'rgba(0, 0, 0, 0.7)'
	  });
	  axios.post(apiurl, data)
	    .then(function(response) {
	      // console.log(response);
	      if (response.data.status) {
	        callback(response)
	      } else {
	        Message.error(response.data.msg);
	      }
	      loading.close();
	    })
	    .catch(function(error) {
	      // console.log(error);
	      loading.close();
	    });
	},
  deleteAxios: function(apiurl, data, callback) {
    const loading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    Vue.axios.delete(apiurl, data).then((response) => {
      // console.log(response.data)
      if (response.data.status) {
        callback(response)
      } else {
        Message.error(response.data.msg);
      }
      loading.close();
    }).catch((response) => {
      // console.log(response)
      loading.close();
    })
  },
  putAxios: function(apiurl, data, callback) {
    const loading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    axios.put(apiurl, data)
      .then(function(response) {
        // console.log(response);
        if (response.data.status) {
          callback(response)
        } else {
          Message.error(response.data.msg);
        }
        loading.close();
      })
      .catch(function(error) {
        // console.log(error);
        loading.close();
      });
  },
  download(name, url) {
    var xmlResquest = new XMLHttpRequest();
    xmlResquest.open("GET", url, true);
    xmlResquest.setRequestHeader("Content-type", "application/json");
    xmlResquest.responseType = "blob";
    xmlResquest.onload = function(oEvent) {
      var content = xmlResquest.response;
      var elink = document.createElement('a');
      elink.download = name + ".xlsx";
      elink.style.display = 'none';
      var blob = new Blob([content]);
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    };
    xmlResquest.send();
  }
})
