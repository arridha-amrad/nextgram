import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import { format, isThisWeek, isToday, isYesterday, parseISO } from "date-fns";
import { useSidebarContext } from "../../Context";
import NotificationCard from "./Card";

function getLabel(dateString: string): string {
  const date = parseISO(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date, { weekStartsOn: 1 })) return "This Week";
  return format(date, "MMM d"); // fallback to readable date
}

function groupByDateLabel(items: TNotification[]) {
  const grouped: Record<string, typeof items> = {};

  items.forEach((item) => {
    const label = getLabel(new Date(item.createdAt).toISOString());
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  });

  return grouped;
}

function Notifications() {
  const { notifications } = useSidebarContext();
  const groupedItems = groupByDateLabel(notifications);
  const data = Object.entries(groupedItems);

  return (
    <div className="custom-scrollbar space-y-4 overflow-y-auto">
      {data.map(([label, items], i) => (
        <div key={label}>
          <h1 className="px-4 pb-2 font-bold">{label}</h1>
          <ul>
            {items.map((n) => (
              <NotificationCard key={n.id} notification={n} />
            ))}
          </ul>
          {data.length - 1 !== i && (
            <div className="my-4">
              <hr className="border-foreground/10" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
