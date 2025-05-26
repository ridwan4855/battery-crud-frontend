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
    <table className="min-w-full mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Voltage</th>
          <th>Capacity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {batteries.map((battery) => (
          <tr key={battery.id}>
            <td>{battery.name}</td>
            <td>{battery.type}</td>
            <td>{battery.voltage}V</td>
            <td>{battery.capacity}mAh</td>
            <td>${battery.price}</td>
            <td>
              <button onClick={() => onEdit(battery)}>Edit</button>
              <button onClick={() => onDelete(battery.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
