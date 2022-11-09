import moment from "moment";

export const getAvatar = (name: string) => {
  return `https://api.multiavatar.com/${name}.png?apikey=${process.env.REACT_APP_AVATAR_KEY}`;
};

export const formatTime = (timestamp: Date) => {
  if (!timestamp) {
    return "";
  }

  return moment(timestamp).format("h:mma, MMM D");
};

export const getAge = (dateString: string) => {
  return moment().diff(dateString, "years");
};

export const getSenderName = (
  ownerId: string,
  userId: string,
  userData: any,
  otherUserData: any
) => {
  if (ownerId === userId) {
    return userData?.[0]?.name;
  }
  return otherUserData?.[0]?.name;
};

export const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};
