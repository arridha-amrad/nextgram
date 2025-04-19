import { useSidebarContext } from "../../Context";
import NotificationCard from "./Card";

function Notifications() {
  const { notifications } = useSidebarContext();
  return (
    <div className="custom-scrollbar space-y-4 overflow-y-auto">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}

export default Notifications;
