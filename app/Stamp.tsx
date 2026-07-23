import type { Status } from "@/lib/posts";

export function Stamp({ status }: { status: Status }) {
  return <span className={`stamp stamp--${status}`}>{status}</span>;
}
