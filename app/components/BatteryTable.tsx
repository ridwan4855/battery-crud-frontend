import { Battery } from "@/app/types/battery";

interface BatteryTableProps {
  batteries: Battery[];
  onEdit: (battery: Battery) => void;
  onDelete: (id: string) => void;
}

export default function BatteryTable({
  batteries,
  onEdit,
  onDelete,
}: BatteryTableProps) {
  return (
    <table className="min-w-full mt-10 text-center border border-slate-200">
      <thead>
        <tr className="border-b border-slate-200">
          <th className="border border-slate-200 px-4 py-2">Name</th>
          <th className="border border-slate-200 px-4 py-2">Type</th>
          <th className="border border-slate-200 px-4 py-2">Voltage</th>
          <th className="border border-slate-200 px-4 py-2">Capacity</th>
          <th className="border border-slate-200 px-4 py-2">Price</th>
          <th className="border border-slate-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {batteries.map((battery) => (
          <tr key={battery.id} className="border border-slate-200 px-4 py-2">
            <td className="border border-slate-200 px-4 py-2">
              {battery.name}
            </td>
            <td className="border border-slate-200 px-4 py-2">
              {battery.type}
            </td>
            <td className="border border-slate-200 px-4 py-2">
              {battery.voltage}V
            </td>
            <td className="border border-slate-200 px-4 py-2">
              {battery.capacity}mAh
            </td>
            <td className="border border-slate-200 px-4 py-2">
              ${battery.price}
            </td>
            <td className="border border-slate-200 px-4 py-2">
              <button
                onClick={() => onEdit(battery)}
                className="p-4 bg-blue-500 rounded-2xl mr-2 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(battery.id)}
                className="p-4 bg-red-500 rounded-2xl text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
