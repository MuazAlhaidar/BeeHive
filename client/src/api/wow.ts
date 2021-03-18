function axiosGet(url: string, _data: any) {
        let baseurl = "http://localhost:4200/api/events/";
  return require("axios").get(baseurl + url, { params: _data });
}

axiosGet("getall", {id:1})
export{axiosGet}
