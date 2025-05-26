"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Battery } from "@/app/types/battery";
import { useEffect } from "react";

interface BatteryFormProps {
  battery?: Battery | null;
  onSubmit: (battery: Battery | Omit<Battery, "id">) => void;
  onCancel?: () => void;
}

export default function BatteryForm({
  battery,
  onSubmit,
  onCancel,
}: BatteryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Battery | Omit<Battery, "id">>({
    defaultValues: battery ?? {
      name: "",
      type: "",
      voltage: 0,
      capacity: 0,
      price: 0,
    },
  });

  // Reset form when battery prop changes
  useEffect(() => {
    if (battery) {
      reset(battery);
    } else {
      reset({
        name: "",
        type: "",
        voltage: 0,
        capacity: 0,
        price: 0,
      });
    }
  }, [battery, reset]);

  const onSubmitForm: SubmitHandler<Omit<Battery, "id">> = (data) => {
    onSubmit(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 mb-4">
      {/* Name Field */}
      <div>
        <label className="block mb-1">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={`w-full p-2 border rounded-2xl ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Type Field */}
      <div>
        <label className="block mb-1">Type</label>
        <select
          {...register("type", { required: "Type is required" })}
          className={`w-full p-2 border rounded-2xl ${
            errors.type ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Type</option>
          <option value="Li-ion">Lithium-ion</option>
          <option value="NiMH">Nickel-Metal Hydride</option>
          <option value="Lead-Acid">Lead-Acid</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* Voltage Field */}
      <div>
        <label className="block mb-1">Voltage (V)</label>
        <input
          type="number"
          step="0.1"
          {...register("voltage", {
            required: "Voltage is required",
            min: { value: 0.1, message: "Must be greater than 0" },
            valueAsNumber: true,
          })}
          className={`w-full p-2 border rounded-2xl ${
            errors.voltage ? "border-red-500" : ""
          }`}
        />
        {errors.voltage && (
          <p className="text-red-500 text-sm mt-1">{errors.voltage.message}</p>
        )}
      </div>

      {/* Capacity Field */}
      <div>
        <label className="block mb-1">Capacity (mAh)</label>
        <input
          type="number"
          {...register("capacity", {
            required: "Capacity is required",
            min: { value: 1, message: "Must be at least 1 mAh" },
            valueAsNumber: true,
          })}
          className={`w-full p-2 border rounded-2xl ${
            errors.capacity ? "border-red-500" : ""
          }`}
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
        )}
      </div>

      {/* Price Field */}
      <div>
        <label className="block mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Must be greater than 0" },
            valueAsNumber: true,
          })}
          className={`w-full p-2 border rounded-2xl ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-slate-500 text-white px-4 py-2 hover:bg-slate-600 rounded-2xl mr-3"
      >
        {battery ? "Update Battery" : "Add Battery"}
      </button>

      {battery && (
        <button
          type="button"
          onClick={() => {
            reset();
            onCancel?.();
          }}
          className="bg-slate-500 text-white px-4 py-2 rounded-2xl hover:bg-slate-600"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}
