/********************************************************************************************
 *                      TypeScript Utility Types — شرح متوازن + أمثلة عملية                *
 *                                    (Balanced Version)                                   *
 *                                       Ahmed Notes                                        *
 ********************************************************************************************/

/*
=============================================================================================
📘 الفهرس (بشكل مُنسّق)
1. مقدمة Utility Types
2. Partial<T>
3. Required<T>
4. Readonly<T>
5. Pick<T, K>
6. Omit<T, K>
7. Record<K, T>
8. Exclude<T, U>
9. Extract<T, U>
10. NonNullable<T>
11. ReturnType<T>
12. Parameters<T>
13. ConstructorParameters<T>
14. InstanceType<T>
15. Awaited<T>
16. Combining Utility Types (أمثلة عملية)
17. تمرين عملي — FormBuilder (حل تطبيقي)
=============================================================================================
*/

/* =========================================================================================
 * 1️⃣ مقدمة Utility Types
 * -----------------------------------------------------------------------------------------
 * ✅ ما هي؟
 *    Utility Types هي أنواع جاهزة في TypeScript تحول أو تبني أنواع جديدة من أنواع موجودة.
 *
 * ✅ لماذا نستخدمها؟
 *    لتقليل تكرار الأكواد، تحسين الدقة النوعية، وكتابة أنواع مركبة بسهولة.
 *
 * ✅ متى نستخدمها؟
 *    عند تعديل واجهات (interfaces) أو تحويل union/tuple أو استخراج جزء من نوع.
 *
 * ✅ أين نستخدمها؟
 *    في تصميم API types، form state، state management، وعمليات التحويل بين DTO و Domain models.
 * =========================================================================================*/

/* ============================================
 * نموذج أساسي للاستعمال عبر الشرح
 * (Interface أساسي سنستخدمه كمثال في كل مكان)
 * ============================================ */
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // اختياري هنا لعرض Required/Partial
}

/* =========================================================================================
 * 2️⃣ Partial<T> → جعل الخصائص Optional
 * -----------------------------------------------------------------------------------------
 * ✅ ما هو؟
 *    يحوّل كل خصائص النوع إلى optional (يعادل جعل كل خاصية?)
 *
 * ✅ لماذا؟
 *    مفيد عند بناء update payloads أو forms حيث البعض من الحقول قد لا يُرسَل.
 *
 * ✅ مثال عملي (مُبسّط)
 * =========================================================================================*/

type PartialUser = Partial<User>; // { id?: number; name?: string; ... }

/* --- طريقة التطبيق (مماثل داخلياً) --- */
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

/* ⚠️ ملاحظة:
   Partial لا يغيّر من أنواع الخصائص نفسها — فقط يجعلها قابلة للغياب. */

/* =========================================================================================
 * 3️⃣ Required<T> → عكس Partial (جعل كل الخصائص Required)
 * -----------------------------------------------------------------------------------------
 * ✅ ما هو؟
 *    يحوّل كل الخصائص إلى required (يزيل ?).
 *
 * ✅ متى نستخدمه؟
 *    عندما نريد التأكد من أن كائن ما يحتوي كل الحقول (مثل config مكتمل).
 * =========================================================================================*/

interface Config {
    host?: string;
    port?: number;
    ssl?: boolean;
}

type RequiredConfig = Required<Config>; // جميع الخصائص مطلوبة

type MyRequired<T> = {
    [K in keyof T]-?: T[K]; // -? لإزالة الـ optional modifier
};

/* =========================================================================================
 * 4️⃣ Readonly<T> → جعل الخصائص غير قابلة للتغيير (readonly)
 * -----------------------------------------------------------------------------------------
 * ✅ متى نستخدمه؟
 *    عند نقل state لا تريد تغييره مباشرة (immutability).
 * =========================================================================================*/

type ReadonlyUser = Readonly<User>;

type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

/* =========================================================================================
 * 5️⃣ Pick<T, K> → اختيار خصائص معينة من النوع
 * -----------------------------------------------------------------------------------------
 * ✅ مفيد لإنشاء view models أو عرض بيانات عامة.
 * =========================================================================================*/

