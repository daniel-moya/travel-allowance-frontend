import moment from 'moment';

export function workday_count(start, end) {
  var first = start.clone().endOf("week"); // end of first week
  var last = end.clone().startOf("week"); // start of last week
  var days = (last.diff(first, "days") * 5) / 7; // this will always multiply of 7
  var wfirst = first.day() - start.day(); // check first week
  if (start.day() === 0) --wfirst; // -1 if start with sunday
  var wlast = end.day() - last.day(); // check last week
  if (end.day() === 6) --wlast; // -1 if end with saturday
  return wfirst + Math.floor(days) + wlast; // get the total
}

export function monthBussinessDays() {
  const next = moment()
    .add(1, "months")
    .month();


  const startDate = moment()
    .set("year", 2020)
    .set("month", next - 1)
    .set("date", 1)
    .isoWeekday(8);

  const endDate = moment()
    .set("year", 2020)
    .set("month", next)
    .set("date", 1)
    .isoWeekday(8);

  return workday_count(startDate, endDate);
}
