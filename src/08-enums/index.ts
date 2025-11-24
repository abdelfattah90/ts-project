/**
 * 📘 TypeScript Enums Masterclass
 * ============================================================================
 * ملف تعليمي شامل يجمع بين النظرية والتطبيق العملي لـ Enums في TypeScript.
 *
 * 📑 فهرس المحتويات:
 * 1️⃣ Numeric Enums (الأساسيات)
 * 2️⃣ String Enums (النصية)
 * 3️⃣ Mixed Enums (المختلطة)
 * 4️⃣ Const Enums (للأداء)
 * 5️⃣ Enum vs Union Types (المقارنة)
 * 6️⃣ Enum Members as Types (تخصيص الأنواع)
 * 7️⃣ Iteration (الدوران على القيم)
 * 8️⃣ Type Guards (التحقق من الأنواع)
 * 9️⃣ Ambient Enums (البيئات الخارجية)
 * 🔟 Angular/Frontend Patterns (أنماط الواجهة)
 * 1️⃣1️⃣ Common Pitfalls (مشاكل وحلول)
 * 1️⃣2️⃣ Real World Example: Order System (نظام الطلبات)
 * 1️⃣3️⃣ Exercise Solution: Ticket System (تمرين التذاكر)
 * ============================================================================
 */

// ============================================================================
// 1️⃣ Numeric Enums — الأساسيات
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * نوع بيانات يسمح بتعريف مجموعة من الثوابت المسماة (Named Constants) التي تحمل قيماً رقمية.
 * افتراضياً، تبدأ من 0 وتزيد بمقدار 1.
 *
 * ✅ لماذا نستخدمه؟
 * - لاستبدال الأرقام المبهمة (Magic Numbers) بأسماء لها معنى.
 * - يوفر خاصية Reverse Mapping (الوصول للاسم عن طريق الرقم).
 *
 * ✅ أين نستخدمه؟
 * - تمثيل الاتجاهات (Up, Down).
 * - أيام الأسبوع أو الشهور.
 * - حالات النظام التي تخزن كأرقام في قاعدة البيانات (0, 1, 2).
 *
 * ✅ متى نستخدمه؟
 * عندما يكون الترتيب مهماً أو عندما نريد توفير مساحة التخزين باستخدام الأرقام.
 */

// 💻 التطبيق العملي:

// تعريف بسيط (يبدأ تلقائياً من 0)
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

function move(direction: Direction): void {
    switch (direction) {
        case Direction.Up: console.log('Moving up ⬆️'); break;
        case Direction.Down: console.log('Moving down ⬇️'); break;
        case Direction.Left: console.log('Moving left ⬅️'); break;
        case Direction.Right: console.log('Moving right ➡️'); break;
    }
}

// 💡 ميزة Reverse Mapping (خاصة بالـ Numeric Enums فقط)
console.log(Direction.Up);     // المخرج: 0
console.log(Direction[0]);     // المخرج: "Up"

// تخصيص القيم (Custom Initialization)
enum Status {
    Pending = 1,   // بدأنا من 1
    Approved,      // سيصبح 2 تلقائياً
    Rejected,      // 3
    Cancelled      // 4
}

// مثال: HTTP Status Codes (قيم متباعدة)
enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

function handleResponse(status: HttpStatus): string {
    if (status === HttpStatus.OK) return '✅ Success';
    if (status === HttpStatus.NotFound) return '❌ Resource not found';
    return '⚠️ Unknown status';
}

// 💡 مثال متقدم: Bitwise Flags (دمج الصلاحيات)
enum FileAccess {
    None = 0,
    Read = 1 << 0,       // 1
    Write = 1 << 1,      // 2
    ReadWrite = Read | Write, // 3 (يجمع الصلاحيتين)
    Execute = 1 << 2     // 4
}

function hasPermission(permission: FileAccess, required: FileAccess): boolean {
    // استخدام Bitwise AND للتحقق
    return (permission & required) === required;
}

