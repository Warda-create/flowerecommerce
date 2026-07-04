import { Check, Package, Truck, Star, Clock } from "lucide-react";
import { TrackingEvent, OrderStatus } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface TrackingTimelineProps {
  events: TrackingEvent[];
  currentStatus: OrderStatus;
}

const statusIcons: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  confirmed: Check,
  preparing: Package,
  out_for_delivery: Truck,
  delivered: Star,
  cancelled: Clock,
};

export default function TrackingTimeline({ events, currentStatus }: TrackingTimelineProps) {
  return (
    <div className="space-y-0">
      {events.map((event, index) => {
        const Icon = statusIcons[event.status] || Check;
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="flex gap-4">
            {/* Icon + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all z-10",
                  event.completed
                    ? "bg-blush-600 border-blush-600 text-white"
                    : event.current
                      ? "bg-white border-blush-500 text-blush-600 shadow-glow"
                      : "bg-cream-100 border-cream-200 text-sage-400"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1 min-h-[2rem]",
                    event.completed ? "bg-blush-300" : "bg-cream-200"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p
                    className={cn(
                      "font-body font-semibold text-sm",
                      event.current
                        ? "text-blush-700"
                        : event.completed
                          ? "text-sage-800"
                          : "text-sage-400"
                    )}
                  >
                    {event.title}
                    {event.current && (
                      <span className="ml-2 text-xs bg-blush-100 text-blush-600 px-2 py-0.5 rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </p>
                  <p
                    className={cn(
                      "font-body text-xs mt-0.5 leading-relaxed",
                      event.completed || event.current ? "text-sage-500" : "text-sage-400"
                    )}
                  >
                    {event.description}
                  </p>
                </div>
                {event.timestamp && (
                  <span className="font-body text-xs text-sage-400 shrink-0">
                    {new Date(event.timestamp).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}