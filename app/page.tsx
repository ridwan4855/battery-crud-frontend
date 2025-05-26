"use client";
import { useEffect, useState } from "react";
import { Battery, BatteryBase } from "@/app/types/battery";
import BatteryForm from "@/app/components/BatteryForm";
import BatteryTable from "@/app/components/BatteryTable";
import { batteryAPI } from "./services/batteryServices";
import { useRouter } from "next/navigation";

export default function Home() {
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [editingBattery, setEditingBattery] = useState<Battery | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  // CRUD Operations
  const handleCreate = async (newBattery: BatteryBase) => {
    const createdBattery = await batteryAPI.create(newBattery);
    setBatteries([...batteries, createdBattery]);
  };

  const handleUpdate = async (updatedBattery: Battery) => {
    await batteryAPI.update(updatedBattery);
    setBatteries(
      batteries.map((b) => (b.id === updatedBattery.id ? updatedBattery : b))
    );
    setEditingBattery(null); // Clear edit state
  };

  const handleDelete = async (id: string) => {
    await batteryAPI.delete(id);
    setBatteries(batteries.filter((b) => b.id !== id));
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <div className="w-[50%] max-sm:w-full border p-5 rounded-2xl bg-slate-300">
          <h1 className="text-2xl font-bold mb-4">Battery Inventory</h1>
          <BatteryForm
            onSubmit={(batteryData) => {
              if (editingBattery) {
                handleUpdate(batteryData as Battery);
              } else {
                handleCreate(batteryData as Omit<Battery, "id">);
              }
            }}
            battery={editingBattery ?? undefined}
            onCancel={() => setEditingBattery(null)}
          />
        </div>
      </div>
      <BatteryTable
        key={editingBattery?.id || "create-form"}
        batteries={batteries}
        onEdit={setEditingBattery}
        onDelete={handleDelete}
      />
    </main>
  );
}