// ============================================================================
// 2️⃣ String Enums — القيم النصية
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * Enums يتم تهيئتها بقيم نصية (String Literals) بدلاً من الأرقام.
 *
 * ✅ لماذا نستخدمه؟
 * - القيمة تكون مقروءة بوضوح عند الطباعة (Debugging) أو في الـ API Responses.
 * - لا تتغير القيمة إذا أعدنا ترتيب العناصر (عكس الـ Numeric).
 *
 * ✅ أين نستخدمه؟
 * - مستويات السجلات (LOGS).
 * - أسماء الـ Routes في التطبيق.
 * - قيم ثابتة يتوقعها الـ Backend كنصوص.
 *
 * ✅ متى نستخدمه؟
 * عندما تكون "قراءة القيمة" أهم من "حجم البيانات".
 * ⚠️ ملاحظة: لا تدعم Reverse Mapping.
 */

// 💻 التطبيق العملي:

enum LogLevel {
    Error = 'ERROR',
    Warning = 'WARNING',
    Info = 'INFO',
    Debug = 'DEBUG'
}

function log(level: LogLevel, message: string): void {
    // النتيجة ستكون واضحة: [ERROR] System crashed
    console.log(`[${level}] ${message}`);
}

// ============================================================================
// 3️⃣ Mixed Enums — (Heterogeneous)
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * خلط قيم رقمية ونصية في نفس الـ Enum.
 *
 * ❌ لماذا لا نوصي به؟
 * - يسبب إرباكاً في التعامل.
 * - يفقد مزايا الـ Reverse Mapping بشكل جزئي.
 *
 * ✅ متى نستخدمه؟
 * نادراً جداً، ربما فقط إذا كنت تتعامل مع نظام قديم (Legacy) يفرض هذا النمط.
 */

// 💻 التطبيق العملي:

enum MixedEnum {
    No = 0,
    Yes = 'YES'
}
// ⚠️ نصيحة: تجنب هذا النمط، اختر إما أرقاماً بالكامل أو نصوصاً بالكامل.

// ============================================================================
// 4️⃣ Const Enums — للأداء العالي
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * نوع خاص يتم تعريفه بـ `const enum`. يتم حذفه تماماً أثناء عملية الـ Compilation.
 *
 * ✅ لماذا نستخدمه؟
 * - تحسين الأداء وتقليل حجم ملف JavaScript النهائي.
 * - يتم استبدال الاسم بالقيمة مباشرة (Inlining) في الكود.
 *
 * ✅ أين نستخدمه؟
 * - في المكتبات الكبيرة.
 * - في الحلقات التكرارية (Loops) الضخمة.
 *
 * ✅ متى نستخدمه؟
 * عندما لا تحتاج إلى Reverse Mapping ولا تحتاج لاستخدام الـ Enum ككائن في الـ Runtime.
 */

// 💻 التطبيق العملي:

const enum ConstDirection {
    Up,
    Down,
    Left,
    Right
}

const myMove = ConstDirection.Up;
// في الـ JS الناتج، سيتحول السطر أعلاه إلى: var myMove = 0; فقط.

// ============================================================================
// 5️⃣ Enum vs Union Types
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما الفرق؟
 * - Enum: كائن حقيقي موجود في الـ Runtime.
 * - Union Type: تعريف موجود فقط في الـ TypeScript ويختفي عند التشغيل.
 *
 * ✅ متى تختار Union؟
 * - للبساطة والسرعة.
 * - عندما تكون القيم قليلة ولا تحتاج لتكرار استخدامها كـ "مجموعة".
 *
 * ✅ متى تختار Enum؟
 * - عندما تريد تجميع الثوابت تحت "Namespace" واحد (مثل Status.Active).
 * - عندما تحتاج لقيم وصفية (Descriptive Names).
 */

// 💻 التطبيق العملي:

// 1. استخدام Enum
enum StatusEnum {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE'
}

// 2. استخدام Union Type
type StatusUnion = 'ACTIVE' | 'INACTIVE';

// استخدام Union بسيط ومباشر
function setStatus(s: StatusUnion) { /* ... */ }

// ============================================================================
// 6️⃣ Enum Members as Types — التخصيص الدقيق
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * استخدام عضو محدد من الـ Enum كـ Type بحد ذاته.
 *
 * ✅ لماذا نستخدمه؟
 * لإجبار متغير معين على قبول قيمة واحدة فقط من الـ Enum أو مجموعة فرعية منها.
 */

// 💻 التطبيق العملي:

enum ShapeKind {
    Circle = 'CIRCLE',
    Square = 'SQUARE'
}

