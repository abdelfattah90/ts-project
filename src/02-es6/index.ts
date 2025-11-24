/*
===============================================
📘 الدرس الثاني: ES6+ JavaScript Features in TypeScript
===============================================

هذا الملف يحتوي على شرح كامل + أمثلة عملية
وكل جزء من الدرس مكتوب داخل تعليقات
مع أكواد جاهزة للتجربة.

-----------------------------------------------
📌 المحتوى:
1) let & const vs var
2) Arrow Functions
3) Template Literals
4) Destructuring
5) Spread Operator
6) Rest Parameters
7) Default Parameters
8) Optional Chaining
9) Nullish Coalescing
10) Enhanced Object Literals
11) مثال عملي شامل
12) تمرين عملي (TaskManager)
-----------------------------------------------

================================================
1️⃣ let & const vs var
================================================
*/

// ❌ مثال على var (ليست block-scoped)
function oldWay() {
    if (true) {
        var x = 10;
    }
    console.log(x); // متاح خارج الـ block
}

// ❌ Hoisting مع var
// console.log(y); // undefined
var y = 5;

// ✅ let و const
function modernWay() {
    if (true) {
        let x = 10;
    }
    // console.log(x); // ❌ Error
}

const PI = 3.14159;
// PI = 5; // ❌ ممنوع تغيير الثابت

const userObj = { name: "Ahmed" };
userObj.name = "Ali"; // مسموح تغيير المحتوى
// userObj = {}; // ❌ تغيير المرجع ممنوع

/*
================================================
2️⃣ Arrow Functions
================================================
*/

// Traditional
function addOld(a: number, b: number): number {
    return a + b;
}

// Arrow
const addNew = (a: number, b: number): number => a + b;

// Arrow بدون معاملات
const greetArrow = (): string => "Hello!";

// الفرق في this binding
class Counter {
    count: number = 0;

    incrementOld() {
        setTimeout(function () {
            // this هنا غير معرف
            // this.count++;
        }, 1000);
    }

    incrementNew() {
        setTimeout(() => {
            this.count++; // يعمل بشكل صحيح
        }, 1000);
    }
}

/*
================================================
3️⃣ Template Literals
================================================
*/

const nameTL = "Ahmed";
const ageTL = 25;

const msg = `My name is ${nameTL} and I'm ${ageTL} years old`;

/*
================================================
4️⃣ Destructuring
================================================
*/

const userD = { name: "Ahmed", age: 25, city: "Cairo" };
const { name: n1, age: a1 } = userD;

// Array destructuring
type Point = [number, number];
const point: Point = [10, 20];
const [px, py] = point;

/*
================================================
5️⃣ Spread Operator
================================================
*/

const arrA = [1, 2, 3];
const arrB = [4, 5, 6];
const combined = [...arrA, ...arrB];

const userBase = { name: "Ahmed", age: 25 };
const userExtended = { ...userBase, city: "Cairo" };

/*
================================================
6️⃣ Rest Parameters
================================================
*/

function sumRest(...nums: number[]): number {
    return nums.reduce((t, n) => t + n, 0);
}

/*
================================================
7️⃣ Default Parameters
================================================
*/

function greet(name: string = "Guest"): string {
    return `Hello, ${name}`;
}

/*
================================================
8️⃣ Optional Chaining
================================================
*/

interface Address {
    street?: string;
    city?: string;
}

interface UserOC {
    name: string;
    address?: Address;
}

const userOC: UserOC = { name: "Ahmed" };

const cityName = userOC.address?.city;

/*
================================================
9️⃣ Nullish Coalescing (??)
================================================
*/

const v1 = 0;
const nCoalesce = v1 ?? 10; // 0

/*
================================================
🔟 Enhanced Object Literals
================================================
*/

const varName = "dynamic";
const objEnh = {
    nameTL,
    ageTL,
    [varName]: "value",
    greet() {
        return "Hello";
    },
};

/*
================================================
💼 مثال عملي شامل: ProductService
================================================
*/

interface Product {
    id: number;
    name: string;
    price: number;
    category?: string;
    tags?: string[];
}

class ProductService {
    private products: Product[] = [];

    addProducts(category: string = "general", ...products: Product[]): void {
        const enriched = products.map((p) => ({
            ...p,
            category: p.category ?? category,
        }));

        this.products = [...this.products, ...enriched];
    }

    findProduct({ id, name }: Partial<Product>): Product | undefined {
        return this.products.find((p) => p.id === id || p.name === name);
    }

    getFirstTag(id: number): string | undefined {
        return this.products.find((p) => p.id === id)?.tags?.[0];
    }

    formatProduct = (p: Product): string => {
        const { name, price, category = "Unknown" } = p;
        return `${name} - $${price} (${category})`;
    };
}

/*
================================================
🎯 تمرين عملي: TaskManager
================================================

✔ اتبع نفس التقنيات أعلاه
✔ استخدم rest, spread, destructuring, optional chaining, template literals, arrow functions
✔ جهزت لك الهيكل لتكمل عليه
*/

interface Task {
    id: number;
    title: string;
    completed?: boolean;
    tags?: string[];
    assignedTo?: {
        name: string;
        email?: string;
    };
}

class TaskManager {
    private tasks: Task[] = [];

    // TODO: 1) إضافة مهام متعددة (rest parameters)
    addTasks(...tasks: Task[]): void {
        // أكمل هنا
    }

    // TODO: 2) البحث عن Task باستخدام destructuring
    findTask({ id, title }: Partial<Task>): Task | undefined {
        return undefined; // عدلها
    }

    // TODO: 3) تحديث Task باستخدام spread
    updateTask(id: number, data: Partial<Task>): void {
        // عدل الكود
    }

    // TODO: 4) عرض معلومات Task (template literals + optional chaining)
    formatTask(task: Task): string {
        return ""; // عدلها
    }

    // TODO: 5) حساب عدد المهام المكتملة (arrow function)
    countCompleted = (): number => {
        return 0; // عدلها
    };
}

/*
🎉 انتهى الدرس — يمكنك البدء بالتطبيق الآن.
*/