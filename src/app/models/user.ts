import { Company } from "./company";

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;

  company: Company;

  firstName: string;
  lastName: string;
  role: string;
  isSuperAdmin: boolean;
  isActive: boolean;

  address: string;
  profilePicture: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  bloodGroup: string;
  maritalStatus: string;

  aadharNumber: string;
  panNumber: string;
  passportNumber: string;

  employeeCode: string;
  department: string | { id: string; name: string };
  designation: string | { id: string; name: string };

  dateOfJoining: string;
  dateOfLeaving: string | null;

  reportingManager: string;
  workLocation: string;
  workShift: string;
  workPhone: string;

  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;

  bankAccountNumber: string;
  bankName: string;
  bankIfscCode: string;
  bankBranch: string;
  bankAccountType: string;

  lockedDevice: string;
  assignedDevices: AssignedDevice[];
  totalAssignedDevices: number;

  todayAttendance: TodayAttendance | null;
}

export interface AssignedDevice {
  id?: string;
  deviceType?: string;
  deviceName?: string;
  deviceUid?: string;
  isAssigned?: boolean;
  [key: string]: any;
}

export interface TodayAttendance {
  id?: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  status?: string;
  totalHours?: number;
  location?: string | null;
  [key: string]: any;
}

export interface AttendanceMonthlySummary {
  year: number;
  month: number;
  totalRecords: number;
  present: number;
  absent: number;
  leave: number;
  halfDay: number;
  late: number;
  totalWorkingHours: number;
}

export interface LeaveItem {
  id: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
  totalDays: number;
  userName?: string;
  createdAt: string;
}

export interface HolidayItem {
  id: string;
  companyId?: string;
  name: string;
  date: string;
  isOptional: boolean;
  description?: string;
}

export interface AnnouncementItem {
  id: string;
  companyId?: string;
  title: string;
  description: string;
  createdAt: string;
}
