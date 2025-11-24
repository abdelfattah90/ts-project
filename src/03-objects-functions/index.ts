/*
============================================
📘 Objects & Functions Typing — Lesson
============================================

📑 الفهرس (Table of Contents)
1. Object Types — الأساسيات
2. Type Alias
3. Optional Properties (?)
4. Readonly Properties
5. Nested Objects
6. Index Signatures
7. Function Types — الأساسيات
8. void و never
9. Optional & Default Parameters
10. Rest Parameters
11. Function Type Expressions
12. Call Signatures
13. مقدمة عن Generic Functions
14. مثال عملي: User Service
============================================

ملاحظة:
- تم تبسيط الشرح للمستوى المبتدئ بهدف التعلّم الصحيح لـ Angular لاحقًا.
- جميع الشروحات داخل تعليقات، وتحتها الأكواد مباشرة لتسهيل الرجوع.
*/

// --------------------------------------------
// 1️⃣ Object Types — الأساسيات
// --------------------------------------------

// التوصيف المباشر Inline Type
let user: { name: string; age: number } = {
    name: "Ahmed",
    age: 25,
};

// أخطاء محتملة:
// ❌ خاصية ناقصة
// let invalidUser: { name: string; age: number } = { name: "Ali" };

// ❌ خاصية زائدة
// let invalidUser2: { name: string; age: number } = {
//   name: "Sara",
//   age: 22,
//   email: "wrong",
// };

// --------------------------------------------
// 2️⃣ Type Alias — أفضل للمشاريع
// --------------------------------------------

type User = {
    name: string;
    age: number;
    email: string;
};

let user1: User = {
    name: "Ahmed",
    age: 25,
    email: "ahmed@example.com",
};

let user2: User = {
    name: "Sara",
    age: 22,
    email: "sara@example.com",
};

let users: User[] = [user1, user2];

// --------------------------------------------
// 3️⃣ Optional Properties (?)
// --------------------------------------------

type Product = {
    id: number;
    name: string;
    price: number;
    description?: string; // اختيارية
    discount?: number; // اختيارية
};

const product1: Product = {
    id: 1,
    name: "Laptop",
    price: 999,
};

const product2: Product = {
    id: 2,
    name: "Mouse",
    price: 25,
    description: "Wireless mouse",
    discount: 0.1,
};

function displayProduct(product: Product): string {
    const desc = product.description ?? "No description";
    const finalPrice = product.price * (1 - (product.discount ?? 0));
    return `${product.name}: $${finalPrice} - ${desc}`;
}

// --------------------------------------------
// 4️⃣ Readonly Properties
// --------------------------------------------

type Config = {
    readonly apiUrl: string;
    readonly timeout: number;
    retries: number;
};

const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
};

config.retries = 5; // ✅ مسموح
// config.apiUrl = "new"; // ❌ غير مسموح

// Utility type: Readonly<T>
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = {
    name: "Ahmed",
    age: 25,
    email: "ahmed@example.com",
};

// readonlyUser.name = "Ali"; // ❌ خطأ

// --------------------------------------------
// 5️⃣ Nested Objects
// --------------------------------------------

type Address = {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
};

type UserWithAddress = {
    id: number;
    name: string;
    email: string;
    address: Address;
    contacts?: {
        phone?: string;
        mobile?: string;
    };
};

const userWithAddress: UserWithAddress = {
    id: 1,
    name: "Ahmed",
    email: "ahmed@example.com",
    address: {
        street: "123 Main St",
        city: "Cairo",
        country: "Egypt",
    },
    contacts: {
        mobile: "+20 123 456 7890",
    },
};

console.log(userWithAddress.address.city);
console.log(userWithAddress.contacts?.phone ?? "Not provided");

// --------------------------------------------
// 6️⃣ Index Signatures — dynamic properties
// --------------------------------------------

type StringDictionary = {
    [key: string]: string;
};

const translations: StringDictionary = {
    hello: "مرحبا",
    thanks: "شكرا",
};

translations.welcome = "أهلا";

// --------------------------------------------
// 7️⃣ Function Types — الأساسيات
// --------------------------------------------

function add(a: number, b: number): number {
    return a + b;
}

const subtract = function (a: number, b: number): number {
    return a - b;
};

const multiply = (a: number, b: number): number => a * b;

// --------------------------------------------
// 8️⃣ void و never
// --------------------------------------------

function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(message: string): never {
    throw new Error(message);
}

// --------------------------------------------
// 9️⃣ Optional & Default Parameters
// --------------------------------------------

function greet(name: string, greeting?: string): string {
    return `${greeting ?? "Hello"}, ${name}`;
}

function greetBetter(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}`;
}

// --------------------------------------------
// 🔟 Rest Parameters
// --------------------------------------------

function sum(...nums: number[]): number {
    return nums.reduce((total, n) => total + n, 0);
}

// --------------------------------------------
// 1️⃣1️⃣ Function Type Expressions
// --------------------------------------------

type MathOperation = (a: number, b: number) => number;

const addOp: MathOperation = (a, b) => a + b;

function calculate(op: MathOperation, x: number, y: number): number {
    return op(x, y);
}

// --------------------------------------------
// 1️⃣2️⃣ Call Signatures
// --------------------------------------------

type DescribableFunction = {
    description: string;
    (input: string): string;
};

function createFormatter(desc: string): DescribableFunction {
    const formatter = (text: string) => `[${desc}] ${text}`;
    (formatter as DescribableFunction).description = desc;
    return formatter as DescribableFunction;
}

// --------------------------------------------
// 1️⃣3️⃣ مقدمة في Generics
// --------------------------------------------

function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
}

// --------------------------------------------
// 1️⃣4️⃣ مثال عملي — User Service
// --------------------------------------------

type UserId = number | string;

type UserAddress = {
    street: string;
    city: string;
    country: string;
};

type FullUser = {
    readonly id: UserId;
    name: string;
    email: string;
    age?: number;
    address?: UserAddress;
    createdAt: Date;
};

type CreateUserDto = Omit<FullUser, "id" | "createdAt">;
type UpdateUserDto = Partial<CreateUserDto>;

class UserService {
    private users: FullUser[] = [];
    private currentId = 1;

    createUser(data: CreateUserDto): FullUser {
        const newUser: FullUser = {
            ...data,
            id: this.currentId++,
            createdAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }

    findUser(predicate: (u: FullUser) => boolean): FullUser | undefined {
        return this.users.find(predicate);
    }

    updateUser(id: UserId, updates: UpdateUserDto): FullUser | null {
        const user = this.users.find((u) => u.id === id);
        if (!user) return null;

        Object.assign(user, updates);
        return user;
    }

    displayUser = (user: FullUser): string => {
        const { name, email, age, address } = user;
        const ageInfo = age ? `, Age: ${age}` : "";
        const addressInfo = address ? `, ${address.city}` : "";
        return `${name} (${email})${ageInfo}${addressInfo}`;
    };

    filterUsers(criteria: Partial<FullUser>, limit?: number): FullUser[] {
        let result = this.users.filter((u) => {
            return Object.entries(criteria).every(([key, value]) => {
                return u[key as keyof FullUser] === value;
            });
        });
        return limit ? result.slice(0, limit) : result;
    }
}

// انتهى الدرس 🎉
