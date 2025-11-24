/********************************************************************************************
 *                               TypeScript Utility Types (نسخة مبسّطة ومتوسطة)              *
 ********************************************************************************************/

/**
 * ===============================
 * 📘 الفهرس
 * ===============================
 * 1. مقدمة Utility Types
 * 2. Partial<T>
 * 3. Required<T>
 * 4. Readonly<T>
 * 5. Pick<T, K>
 * 6. Omit<T, K>
 * 7. Record<K, T>
 * 8. Exclude<T, U>
 * 9. Extract<T, U>
 * 10. NonNullable<T>
 * 11. ReturnType<T>
 * 12. Parameters<T>
 * 13. ConstructorParameters<T>
 * 14. InstanceType<T>
 * 15. Awaited<T>
 * 16. Combining Utility Types (أمثلة عملية)
 * 17. تمرين عملي
 */

/********************************************************************************************
 * 1️⃣ مقدمة
 * Utility Types = أدوات جاهزة تساعدك في تحويل الأنواع بدون تكرار.
 ********************************************************************************************/

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

/********************************************************************************************
 * 2️⃣ Partial<T> → جعل الخصائص Optional
 ********************************************************************************************/

type PartialUser = Partial<User>; // كل الخصائص optional

type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

/********************************************************************************************
 * 3️⃣ Required<T> → عكس Partial (جعل كل الخصائص Required)
 ********************************************************************************************/

interface Config {
    host?: string;
    port?: number;
    ssl?: boolean;
}

type RequiredConfig = Required<Config>;

type MyRequired<T> = {
    [K in keyof T]-?: T[K]; // -? لإزالة optional
};

/********************************************************************************************
 * 4️⃣ Readonly<T> → جعل الخصائص Readonly
 ********************************************************************************************/

type ReadonlyUser = Readonly<User>;

type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

/********************************************************************************************
 * 5️⃣ Pick<T, K> → اختيار خصائص معينة
 ********************************************************************************************/

type UserPublic = Pick<User, "id" | "name" | "email">;

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/********************************************************************************************
 * 6️⃣ Omit<T, K> → حذف خصائص معينة
 ********************************************************************************************/

type UserWithoutAge = Omit<User, "age">;

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/********************************************************************************************
 * 7️⃣ Record<K, T> → إنشاء Object Type
 ********************************************************************************************/

type Permissions = Record<string, string[]>;

type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
};

/********************************************************************************************
 * 8️⃣ Exclude<T, U> → إزالة أنواع من Union
 ********************************************************************************************/

type Status = "pending" | "approved" | "cancelled";

type ActiveStatus = Exclude<Status, "cancelled">;

type MyExclude<T, U> = T extends U ? never : T;

/********************************************************************************************
 * 9️⃣ Extract<T, U> → استخراج الأنواع المشتركة
 ********************************************************************************************/

type Completed = Extract<Status, "approved">;

type MyExtract<T, U> = T extends U ? T : never;

/********************************************************************************************
 * 🔟 NonNullable<T> → إزالة null و undefined
 ********************************************************************************************/

type MaybeString = string | null | undefined;

type SafeString = NonNullable<MaybeString>;

type MyNonNullable<T> = T extends null | undefined ? never : T;

/********************************************************************************************
 * 1️⃣1️⃣ ReturnType<T> → استخراج return type
 ********************************************************************************************/

function makeUser(name: string, email: string) {
    return { id: Math.random(), name, email };
}

type MakeUserReturn = ReturnType<typeof makeUser>;

type MyReturnType<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => infer R ? R : never;

/********************************************************************************************
 * 1️⃣2️⃣ Parameters<T> → استخراج Parameters من function
 ********************************************************************************************/

type MakeUserParams = Parameters<typeof makeUser>;

type MyParameters<T extends (...args: any[]) => any> =
    T extends (...args: infer P) => any ? P : never;

/********************************************************************************************
 * 1️⃣3️⃣ ConstructorParameters<T>
 ********************************************************************************************/

class Person {
    constructor(public name: string, public age: number) { }
}

type PersonArgs = ConstructorParameters<typeof Person>;

type MyConstructorParameters<T extends new (...args: any[]) => any> =
    T extends new (...args: infer P) => any ? P : never;

/********************************************************************************************
 * 1️⃣4️⃣ InstanceType<T>
 ********************************************************************************************/

type PersonInstance = InstanceType<typeof Person>;

type MyInstanceType<T extends new (...args: any[]) => any> =
    T extends new (...args: any[]) => infer R ? R : never;

/********************************************************************************************
 * 1️⃣5️⃣ Awaited<T> → استخراج النوع من Promise
 ********************************************************************************************/

async function fetchName() {
    return "Ahmed";
}

type NameType = Awaited<ReturnType<typeof fetchName>>;

type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

/********************************************************************************************
 * 1️⃣6️⃣ Combining Utility Types (أمثلة عملية)
 ********************************************************************************************/

interface FullUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user" | "guest";
    createdAt: Date;
    updatedAt: Date;
}

type CreateUser = Omit<FullUser, "id" | "createdAt" | "updatedAt">;
type UpdateUser = Partial<CreateUser>;
type PublicUser = Pick<FullUser, "id" | "name" | "email">;

type ReadonlyState<T> = Readonly<{ data: T; loading: boolean }>;

/********************************************************************************************
 * 1️⃣7️⃣ تمرين عملي
 * - احرص على استخدام: Partial, Pick, Record, keyof
 ********************************************************************************************/

// ملاحظات:
// FormField<T>: { value: T; error?: string; touched: boolean }
// FormState<T>: Record<keyof T, FormField<T[keyof T]>>
// ValidatorFn<T>: (value: T) => string | undefined
// Validators<T>: Partial<Record<keyof T, ValidatorFn<T[keyof T]>[]>>

// اكتب FormBuilder class كتدريب.
