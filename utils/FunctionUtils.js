import moment from "moment/moment.js";
import "moment/locale/vi.js";

moment.locale("vi");

const parsingNumberToDateTime = number => {
  let articleDate = moment
    .utc(new Date(1000 * number))
    .utc()
    .format("YYYY-MM-DD HH:mm:ss");
  return moment(articleDate).fromNow();
};

export { parsingNumberToDateTime };
