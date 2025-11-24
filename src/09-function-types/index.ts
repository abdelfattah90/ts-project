/*
=============================================
📘 TypeScript Function Types (Beginner-Friendly)
=============================================

فهرس المحتوى:
1. Function Type Expressions
2. Call Signatures
3. Construct Signatures
4. Generic Functions
5. Function Overloads
6. Rest Parameters
7. this Parameter
8. void vs never vs undefined
9. Callback Functions
10. Higher-Order Functions
11. Function Types في Angular
12. مثال تطبيقي صغير (Basic)
---------------------------------------------

⚠️ ملاحظة:
هذا الدرس مُبسّط للمبتدئين ومناسب لمن يتعلم Angular لاحقًا.
المفاهيم المتقدمة وُضعت في أسفل الملف بعزلٍ عن الأساسيات.
=============================================
*/


/*
=============================================
1️⃣ Function Type Expressions
=============================================
*/

// تعريف نوع دالة بسيط
// MathOperation: تأخذ رقمين وتُرجع رقم
// Function Type Expression → (param: Type) => ReturnType

type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// استخدام النوع
add(5, 3);

// تمرير دالة كـ parameter
function calculate(op: MathOperation, x: number, y: number): number {
    return op(x, y);
}

calculate(add, 10, 5);


/*
=============================================
2️⃣ Call Signatures
=============================================
*/

// شكل أكثر تقدّمًا: object + callable

type Formatter = {
    description: string;
    (value: string): string; // call signature
};

function createFormatter(desc: string): Formatter {
    const fn: any = (value: string) => `[${desc}] ${value}`;
    fn.description = desc;
    return fn;
}

const logger = createFormatter("LOG");
logger("test");


/*
=============================================
3️⃣ Construct Signatures
=============================================
*/

type PointConstructor = {
    new(x: number, y: number): { x: number; y: number };
};

class Point {
    constructor(public x: number, public y: number) { }
}

const PointClass: PointConstructor = Point;
const p = new PointClass(10, 20);


/*
=============================================
4️⃣ Generic Functions
=============================================
*/

// Generic بسيط
function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
}

getFirst([1, 2, 3]); // number
getFirst(["a", "b"]); // string

// Multiple Generics
function pair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

// Constraints
function getLength<T extends { length: number }>(item: T) {
    return item.length;
}

getLength("Ahmed");
getLength([1, 2, 3]);


/*
=============================================
5️⃣ Function Overloads
=============================================
*/

function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(a: number, b?: number, c?: number): Date {
    if (b !== undefined && c !== undefined) return new Date(a, b - 1, c);
    return new Date(a);
}

makeDate(1234567);
makeDate(2024, 11, 23);


/*
=============================================
6️⃣ Rest Parameters
=============================================
*/

function sum(...nums: number[]): number {
    return nums.reduce((s, n) => s + n, 0);
}

sum(1, 2, 3);


/*
=============================================
7️⃣ this Parameter
=============================================
*/

interface User {
    name: string;
    age: number;
}

interface UserMethods {
    getName(this: User): string;
    getAge(this: User): number;
}

const userMethods: UserMethods = {
    getName() {
        return this.name;
    },
    getAge() {
        return this.age;
    }
};

const myUser: User = { name: "Ahmed", age: 25 };

userMethods.getName.call(myUser);


/*
=============================================
8️⃣ void vs never vs undefined
=============================================
*/

function logMessage(msg: string): void {
    console.log(msg);
}

function throwErr(msg: string): never {
    throw new Error(msg);
}

function maybeUndefined(): string | undefined {
    return undefined;
}


/*
=============================================
9️⃣ Callback Functions
=============================================
*/

type Callback = (result: string) => void;

function fetchData(url: string, cb: Callback): void {
    cb("example");
}

fetchData("/api", (r) => console.log(r));


/*
=============================================
🔟 Higher-Order Functions
=============================================
*/

function withLogging<T extends any[], R>(fn: (...args: T) => R) {
    return (...args: T) => {
        console.log("Args:", args);
        return fn(...args);
    };
}

