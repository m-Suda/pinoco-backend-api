export class CurrentTime {

    private now;

    constructor() {
        this.now = new Date();
    }

    public getYear(): string {
        return String(this.now.getFullYear());
    }

    public getMonth(): string {
        const month: number = this.now.getMonth() + 1;
        return month < 10 ? `0${String(month)}` : String(month);
    }

    public getDay(): string {
        const day: number = this.now.getDate();
        return day < 10 ? `0${String(day)}` : String(day);
    }

    public getTimeHHmmss(): string {
        return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
    }

    public getHours(): string {
        const HH = this.now.getHours();
        return HH < 10 ? `0${String(HH)}` : String(HH);
    }

    public getMinutes(): string {
        const mm = this.now.getMinutes();
        return mm < 10 ? `0${String(mm)}` : String(mm);
    }

    public getSeconds(): string {
        const ss = this.now.getSeconds();
        return ss < 10 ? `0${String(ss)}` : String(ss);
    }
}