interface Circle {
    kind: ShapeKind.Circle; // ✅ يجب أن تكون القيمة CIRCLE حصراً
    radius: number;
}

interface Square {
    kind: ShapeKind.Square; // ✅ يجب أن تكون القيمة SQUARE حصراً
    sideLength: number;
}

// ============================================================================
// 7️⃣ Iteration — الدوران على القيم
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ التحدي:
 * عند الدوران على Numeric Enum، تظهر القيم والأسماء معاً بسبب Reverse Mapping.
 *
 * ✅ الحل:
 * يجب تصفية (Filter) المفاتيح لاستبعاد الأرقام إذا كنت تريد الأسماء فقط.
 */

// 💻 التطبيق العملي:

enum Colors {
    Red,
    Green,
    Blue
}

// للحصول على الأسماء فقط ("Red", "Green", "Blue")
const colorNames = Object.keys(Colors).filter(k => isNaN(Number(k)));

// للحصول على القيم فقط (0, 1, 2)
const colorValues = Object.keys(Colors)
    .filter(k => !isNaN(Number(k)))
    .map(k => Number(k));

// ============================================================================
// 8️⃣ Enum Type Guards — التحقق الآمن
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * ✅ ما هو؟
 * دالة تتحقق مما إذا كانت قيمة معينة (غادمة من API مثلاً) تنتمي للـ Enum.
 *
 * ✅ لماذا نستخدمه؟
 * لضمان سلامة البيانات قبل التعامل معها (Runtime Safety).
 */

// 💻 التطبيق العملي:

enum UserRole {
    Admin = 'ADMIN',
    Editor = 'EDITOR'
}

// دالة Type Guard
function isValidRole(value: string): value is UserRole {
    return Object.values(UserRole).includes(value as UserRole);
}

const inputRole = "SUPER_ADMIN"; // قيمة غير صالحة

if (isValidRole(inputRole)) {
    console.log("✅ Valid Role");
} else {
    console.log("❌ Invalid Role");
}

// ============================================================================
// 9️⃣ Ambient Enums & 🔟 Angular Patterns
// ============================================================================

/*
 * 💡 الشرح النظري:
 * ----------------
 * - Ambient Enums (`declare enum`): تستخدم لتعريف enums موجودة في مكتبة طرف ثالث ولا نملك كودها.
 * - Angular/Frontend: الـ HTML Templates لا ترى الـ Enums، لذلك يجب ربطها بمتغير داخل الكلاس.
 */

// مثال Angular (نظري):
/*
@Component({...})
class MyComponent {
    // كشف الـ Enum للـ Template
    public UserRole = UserRole;
}
// In Template: <div *ngIf="role === UserRole.Admin">...</div>
*/

// ============================================================================
// 1️⃣1️⃣ مشاكل شائعة (Common Pitfalls)
// ============================================================================

/*
 * ⚠️ مشكلة 1: تحويل الـ JSON
 * الـ Numeric Enum يظهر كرقم في الـ JSON، مما قد يفقد معناه بدون توثيق.
 *
 * ⚠️ مشكلة 2: القيم الافتراضية
 * استخدام `const enum` في مكتبة (Library) قد يسبب مشاكل لمستخدمي المكتبة إذا تغيرت القيم لاحقاً.
 */

// ============================================================================
// 1️⃣2️⃣ مثال عملي شامل: Order Management System
// ============================================================================

// تعريف الحالات (String للأمان والوضوح)
enum OrderStatus {
    Draft = 'DRAFT',
    Pending = 'PENDING',
    Processing = 'PROCESSING',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED',
    Cancelled = 'CANCELLED',
    Refunded = 'REFUNDED'
}

enum PaymentStatus {
    Unpaid = 'UNPAID',
    Paid = 'PAID'
}

// تعريف الأولويات (Const للأداء)
const enum Priority {
    Low = 1,
    High = 2
}

interface Order {
    id: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    priority: Priority;
}

class OrderManager {
    // خريطة الانتقالات المسموحة (State Machine)
    private transitions = new Map<OrderStatus, OrderStatus[]>([
        [OrderStatus.Draft, [OrderStatus.Pending]],
        [OrderStatus.Pending, [OrderStatus.Processing, OrderStatus.Cancelled]],
        [OrderStatus.Processing, [OrderStatus.Shipped, OrderStatus.Cancelled]],
        [OrderStatus.Shipped, [OrderStatus.Delivered]],
    ]);

