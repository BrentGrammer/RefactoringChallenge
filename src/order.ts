import { Line } from "./line";
import { Bike } from "./bike";

const newline = '\n';

function formatMoney(amount: any, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e);
    }
}

export class Order {
    private _taxRate: number = .0725;
    private _lines: Line[] = [];
    private _company: string;

    constructor(company: string) {
        this._company = company;
    }

    public get Company(): string {
        return this._company;
    }

    public AddLine(line: Line): void {
        this._lines.push(line);
    }

    public Receipt(): string {
        var totalAmout = 0;
        var result = 'Order Receipt for ' + this._company + newline;

        this._lines.forEach(line => {
            var thisAmount = 0;

            switch (line.bike.price) {
                case Bike.OneThousand:
                    if (line.quantity >= 20)
                        thisAmount += line.quantity * line.bike.price * .9;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
                case Bike.TwoThousand:
                    if (line.quantity >= 10)
                        thisAmount += line.quantity * line.bike.price * .8;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
                case Bike.FiveThousand:
                    if (line.quantity >= 5)
                        thisAmount += line.quantity * line.bike.price * .8;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
            }
            result += '\t' + line.quantity + ' x ' + line.bike.brand + ' ' + line.bike.model + ' = $' + formatMoney(thisAmount) + newline;
            totalAmout += thisAmount;
        });

        result += 'Sub-Total: $' + formatMoney(totalAmout) + newline;
        var tax = totalAmout * this._taxRate;
        result += 'Tax: $' + formatMoney(tax) + newline;
        result += 'Total: $' + formatMoney(totalAmout + tax);

        return result;
    }

    public HtmlReceipt() {
        var totalAmout = 0;
        var result = '<html><body><h1>Order Receipt for ' + this._company + '</h1>';

        result += '<ul>';
        this._lines.forEach(line => {
            var thisAmount = 0;

            switch (line.bike.price) {
                case Bike.OneThousand:
                    if (line.quantity >= 20)
                        thisAmount += line.quantity * line.bike.price * .9;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
                case Bike.TwoThousand:
                    if (line.quantity >= 10)
                        thisAmount += line.quantity * line.bike.price * .8;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
                case Bike.FiveThousand:
                    if (line.quantity >= 5)
                        thisAmount += line.quantity * line.bike.price * .8;
                    else
                        thisAmount += line.quantity * line.bike.price;
                    break;
            }
            result += '<li>' + line.quantity + ' x ' + line.bike.brand + ' ' + line.bike.model + ' = $' + formatMoney(thisAmount) + '</li>';
            totalAmout += thisAmount;
        });
        result += '</ul>';

        result += '<h3>Sub-Total: $' + formatMoney(totalAmout) + '</h3>';
        var tax = totalAmout * this._taxRate;
        result += '<h3>Tax: $' + formatMoney(tax) + '</h3>';
        result += '<h2>Total: $' + formatMoney(totalAmout + tax) + '</h2>';
        result += '</body></html>';
        return result;
    }
}