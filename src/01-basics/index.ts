// ===============================
// الدرس 01 — TypeScript Basics
// شرح الدرس مدمج داخل الملف على شكل تعليقات
// ===============================

// -------------------------------------
// 1) ما هي TypeScript؟
// TypeScript هي Superset من JavaScript
// تضيف نظام الأنواع (Type System) مع بقاء الكود متوافقًا مع JS
// -------------------------------------

// -------------------------------------
// 2) الأنواع الأساسية (Primitive Types)
// -------------------------------------

// string
let username: string = "Ahmed";
let greeting: string = "مرحبا";
let message: string = `Hello ${username}`;

// number
let age: number = 25;
let price: number = 99.99;

// boolean
let isActive: boolean = true;

// null و undefined
let notAssigned: undefined = undefined;
let empty: null = null;

// any — تجنّبه قدر الإمكان
let dynamic: any = "text";
dynamic = 123;

// unknown — أكثر أمانًا من any
let unknownValue: unknown = "hello";
if (typeof unknownValue === "string") {
    let safeValue: string = unknownValue;
}

// -------------------------------------
// 3) Type Inference vs Annotations
// -------------------------------------
let inferredNumber = 10; // TS يستنتج النوع تلقائيًا
let explicitNumber: number = 10; // توصيف صريح

// -------------------------------------
// 4) Arrays
// -------------------------------------
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ["Ali", "Sara", "Mohamed"];

// Generic Array
let scores: Array<number> = [90, 85, 95];

// Array متعدد الأنواع
let mixed: (number | string)[] = [1, "two", 3];

// -------------------------------------
// 5) Tuples
// -------------------------------------
let user: [string, number, boolean] = ["Ahmed", 25, true];
let coordinates: [number, number] = [30.0444, 31.2357];

// -------------------------------------
// 6) Type Aliases
// -------------------------------------
type ID = string | number;
let userId: ID = "A-100";

// Alias آخر
type Point = [number, number];
let locationPoint: Point = [10, 20];

// -------------------------------------
// 7) مثال عملي بسيط — نظام منتج
// -------------------------------------
type ProductID = string | number;

let productName: string = "Laptop";
let productPrice: number = 999.99;
let productId: ProductID = "PROD-001";
let productTags: string[] = ["electronics", "computer"];

function displayProduct(name: string, price: number): string {
    return `${name} - $${price}`;
}

console.log(displayProduct(productName, productPrice));

// -------------------------------------
// 8) تمرين عملي (جاهز للتنفيذ)
// -------------------------------------
// المطلوب:
// 1. إنشاء:
//    - studentName: string
//    - studentAge: number
//    - isPassed: boolean
//    - grades: number[]
//    - profile: [name, age, class]
// 2. إنشاء type alias باسم StudentID
// 3. إنشاء دالة report(name, grade)

let studentName: string = "Ahmed";
let studentAge: number = 20;
let isPassed: boolean = true;
let grades: number[] = [95, 88, 90, 85, 92];
let profile: [string, number, string] = [studentName, studentAge, "Class A"];

type StudentID = string | number;

function report(name: string, grade: number): string {
    return `${name} scored ${grade}`;
}

console.log(report(studentName, grades[0]));

// ===============================
// نهاية الدرس 01
// ===============================