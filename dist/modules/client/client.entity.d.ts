export interface ClientEntity {
    id: number;
    name: string;
    contactPhone: string[];
    contactName: string;
    pcCount: number;
    serverAddress: string[];
    hardwareId: string;
    linuxUsername: string;
    linuxPassword: string;
    dlpUsername: string;
    dlpPassword: string;
    notes: string;
    statusId: number;
    contractDueTo: Date | null;
    tgGroupId: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    status: string;
}
