// ===============================================
// 10 - Type Manipulation in TypeScript
// ===============================================
// هذا الفصل يشرح أهم أدوات TypeScript لبناء أنواع مرنة وقوية
// سنشرح: keyof, typeof, indexed access, mapped types,
// utility types, template literal types، وغيرها.
// -----------------------------------------------

/*
==========================
📘 الفهرس
==========================
1️⃣ keyof operator
2️⃣ typeof operator
3️⃣ Indexed Access Types
4️⃣ Mapped Types (الأساس)
5️⃣ Template Literal Types
6️⃣ Conditional Types
7️⃣ Infer keyword
8️⃣ Built-in Utility Types
9️⃣ مثال تطبيقي شامل
==========================
*/

// -----------------------------------------------
// 1️⃣ keyof operator
// -----------------------------------------------
// يرجع literal union لكل أسماء الخصائص
interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

// مثال: دالة تأخذ key صالح فقط
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// -----------------------------------------------
// 2️⃣ typeof operator
// -----------------------------------------------
const settings = {
    theme: "dark",
    lang: "ar",
    version: 1,
};

type Settings = typeof settings; // ينتج type مطابق للكائن

// -----------------------------------------------
// 3️⃣ Indexed Access Types
// -----------------------------------------------
// الوصول لنوع خاصية معيّنة

type UserEmail = User["email"]; // string

type PropsOfSettings = Settings["theme" | "version"]; // string | number

// -----------------------------------------------
// 4️⃣ Mapped Types (أساس مهم جدًا)
// -----------------------------------------------
// نعيد بناء type عبر التكرار على مفاتيح نوع آخر

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
};

type PartialUser = MakeOptional<User>;

// Make all properties readonly

type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

// -----------------------------------------------
// 5️⃣ Template Literal Types
// -----------------------------------------------
type Lang = "ar" | "en";
type Theme = "light" | "dark";

// إنشاء string types مركّبة

type SettingKey = `${Lang}-${Theme}`; // "ar-light" | "ar-dark" | "en-light" | "en-dark"

// -----------------------------------------------
// 6️⃣ Conditional Types
// -----------------------------------------------
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// remove null/undefined

type NonNullable<T> = T extends null | undefined ? never : T;

// -----------------------------------------------
// 7️⃣ infer keyword
// -----------------------------------------------
// استخراج نوع من مكان معين

// مثال: استخراج نوع return من function

type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function test() {
    return { id: 1, name: "Ahmed" };
}

type TestReturn = ReturnTypeOf<typeof test>; // {id: number; name: string}

// -----------------------------------------------
// 8️⃣ Built-in Utility Types (مهمة جدًا)
// -----------------------------------------------
/*
Partial<T>
Required<T>
Readonly<T>
Pick<T, K>
Omit<T, K>
Record<K, T>
ReturnType<T>
Extract<T, U>
Exclude<T, U>
NonNullable<T>
*/

type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
type UserRecord = Record<string, User>;

// -----------------------------------------------
// 9️⃣ مثال عملي شامل — Form Builder System
// -----------------------------------------------
// الهدف: إنشاء نظام قوي لتوليد أنواع تلقائيًا

// 1. تعريف شكل الحقول
interface FieldBase {
    label: string;
    required: boolean;
}

interface TextField extends FieldBase {
    type: "text";
    maxLength?: number;
}

interface NumberField extends FieldBase {
    type: "number";
    min?: number;
    max?: number;
}

interface SelectField<T extends string> extends FieldBase {
    type: "select";
    options: T[];
}

type Field = TextField | NumberField | SelectField<string>;

// 2. إنشاء Type يحدد قيمة كل Field

type FieldValue<F> =
    F extends TextField ? string :
    F extends NumberField ? number :
    F extends SelectField<infer T> ? T :
    never;

// 3. الآن: إنشاء نوع لـ Form كامل

type FormShape<T extends Record<string, Field>> = {
    [K in keyof T]: FieldValue<T[K]>;
};

// 4. مثال تطبيقي
const userForm = {
    username: { label: "Username", required: true, type: "text" } as TextField,
    age: { label: "Age", required: false, type: "number", min: 0 } as NumberField,
    role: { label: "Role", required: true, type: "select", options: ["admin", "user", "guest"] } as SelectField<"admin" | "user" | "guest">,
};

type UserFormType = FormShape<typeof userForm>;
// الناتج:
// {
//   username: string;
//   age: number;
//   role: "admin" | "user" | "guest";
// }

// 5. دالة validate تستفيد من type inference
function validateForm<T extends Record<string, Field>>(form: T, data: FormShape<T>) {
    for (const key in form) {
        const field = form[key];
        const value = data[key];

        if (field.required && (value === undefined || value === null)) {
            console.log(`❌ Field '${key}' is required.`);
        }
    }
    return true;
}

validateForm(userForm, {
    username: "Ahmed123",
    age: 25,
    role: "admin",
});
