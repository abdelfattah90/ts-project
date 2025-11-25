// ===============================================
// 🔵 Type Manipulation in TypeScript — Full Guide
// ===============================================
// هذا الملف يدمج الشرح النظري + الأكواد العملية
// كل Section يحتوي على شرح واضح قبل الأكواد
// ===============================================


/* 
====================================================
1️⃣ keyof operator
----------------------------------------------------
✔️ ما هو؟
مشغّل يعيد literal union لكل أسماء الخصائص داخل type.

🎯 لماذا نستخدمه؟
لضمان استخدام مفاتيح صحيحة وآمنة داخل الدوال أو المكونات.

🔧 أين نستخدمه؟
– دوال generic
– mapped types
– فحص تطابق المفاتيح

⏱️ متى نستخدمه؟
عندما نحتاج ضمان أن المفتاح موجود فعلًا في النوع.
====================================================
*/

interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

// مثال: دالة آمنة باستخدام keyof
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}



// ===============================================
// 2️⃣ typeof operator
// ===============================================

/*
✔️ يسمح باستخراج Type من قيمة فعلية.
🎯 يفيد لتفادي تكرار تعريف النوع.
*/

const settings = {
    theme: "dark",
    lang: "ar",
    version: 1,
};

type Settings = typeof settings;



// ===============================================
// 3️⃣ Indexed Access Types
// ===============================================

/*
✔️ طريقة لجلب نوع خاصية داخل Type.
🎯 مفيد عند بناء أنواع مشتقة.
*/

type UserEmail = User["email"]; // string
type PropsOfSettings = Settings["theme" | "version"]; // string | number



// ===============================================
// 4️⃣ Mapped Types
// ===============================================

/*
✔️ يعيد بناء Type جديد عبر التكرار على keys لنوع آخر.
🎯 الأساس لإنشاء Utility Types.
*/

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
};

type PartialUser = MakeOptional<User>;

type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K];
};



// ===============================================
// 5️⃣ Template Literal Types
// ===============================================

/*
✔️ تركيب string types ديناميكيًا.
🎯 ممتاز للغات – الثيمات – REST routes.
*/

type Lang = "ar" | "en";
type Theme = "light" | "dark";

type SettingKey = `${Lang}-${Theme}`;



// ===============================================
// 6️⃣ Conditional Types
// ===============================================

/*
✔️ أنواع تعتمد على شرط منطقي.
🎯 الأساس للأنواع الذكية.
*/

type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

type NonNullable<T> = T extends null | undefined ? never : T;



// ===============================================
// 7️⃣ infer keyword
// ===============================================

/*
✔️ استخراج نوع من مكان داخلي.
🎯 مهم جدًا لاستخراج return types.
*/

type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

function test() {
    return { id: 1, name: "Ahmed" };
}

type TestReturn = ReturnTypeOf<typeof test>;



// ===============================================
// 8️⃣ Built-in Utility Types
// ===============================================

/*
📌 أهم Utility Types:
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



// ===============================================
// 9️⃣ نظام Form Builder — مثال شامل
// ===============================================

/*
🎯 الهدف:
إنشاء نظام يولّد نوع form values تلقائيًا
باستخدام conditional types + infer + mapped types
*/

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

// 2. استخراج قيمة كل نوع Field
type FieldValue<F> =
    F extends TextField ? string :
    F extends NumberField ? number :
    F extends SelectField<infer T> ? T :
    never;

// 3. توليد نوع Form كامل ديناميكيًا
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

// 5. دالة validate باستخدام الأنواع الذكية
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