const add2 = (a: number, b: number) => a + b;
const loggedAdd = withLogging(add2);
loggedAdd(5, 7);


/*
=============================================
1️⃣1️⃣ Function Types في Angular
=============================================
*/

// Event Handlers
function handleClick(event: MouseEvent): void {
    console.log(event.clientX);
}

function handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
}


/*
=============================================
⭐ مثال تطبيقي بسيط (مناسب للمبتدئين)
=============================================
*/

// نظام بسيط لتسجيل الأحداث (Event System)

// handler: يستقبل قيمة
// (data: T) => void

type EventHandler<T> = (data: T) => void;

class SimpleEventEmitter<T> {
    private handlers: EventHandler<T>[] = [];

    on(handler: EventHandler<T>) {
        this.handlers.push(handler);
    }

    emit(data: T) {
        for (const h of this.handlers) h(data);
    }
}

const emitter = new SimpleEventEmitter<string>();

emitter.on((msg) => console.log("Received:", msg));
emitter.emit("Hello Ahmed!");


/*
=============================================
📌 المـفاهيم المتقدمة (عزل تام)
=============================================
⚠️ ليست ضرورية الآن — ستحتاج إليها لاحقًا أثناء تعلم Angular RxJS.
---------------------------------------------
- Call Signatures مع properties
- Construct + Call together
- Higher-order complex
- Validation framework
- Async validator chains
---------------------------------------------
*/


// // متقدم
// // ============================================================================
// // 📘 Function Types
// // شرح متكامل: Function Type Expressions, Generics, Overloads, HOFs، وحل التمرين (Event System)
// // ============================================================================

// /*
// ============================================================================
// 📑 فهرس الدرس (TOC)
// ============================================================================
// 1️⃣  Function Type Expressions
// 2️⃣  Call Signatures
// 3️⃣  Construct Signatures
// 4️⃣  Generic Functions
// 5️⃣  Function Overloads
// 6️⃣  Rest Parameters
// 7️⃣  this Parameter Type
// 8️⃣  Void vs Never vs Undefined
// 9️⃣  Callback Functions
// 🔟 Higher-Order Functions
// 1️⃣1️⃣ Function Types في Angular (ملاحظة)
// 1️⃣2️⃣ مثال عملي شامل: Validation Framework (مُختصر)
// 1️⃣3️⃣ تمرين عملي محلول: Event System (مكتمل)
// ============================================================================
// */

// // ============================================================================
// // 1️⃣ Function Type Expressions - مثال مختصر
// // ============================================================================

// type MathOperation = (a: number, b: number) => number;

// const add: MathOperation = (a, b) => a + b;
// const multiply: MathOperation = (a, b) => a * b;

// function calculate(operation: MathOperation, x: number, y: number): number {
//   return operation(x, y);
// }

// // ============================================================================
// // 2️⃣ Call Signatures - callable objects
// // ============================================================================

// type DescribableFunction = {
//   description: string;
//   (input: string): string;
// };

// function createFormatter(desc: string): DescribableFunction {
//   const fn: any = (input: string) => `[${desc}] ${input}`;
//   fn.description = desc;
//   return fn as DescribableFunction;
// }

// // ============================================================================
// // 3️⃣ Construct Signatures - newable
// // ============================================================================

// type PointConstructor = { new (x: number, y: number): { x: number; y: number } };
// class Point { constructor(public x: number, public y: number) {} }
// const PointClass: PointConstructor = Point;

// // ============================================================================
// // 4️⃣ Generic Functions - أساسيات وقيود
// // ============================================================================

// function getFirst<T>(arr: T[]): T | undefined { return arr[0]; }
// function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; }

// function getLength<T extends { length: number }>(v: T): number { return v.length; }

// function merge<T extends object, U extends object>(a: T, b: U): T & U { return { ...(a as any), ...(b as any) } as T & U; }

// // ============================================================================
// // 5️⃣ Function Overloads - مثال
// // ============================================================================