type UserPublic = Pick<User, "id" | "name" | "email">;

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/* =========================================================================================
 * 6️⃣ Omit<T, K> → حذف خصائص معينة
 * -----------------------------------------------------------------------------------------
 * ✅ مفيد عند إنشاء payloads بدون الحقول الحساسة (مثل password).
 * =========================================================================================*/

type UserWithoutAge = Omit<User, "age">;

type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/* =========================================================================================
 * 7️⃣ Record<K, T> → إنشاء Object Type بمفاتيح من نوع K وقيم من نوع T
 * -----------------------------------------------------------------------------------------
 * ✅ مثال: map من userId إلى permissions أو settings
 * =========================================================================================*/

type Permissions = Record<string, string[]>;

type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
};

/* =========================================================================================
 * 8️⃣ Exclude<T, U> → إزالة أنواع من Union
 * -----------------------------------------------------------------------------------------
 * ✅ مثال: إزالة حالة من حالات الـ status union
 * =========================================================================================*/

type Status = "pending" | "approved" | "cancelled";
type ActiveStatus = Exclude<Status, "cancelled">; // "pending" | "approved"

type MyExclude<T, U> = T extends U ? never : T;

/* =========================================================================================
 * 9️⃣ Extract<T, U> → استخراج الأنواع المشتركة بين T و U
 * -----------------------------------------------------------------------------------------
 * ✅ يستخدم لاستخراج تقاطعات union types
 * =========================================================================================*/

type Completed = Extract<Status, "approved">; // "approved"

type MyExtract<T, U> = T extends U ? T : never;

/* =========================================================================================
 * 🔟 NonNullable<T> → إزالة null و undefined من النوع
 * -----------------------------------------------------------------------------------------
 * ✅ مهم عند التعامل مع قيم تأتي من API قد تكون قابلة لأن تكون null.
 * =========================================================================================*/

type MaybeString = string | null | undefined;
type SafeString = NonNullable<MaybeString>; // string

type MyNonNullable<T> = T extends null | undefined ? never : T;

/* =========================================================================================
 * 1️⃣1️⃣ ReturnType<T> → استخراج نوع القيمة المرجعة من function
 * -----------------------------------------------------------------------------------------
 * ✅ مفيد لبناء أنواع مبنية على دوال موجودة أو APIs.
 * =========================================================================================*/

function makeUser(name: string, email: string) {
    return { id: Math.random(), name, email };
}

type MakeUserReturn = ReturnType<typeof makeUser>;

type MyReturnType<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => infer R ? R : never;

/* =========================================================================================
 * 1️⃣2️⃣ Parameters<T> → استخراج tuple لأنواع الـ parameters من function
 * -----------------------------------------------------------------------------------------
 * ✅ مفيد لإعادة استخدام توقيع دالة في مكان آخر.
 * =========================================================================================*/

type MakeUserParams = Parameters<typeof makeUser>; // [string, string]

type MyParameters<T extends (...args: any[]) => any> =
    T extends (...args: infer P) => any ? P : never;

/* =========================================================================================
 * 1️⃣3️⃣ ConstructorParameters<T>
 * -----------------------------------------------------------------------------------------
 * ✅ استخراج tuple للـ constructor arguments لكلاس.
 * =========================================================================================*/

class Person {
    constructor(public name: string, public age: number) { }
}

type PersonArgs = ConstructorParameters<typeof Person>;

type MyConstructorParameters<T extends new (...args: any[]) => any> =
    T extends new (...args: infer P) => any ? P : never;

/* =========================================================================================
 * 1️⃣4️⃣ InstanceType<T>
 * -----------------------------------------------------------------------------------------
 * ✅ للحصول على نوع الكائن الناتج من الكلاس.
 * =========================================================================================*/

type PersonInstance = InstanceType<typeof Person>;

type MyInstanceType<T extends new (...args: any[]) => any> =
    T extends new (...args: any[]) => infer R ? R : never;