    canTransition(current: OrderStatus, next: OrderStatus): boolean {
        const allowed = this.transitions.get(current) || [];
        return allowed.includes(next);
    }

    updateStatus(order: Order, newStatus: OrderStatus): void {
        if (this.canTransition(order.status, newStatus)) {
            order.status = newStatus;
            console.log(`✅ Order #${order.id} moved to ${newStatus}`);
        } else {
            console.error(`❌ Cannot move Order #${order.id} from ${order.status} to ${newStatus}`);
        }
    }
}

// تجربة النظام
const manager = new OrderManager();
const myOrder: Order = {
    id: 101,
    status: OrderStatus.Draft,
    paymentStatus: PaymentStatus.Unpaid,
    priority: Priority.High
};

manager.updateStatus(myOrder, OrderStatus.Pending);    // ✅ نجاح
manager.updateStatus(myOrder, OrderStatus.Delivered);  // ❌ فشل (غير مسموح القفز)

// ============================================================================
// 1️⃣3️⃣ تمرين عملي محلول: Ticket Management System
// ============================================================================

/*
 * 🛠️ متطلبات التمرين وحلها:
 * 1. TicketStatus (String Enum) -> لحالات التذاكر.
 * 2. TicketPriority (Numeric Enum) -> للمقارنة (> أو <).
 * 3. TicketSource (Const Enum) -> لأننا لا نحتاج التكرار عليها.
 * 4. إدارة عمليات التحول (Transitions).
 */

// 1. التعريفات
export enum TicketStatus {
    Open = "OPEN",
    InProgress = "IN_PROGRESS",
    Resolved = "RESOLVED",
    Closed = "CLOSED"
}

export enum TicketPriority {
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

export const enum TicketSource {
    Web = "WEB",
    Email = "EMAIL",
    Phone = "PHONE"
}

export interface Ticket {
    id: number;
    title: string;
    status: TicketStatus;
    priority: TicketPriority;
    source: TicketSource;
    updatedAt: Date;
}

// 2. مدير التذاكر
export class TicketManager {
    // قواعد العمل (Business Logic Rules)
    private validTransitions: Partial<Record<TicketStatus, TicketStatus[]>> = {
        [TicketStatus.Open]: [TicketStatus.InProgress, TicketStatus.Closed],
        [TicketStatus.InProgress]: [TicketStatus.Resolved],
        [TicketStatus.Resolved]: [TicketStatus.Closed, TicketStatus.InProgress], // Reopen
        [TicketStatus.Closed]: [TicketStatus.InProgress] // Reopen
    };

    /**
     * تغيير حالة التذكرة
     */
    changeStatus(ticket: Ticket, newStatus: TicketStatus): boolean {
        const allowed = this.validTransitions[ticket.status];

        if (allowed && allowed.includes(newStatus)) {
            ticket.status = newStatus;
            ticket.updatedAt = new Date();
            return true;
        }
        return false;
    }

    /**
     * تصعيد التذاكر الحرجة
     */
    escalateTicket(ticket: Ticket): void {
        if (ticket.priority < TicketPriority.Critical) {
            ticket.priority++; // نستفيد هنا من كونها Numeric Enum
            console.log(`🆙 Ticket escalated to priority: ${TicketPriority[ticket.priority]}`);
        }
    }

    /**
     * Type Guard للتأكد من الحالة
     */
    isTicketStatus(value: any): value is TicketStatus {
        return Object.values(TicketStatus).includes(value);
    }
}

// 3. التشغيل التجريبي للتمرين
console.log("\n--- 🎫 Ticket System Demo ---");

const ticketSys = new TicketManager();
const bugTicket: Ticket = {
    id: 500,
    title: "Login Failure",
    status: TicketStatus.Open,
    priority: TicketPriority.High, // 3
    source: TicketSource.Web,
    updatedAt: new Date()
};

// محاولة تغيير الحالة
const success = ticketSys.changeStatus(bugTicket, TicketStatus.InProgress);
console.log(`Change to InProgress: ${success ? "✅ Allowed" : "❌ Denied"}`);

// محاولة تصعيد الأولوية
ticketSys.escalateTicket(bugTicket); // ستصبح 4 (Critical)
console.log(`Current Priority Level: ${bugTicket.priority}`);