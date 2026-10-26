import { site } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/format";
import { weekRows } from "@/lib/hours";

export function HoursTable({ dict, className }: { dict: Dictionary; className?: string }) {
  return (
    <table className={cn("label w-full border-collapse text-left", className)}>
      <caption className="sr-only">{dict.reserve.hours}</caption>
      <tbody>
        {weekRows(site.hours.week, dict).map((row) => (
          <tr key={row.weekday} className="border-line border-b last:border-b-0">
            <th scope="row" className="py-2.5 pr-4 font-normal text-sage-light">
              {row.day}
            </th>
            <td className="tabular whitespace-nowrap py-2.5 text-right text-cream-light">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
