const imgBaseUrl = "https://XXX";
export const handleImgUrl = {
  filters: {
    handleImgUrl(path, size) {
      if (path) {
        let format;
        if (path.indexOf("jpeg") !== -1) {
          format = ".jpeg";
        } else {
          format = ".png";
        }
        return (
          imgBaseUrl +
          path.slice(0, 1) +
          "/" +
          path.slice(1, 3) +
          "/" +
          path.slice(3) +
          format +
          "?imageMogr/format/webp/thumbnail/!" +
          size +
          "x" +
          size +
          "r/gravity/Center/crop/" +
          size +
          "x" +
          size +
          "/"
        );
      }
    }
  }
};
