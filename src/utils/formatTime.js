import moment from "moment";

export const formatMinutes = (minutes) => {
  const duration = moment.duration(minutes, "minutes");

  if (minutes < 60) {
    return `${minutes}min`;
  } else if (minutes < 1440) {
    return `${Math.floor(duration.asHours())}h`;
  } else {
    return `${Math.floor(duration.asDays())} d`;
  }
};
