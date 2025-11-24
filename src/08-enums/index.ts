// 📘 Enums & Const Enums
// شرح منظم للعناصر (Enums) بأنواعها: numeric, string, const, واستخدامات عملية
// ============================================================================

/*
============================================================================
📑 فهرس الدرس (TOC)
============================================================================
1️⃣  Numeric Enums — الأساسيات
2️⃣  String Enums
3️⃣  Mixed Enums (لماذا لا نوصي بها)
4️⃣  Const Enums — للأداء
5️⃣  Enum vs Union Types
6️⃣  استخدام أعضاء Enum كـ Types
7️⃣  Iteration على Enums
8️⃣  Enum Type Guards
9️⃣  Ambient Enums
🔟  Enums في Angular (نمط عملي)
1️⃣1️⃣ مشاكل شائعة وحلولها
1️⃣2️⃣ مثال عملي شامل: Order Management System
1️⃣3️⃣ تمرين عملي: Ticket Management (مخطط وحل إرشادي)
============================================================================
*/

// ============================================================================
// 1️⃣ Numeric Enums — الأساسيات
// ============================================================================

enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

function move(direction: Direction): void {
    switch (direction) {
        case Direction.Up: console.log('Moving up'); break;
        case Direction.Down: console.log('Moving down'); break;
        case Direction.Left: console.log('Moving left'); break;
        case Direction.Right: console.log('Moving right'); break;
    }
}

// Reverse mapping (numeric enums فقط)
console.log(Direction.Up);     // 0
console.log(Direction[0]);    // "Up"

// تخصيص القيم
enum Status {
    Pending = 1,
    Approved,  // 2
    Rejected,  // 3
    Cancelled  // 4
}

// قيم مخصصة كما في HTTP statuses
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
    switch (status) {
        case HttpStatus.OK: return 'Success';
        case HttpStatus.NotFound: return 'Resource not found';
        case HttpStatus.InternalServerError: return 'Server error';
        default: return 'Unknown status';
    }
}

// Computed / bit-flags
enum FileAccess {
    None = 0,
    Read = 1 << 0,       // 1
    Write = 1 << 1,      // 2
    ReadWrite = Read | Write, // 3
    Execute = 1 << 2     // 4
}

function hasPermission(permission: FileAccess, required: FileAccess): boolean {
    return (permission & required) === required;
}

// ============================================================================
// 2️⃣ String Enums
// ============================================================================

enum LogLevel {
    Error = 'ERROR',
    Warning = 'WARNING',
    Info = 'INFO',
    Debug = 'DEBUG'
}

function log(level: LogLevel, message: string): void {
    console.log(`[${level}] ${message}`);
}

// String enums لا تدعم reverse mapping.

// ============================================================================
// 3️⃣ Mixed Enums — غير موصى بها
// ============================================================================

// يمكن خلط قيم رقمية ونصية لكن يسبب تعقيداً
enum Mixed {
    No = 0,
    Yes = 'YES' as any
}

// تجنّب المزج — اختَر رقمية أو نصية.

// ============================================================================
// 4️⃣ Const Enums — للأداء الأفضل
// ============================================================================

const enum ConstDirection {
    Up,
    Down,
    Left,
    Right
}

// عند التجميـع (compile) القيم ستُستبدل مباشرة بالأرقام — لا يبقى كائن enum في الـ runtime.

// متى تستخدم const enum؟
// ✅ عندما لا تحتاج reverse mapping أو iteration وتهدف لصغر الحجم والأداء.

// ============================================================================
// 5️⃣ Enum vs Union Types
// ============================================================================

// Enum
enum StatusEnum {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Pending = 'PENDING'
}

// Union alternative
type StatusUnion = 'ACTIVE' | 'INACTIVE' | 'PENDING';

// ملاحظات:
// - Union أخف في runtime (لا كود إضافي)
// - Enum يعطيك namespace واضح (StatusEnum.Active)
// استخدم ما يناسب الحالة

// ============================================================================
// 6️⃣ Enum members كـ Types
// ============================================================================

enum DirectionStr {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}

let up: DirectionStr.Up = DirectionStr.Up; // صحيح
// up = DirectionStr.Down; // ❌ خطأ

