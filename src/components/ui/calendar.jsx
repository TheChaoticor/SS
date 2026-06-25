import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar(props) {
  return (
    <div
      className="rounded-2xl p-4 shadow-xl border border-white/30 backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(135deg, rgba(109,140,255,.95) 0%, rgba(142,168,255,.95) 45%, rgba(255,208,161,.95) 100%)",
      }}
    >
      <DayPicker
        {...props}
        className="
          text-slate-50
          [&_.rdp-caption_label]:text-slate-50
          [&_.rdp-head_cell]:text-slate-100
          [&_.rdp-button]:text-slate-50
          [&_.rdp-nav_button]:text-slate-50
          [&_.rdp-day]:text-slate-50
          [&_.rdp-day_disabled]:text-slate-400
          [&_.rdp-day_outside]:text-slate-500
        "
        classNames={{
          selected:
            "bg-orange-500 text-white rounded-full hover:bg-orange-600",
          today: "text-orange-200 font-bold",
        }}
      />
    </div>
  );
}