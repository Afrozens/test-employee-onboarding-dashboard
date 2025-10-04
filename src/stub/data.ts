import { randomUUID } from "crypto";

import { User } from "@/models/user";

export const stubUser: User = {
    id: randomUUID(),
    name: 'John Doe',
    email: 'admin@rebuhr.com',
    role: 'admin'
}