type HorizontalDirection = DirectionStr.Left | DirectionStr.Right;

function moveHorizontally(d: HorizontalDirection) { console.log(`Moving ${d}`); }

// ============================================================================
// 7️⃣ Enum Iteration
// ============================================================================

enum Colors {
    Red,
    Green,
    Blue
}

// الحصول على أسماء (non-numeric keys)
const colorNames = Object.keys(Colors).filter(k => isNaN(Number(k)));
const colorValues = Object.keys(Colors)
    .filter(k => !isNaN(Number(k)))
    .map(k => Number(k));

// مع String enum
enum LogLevels {
    Error = 'ERROR',
    Warning = 'WARNING',
    Info = 'INFO'
}
const logLevels = Object.values(LogLevels);

function getEnumValues<T extends Record<string, string | number>>(enumObj: T): T[keyof T][] {
    return Object.values(enumObj) as T[keyof T][];
}

// ============================================================================
// 8️⃣ Enum Type Guards
// ============================================================================

enum UserRole {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER'
}

function isValidRole(value: string): value is UserRole {
    return Object.values(UserRole).includes(value as UserRole);
}

function processUserData(data: any) {
    if (isValidRole(data.role)) {
        console.log('User role:', data.role);
    } else {
        console.log('Invalid role');
    }
}

// Generic helper
function isEnumValue<T extends Record<string, string | number>>(enumObj: T, value: any): value is T[keyof T] {
    return Object.values(enumObj).includes(value);
}

// ============================================================================
// 9️⃣ Ambient Enums
// ============================================================================

// يَستخدم عندما تريد تعريف enum موجود أصلاً في بيئة خارجية / مكتبة
// declare enum ExternalEnum { Value1, Value2, Value3 }

// ============================================================================
// 🔟 Enums في Angular (نمط عملي)
// ============================================================================

// app.enums.ts
export enum AppUserStatus {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Suspended = 'SUSPENDED',
    Deleted = 'DELETED'
}

export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

// في component: expose enum للـ template
// UserStatus = AppUserStatus; // في الـ class

// في الخدمة: استخدام Enum كنمط للـ requests
// this.http.patch<User>(`/api/users/${userId}`, { status });

// ============================================================================
// 1️⃣1️⃣ مشاكل شائعة وطرق حلها
// ============================================================================

// Problem: API returns string
function parseStatus(value: string): StatusEnum | null {
    if (Object.values(StatusEnum).includes(value as StatusEnum)) return value as StatusEnum;
    return null;
}

// Problem: JSON serialization of numeric enums -> number in parsed JSON
// الحل: عند قراءة JSON قم بتحويل/التحقق بالقيم المتوقعة

// ============================================================================
// 1️⃣2️⃣ مثال عملي شامل: Order Management System
// ============================================================================

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
    Pending = 'PENDING',
    Paid = 'PAID',
    Failed = 'FAILED',
    Refunded = 'REFUNDED'
}

enum PaymentMethod {
    Cash = 'CASH',
    Card = 'CARD',
    PayPal = 'PAYPAL',
    BankTransfer = 'BANK_TRANSFER'
}

const enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
    Urgent = 4
}

interface Order {
    id: number;
    customerId: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    priority: Priority;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

class OrderStatusManager {
    private transitions = new Map<OrderStatus, { to: OrderStatus; allowed: boolean; requiresPayment?: boolean }[]>();

    constructor() {
        this.transitions.set(OrderStatus.Draft, [{ to: OrderStatus.Pending, allowed: true }]);
        this.transitions.set(OrderStatus.Pending, [
            { to: OrderStatus.Processing, allowed: true, requiresPayment: true },
            { to: OrderStatus.Cancelled, allowed: true }
        ]);
        this.transitions.set(OrderStatus.Processing, [
            { to: OrderStatus.Shipped, allowed: true },
            { to: OrderStatus.Cancelled, allowed: true }
        ]);
        this.transitions.set(OrderStatus.Shipped, [{ to: OrderStatus.Delivered, allowed: true }]);
        this.transitions.set(OrderStatus.Delivered, [{ to: OrderStatus.Refunded, allowed: true }]);
    }

