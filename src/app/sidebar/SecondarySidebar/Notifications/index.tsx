import { useSidebarContext } from "../../Context";
import NotificationCard from "./Card";

function Notifications() {
  const { notifications } = useSidebarContext();
  return (
    <div className="px-2 pr-4">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}

export default Notifications;
