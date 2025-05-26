export interface BatteryBase {
  name: string;
  type: string;
  voltage: number;
  capacity: number;
  price: number;
}

export interface Battery extends BatteryBase {
  id: string;
}
