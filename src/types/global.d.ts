export interface HeapItem {
    id: number;
    distance: number;
    driverLocation: LatLngLiteral;
}

export interface Driver {
    id: number,
    position: LatLngLiteral
  }

export interface DriverTuple extends Array<any> {
    0: number;
    1: Driver;
}