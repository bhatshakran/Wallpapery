import axios from "axios";
const ImagesClient = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID 1FypSUlyZgXMpBWT65UFesID7M4A6iyJEzSyKiz_kTI`,
  },
});

export default ImagesClient;
