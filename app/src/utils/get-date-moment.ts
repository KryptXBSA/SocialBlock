import moment from "moment"
export function getDate(date: any) {
    return moment(new Date(parseInt(date) * 1000).toUTCString()).fromNow()
}