    canTransition(from: OrderStatus, to: OrderStatus): boolean {
        const list = this.transitions.get(from) ?? [];
        return list.some(t => t.to === to && t.allowed);
    }

    requiresPayment(from: OrderStatus, to: OrderStatus): boolean {
        const list = this.transitions.get(from) ?? [];
        return list.find(t => t.to === to)?.requiresPayment ?? false;
    }

    getAvailableTransitions(from: OrderStatus): OrderStatus[] {
        const list = this.transitions.get(from) ?? [];
        return list.filter(t => t.allowed).map(t => t.to);
    }
}

class OrderService {
    private statusManager = new OrderStatusManager();

    updateOrderStatus(order: Order, newStatus: OrderStatus): { success: boolean; message: string } {
        if (!this.statusManager.canTransition(order.status, newStatus)) {
            return { success: false, message: `Cannot transition from ${order.status} to ${newStatus}` };
        }

        if (this.statusManager.requiresPayment(order.status, newStatus)) {
            if (order.paymentStatus !== PaymentStatus.Paid) {
                return { success: false, message: 'Payment required before processing' };
            }
        }

        order.status = newStatus;
        order.updatedAt = new Date();
        return { success: true, message: `Order status updated to ${newStatus}` };
    }

    getOrderStatusLabel(status: OrderStatus): string {
        switch (status) {
            case OrderStatus.Draft: return 'مسودة';
            case OrderStatus.Pending: return 'قيد الانتظار';
            case OrderStatus.Processing: return 'قيد المعالجة';
            case OrderStatus.Shipped: return 'تم الشحن';
            case OrderStatus.Delivered: return 'تم التوصيل';
            case OrderStatus.Cancelled: return 'ملغي';
            case OrderStatus.Refunded: return 'مسترد';
            default: {
                const _exhaustive: never = status;
                return _exhaustive;
            }
        }
    }
}

// ============================================================================
// 1️⃣3️⃣ تمرين عملي: Ticket Management — خطة وحل إرشادي
// ============================================================================

/*
طُلب: بناء نظام Ticket Management. في الملف الأصلي يوجد تمرين مفصّل — هنا سأعطي مخطط حل إرشادي

- استخدم string enum للحالات (TicketStatus)
- استخدم numeric const enum للأولويات (TicketPriority)
- استخدم const enum لمصدر التذكرة (TicketSource)
- أنشئ interface Ticket مع الحقول المطلوبة
- أنشئ class TicketManager مع قواعد الانتقال (Map) وطرق الفلترة والوصف
- أضف Type Guards للتحقق من صلاحية القيم
*/




/**
 * =====================================================
 *                Ticket Management System
 * =====================================================
 *

 * يحتوي على:
 * 1. Enums
 * 2. Ticket Interface
 * 3. TicketManager Class
 * 4. Transition Rules
 * 5. Type Guards
 * 6. تجربة عملية للنظام
 */

// =====================================================
// 1️⃣ Enums
// =====================================================

// String Enum — مناسب للـ debugging
export enum TicketStatus {
    Open = "OPEN",
    InProgress = "IN_PROGRESS",
    Resolved = "RESOLVED",
    Closed = "CLOSED",
    Reopened = "REOPENED"
}

// Numeric Enum — مناسب للمقارنة والتدرج
export enum TicketPriority {
    Low = 1,
    Normal = 2,
    High = 3,
    Critical = 4
}

// String Enum
export enum TicketCategory {
    Bug = "BUG",
    Feature = "FEATURE",
    Question = "QUESTION",
    Documentation = "DOCUMENTATION"
}

// Const Enum — نستخدمه لأنه لا نحتاج iteration
export const enum TicketSource {
    Email = "EMAIL",
    Phone = "PHONE",
    Web = "WEB",
    Mobile = "MOBILE"
}

// =====================================================
// 2️⃣ Ticket Interface
// =====================================================

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    source: TicketSource;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
}

// =====================================================
// 3️⃣ Transition Rules
// =====================================================
// نستخدم Map لربط كل حالة بالحالات المسموح التحول إليها