// function makeDate(timestamp: number): Date;
// function makeDate(year: number, month: number, day: number): Date;
// function makeDate(tsOrY: number, m?: number, d?: number): Date {
//   if (m !== undefined && d !== undefined) return new Date(tsOrY, m - 1, d);
//   return new Date(tsOrY);
// }

// // ============================================================================
// // 6️⃣ Rest Parameters Types
// // ============================================================================

// function sum(...nums: number[]): number { return nums.reduce((s, n) => s + n, 0); }

// // ============================================================================
// // 7️⃣ this Parameter Type
// // ============================================================================

// interface User { name: string; age: number }
// interface UserMethods { getName(this: User): string }

// const userMethods: UserMethods = { getName() { return this.name; } };

// // ============================================================================
// // 8️⃣ Void vs Never vs Undefined - تذكير سريع
// // ============================================================================

// type VoidFunc = () => void;
// const vfn: VoidFunc = () => { return true as any; };
// function throwError(msg: string): never { throw new Error(msg); }

// // ============================================================================
// // 9️⃣ Callback Functions Types - نماذج
// // ============================================================================

// type Callback<T> = (result: T) => void;

// type AsyncCallback<T, E = Error> = (err: E | null, data?: T) => void;

// // ============================================================================
// // 🔟 Higher-Order Functions - utilities
// // ============================================================================

// function withLogging<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R {
//   return (...args: T) => { console.log('calling', args); const r = fn(...args); console.log('result', r); return r; };
// }

// function curry<T, U, R>(fn: (a: T, b: U) => R) { return (a: T) => (b: U) => fn(a, b); }

// function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B) { return (a: A) => f(g(a)); }

// // debounce / throttle utilities
// function debounce<T extends any[]>(fn: (...args: T) => void, delay: number) {
//   let t: ReturnType<typeof setTimeout> | null = null;
//   return (...args: T) => { if (t) clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
// }

// function throttle<T extends any[]>(fn: (...args: T) => void, limit: number) {
//   let last = 0;
//   return (...args: T) => {
//     const now = Date.now();
//     if (now - last >= limit) { last = now; fn(...args); }
//   };
// }

// // ============================================================================
// // 1️⃣1️⃣ Function Types في Angular - ملاحظات سريعة
// // ============================================================================

// // في Angular ستستخدم أنواع دوال للـ handlers، guards، operators، و callbacks
// // مثال: type GuardFunction = (route, state) => boolean | Observable<boolean>

// // ============================================================================
// // 1️⃣2️⃣ مثال عملي: Validation Framework (مختصر)
// // ============================================================================

// // (المثال الكامل في الدرس السابق) - هنا نلخص أنواع Validator

// type ValidationResult = { valid: true } | { valid: false; errors: string[] };
// type Validator<T> = (v: T) => ValidationResult;

// const required: Validator<any> = (v) => v == null || v === '' ? { valid: false, errors: ['Required'] } : { valid: true };

// // ============================================================================
// // 1️⃣3️⃣ تمرين عملي محلول: Event System (حل كامل)
// // ============================================================================

// // الهدف: تنفيذ EventEmitter مع generics, middleware, map/filter, once, debounce/throttle utilities, subscribe overloads

// // Basic types
// export type EventHandler<T> = (data: T) => void;
// export type AsyncEventHandler<T> = (data: T) => Promise<void>;
// export type EventFilter<T> = (data: T) => boolean;
// export type EventTransformer<T, U> = (data: T) => U;

// export type Middleware<T> = (data: T, next: () => void) => void;

// export interface Subscription { unsubscribe(): void }

// // Subscription implementation helper
// class SimpleSubscription implements Subscription {
//   constructor(private cancel: () => void) {}
//   unsubscribe() { this.cancel(); }
// }

// // EventEmitter implementation
// export class EventEmitter<T> {
//   private handlers = new Set<EventHandler<T>>();
//   private middlewares: Middleware<T>[] = [];

//   // on/off
//   on(handler: EventHandler<T>): Subscription { return this.subscribe(handler); }
//   off(handler: EventHandler<T>): void { this.handlers.delete(handler); }

