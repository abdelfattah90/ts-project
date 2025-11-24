// ============================================================
// 📘 الدرس: البرمجة اللاتزامنية في TypeScript
// ============================================================
// الفهرس:
// 1. مقدمة
// 2. Callbacks
// 3. Promises
// 4. Promise Chaining
// 5. Async / Await
// 6. Error Handling
// 7. Promise.all
// 8. Promise.allSettled
// 9. Promise.race & Promise.any
// 10. Async Iteration
// 11. Type‑Safe API Wrapper
// 12. مثال عملي (مبسط)
// ============================================================

// ------------------------------------------------------------
// 1. مقدمة
// ------------------------------------------------------------
// البرمجة اللاتزامنية تُستخدم عند التعامل مع API, قواعد بيانات،
// أو عمليات تحتاج وقت للتنفيذ. في TypeScript نستخدم:
// - Promises
// - Async / Await
// مع Type Safety كامل.

// ------------------------------------------------------------
// 2. Callbacks (الطريقة القديمة) – لتوضيح الفكرة فقط
// ------------------------------------------------------------
function getData(callback: (data: string) => void): void {
    setTimeout(() => callback("Data loaded"), 1000);
}

function processData(data: string, callback: (result: string) => void): void {
    setTimeout(() => callback(`Processed: ${data}`), 1000);
}

function saveData(data: string, callback: (success: boolean) => void): void {
    setTimeout(() => callback(true), 1000);
}

// ❌ مثال يظهر Callback Hell (مزعج وصعب الصيانة)
getData((data) => {
    console.log(data);
    processData(data, (result) => {
        console.log(result);
        saveData(result, (success) => {
            console.log("Saved:", success);
        });
    });
});

// ------------------------------------------------------------
// 3. Promises – الطريقة الأفضل
// ------------------------------------------------------------
const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        success ? resolve("Operation successful!") : reject("Operation failed!");
    }, 1000);
});

promise
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
    .finally(() => console.log("Promise completed"));

interface User {
    id: number;
    name: string;
    email: string;
}

function fetchUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Ahmed", email: "ahmed@example.com" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// ------------------------------------------------------------
// 4. Promise Chaining – أفضل من Callbacks
// ------------------------------------------------------------
function loadData(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("Raw data"), 500));
}

function processDataAsync(data: string): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve(`Processed: ${data}`), 500));
}

function saveDataAsync(data: string): Promise<boolean> {
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
}

loadData()
    .then((data) => processDataAsync(data))
    .then((processed) => saveDataAsync(processed))
    .then((saved) => console.log("Saved:", saved))
    .catch((error) => console.error(error));

// ------------------------------------------------------------
// 5. Async / Await – الأسهل والأوضح
// ------------------------------------------------------------
async function displayUser(id: number): Promise<void> {
    try {
        const user = await fetchUser(id); // await بدلاً من .then()
        console.log(`User: ${user.name}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

displayUser(1);

// ------------------------------------------------------------
// 6. Error Handling – التعامل مع الأخطاء
// ------------------------------------------------------------
async function fetchUserSafely(id: number): Promise<User | null> {
    try {
        const user = await fetchUser(id);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// ------------------------------------------------------------
// 7. Promise.all – تشغيل عمليات بالتوازي
// ------------------------------------------------------------
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
    const promises = ids.map((id) => fetchUser(id));
    return Promise.all(promises);
}

// ------------------------------------------------------------
// 8. Promise.allSettled – لا يفشل لو Promise فشل
// ------------------------------------------------------------
async function fetchUsersSafe(ids: number[]): Promise<void> {
    const results = await Promise.allSettled(ids.map((id) => fetchUser(id)));
    console.log(results);
}

// ------------------------------------------------------------
// 9. Promise.race & Promise.any
// ------------------------------------------------------------
async function fetchWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
    );
    return Promise.race([promise, timeoutPromise]);
}

// ------------------------------------------------------------
// 10. Async Iteration
// ------------------------------------------------------------
async function* fetchUsersPaginated(pageSize: number): AsyncGenerator<User[], void> {
    let page = 1;
    while (page <= 3) {
        await new Promise((r) => setTimeout(r, 500));
        yield [{ id: page, name: `User${page}`, email: "test@test.com" }];
        page++;
    }
}

// ------------------------------------------------------------
// 11. Type‑Safe API Wrapper (تبسيط جداً)
// ------------------------------------------------------------
interface ApiSuccess<T> {
    success: true;
    data: T;
}

interface ApiErr {
    success: false;
    error: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiErr;

class ApiClient {
    constructor(private baseUrl: string) { }

    async get<T>(endpoint: string): Promise<ApiResult<T>> {
        try {
            const response = await fetch(this.baseUrl + endpoint);
            const data = await response.json();
            return { success: true, data };
        } catch (e) {
            return { success: false, error: "Network error" };
        }
    }
}

// ------------------------------------------------------------
// 12. مثال عملي مبسط (بدون تعقيد للمبتدئين)
// ------------------------------------------------------------
async function simpleTask(): Promise<void> {
    console.log("Starting task...");
    const user = await fetchUser(1);
    console.log("Task done for user:", user.name);
}

simpleTask();