/* =========================================================================================
 * 1️⃣5️⃣ Awaited<T> → استخراج النوع داخل Promise
 * -----------------------------------------------------------------------------------------
 * ✅ مهم عند التعامل مع async/await أو أنواع ترجع Promises.
 * =========================================================================================*/

async function fetchName() {
    return "Ahmed";
}

type NameType = Awaited<ReturnType<typeof fetchName>>; // string

type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

/* =========================================================================================
 * 1️⃣6️⃣ Combining Utility Types — أمثلة عملية (Balanced)
 * -----------------------------------------------------------------------------------------
 * ✅ مواقف عملية شائعة:
 *    - إنشاء CreateUser من FullUser (بدون id وتواريخ)
 *    - UpdateUser كـ Partial<CreateUser>
 *    - PublicUser باستخدام Pick
 * =========================================================================================*/

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

/* =========================================================================================
 * 1️⃣7️⃣ تمرين عملي — FormBuilder (حل تطبيقي متوازن)
 * -----------------------------------------------------------------------------------------
 * المطلوب (مذكور في الملف الأصلي):
 * - FormField<T>: { value: T; error?: string; touched: boolean }
 * - FormState<T>: Record<keyof T, FormField<T[keyof T]>>
 * - ValidatorFn<T>: (value: T) => string | undefined
 * - Validators<T>: Partial<Record<keyof T, ValidatorFn<T[keyof T]>[]>>
 *
 * ✔️ سننفّذ FormBuilder class جنريك يدعم:
 *    - إنشاء الحالة من قيمة ابتدائية (initial)
 *    - setValue/getValue لكل حقل
 *    - validateField و validateAll
 *    - getErrors و isValid
 * =========================================================================================*/

/* ---------------------------
 * أنواع المساعدة (Types)
 * --------------------------- */

// حقل النموذج
type FormField<T> = {
    value: T;
    error?: string;
    touched: boolean;
};

// بنية حالة النموذج لواجهة T
type FormState<T extends Record<string, any>> = {
    [K in keyof T]: FormField<T[K]>;
};

// دالة التحقق (Validator) لحقل من نوع TField
type ValidatorFn<TField> = (value: TField) => string | undefined;

// مجموعة Validators لكل حقل (اختياري لكل حقل)
type ValidatorsMap<T extends Record<string, any>> = Partial<{
    [K in keyof T]: ValidatorFn<T[K]>[];
}>;

/* ---------------------------
 * FormBuilder Class
 * --------------------------- */

class FormBuilder<T extends Record<string, any>> {
    private state: FormState<T>;
    private validators: ValidatorsMap<T>;

    /**
     * constructor
     * @param initialValues - القيم الابتدائية لكل حقول النموذج
     * @param validators - (اختياري) خريطة الـ validators لكل حقل
     */
    constructor(initialValues: T, validators?: ValidatorsMap<T>) {
        // بناء الـ state من initialValues
        this.state = Object.keys(initialValues).reduce((acc, key) => {
            const k = key as keyof T;
            acc[k] = {
                value: initialValues[k],
                touched: false,
            } as FormField<T[typeof k]>;
            return acc;
        }, {} as FormState<T>);

        this.validators = validators ?? {};
    }

    // ✅ الحصول على قيمة الحقل
    getValue<K extends keyof T>(key: K): T[K] {
        return this.state[key].value;
    }

    // ✅ تعيين قيمة الحقل (mark touched)
    setValue<K extends keyof T>(key: K, value: T[K], markTouched: boolean = true): void {
        this.state[key].value = value;
        if (markTouched) this.state[key].touched = true;
        // إعادة التحقق التلقائي للحقل عند التعيين
        this.validateField(key);
    }

    // ✅ الحصول على الـ FormField بالكامل
    getField<K extends keyof T>(key: K): FormField<T[K]> {
        return this.state[key];
    }

    // ✅ تنفيذ validators لحقل واحد
    validateField<K extends keyof T>(key: K): string | undefined {
        const validators = this.validators[key];
        const value = this.state[key].value;

        if (!validators || validators.length === 0) {
            this.state[key].error = undefined;
            return undefined;
        }

        for (const fn of validators) {
            const error = fn(value);
            if (error) {
                this.state[key].error = error;
                return error;
            }
        }

        this.state[key].error = undefined;
        return undefined;
    }

