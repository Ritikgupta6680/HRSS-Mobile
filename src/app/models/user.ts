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
    department: string;
    designation: string;

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
    // Add properties here when the API returns device objects
    [key: string]: any;
}

export interface TodayAttendance {
    // Add properties here when the API returns attendance data
    [key: string]: any;
}