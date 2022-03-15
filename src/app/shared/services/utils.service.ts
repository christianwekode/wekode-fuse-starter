import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {

    normalizeString(input: string): string {
        return input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\.\;\,\!\¡\:\-\_\?\¿\^\[\]\+\]\*\{\}\=\(\)\/\&\%\$\#\·\"\'\@\º\ª\|\€\`\´\¨]/g, "");
    }

}