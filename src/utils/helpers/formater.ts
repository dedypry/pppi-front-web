import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));

  return `${size} ${sizes[i]}`;
}

export function dateFormat(date = "", format = "DD MMMM YYYY") {
  if (!date) return "-";

  return dayjs(date).format(format);
}

export function dateSchedule(date?: string) {
  const formater = "YYYY-MM-DD HH:mm";

  if (!date) return dayjs().format(formater);

  return dayjs(date).format(formater);
}

export function blogDate(date: string) {
  if (!date) return "-";

  return dayjs(date).format("MMMM DD, YYYY");
}

export function dateHuman(date: string) {
  if (!date) return "-";

  return dayjs(date).fromNow();
}

/** Format stored NIA (261616260190) for display (26.16.16.26.0190). */
export function formatNia(nia?: string | null): string {
  if (nia === null || nia === undefined || nia === "") return "";
  const raw = String(nia).replace(/\./g, "").trim();
  if (!raw) return "";
  if (raw.length >= 12) {
    return `${raw.slice(0, 2)}.${raw.slice(2, 4)}.${raw.slice(4, 6)}.${raw.slice(6, 8)}.${raw.slice(8, 12)}`;
  }
  if (raw.length >= 10) {
    return `${raw.slice(0, 2)}.${raw.slice(2, 4)}.${raw.slice(4, 6)}.${raw.slice(6)}`;
  }
  if (String(nia).includes(".")) return String(nia).trim();
  return raw;
}