const TRANSITIONS = new Map<TicketStatus, TicketStatus[]>([
    [TicketStatus.Open, [TicketStatus.InProgress, TicketStatus.Closed]],
    [TicketStatus.InProgress, [TicketStatus.Resolved, TicketStatus.Closed]],
    [TicketStatus.Resolved, [TicketStatus.Closed, TicketStatus.Reopened]],
    [TicketStatus.Closed, [TicketStatus.Reopened]],
    [TicketStatus.Reopened, [TicketStatus.InProgress]]
]);

// =====================================================
// 4️⃣ TicketManager Class
// =====================================================

export class TicketManager {
    /**
     * تغيير حالة التيكيت إذا كانت الحركة قانونية
     */
    updateStatus(ticket: Ticket, newStatus: TicketStatus): boolean {
        const allowedStatuses = TRANSITIONS.get(ticket.status) ?? [];

        if (!allowedStatuses.includes(newStatus)) {
            return false; // الحركة غير مسموحة
        }

        ticket.status = newStatus;
        ticket.updatedAt = new Date();
        return true;
    }

    /**
     * فلترة حسب Minimum Priority
     */
    filterByPriority(tickets: Ticket[], min: TicketPriority): Ticket[] {
        return tickets.filter(t => t.priority >= min);
    }

    /**
     * فلترة حسب Status معين
     */
    filterByStatus(tickets: Ticket[], status: TicketStatus): Ticket[] {
        return tickets.filter(t => t.status === status);
    }

    /**
     * Label عربي لحالة التيكيت
     */
    getStatusLabel(status: TicketStatus): string {
        switch (status) {
            case TicketStatus.Open:
                return "مفتوح";
            case TicketStatus.InProgress:
                return "قيد العمل";
            case TicketStatus.Resolved:
                return "تم الحل";
            case TicketStatus.Closed:
                return "مغلق";
            case TicketStatus.Reopened:
                return "أعيد فتحه";
            default:
                const _exhaustive: never = status;
                return _exhaustive;
        }
    }

    /**
     * Label عربي للأولوية
     */
    getPriorityLabel(priority: TicketPriority): string {
        switch (priority) {
            case TicketPriority.Low:
                return "منخفض";
            case TicketPriority.Normal:
                return "عادي";
            case TicketPriority.High:
                return "عالٍ";
            case TicketPriority.Critical:
                return "حرج";
            default:
                const _e: never = priority;
                return _e;
        }
    }

    /**
     * التيكيت يمكن تعيينه فقط إذا كان: Open أو InProgress
     */
    canAssign(ticket: Ticket): boolean {
        return (
            ticket.status === TicketStatus.Open ||
            ticket.status === TicketStatus.InProgress
        );
    }

    /**
     * رفع الأولوية للتصعيد
     */
    escalate(ticket: Ticket): void {
        if (ticket.priority < TicketPriority.Critical) {
            ticket.priority++;
        }
        ticket.updatedAt = new Date();
    }
}

// =====================================================
// 5️⃣ Type Guards
// =====================================================
// التحقق من القيم الواردة من API أو JSON

export function isValidStatus(value: any): value is TicketStatus {
    return Object.values(TicketStatus).includes(value);
}

export function isValidPriority(value: any): value is TicketPriority {
    return Object.values(TicketPriority).includes(value);
}

// =====================================================
// 6️⃣ تجربة النظام عملياً
// =====================================================

const manager = new TicketManager();

const ticket: Ticket = {
    id: 1,
    title: "Login button not working",
    description: "User cannot click login button on homepage",
    status: TicketStatus.Open,
    priority: TicketPriority.High,
    category: TicketCategory.Bug,
    source: TicketSource.Web,
    createdAt: new Date(),
    updatedAt: new Date()
};

// تجربة تحديث الحالة
console.log("Current Status:", ticket.status);
manager.updateStatus(ticket, TicketStatus.InProgress);
console.log("After Update:", ticket.status);

// تجربة التصعيد
manager.escalate(ticket);
console.log("Priority After Escalation:", ticket.priority);

// تجربة assignment
console.log("Can Assign?", manager.canAssign(ticket));

// تجربة type guards
console.log(isValidStatus("IN_PROGRESS")); // true
console.log(isValidPriority(3)); // true


// ============================================================================
// انتهى الدرس
// ============================================================================
