/********************************************************************************************
 *                               TypeScript Generics (نسخة مبسّطة ومتوسطة)                  *
 *                                         Ahmed Notes                                        *
 ********************************************************************************************/

/**
 * ===============================
 * 📘 الفهرس
 * ===============================
 * 1. ما هي Generics ولماذا نستخدمها؟
 * 2. Generic Functions
 * 3. Generics مع Arrays
 * 4. Multiple Type Parameters
 * 5. Generic Constraints (extends / keyof)
 * 6. Generic Interfaces
 * 7. Generic Classes
 * 8. Default Type Parameters
 * 9. Generics في Angular (مهم للمستقبل)
 * 10. تمرين عملي بسيط
 */

/********************************************************************************************
 * 1️⃣ ما هي Generics؟
 * - تسمح لك بكتابة كود مرن قابل لإعادة الاستخدام.
 * - تحافظ على Type Safety بدون استخدام any.
 ********************************************************************************************/

// بدون Generics → تكرار
function identityNumber(value: number): number {
    return value;
}
function identityString(value: string): string {
    return value;
}

// ✔️ باستخدام Generics
function identity<T>(value: T): T {
    return value;
}

const idNum = identity(10);         // number
const idStr = identity("hello");    // string
const idArr = identity([1, 2, 3]);   // number[]

/********************************************************************************************
 * 2️⃣ Generic Functions مع Arrays
 ********************************************************************************************/

// جلب أول عنصر من Array
function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
}

const f1 = getFirst([1, 2, 3]);       // number | undefined
const f2 = getFirst(["a", "b"]);     // string | undefined

/********************************************************************************************
 * 3️⃣ Multiple Type Parameters
 ********************************************************************************************/

// دالة ترجع tuple
function pair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

const pr = pair("Age", 25); // [string, number]

/********************************************************************************************
 * 4️⃣ Generic Constraints (extends)
 ********************************************************************************************/

// شرط: وجود length
function logLength<T extends { length: number }>(item: T): void {
    console.log("Length:", item.length);
}

logLength("Ahmed");
logLength([1, 2, 3]);

// Constraint + interface
interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(i => i.id === id);
}

/********************************************************************************************
 * 5️⃣ keyof Constraint
 ********************************************************************************************/

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const userObj = { id: 1, name: "Ahmed", age: 25 };
const uname = getProperty(userObj, "name");

/********************************************************************************************
 * 6️⃣ Generic Interfaces
 ********************************************************************************************/

interface Box<T> {
    value: T;
    setValue(v: T): void;
    getValue(): T;
}

const numBox: Box<number> = {
    value: 10,
    setValue(v) { this.value = v; },
    getValue() { return this.value; }
};

/********************************************************************************************
 * 7️⃣ Generic Classes
 ********************************************************************************************/

class Container<T> {
    constructor(private value: T) { }

    getValue(): T {
        return this.value;
    }

    setValue(v: T): void {
        this.value = v;
    }
}

const c1 = new Container(100);

/********************************************************************************************
 * 8️⃣ Default Type Parameters
 ********************************************************************************************/

interface ApiResponse<T = any> {
    data: T;
    status: number;
}

const res1: ApiResponse<string> = { data: "ok", status: 200 };
const res2: ApiResponse = { data: { id: 1 }, status: 200 }; // T = any

/********************************************************************************************
 * 9️⃣ Generics في Angular (مبسط لأجل الفهم فقط)
 * - ستحتاجه لاحقًا عندما تبدأ بـ Angular.
 ********************************************************************************************/

interface Entity {
    id: number;
}

// مثال Service جنريك
class GenericService<T extends Entity> {
    private items: T[] = [];

    add(item: T) {
        this.items.push(item);
    }

    getById(id: number): T | undefined {
        return this.items.find(i => i.id === id);
    }
}

/********************************************************************************************
 * 🔟 تمرين بسيط (اختياري)
 * المطلوب: كتابة Generic Stack class مشابه للذي فوق.
 ********************************************************************************************/

class Stack<T> {
    private items: T[] = [];

    push(item: T) { this.items.push(item); }
    pop(): T | undefined { return this.items.pop(); }
    peek(): T | undefined { return this.items[this.items.length - 1]; }
}

const s = new Stack<string>();
s.push("A");
s.push("B");
console.log(s.peek()); // "B"

/********************************************************************************************
 * 📌 انتهى الجزء المبسّط والمتوسط من Generics
 * - هذا الملف يمكنك استخدامه كمذكرة أساسية.
 ********************************************************************************************/