    // ✅ التحقق من كل الحقول وإرجاع أخطاء (إن وجدت)
    validateAll(): Partial<Record<keyof T, string>> {
        const errors: Partial<Record<keyof T, string>> = {};
        for (const key of Object.keys(this.state) as (keyof T)[]) {
            const err = this.validateField(key);
            if (err) {
                errors[key] = err;
            }
        }
        return errors;
    }

    // ✅ هل النموذج صالح (بدون أخطاء)؟
    isValid(): boolean {
        const errs = this.validateAll();
        return Object.keys(errs).length === 0;
    }

    // ✅ الحصول على كائن الأخطاء
    getErrors(): Partial<Record<keyof T, string | undefined>> {
        const result: Partial<Record<keyof T, string | undefined>> = {};
        for (const k of Object.keys(this.state) as (keyof T)[]) {
            result[k] = this.state[k].error;
        }
        return result;
    }

    // ✅ استخراج القيم ككائن عادي (مثلاً للإرسال)
    getValues(): T {
        return Object.keys(this.state).reduce((acc, key) => {
            const k = key as keyof T;
            acc[k] = this.state[k].value;
            return acc;
        }, {} as T);
    }

    // ✅ إعادة تعيين النموذج إلى القيم الابتدائية أو إلى قيم جديدة
    reset(values?: T): void {
        const base = values ?? (this.getValues() as T);
        for (const key of Object.keys(this.state) as (keyof T)[]) {
            this.state[key].value = base[key];
            this.state[key].touched = false;
            this.state[key].error = undefined;
        }
    }
}

/* =========================================================================================
 * مثال عملي على FormBuilder
 * =========================================================================================*/

// نموذج بيانات (type)
interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

// validators بسيطة
const required = <T,>(v: T) =>
    v === undefined || v === null || (typeof v === "string" && v.trim() === "")
        ? "This field is required"
        : undefined;

const minLength = (min: number) => (v: string) =>
    v.length < min ? `Minimum length is ${min}` : undefined;

// إنشاء الفورم
const loginInitial: LoginForm = {
    email: "",
    password: "",
    remember: false,
};

const loginValidators: ValidatorsMap<LoginForm> = {
    email: [required, (v) => (typeof v === "string" && !v.includes("@") ? "Invalid email" : undefined)],
    password: [required, minLength(6)],
    // remember: no validators
};

const loginForm = new FormBuilder<LoginForm>(loginInitial, loginValidators);

// استخدام
loginForm.setValue("email", "ahmed@example.com");
loginForm.setValue("password", "123"); // قصير — سيفشل validator
console.log("Errors after setting:", loginForm.getErrors());
console.log("isValid?", loginForm.isValid());
console.log("All values:", loginForm.getValues());

// تصحيح كلمة المرور
loginForm.setValue("password", "strongpassword");
console.log("Errors after fix:", loginForm.getErrors());
console.log("isValid now?", loginForm.isValid());

/* =========================================================================================
 * ✅ ملاحظات ختامية (Tips)
 * -----------------------------------------------------------------------------------------
 * - استخدم Utility Types لكتابة أنواع مرنة وقابلة لإعادة الاستخدام.
 * - يمكنك بناء utility types خاصة بمشروعك (مثل MyPartial, MyPick...) لفهم كيف تعمل.
 * - ⚠️ انتبه لتحويلات union والـ distributive conditional عند العمل مع mapped types.
 * - 💡 اجمع بين Utility Types للحصول على أنواع دقيقة (مثل: Omit + Partial).
 * =========================================================================================*/

/*
=============================================================================================
📌 انتهى الملف — إذا حابب أصدّر لك الملف كمرفق (.ts) أو أضيف أمثلة متقدمة (Mapped Types, Conditional Types),
قلّي و أعدّه لك بنفس الأسلوب.
=============================================================================================
*/
