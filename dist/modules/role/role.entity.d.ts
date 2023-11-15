export interface RoleEntity {
    id: number;
    name: string;
    description: string | null;
    labe?: string;
    createdAt: Date;
    updatedAt: Date;
}