//   // subscribe overloads
//   subscribe(handler: EventHandler<T>): Subscription;
//   subscribe(eventName: string, handler: EventHandler<any>): Subscription;
//   subscribe(events: string[], handler: EventHandler<any>): Subscription;
//   subscribe(arg1: any, arg2?: any): Subscription {
//     // Only generic single-emitter implementation is required by exercise.
//     // Implement simple pattern: if arg1 is function -> subscribe to this emitter
//     if (typeof arg1 === 'function') {
//       const h: EventHandler<T> = arg1;
//       this.handlers.add(h);
//       return new SimpleSubscription(() => this.handlers.delete(h));
//     }
//     // fallbacks for overload signatures (not used in this single-emitter design)
//     throw new Error('Unsupported subscribe signature in this EventEmitter');
//   }

//   // once
//   once(handler: EventHandler<T>): Subscription {
//     const wrapper: EventHandler<T> = (data) => { try { handler(data); } finally { this.off(wrapper); } };
//     this.handlers.add(wrapper);
//     return new SimpleSubscription(() => this.handlers.delete(wrapper));
//   }

//   // emit applies middleware chain then handlers
//   emit(data: T): void {
//     // build chain
//     let i = -1;
//     const run = (): void => {
//       i++;
//       if (i < this.middlewares.length) {
//         try { this.middlewares[i](data, run); } catch (e) { console.error('Middleware error', e); }
//       } else {
//         // call handlers
//         for (const h of Array.from(this.handlers)) {
//           try { h(data); } catch (e) { console.error('Handler error', e); }
//         }
//       }
//     };
//     run();
//   }

//   // middleware
//   use(mw: Middleware<T>): void { this.middlewares.push(mw); }

//   // filter -> creates new emitter that only emits when predicate true
//   filter(predicate: EventFilter<T>): EventEmitter<T> {
//     const out = new EventEmitter<T>();
//     this.on((data) => { if (predicate(data)) out.emit(data); });
//     return out;
//   }

//   // map -> transforms T to U
//   map<U>(transform: EventTransformer<T, U>): EventEmitter<U> {
//     const out = new EventEmitter<U>();
//     this.on((data) => out.emit(transform(data)));
//     return out;
//   }

//   // helper to clear handlers (useful in tests)
//   clear(): void { this.handlers.clear(); this.middlewares = []; }
// }

// // Higher-order utilities specific for EventHandlers
// export function debounceHandler<T>(handler: EventHandler<T>, delay: number): EventHandler<T> {
//   let t: ReturnType<typeof setTimeout> | null = null;
//   return (data: T) => { if (t) clearTimeout(t); t = setTimeout(() => handler(data), delay); };
// }

// export function throttleHandler<T>(handler: EventHandler<T>, limit: number): EventHandler<T> {
//   let last = 0;
//   return (data: T) => { const now = Date.now(); if (now - last >= limit) { last = now; handler(data); } };
// }

// export function pipeHandlers<T>(...handlers: EventHandler<T>[]): EventHandler<T> {
//   return (data: T) => { for (const h of handlers) h(data); };
// }

// // ============================================================================
// // Example usage of EventEmitter
// // ============================================================================

// if (require && (require as any).main === module) {
//   // quick demo when executing the file directly (node)
//   const emitter = new EventEmitter<number>();

//   const sub = emitter.subscribe((n) => console.log('handler1', n));
//   emitter.on((n) => console.log('handler2', n));

//   emitter.use((d, next) => { console.log('mw1 before', d); next(); console.log('mw1 after', d); });
//   emitter.use((d, next) => { console.log('mw2 before', d); next(); });

//   emitter.emit(1);

//   // map/filter
//   const mapped = emitter.map(n => `num:${n}`);
//   mapped.on(s => console.log('mapped handler', s));
//   emitter.emit(2);

//   sub.unsubscribe();
//   emitter.emit(3);
// }

// // ============================================================================
// // انتهى الملف
// // ============================================================================
