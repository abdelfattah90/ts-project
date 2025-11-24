/**
 * =============================================================
 *  Interfaces vs Type Aliases (شرح مبسط ومنظم للمبتدئين)
 * =============================================================
 * 
 * 📌 فهرس الدرس (Table of Contents)
 * ---------------------------------
 * 1. مقدمة سريعة
 * 2. تعريف Interface
 * 3. تعريف Type Alias
 * 4. الفرق بين توسيع Interface و Intersection Types
 * 5. الأشياء التي يستطيع Type فعلها ولا يستطيع Interface
 * 6. استخدام Interface مع Classes
 * 7. Index Signatures
 * 8. متى نستخدم Interface ومتى نستخدم Type (مهم جدًا لـ Angular)
 * 9. خلاصة مبسطة
 * 
 * ✨ الهدف: فهم الأساسيات فقط — بدون تفاصيل عميقة غير ضرورية الآن.
 */

// =============================================================
// 1. مقدمة سريعة
// =============================================================
// interface و type هما طريقتان لتعريف الأنواع (Types) في TypeScript.
// Angular يعتمد بشكل كبير على interfaces لتمثيل شكل البيانات (Object Shapes).


// =============================================================
// 2. تعريف Interface
// =============================================================
// 👉 نستخدم interface عندما نريد تعريف شكل Object.

interface User {
    id: number;  // رقم المستخدم
    name: string; // الاسم
    email: string; // البريد
    age?: number; // خاصية اختيارية (optional)
}

const user: User = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com",
};

// واجهة تحتوي Methods
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

// Readonly properties
interface Config {
    readonly apiUrl: string;
    readonly timeout: number;
    retries: number;
}

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
};

config.retries = 5; // مسموح
// config.apiUrl = "new-url"; // ❌ غير مسموح — لأنها Readonly


// =============================================================
// 3. تعريف Type Alias
// =============================================================
// 👉 type alias يشبه interface لكنه أكثر مرونة.

// تعريف Shaped Object

// نفس مثال الـ User ولكن باستخدام type

type UserType = {
    id: number;
    name: string;
    email: string;
    age?: number;
};

const user2: UserType = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com",
};

// تعريف أنواع متحدة (Union)
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

type Email = string;
type Count = number;


// =============================================================
// 4. الفرق بين توسيع Interface و Intersection Types
// =============================================================
// 👉 interface تستخدم extends
// 👉 type يستخدم & (intersection)

// مثال باستخدام interface
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

const emp1: Employee = {
    name: "Ahmed",
    age: 25,
    employeeId: 100,
    department: "Engineering",
};

// مثال باستخدام type intersection
type PersonT = {
    name: string;
    age: number;
};

type EmployeeT = PersonT & {
    employeeId: number;
    department: string;
};

const emp2: EmployeeT = {
    name: "Ahmed",
    age: 25,
    employeeId: 100,
    department: "Engineering",
};


// =============================================================
// 5. أشياء يستطيع Type فعلها ولا يستطيع Interface
// =============================================================

// 1) Union Types
type Result = "success" | "error";

// 2) Tuple Types
type Point = [number, number];
type RGB = [number, number, number];

// 3) Mapped Types
type ReadonlyType<T> = {
    readonly [K in keyof T]: T[K];
};

// 4) Conditional Types
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// 5) Primitive type alias
type Age = number;


// =============================================================
// 6. استخدام Interface مع Classes (مهم جدًا لـ Angular)
// =============================================================
// 👉 Angular يحب استخدام interface لتمثيل العقد (contracts).

interface Drawable {
    draw(): void;
    getArea(): number;
}

class Circle implements Drawable {
    constructor(private radius: number) { }

    draw(): void {
        console.log(`Drawing circle with radius ${this.radius}`);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle implements Drawable {
    constructor(private width: number, private height: number) { }

    draw(): void {
        console.log(`Drawing rectangle ${this.width}x${this.height}`);
    }

    getArea(): number {
        return this.width * this.height;
    }
}


// =============================================================
// 7. Index Signatures
// =============================================================
// 👉 للسماح بخصائص غير معروفة مسبقًا.

interface StringDictionary {
    [key: string]: string;
}

const translations: StringDictionary = {
    hello: "مرحبا",
    bye: "وداعا",
};


// =============================================================
// 8. متى نستخدم Interface ومتى نستخدم Type (الأهم لـ Angular)
// =============================================================

// ✔️ استخدم Interface عندما:
// - تمثل شكل Object
// - تعمل مع Classes
// - تكتب Models في Angular
// - تحتاج extends بشكل واضح

// ✔️ استخدم Type عندما:
// - تحتاج union (مثل: string | number)
// - تحتاج tuple
// - تحتاج conditional types
// - تحتاج mapped types


// =============================================================
// 9. خلاصة مبسطة جدًا
// =============================================================
// Interface → الأفضل لتعريف الهياكل الأساسية (Objects)
// Type → الأفضل للـ unions و utilities

// وفي Angular ستستخدم interfaces أكثر من types.

// انتهى الدرس 🎉
