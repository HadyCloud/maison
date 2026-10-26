import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/format";
import { weekRows } from "@/lib/hours";

/** Consecutive days with the same hours share one row: "Mar–Sam". */
function groupRows(rows: { day: string; value: string; weekday: number }[]) {
  const short = (d: string) => d.slice(0, 3);
  const groups: { day: string; value: string; weekday: number }[] = [];
  let start = 0;
  for (let i = 1; i <= rows.length; i++) {
    const first = rows[start];
    const last = rows[i - 1];
    if (first && last && (i === rows.length || rows[i]?.value !== first.value)) {
      groups.push({
        day: start === i - 1 ? short(first.day) : `${short(first.day)}–${short(last.day)}`,
        value: first.value,
        weekday: first.weekday,
      });
      start = i;
    }
  }
  return groups;
}

export function HoursTable({
  dict,
  className,
  grouped = false,
}: {
  dict: Dictionary;
  className?: string;
  grouped?: boolean;
}) {
  const rows = weekRows(site.hours.week, dict);
  return (
    <table className={cn("label w-full border-collapse text-left", className)}>
      <caption className="sr-only">{dict.info.hours}</caption>
      <tbody>
        {(grouped ? groupRows(rows) : rows).map((row) => (
          <tr key={row.weekday} className="border-rule border-b last:border-b-0">
            <th scope="row" className="py-1.5 pr-4 font-normal text-muted">
              {row.day}
            </th>
            <td className="tabular whitespace-nowrap py-1.5 text-right text-fg">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
